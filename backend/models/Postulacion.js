import mongoose from 'mongoose';

export const ESTADOS = ['pendiente', 'en-revision', 'aceptada', 'rechazada'];

const postulacionSchema = new mongoose.Schema(
    {
        usuario: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: [true, 'El usuario es obligatorio']
        },
        vacante: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Vacante',
            required: [true, 'La vacante es obligatoria']
        },
        mensaje: {
            type: String,
            trim: true,
            maxlength: [1000, 'El mensaje no puede superar los 1000 caracteres']
        },
        perfil: {type: String, trim: true},
        estado: {
            type: String,
            enum: {values: ESTADOS, message: 'El estado {VALUE} no es válido'},
            default: 'pendiente'
        }
    },
    {timestamps: true, versionKey: false}
);

postulacionSchema.index({usuario: 1, vacante: 1}, {unique: true});

export default mongoose.model('Postulacion', postulacionSchema, 'postulaciones');
