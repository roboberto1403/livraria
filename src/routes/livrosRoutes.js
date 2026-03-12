import express from 'express';
import LivrosController from '../controllers/livrosController.js';
import paginar from '../middlewares/paginar.js';

const router = express.Router();

router.get("/livros", LivrosController.listarLivros, paginar);
router.get("/livros/busca", LivrosController.listarLivrosPorFiltro, paginar);
router.get("/livros/:id", LivrosController.encontrarLivroPorId);
router.post("/livros", LivrosController.criarLivro);
router.patch("/livros/:id", LivrosController.atualizarLivro);
router.delete("/livros/:id", LivrosController.deletarLivro);

export default router;