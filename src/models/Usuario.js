import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

const usuarioSchema = new mongoose.Schema({
    id: { type: mongoose.Schema.Types.ObjectId },
    nome: { 
      type: String, 
      required: [true, "O nome do(a) usuario(a) é obrigatório"] },
    livros_favoritos: [
  { type: mongoose.Schema.Types.ObjectId, 
    ref: "livros",
    autopopulate: { select: "titulo" }
   }
]
}, { versionKey: false });

usuarioSchema.plugin(autopopulate);

const usuario = mongoose.model("usuarios", usuarioSchema);

export default usuario;