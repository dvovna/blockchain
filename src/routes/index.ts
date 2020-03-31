import transactionRoute from './transaction';
import walletRoute from './wallet';
import {Router} from 'express';

interface IRoutesConfig {
    [index: string]: Router;
}

const routesConfig: IRoutesConfig = {
    transaction: transactionRoute,
    wallet: walletRoute,
};

export default routesConfig;
