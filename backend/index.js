import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import conectarDB from './config/db.js';
import routerAPI from './routes/index.js';
import {rutaNoEncontrada, manejarErrores} from './middlewares/errores.js';

if (!process.env.JWT_SECRET) {
    console.error('Falta la variable JWT_SECRET en el archivo .env');
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000;
const origenes = (process.env.CORS_ORIGIN || 'http://localhost:5173').split(',').map((o) => o.trim());

app.use(cors({origin: origenes}));
app.use(express.json());
app.use(express.static('public'));

routerAPI(app);

app.use(rutaNoEncontrada);
app.use(manejarErrores);

conectarDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor escuchando en http://localhost:${PORT}`);
    });
});
