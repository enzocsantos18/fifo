import nodemailer from 'nodemailer';
import path from 'path';
import { promises as fs } from 'fs';

const transport = nodemailer.createTransport({
    host: process.env['EMAIL_HOST'],
    port: process.env['EMAIL_PORT'],
    auth: {
        user: process.env['EMAIL_USER'],
        pass: process.env['EMAIL_PASS'],
    },
});

export async function parseForgotPasswordTemplate(token: string) {
    const data = await fs.readFile(
        path.resolve(__dirname, '../../templates/forgotPassword.html'),
        'utf8'
    );

    return data.replace('{{ token }}', token);
}

export default transport;
