import { Request, Response } from 'express';
import { UserService } from '../services/user-service';
import { User } from '@prisma/client';

const userService = new UserService();

export class AuthController {
    async register(req: Request, res: Response) {
        const { firstName, lastName, email } = req.body;

        try {
            const user: User = await userService.createUser(firstName, lastName, email);

            // Create JWT

            res.json({ user });
        } catch (error: any) {
            res.json({ error: error.message });
        }
    }
}