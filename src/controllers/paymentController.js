const { SECRET_KEY_STRIPE }  = require("../constants");
const Stripe = require('stripe')(SECRET_KEY_STRIPE);

class PaymentController {
   async sendPayment (req, res) {
       const {amount, description, receipt_email, id, recipientName} = req.body;
       try {
            await Stripe.paymentIntents.create({
                amount: amount,
                currency: "USD",
                description:  `payment for ${description} subscription by ${recipientName}`,
                payment_method: id,
                confirm: true,
                receipt_email: receipt_email
            })
            res.json({
                message: "Successfull payment",
                success: true
            })

        }
        catch(error) {
            console.log("Error ", error);
            res.json({
                message: "Payment failed",
                success: false
            })
        } 
    } 
}

module.exports = new PaymentController();