import 'dotenv/config';
import mongoose from 'mongoose';
import {readFile} from 'node:fs/promises';
import Empleador from '../models/Empleador.js';
import Vacante from '../models/Vacante.js';
import User from '../models/User.js';

const leerJSON = async (archivo) => JSON.parse(await readFile(new URL(`./data/${archivo}`, import.meta.url), 'utf-8'));

try {
    await mongoose.connect(process.env.MONGODB_URI);

    await Promise.all([Empleador.deleteMany(), Vacante.deleteMany(), User.deleteMany()]);

    const empleadores = await Empleador.insertMany(await leerJSON('empleadores.json'));
    const idPorNombre = new Map(empleadores.map((e) => [e.nombre, e._id]));

    const vacantes = (await leerJSON('vacantes.json')).map((v) => ({...v, empleador: idPorNombre.get(v.empleador)}));
    await Vacante.insertMany(vacantes);

    const users = await User.insertMany(await leerJSON('users.json'));

    console.log(`Base de datos cargada: ${empleadores.length} empleadores, ${vacantes.length} vacantes, ${users.length} usuarios`);
} catch (error) {
    console.error('Error al cargar los datos:', error.message);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}
