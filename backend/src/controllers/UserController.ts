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
                .required('Name is required')
                .min(5, 'Name must contain at least 8 caracthers')
                .max(255, 'Name must contain maximum 255 caracthers'),
            email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
            password: Yup.string().required('Password is required').min(8),
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
            fs.unlinkSync(req.file.filename);
            return res.status(400).send(errors);
        }

        try {
            if (await User.findOne({ email })) {
                fs.unlinkSync(req.file.filename);
                return res.status(400).send({ error: 'User already exists' });
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
            const user = await User.create({
                ...req.body,
                imageURL: req.file.filename,
            });

            user.password = undefined;

            return res.send({ user });
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
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
            password: Yup.string().required('A senha deve ser digitada'),
            newPassword: Yup.string().required('A senha deve ser digitada'),
            confirmPassword: Yup.string().required('A senha deve ser digitada'),
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
            console.log(err);
            return res
                .status(400)
                .send({ error: 'Falha ao atualizar a senha.' });
        }

        res.status(200).send('Senha atualizada com sucesso!');
    }

    public async forgotPassowrd(
        req: Request,
        res: Response
    ): Promise<Response> {
        const { email } = req.body;

        const schema = Yup.object().shape({
            email: Yup.string()
                .required('Email is required')
                .email('Email is invalid'),
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
            return res.status(400).send({ error: 'E-mail inválido.' });
        }
    }

    public async deleteUser(req: Request, res: Response): Promise<Response> {
        const user = await User.findById(res.locals['user'].id).select(
            '+password'
        );

        try {
            if (!user)
                return res
                    .status(404)
                    .send({ error: 'Usuário não localizado.' });

            if (!bcrypt.compareSync(req.body.password, user.password))
                return res.status(400).send({ error: 'Senha incorreta.' });

            await User.findByIdAndDelete(user._id);

            return res.status(201).send('Usuário deletado.');
        } catch (err) {
            return res.status(400).send({ error: 'Falha ao apagar usuário.' });
        }
    }
}

export default new UserController();
