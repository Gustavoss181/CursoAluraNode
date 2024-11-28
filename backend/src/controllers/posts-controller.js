import {getTodosOsPosts, criarNovoPost, atualizarPost} from "../models/post-model.js";
import gerarDescricaoComGemini from "../services/gemini-service.js";
import fs from "fs";

export async function listarPosts(req, res) {
    const posts = await getTodosOsPosts();
    res.status(200).json(posts);
}

export async function criarPost(req, res) {
    const novoPost = req.body;
    try{
        const postCriado = await criarNovoPost(novoPost);
        res.status(201).json(postCriado);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function uploadImagem(req, res){
    const novoPost = {
        descricao: req.body.descricao,
        imgUrl: req.file.originalname,
        alt: req.body.alt
    }

    try{
        const postCriado = await criarNovoPost(novoPost);
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`;
        fs.renameSync(req.file.path, imagemAtualizada);
        res.status(201).json(postCriado);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}

export async function autalizarNovoPost(req, res){
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`;
    try{
        const imageBuffer = fs.readFileSync(`./uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer);
        const postAtualizado = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }
        const post = await atualizarPost(id, postAtualizado);
        res.status(200).json(post);
    }
    catch(erro){
        console.error(erro.message);
        res.status(500).json({"Erro": "Falha na requisição"});
    }
}