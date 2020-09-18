const CryptoJS = require("crypto-js");

const helper = {
    CryptoJSAesJson: {
        stringify: function (cipherParams) {
            var j = {a: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
            if (cipherParams.iv) j.b = cipherParams.iv.toString();
            if (cipherParams.salt) j.c = cipherParams.salt.toString();
            return JSON.stringify(j);
        },
        parse: function (jsonStr) {
            var j = JSON.parse(jsonStr);
            var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.a)});
            if (j.b) cipherParams.iv = CryptoJS.enc.Hex.parse(j.b);
            if (j.c) cipherParams.salt = CryptoJS.enc.Hex.parse(j.c);
            return cipherParams;
        }
    },
    decrypt: function(encryptedText){
        if (typeof encryptedText === 'object'){
            encryptedText = JSON.stringify(encryptedText);
        }
        try{
            return JSON.parse(CryptoJS.AES.decrypt(encryptedText, window.je3892bssk39ah893, {format: helper.CryptoJSAesJson}).toString(CryptoJS.enc.Utf8));
        } catch (e) {
            //console.log(e);
        }
    },

    init: function () {

    },

    getMeta: function(metaName) {
        const metas = document.getElementsByTagName('meta');

        for (let i = 0; i < metas.length; i++) {
            if (metas[i].getAttribute('name') === metaName) {
                return metas[i].getAttribute('content');
            }
        }

        return '';
    }

};


// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");
// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time
    if (this.length != array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;
        }
        else if (this[i] != array[i]) {
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;
        }
    }
    return true;
}


export default helper;
