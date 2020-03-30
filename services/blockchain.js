import sha256 from 'crypto-js/sha256';

class Blockchain {
    constructor() {
        this.chain = [];
    }

    getGenesisBlock() {
        return new Block();
    }

    mineBlock() {

    }
}

class Block {
    constructor(timestamp, transactions, previousHash = '') {
        this.timestamp = timestamp;
        this.previousHash = previousHash;
        this.transactions = transactions;
        this.nonce = 0;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return sha256(
            this.timestamp,
            this.previousHash,
            this.hash,
            this.nonce,
            JSON.stringify(this.transactions),
        ).toString();
    }
}

class Transaction {
    constructor(fromAddress, toAddress, amount) {
        this.fromAddress = fromAddress;
        this.toAddress = toAddress;
        this.amount = amount;
    }
}
