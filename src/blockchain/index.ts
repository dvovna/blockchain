import blockChain from './BlockChain';
import { IBlock } from './core/Block';
import { ITransaction } from './core/Transaction';

export { IBlock, ITransaction };

export default {
    events: blockChain.events,
    getChain: blockChain.getChain.bind(blockChain),
    createTransaction: blockChain.addTransaction.bind(blockChain),
};
