import blockChain from './BlockChain';
import { IBlock } from './core/Block';
import { ITransaction } from './core/Transaction';

export { IBlock, ITransaction };

export default {
    createTransaction: blockChain.addTransaction.bind(blockChain),
    getChain: blockChain.getChain.bind(blockChain),
    events: blockChain.events,
};
