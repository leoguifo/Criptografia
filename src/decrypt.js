const fs = require('fs');
const crypto = require('crypto');

const alg = 'aes-256-ctr';
const passwd = 'abcdabcd';

module.exports = decrypt = () => {
    const read = fs.createReadStream('output.crypt');
    const write = fs.createWriteStream('decrypted.txt');
    const cipher = crypto.createDecipher(alg, passwd);

    read.pipe(cipher).pipe(write);
};