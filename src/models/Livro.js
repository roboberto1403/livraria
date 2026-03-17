import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const livroSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    titulo: { 
      type: String, 
      required: [true, "O título do livro é obrigatório"] },
    editora: { 
      type: String,
      enum: {
        values: ["BetoEditora", "Suma"],
        message: "A editora {VALUE} não é válida."}
      },
    paginas: { 
      type: Number,
      min: [10, "O número de páginas deve ser no mínimo 10. Valor fornecido: {VALUE}"],
      max: [10000, "O número de páginas deve ser no máximo 10000. Valor fornecido: {VALUE}"] },
    preco: { type: Number },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'autores',
      required: [true, "O(A) autor(a) do livro é obrigatório"],
      autopopulate: { select: "nome" }
    },
}, { versionKey: false });

livroSchema.plugin(autopopulate);

const livro = mongoose.model("livros", livroSchema);

export default livro;