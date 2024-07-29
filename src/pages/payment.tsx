"use client";

import CheckoutPage from "../components/payment/CheckoutPage";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import useAppData from '../data/hook/useAppData'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import route from 'next/router';
import useAuth from "../data/hook/useAuth";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
    throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
    const { cart } = useAppData()
    const { usuario } = useAuth();
    function home() {
        route.push('/')
    }
    const amount = cart?.totalPrice ? parseFloat(cart.totalPrice.toFixed(2)) : 0;

    return (
        <main className="text-center flex-row h-screen bg-zinc-400">
            <div className='text-gray-500 text-xs flex p-2' >
                <button onClick={home}><FontAwesomeIcon icon={faArrowLeft} /> Voltar</button>
            </div>
            <div className="mb-10">
                <h1 className="text-4xl font-extrabold mb-2">Olá novamente, {usuario?.name}!</h1>
                <h2 className="text-sm">
                    Esta é a seção de pagamento, adicione um cartão de crédito à sua carteira e prossiga com a seleção do método.
                </h2>
                <div className="mt-2 font-bold">Valor de sua compra: ${amount}</div>
            </div>
            <div className="flex justify-center">
                <div className="border border-gray-700 border-4 rounded-lg">
                    <Elements
                        stripe={stripePromise}
                        options={{
                            mode: "payment",
                            amount: convertToSubcurrency(amount),
                            currency: "usd",
                        }}
                    >
                        <CheckoutPage amount={amount} />
                    </Elements>
                </div>
            </div>
        </main>
    );
}
