import crypto from 'crypto';
import elliptic from 'elliptic';

const ec = new elliptic.ec('secp256k1');

export interface ITransaction {
    amount: number;
    fromAddress: string;
    toAddress: string;
}

export default class Transaction implements ITransaction {
    public amount: number;
    public fromAddress: string;
    public toAddress: string;
    private signature: string | null = null;
    private timestamp: number;

    constructor(fromAddress: string, toAddress: string, amount: number, privateKey: string) {
        if (!fromAddress || !toAddress || !privateKey) {
            throw new Error('Transaction can\'t be created!');
        }

        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
        this.timestamp = Date.now();

        this.sign(privateKey);
    }

    private sign(privateKey: string) {
        const key = ec.keyFromPrivate(privateKey);
        if (this.fromAddress !== key.getPublic('hex')) {
            throw new Error('Wallet access error.');
        }

        const transactionHash = this.calculateHash();
        this.signature = key.sign(transactionHash, 'base64')
            .toDER('hex');
    }

    private calculateHash() {
        return crypto.createHash('sha256')
            .update(this.fromAddress
                + this.toAddress
                + this.amount
                + this.timestamp,
            ).digest('hex');
    }
}
