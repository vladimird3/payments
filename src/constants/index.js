const API_VERSION = process.env.API_VERSION || 'v0';
const PORT = process.env.PORT || '6050';

SECKRET_KEY_STRIPE = process.env.SECKRET_KEY_STRIPE || sk_test_51KkGRhEHYLtoSVGryaCU6EDiqQpz9lVK37tjg7nVxLWtxIIzN6Jh0Nu7hbMJgsj6welIDUOWgwOOzBSwOtiRtY2c002YQrYncj; 

DOMAIN_VERIFICATION_PATH=process.env.DOMAIN_VERIFICATION_PATH || 'domain_verification'; 
DOMAIN_VERIFICATION_FILE=process.env.DOMAIN_VERIFICATION_FILE || 'cert.p12';

APPLE_PAY_MERCHANT = {
    "merchantIdentifier": "merchant.io.ilivemylife.app",
    "displayName": "iLiveMyLife",
    "initiative": "web",
    "initiativeContext": "app.ilivemylife.io"
};

module.exports = {
    API_VERSION,
    PORT,
    SECKRET_KEY_STRIPE,
    DOMAIN_VERIFICATION_PATH,
    DOMAIN_VERIFICATION_FILE,
    APPLE_PAY_MERCHANT
}