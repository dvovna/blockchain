import elliptic from 'elliptic';

export default {
    generate: () => {
        const ec = new elliptic.ec('secp256k1');
        const keyPair = ec.genKeyPair();

        return {
            publicKey: keyPair.getPublic('hex'),
            privateKey: keyPair.getPrivate('hex'),
        };
    },
};
