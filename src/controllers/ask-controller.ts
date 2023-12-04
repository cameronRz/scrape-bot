import { Request, Response } from 'express';
import { XataService } from '../services/xata-service';
import { validationResult } from 'express-validator';

const xataService = new XataService();

export class AskController {
  async ask(req: Request, res: Response) {
    const result = validationResult(req);

   if (!result.isEmpty()) {
     return res.json({ reply: 'I didn\'t catch that.' });
   }

    const question = req.body.question;
    const reply = await xataService.ask(question);

    res.json({ reply });
  }
}