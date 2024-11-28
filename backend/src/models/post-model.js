import 'dotenv/config';
import { ObjectId } from "mongodb";
import conectarAoBanco from "../config/mongodb-config.js";

const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosOsPosts() {
    const db = conexao.db("imersao-instabytes");
    const postsCollection = db.collection("posts");
    return postsCollection.find().toArray();
}

export async function criarNovoPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const postsCollection = db.collection("posts");
    return postsCollection.insertOne(novoPost);
}

export async function atualizarPost(id, post) {
    const db = conexao.db("imersao-instabytes");
    const postsCollection = db.collection("posts");
    const objId = ObjectId.createFromHexString(id);
    return postsCollection.updateOne({_id: new ObjectId(objId)}, {$set: post});
}