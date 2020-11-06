import { Request, Response } from 'express';
import User from '../models/User';
import * as Yup from 'yup';

class UserController {
    public async index(req: Request, res: Response): Promise<Response> {
        const users = await User.find();

        return res.json(users);
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
            return res.status(400).send(errors);
        }

        try {
            if (await User.findOne({ email }))
                return res.status(400).send({ error: 'User already exists' });

            const user = await User.create(req.body);

            user.password = undefined;

            return res.send({ user });
        } catch (err) {
            return res.status(400).send({ error: 'Registration failed' });
        }
    }
}

export default new UserController();
