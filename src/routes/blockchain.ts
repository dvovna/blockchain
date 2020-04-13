import express, { NextFunction, Request, Response } from 'express';
import blockChain from '../blockchain';

const router = express.Router();

router.get('/', (_request: Request, response: Response, next: NextFunction) => {
    response.json([...blockChain.getChain()]);
    next();
});

export default router;
