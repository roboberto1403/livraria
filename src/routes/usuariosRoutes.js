import express from 'express';
import UsuariosController from '../controllers/usuariosController.js';
import paginar from '../middlewares/paginar.js';

const router = express.Router();

router.get("/usuarios", UsuariosController.listarUsuarios, paginar);
router.get("/usuarios/:id", UsuariosController.encontrarUsuarioPorId);
router.get("/usuarios/:id/favoritos", UsuariosController.listarFavoritosPorId);
router.post("/usuarios", UsuariosController.criarUsuario);
router.patch("/usuarios/:id", UsuariosController.atualizarUsuario);
router.patch("/usuarios/:id/favoritar", UsuariosController.favoritarLivro);
router.delete("/usuarios/:id", UsuariosController.deletarUsuario);
router.delete("/usuarios/:id/desfavoritar", UsuariosController.desfavoritarLivro);

export default router;
