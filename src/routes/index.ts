import transactionRoute from './transaction';
import walletRoute from './wallet';
import blockchainRoute from './blockchain';
import { Router } from 'express';

interface IRoutesConfig {
    [index: string]: Router;
}

const routesConfig: IRoutesConfig = {
    transaction: transactionRoute,
    wallet: walletRoute,
    blockchain: blockchainRoute,
};

export default routesConfig;
