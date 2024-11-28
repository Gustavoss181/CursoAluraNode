import express from "express";
import multer from "multer";
import cors from "cors";
import { listarPosts, criarPost, uploadImagem, autalizarNovoPost } from "../controllers/posts-controller.js";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const upload = multer({ dest: "./uploads"})

const routes = (app) => {
    app.use(express.json());
    app.use(cors(corsOptions));

    app.get("/posts", listarPosts);
    app.post("/posts", criarPost);
    app.post("/upload", upload.single("imagem"), uploadImagem);
    app.put("/upload/:id", autalizarNovoPost);
}

export default routes;