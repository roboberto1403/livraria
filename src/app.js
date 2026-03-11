 
import express from 'express';
import conectaDB from './config/dbConnect.js';
import routes from "./routes/index.js"
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';
import manipulador404 from './middlewares/manipulador404.js';

const app = express();
routes(app);

app.use(manipulador404);

// Middelware para erros 
app.use(manipuladorDeErros);

const conexao = await conectaDB();

conexao.on("error", (erro) => {
    console.error("Erro ao conectar", erro);
});

conexao.once("open", () => {
    console.log("Conexão com o banco criada com sucesso!")
})

export default app;

