import { Request, Response } from 'express';
import User from '../models/User';
import * as Yup from 'yup';
import bcrypt from 'bcryptjs';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import sharp from 'sharp';
import path from 'path';

class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const user = await User.findById(res.locals['user'].id);

        return res.json(user);
    }

    public async create(req: Request, res: Response): Promise<Response> {
        const { email } = req.body;

        const schema = Yup.object().shape({
            name: Yup.string()
                .required('Nome deve ser digitado')
                .min(5, 'Nome deve conter pelo menos 8 caracteres')
                .max(255, 'Nome deve conter no máximo 255 carateres'),
            email: Yup.string()
                .required('Email deve ser digiatdo')
                .email('Tipo de email inválido'),
            password: Yup.string().required('Senha deve ser digitada').min(8),
        });

        try {
            await schema.validate(req.body, {
                abortEarly: false,
            });
        } catch (err) {
            const errors = {};
            err.inner.forEach(error => {
                errors[error.path] = error.message;
            });
            if (req.file) fs.unlinkSync(req.file.filename);
            return res.status(400).send(errors);
        }

        try {
            if (await User.findOne({ email })) {
                if (req.file) fs.unlinkSync(req.file.filename);
                return res.status(400).send({ error: 'Usuário já existe' });
            }

            if (req.file) {
                await sharp(req.file.path, {
                    failOnError: false,
                })
                    .resize(50)
                    .withMetadata()
                    .toFile(
                        path.resolve(
                            req.file.destination,
                            'thumbnail-' + req.file.filename
                        )
                    );
            }
            const user = await User.create({
                ...req.body,
                imageURL: req.file ? req.file.filename : null,
            });

            user.password = undefined;

            return res.send({ user });
        } catch (err) {
            return res.status(400).send({ error: 'Falha no registro' });
        }
    }

    public async changePassword(
        req: Request,
        res: Response
    ): Promise<Response> {
        const user = await User.findById(res.locals['user'].id).select(
            '+password'
        );

        const schema = Yup.object().shape({
            password: Yup.string().required('Senha atual deve ser digitada'),
            newPassword: Yup.string().required('Nova senha deve ser digitada'),
            confirmPassword: Yup.string().required(
                'Nova senha deve ser repetida'
            ),
        });

        try {
            await schema.validate(req.body, {
                abortEarly: false,
            });
        } catch (err) {
            const errors = {};
            err.inner.forEach(error => {
                errors[error.path] = error.message;
            });
            return res.status(400).send(errors);
        }

        try {
            if (!user)
                return res
                    .status(404)
                    .send({ error: 'Usuário não localizado.' });

            if (!bcrypt.compareSync(req.body.password, user.password))
                return res.status(400).send({ error: 'Senha incorreta.' });

            if (req.body.newPassword != req.body.confirmPassword)
                return res
                    .status(400)
                    .send({ error: 'Nova senha e confirmação não coincidem.' });

            let newPassword = await bcrypt.hash(req.body.newPassword, 10);
            await User.findByIdAndUpdate(user.id, { password: newPassword });
        } catch (err) {
            return res
                .status(400)
                .send({ error: 'Falha ao atualizar a senha.' });
        }

        res.status(200).send('Senha atualizada com sucesso!');
    }

    public async forgotPassword(
        req: Request,
        res: Response
    ): Promise<Response> {
        const { email } = req.body;

        const schema = Yup.object().shape({
            email: Yup.string()
                .required('Email deve ser digitado')
                .email('Tipo de email inválido'),
        });

        try {
            await schema.validate(req.body, {
                abortEarly: false,
            });
        } catch (err) {
            const errors = {};
            err.inner.forEach(error => {
                errors[error.path] = error.message;
            });
            return res.status(400).send(errors);
        }

        try {
            if (await User.findOne({ email })) {
                return res.status(201).json({ token: uuid() });
            }
        } catch (err) {
            return res.status(400).send({ error: 'Email inválido.' });
        }
    }

    public async destroy(req: Request, res: Response): Promise<Response> {
        const user = await User.findById(res.locals['user'].id).select(
            '+password'
        );

        try {
            if (!user)
                return res
                    .status(404)
                    .send({ error: 'Usuário não localizado.' });

            const { password } = req.body;

            if (!password) {
                return res.status(400).send({ error: 'Digite a senha.' });
            }

            if (!bcrypt.compareSync(password, user.password))
                return res.status(400).send({ error: 'Senha incorreta.' });

            await User.findByIdAndDelete(user._id);

            return res.status(201).send('Usuário deletado.');
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao apagar usuário.' });
        }
    }

    public async update(req: Request, res: Response): Promise<Response> {
        const user = await User.findById(res.locals['user'].id);

        try {
            if (!user)
                return res
                    .status(404)
                    .send({ error: 'Usuário não localizado.' });

            if (req.file) {
                if (user.imageURL) {
                    const imagePath = path.resolve('public', 'uploads', 'user');
                    fs.unlink(path.resolve(imagePath, user.imageURL), err => {
                        if (err) return;

                        fs.unlinkSync(
                            path.resolve(
                                imagePath,
                                'thumbnail-' + user.imageURL
                            )
                        );
                    });
                }
                await sharp(req.file.path, {
                    failOnError: false,
                })
                    .resize(50)
                    .withMetadata()
                    .toFile(
                        path.resolve(
                            req.file.destination,
                            'thumbnail-' + req.file.filename
                        )
                    );
            }
            await User.findByIdAndUpdate(user.id, {
                imageURL: req.file ? req.file.filename : null,
            });

            return res.status(200).send('Dados do usuário atualizados');
        } catch (err) {
            console.log(err);
            return res.status(400).send({ error: 'Imagem não atualizada' });
        }

        return;
    }
}

export default new UserController();
