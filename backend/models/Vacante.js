import mongoose from 'mongoose';

export const CATEGORIAS = ['tecnologia', 'diseno', 'marketing', 'educacion', 'finanzas'];
export const MODALIDADES = ['remoto', 'presencial', 'hibrido'];
export const TIPOS = ['tiempo-completo', 'medio-tiempo', 'por-proyecto', 'freelance', 'pasantia', 'contrato-temporal'];

const vacanteSchema = new mongoose.Schema(
    {
        titulo: {type: String, required: [true, 'El título es obligatorio'], trim: true},
        descripcion: {type: String, required: [true, 'La descripción es obligatoria'], trim: true},
        descripcion_completa: {type: String, trim: true},
        requisitos: {type: [String], default: []},
        requisitos_texto: {type: String, trim: true},
        proponemos: {type: String, trim: true},
        empleador: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Empleador',
            required: [true, 'El empleador es obligatorio']
        },
        categoria: {
            type: String,
            required: [true, 'La categoría es obligatoria'],
            enum: {values: CATEGORIAS, message: 'La categoría {VALUE} no es válida'}
        },
        modalidad: {
            type: String,
            required: [true, 'La modalidad es obligatoria'],
            enum: {values: MODALIDADES, message: 'La modalidad {VALUE} no es válida'}
        },
        tipo: {
            type: String,
            required: [true, 'El tipo es obligatorio'],
            enum: {values: TIPOS, message: 'El tipo {VALUE} no es válido'}
        },
        experiencia: {type: String, trim: true},
        salario: {
            type: Number,
            required: [true, 'El salario es obligatorio'],
            min: [0, 'El salario no puede ser negativo']
        },
        prioridad: {type: Boolean, default: false},
        fecha_publicacion: {type: Date, default: Date.now}
    },
    {timestamps: true, versionKey: false}
);

export default mongoose.model('Vacante', vacanteSchema, 'vacantes');
