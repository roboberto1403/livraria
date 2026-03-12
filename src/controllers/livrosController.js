import { autor, livro } from '../models/index.js'
import NaoEncontrado from '../erros/NaoEncontrado.js';

class LivrosController {


    static async listarLivros (req, res, next) {
        try {
          const buscaLivros = livro.find()
            .populate('autor');
          
          //  Armazenando o resultado para ser utilizado pelo midware de paginação
          req.resultado = buscaLivros;

          // Next é necessário para o a continuidade da execução dessa rota ocorrer num midware (de paginação neste caso)
          next();

        } catch (erro) {
            next(erro);
        }
        
    }

    static async encontrarLivroPorId (req, res, next) {
        try {
            const id = req.params.id;
            const livroRequerido = await livro.findById(id)

            if (livroRequerido !== null) {
              res.status(200).json(livroRequerido);
            } else {
              next(new NaoEncontrado('ID do livro não encontrado.'));
            }
        } catch (erro) {
            next(erro);
        }

    }

    static async criarLivro (req, res, next) {
        try {
            let novoLivro = new livro(req.body);

            const livroResultado = await novoLivro.save();

            res.status(201).json({ message: "Livro cadastrado com sucesso!", livro: livroResultado });

        } catch (erro) {
            next(erro);
        }
    }

    static async atualizarLivro (req, res, next) {
        try {
            const id = req.params.id;
            const livroModificado = await livro.findByIdAndUpdate(id, { $set: req.body }, { returnDocument: 'after' });
            if (livroModificado !== null) {
              res.status(200).json({ message: "Livro modificado com sucesso!", livro: livroModificado })
            } else {
              next(new NaoEncontrado('ID do livro não encontrado.'));
            }
        } catch (erro) {
            next(erro);
        }
        
    }

    static async deletarLivro (req, res, next) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            if (livro !== null) {
              res.status(200).json({ message: "Livro deletado com sucesso!"})
            } else {
              next(new NaoEncontrado('ID do livro não encontrado.'));
            }
        } catch (erro) {
            next(erro);
        }

    }

    static async listarLivrosPorFiltro (req, res, next) {
        const busca = await processaBusca(req.query);

        try {
          if (busca !== null){
            const listaLivros = livro
              .find(busca)
              .populate('autor');

            // Mesma logica de antes, primeiro buscamos o resultado depois passamo adiante para o midware
            req.resultado = listaLivros;

            next();
          } else {
            res.status(200).json([]);
          }

        } catch (erro) {
            next(erro);
        }
    }
};

async function processaBusca(parametros) {
          const { editora, titulo, nomeAutor, minPagina, maxPagina } = parametros;

        let busca = {};
        const paginas = {};

        if (minPagina) paginas.$lte = minPagina, busca.paginas = paginas;
        if (maxPagina) paginas.$gte = maxPagina, busca.paginas = paginas;
        if (editora) busca.editora = editora;
        if (titulo) busca.titulo = { $regex: titulo, $options: "i" };

        if (nomeAutor) {
          const autorEncontrado = await autor.findOne({ nome: nomeAutor });
          if (autorEncontrado !== null) {
          busca.autor = autorEncontrado._id;
          } else {
            busca = null;
          }
        }

        return busca;
}

export default LivrosController;