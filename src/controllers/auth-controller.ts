import { Request, Response } from 'express';
import { UserService } from '../services/user-service';
import { createJWT } from '../utils/jwt';
import { User } from '@prisma/client';

const userService = new UserService();

export class AuthController {
    async register(req: Request, res: Response) {
        const { firstName, lastName, email } = req.body;

        try {
            const user: User = await userService.createUser(firstName, lastName, email);

            const token = createJWT({
                id: user.id,
                email: user.email,
            });

            res.json({ user, token });
        } catch (error: any) {
            res.json({ error: error.message });
        }
    }
}