import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        nombre: {type: String, required: [true, 'El nombre es obligatorio'], trim: true},
        apellido: {type: String, required: [true, 'El apellido es obligatorio'], trim: true},
        email: {
            type: String,
            required: [true, 'El email es obligatorio'],
            unique: true,
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'El email no es válido']
        },
        telefono: {type: String, trim: true}
    },
    {timestamps: true, versionKey: false}
);

export default mongoose.model('User', userSchema, 'users');
