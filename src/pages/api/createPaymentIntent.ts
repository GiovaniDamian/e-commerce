
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function POST(req, res) {
    const { amount, usuario } = req.body;

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'brl',
        });

        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
