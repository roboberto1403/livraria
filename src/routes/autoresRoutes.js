import express from 'express';
import autoresController from '../controllers/autoresController.js';
import paginar from '../middlewares/paginar.js';

const router = express.Router();

router.get("/autores", autoresController.listarAutores, paginar);
router.get("/autores/:id", autoresController.encontrarAutorPorId);
router.post("/autores", autoresController.criarAutor);
router.patch("/autores/:id", autoresController.atualizarAutor);
router.delete("/autores/:id", autoresController.deletarAutor);

export default router;