import dotenv from 'dotenv';
import spdy from 'spdy';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();
import app from './app.js';
import { connectDB } from './config/db.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 5000;

async function start() {
    await connectDB();
    const certPath = path.join(__dirname, 'certs');
    try {
        const opcionesSSL = {
            key: fs.readFileSync(path.join(certPath, 'server.key')),
            cert: fs.readFileSync(path.join(certPath, 'server.cert'))
        };
        spdy.createServer(opcionesSSL, app).listen(PORT, (error) => {
            if (error) {
                console.error('Error al iniciar servidor:', error);
                return process.exit(1);
            }
            console.log(`Servidor HTTP/2 seguro corriendo en https://localhost:${PORT}`);
        });
    } catch (error) {
        console.error("No se pudieron leer los certificados SSL.");
        console.error("Asegurarse de haber ejecutado 'node generar-cert.js' y que la carpeta src/certs tenga los archivos.");
        console.error(error.message);
        process.exit(1);
    }
}
start();