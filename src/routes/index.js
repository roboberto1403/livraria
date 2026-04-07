import express from 'express';
import livros from "./livrosRoutes.js";
import autores from "./autoresRoutes.js";
import usuarios from "./usuariosRoutes.js";
import cors from 'cors';

const routes = (app) => {
    app.get("/", (req, res) => {res.status(200).send("API de Beto");})
    app.use(cors({origin: "*"}));

    app.use(express.json(), livros, autores, usuarios);
}

export default routes;
