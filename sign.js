const crypto = require('crypto');
const jwt = require('jsonwebtoken');

function generateJWT(payload, secret, expiresIn='1d') {
    if (typeof payload !== 'object') {
        return jwt.sign(payload, secret, { algorithm: process.env.JWT_ALGORITHM });
    }
    return jwt.sign(payload, secret, { algorithm: process.env.JWT_ALGORITHM, expiresIn });
}

function aesGcmEncrypt(data, key, iv) {
    const cipher = crypto.createCipheriv(process.env.ENCRYPTION_ALGORITHM, key, iv);
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return {
        encryptedData: encrypted.toString('hex'),
        authTag: cipher.getAuthTag().toString('hex')
    };
}

function sign (payload, key = process.env.AES_GCM_ENCRYPTION_KEY, secret = process.env.JWT_TOKEN_SECRET, iv = process.env.AES_GCM_ENCRYPTION_IV, expiresIn) {
    key = Buffer.from(key, 'hex');
    iv = Buffer.from(iv, 'hex');

    const token = generateJWT(payload, secret, expiresIn);
    const encrypted = aesGcmEncrypt(token, key, iv);

    return encrypted.encryptedData + '.' + encrypted.authTag;
}

module.exports = sign;