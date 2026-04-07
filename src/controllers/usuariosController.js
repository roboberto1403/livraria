import { usuario } from '../models/index.js'
import NaoEncontrado from '../erros/NaoEncontrado.js';

class UsuariosController { 


    static async favoritarLivro (req, res, next) {
      try {
        const id = req.params.id;
        const usuarioModificado = await usuario.findByIdAndUpdate(id, { $addToSet: { livros_favoritos: req.body.livro } }, { returnDocument: 'after' });
        
        if (usuarioModificado !== null) {
        res.status(200).json({ message: "Livro favoritado com sucesso!", usuario: usuarioModificado })
        } else {
          next(new NaoEncontrado('ID do usuário não encontrado.'));
        }
      } catch (erro) {
        next(erro);
      }
    }

    static async desfavoritarLivro (req, res, next) {
      try {
        const id = req.params.id;
        const usuarioModificado = await usuario.findByIdAndUpdate(id, { $pull: { livros_favoritos: req.body.livro } }, { returnDocument: 'after' });
        
        if (usuarioModificado !== null) {
        res.status(200).json({ message: "Livro desfavoritado com sucesso!", usuario: usuarioModificado })
        } else {
          next(new NaoEncontrado('ID do usuário não encontrado.'));
        }
      } catch (erro) {
        next(erro);
      }
    }

    static async listarFavoritosPorId (req, res, next) {
        try {
            const id = req.params.id;
            const usuarioRequerido = await usuario.findById(id)

            if (usuarioRequerido !== null) {
              const listaFavoritos = usuarioRequerido.livros_favoritos;
              res.status(200).json(listaFavoritos);
            } else {
              next(new NaoEncontrado('ID do usuário não encontrado.'));
            }
        } catch (erro) {
          next(erro);
        }

    }
    
    static async listarUsuarios (req, res, next) {
        try {
            const listaUsuarios = usuario.find();

            req.resultado = listaUsuarios;

            next();
          } catch (erro) {
            next(erro);
        }
        
    }

    static async encontrarUsuarioPorId (req, res, next) {
        try {
            const id = req.params.id;
            const usuarioRequerido = await usuario.findById(id)

            if (usuarioRequerido !== null) {
            res.status(200).json(usuarioRequerido);
            } else {
              next(new NaoEncontrado('ID do usuário não encontrado.'));
            }
        } catch (erro) {
          next(erro);
        }

    }

    static async criarUsuario (req, res, next) {
        try {
            const novoUsuario = await usuario.create(req.body)
            res.status(201).json({ message: "Usuário cadastrado com sucesso!", usuario: novoUsuario });

        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarUsuario (req, res, next) {
        try {
            const id = req.params.id;
            const usuarioModificado = await usuario.findByIdAndUpdate(id, { $set: req.body }, { returnDocument: 'after' });
            
            if (usuarioModificado !== null) {
            res.status(200).json({ message: "Usuário modificado com sucesso!", usuario: usuarioModificado })
            } else {
              next(new NaoEncontrado('ID do usuário não encontrado.'));
            }
        } catch (erro) {
            next(erro);
        }
        
    }

    static async deletarUsuario (req, res, next) {
        try {
            const id = req.params.id;
            await usuario.findByIdAndDelete(id);

            if (usuario !== null) {
              res.status(200).json({ message: "Usuário deletado com sucesso!"})
            } else {
              next(new NaoEncontrado('ID do usuário não encontrado.'));
            }
        } catch (erro) {
            next(erro);
        }

    }
};

export default UsuariosController;