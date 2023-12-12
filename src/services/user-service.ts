import { prisma } from '../utils/prisma';
import { User } from '@prisma/client';
import { logger } from '../utils/logger';

export class UserService {
    async createUser(firstName: string, lastName: string, email: string): Promise<User> {
        try {
            const user = await prisma.user.create({
                data: {
                    firstName,
                    lastName,
                    email,
                },
            });

            await prisma.$disconnect();
            return user;
        } catch (error: any) {
            await prisma.$disconnect();

            if (error.name === 'PrismaClientKnownRequestError' && error.code === 'P2002') {
                console.log('Here');
                throw new Error('That email already exists.');
            } else {
                logger.error(error.message);
                throw new Error('Server error.');
            }
        }
    }
}