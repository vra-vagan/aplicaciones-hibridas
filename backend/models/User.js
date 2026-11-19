import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

export const ROLES = ['candidato', 'admin'];

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
        telefono: {type: String, trim: true},
        password: {
            type: String,
            required: [true, 'La contraseña es obligatoria'],
            minlength: [6, 'La contraseña debe tener al menos 6 caracteres'],
            select: false
        },
        rol: {
            type: String,
            enum: {values: ROLES, message: 'El rol {VALUE} no es válido'},
            default: 'candidato'
        }
    },
    {
        timestamps: true,
        versionKey: false,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                return ret;
            }
        }
    }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.compararPassword = function (password) {
    return bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema, 'users');
