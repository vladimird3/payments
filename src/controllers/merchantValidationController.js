const axios = require("axios");
const appRoot  = require("app-root-path");
const fs  = require('fs');

const { DOMAIN_VERIFICATION_PATH, DOMAIN_VERIFICATION_FILE, APPLE_PAY_MERCHANT }  = require("../constants");

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

    async getMerchantSession(req, res, next) {
        const { url } = req.body;
        console.log("url", url);
        console.log('APPLE_PAY_MERCHANT', APPLE_PAY_MERCHANT);
        return axios.post(
            url,
            APPLE_PAY_MERCHANT
        ).then(response => {
            console.log("Merchant Validation Session");
            console.log(response);
            return res.json(JSON.stringify(response));
        }).catch(error => {
            console.log("Merchant Validation Request FAILED");
            console.log(error.message);
            return res.json(JSON.stringify({"Error": error.message}));
        });
    }
}

module.exports = new MerchantValidationController();