import sha256 from 'crypto-js/sha256';
import Transaction from './Transaction';
import config from '../config';

export interface IBlock {
    transactions: Transaction[];
}

class Block implements IBlock {
    public transactions: Transaction[];
    private hash: string = '';
    private timestamp: number;
    private previousHash: string;
    private nonce: number = 0;

    constructor(timestamp: number, transactions: Transaction[], previousHash: string) {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.transactions = transactions;
    }

    public async build() {
        this.hash = await this.calculateHash();
    }

    public getHash() {
        return this.hash;
    }

    private async calculateHash() {
        let hash = await this.buildHash();
        const difficultyString = new Array<number>(config.difficulty).fill(0).join('');

        while (hash.substr(0, config.difficulty) !== difficultyString) {
            this.nonce = this.nonce + 1;
            hash = await this.buildHash();
        }

        return hash;
    }

    private async buildHash() {
        return sha256(
            this.timestamp +
            this.previousHash +
            this.nonce +
            JSON.stringify(this.transactions),
        ).toString();
    }
}

export default Block;
