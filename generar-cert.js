import selfsigned from 'selfsigned';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generarCertificados() {
    const attrs = [{ name: 'commonName', value: 'localhost' }];
    const options = { days: 365, keySize: 2048, algorithm: 'sha256' };

    console.log('Generando llaves esto puede tardar unos segundos');

    try {
        const pems = await selfsigned.generate(attrs, options);

        console.log('Inspeccionando resultado');
        console.log('Claves encontradas:', Object.keys(pems));

        const certPath = path.join(__dirname, 'backend', 'src', 'certs');

        if (!fs.existsSync(certPath)){
            console.log(`Creando carpeta: ${certPath}`);
            fs.mkdirSync(certPath, { recursive: true });
        }

        fs.writeFileSync(path.join(certPath, 'server.cert'), pems.cert);
        fs.writeFileSync(path.join(certPath, 'server.key'), pems.private);

        console.log(' Certificados creados correctamente en backend/src/certs/');

    } catch (error) {
        console.error('Error durante la generacion:', error);
    }
}
generarCertificados();