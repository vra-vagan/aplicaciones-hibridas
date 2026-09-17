import mongoose from 'mongoose';

const empleadorSchema = new mongoose.Schema(
    {
        nombre: {type: String, required: [true, 'El nombre es obligatorio'], unique: true, trim: true},
        descripcion: {type: String, required: [true, 'La descripción es obligatoria'], trim: true},
        logo: {type: String, default: 'https://placehold.co/200x200?text=Logo'},
        ubicacion: {type: String, required: [true, 'La ubicación es obligatoria'], trim: true},
        sitio_web: {type: String, trim: true},
        email_contacto: {
            type: String,
            required: [true, 'El email de contacto es obligatorio'],
            trim: true,
            lowercase: true,
            match: [/^\S+@\S+\.\S+$/, 'El email de contacto no es válido']
        }
    },
    {timestamps: true, versionKey: false}
);

export default mongoose.model('Empleador', empleadorSchema, 'empleadores');
