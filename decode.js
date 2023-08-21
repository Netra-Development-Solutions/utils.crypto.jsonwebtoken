const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function decodeJWT(token, secret) {
    return jwt.verify(token, secret, { algorithms: process.env.JWT_ALGORITHM });
}

function aesGcmDecrypt(encryptedData, key, iv) {
    const descryptArray = encryptedData.split('.');
    const authTag = descryptArray[1];
    encryptedData = descryptArray[0];

    const decipher = crypto.createDecipheriv(process.env.ENCRYPTION_ALGORITHM, key, iv);
    decipher.setAuthTag(Buffer.from(authTag, 'hex'));
    const decrypted = Buffer.concat([decipher.update(Buffer.from(encryptedData, 'hex')), decipher.final()]);
    return decrypted.toString('utf-8');
}

function decode (token, key = process.env.AES_GCM_ENCRYPTION_KEY, secret = process.env.JWT_TOKEN_SECRET, iv = process.env.AES_GCM_ENCRYPTION_IV) {
    key = Buffer.from(key, 'hex');
    iv = Buffer.from(iv, 'hex');

    const decrypted = aesGcmDecrypt(token, key, iv);
    return decodeJWT(decrypted, secret);
}

module.exports = decode;