import { Router } from 'express';
import { AskController } from '../controllers/ask-controller';

const router = Router();
const askController = new AskController();

router.post('/', askController.ask);

export default router;