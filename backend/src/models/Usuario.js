import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';

const UsuarioSchema = new Schema(
  {
    nome: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    senha: {
      type: String,
      required: true,
      select: false,
    },
  },
  {
    timestamps: true,
  }
);

UsuarioSchema.pre('save', async function(next) {
  const hash = await bcrypt.hash(this.senha, 10);
  this.senha = hash;

  next();
});

UsuarioSchema.pre('findOneAndUpdate', async function(next) {
  const hash = await bcrypt.hash(this.getUpdate().senha, 10);
  this.getUpdate().senha = hash;

  next();
});

module.exports = model('Usuario', UsuarioSchema);
