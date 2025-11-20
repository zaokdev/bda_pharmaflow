import mongoose from "mongoose";

const EnsayoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  fase: { type: Number, enum: [1, 2, 3, 4], required: true },
  id_medicamento: { type: [Number], required: true },
  fecha_inicio: { type: Date, default: Date.now },
  investigador_principal: { type: String },
  datos_clinicos: { type: mongoose.Schema.Types.Mixed },

  conclusiones: String,
});

export const Ensayo = mongoose.model("Ensayo", EnsayoSchema);
