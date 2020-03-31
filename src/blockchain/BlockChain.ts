import Transaction from './core/Transaction';
import Block from './core/Block';
import config from './config';
import {BlockChainEvents} from './core/BlockChainEvents';
import { EventEmitter } from 'events';

const GENESIS_BLOCK_HASH = 'GENESIS';

class BlockChain {
    public events: EventEmitter = new EventEmitter();
    private chain: Block[] = [this.getGenesisBlock()];
    private pendingTransactions: Transaction[] = [];

    public async mineBlock(transactions: Transaction[]) {
        const timeStamp = new Date().getTime();
        const nextBlock = new Block(timeStamp, transactions, this.getPreviousHash());
        await nextBlock.build();

        this.chain.push(nextBlock);
        this.events.emit(BlockChainEvents.ChainUpdated, { chain: this.chain });
    }

    public getChain() {
        return this.chain.concat([]);
    }

    public addTransaction(fromAddress: string, toAddress: string, amount: number, privateKey: string) {
        const transaction = new Transaction(fromAddress, toAddress, amount, privateKey);
        this.pendingTransactions.push(transaction);
        this.events.emit(BlockChainEvents.TransactionAdded, { transaction });

        if (this.pendingTransactions.length >= config.maxPendingTransactionCount) {
            this.mineBlock(this.pendingTransactions);
            this.pendingTransactions = [];
        }
    }

    private getPreviousHash() {
        const previousBlock = this.chain[this.chain.length - 1];
        return previousBlock.getHash();
    }

    private getGenesisBlock() {
        return new Block(0, [], GENESIS_BLOCK_HASH);
    }
}

export default new BlockChain();
