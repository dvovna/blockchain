import express, { Request, Response } from 'express';
import keyPairGenerator from '../helpers/keyPairGenerator';
import blockChainService from '../services/BlockChainService';

const router = express.Router();

router.get('/create', (request: Request, response: Response) => {
    const keyPair = keyPairGenerator.generate();
    response.json(keyPair);
});

router.get('/:walletId', (request: Request<{walletId: string}>, response: Response) => {
    response.json(blockChainService.getWalletBalance(request.params.walletId));
});

export default router;
