const bip32 = require('bip32');
const bip39 = require('bip39');
const bitcoin = require('bitcoinjs-lib');
const { validate } = require('bitcoin-address-validation');

// define the network
const network = bitcoin.networks.testnet;

// derive HD wallet from mnemonic (using BIP39)
const path = `m/49'/1'/0'/0`;

// create mnemonic words for HD wallet seed (passphrase)
let mnemonic = bip39.generateMnemonic();
const seed = bip39.mnemonicToSeedSync(mnemonic);

// create HD wallet root
let root = bip32.fromSeed(seed, network);

// create HD wallet account
let account = root.derivePath(path);
let node = account.derive(0).derive(0);

// create a bitcoin wallet address
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network
}).address;

console.log("Wallet created!");
console.log("wallet address: " + btcAddress);
console.log("Private key: " + account.toWIF());
console.log("Seed: " + mnemonic);

// Validate the Bitcoin testnet address
console.log("Validating address...");
if (validate(btcAddress, 'testnet')) {
  console.log("Address is a valid Bitcoin testnet address.");
} else {
  console.log("Address is not a valid Bitcoin testnet address.");
};
