var CryptoJS = require('crypto-js');

const encryptString = (data) => {
    let encrypted = CryptoJS.AES.encrypt(data, process.env.CRYPTO_SECRET_PHRASE);
    return encrypted;
}

const decryptString = (data) => {
    let decrypted = CryptoJS.AES.decrypt(data, process.env.CRYPTO_SECRET_PHRASE).toString(CryptoJS.enc.Utf8);
    return decrypted;
}

module.exports = {
    encryptString,
    decryptString
}