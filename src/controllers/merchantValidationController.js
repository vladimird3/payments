// const axios = require("axios");
const appRoot = require('app-root-path');
const fs = require('fs');

const { DOMAIN_VERIFICATION_PATH, DOMAIN_VERIFICATION_FILE } = require("../constants");

class MerchantValidationController {
    async getDomainVerificationFile (req, res, next) {
        const file = `${appRoot}/${DOMAIN_VERIFICATION_PATH}/${DOMAIN_VERIFICATION_FILE}`;
        try {
            fs.statSync(file);
            return res.download(file);
        } catch(e) {
            console.log(`Error: File ${file} doesn't exist`);
        }
    
        return res.json("Error: File is not found")
    }    
}

module.exports = new MerchantValidationController();