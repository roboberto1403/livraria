import { autor } from '../models/index.js'
import NaoEncontrado from '../erros/NaoEncontrado.js';

class AutoresController {


    static async listarAutores (req, res, next) {
        try {
            const listaAutores = autor.find();

            req.resultado = listaAutores;

            next();
          } catch (erro) {
            next(erro);
        }
        
    }

    static async encontrarAutorPorId (req, res, next) {
        try {
            const id = req.params.id;
            const autorRequerido = await autor.findById(id)

            if (autorRequerido !== null) {
            res.status(200).json(autorRequerido);
            } else {
              next(new NaoEncontrado('ID do autor não encontrado.'));
            }
        } catch (erro) {
          next(erro);
        }

    }

    static async criarAutor (req, res, next) {
        try {
            const novoAutor = await autor.create(req.body)
            res.status(201).json({ message: "Autor cadastrado com sucesso!", autor: novoAutor });

        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarAutor (req, res, next) {
        try {
            const id = req.params.id;
            const autorModificado = await autor.findByIdAndUpdate(id, { $set: req.body }, { returnDocument: 'after' });
            
            if (autorModificado !== null) {
            res.status(200).json({ message: "Autor modificado com sucesso!", autor: autorModificado })
            } else {
              next(new NaoEncontrado('ID do autor não encontrado.'));
            }
        } catch (erro) {
            next(erro);
        }
        
    }

    static async deletarAutor (req, res, next) {
        try {
            const id = req.params.id;
            await autor.findByIdAndDelete(id);

            if (autor !== null) {
              res.status(200).json({ message: "Autor deletado com sucesso!"})
            } else {
              next(new NaoEncontrado('ID do autor não encontrado.'));
            }
        } catch (erro) {
            next(erro);
        }

    }
};

export default AutoresController;