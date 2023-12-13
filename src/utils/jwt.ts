import jwt from 'jsonwebtoken';

type Payload = {
    id: number;
    email: string;
};

const jwtSecret = process.env.JWT_SECRET!;

export const createJWT = (payload: Payload) => {
    return jwt.sign({ data: payload }, jwtSecret, { expiresIn: '5m' });
};

export const verifyJWT = (token: string) => {
    const decoded = jwt.verify(token, jwtSecret);
    console.log(decoded);
};