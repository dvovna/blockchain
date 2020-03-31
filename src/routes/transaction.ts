import express, {NextFunction, Request, Response} from 'express';
import blockChain from '../blockchain';

const router = express.Router();

router.get('/create', ({ query }: Request, response: Response, next: NextFunction) => {
    const { fromAddress, toAddress, amount, privateKey } = query;
    if (!fromAddress || !toAddress || !amount || !privateKey) {
        throw new Error('Transaction invalid!');
    }

    blockChain.createTransaction(fromAddress, toAddress, parseInt(amount, 10), privateKey);
    response.json({status: 200, chain: blockChain.getChain()});
    next();
});

export default router;
