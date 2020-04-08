import blockChain, { ITransaction } from '../blockchain';
import { BlockChainEvents } from '../blockchain/core/BlockChainEvents';

interface IWalletsCache {
    [index: string]: number;
}

class BlockChainService {
    private walletsCache: IWalletsCache = {};

    constructor() {
        blockChain.events.on(BlockChainEvents.ChainUpdated, () => this.updateCache());
    }

    public isWalletExist(walletId: string) {
        return this.walletsCache[walletId] !== undefined;
    }

    public getWalletBalance(walletId: string) {
        return this.walletsCache[walletId];
    }

    private updateCache() {
        blockChain.getChain().forEach((block) => {
            block.transactions.forEach(({ fromAddress, toAddress, amount }: ITransaction) => {
                this.walletsCache[fromAddress] = this.walletsCache[fromAddress]
                    ? this.walletsCache[fromAddress] - amount
                    : amount;
                this.walletsCache[toAddress] = this.walletsCache[toAddress]
                    ? this.walletsCache[toAddress] + amount
                    : amount;
            });
        });
    }
}

export default new BlockChainService();
