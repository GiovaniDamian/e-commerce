import { useEffect, useState } from 'react';
import convertToSubcurrency from "../../lib/convertToSubcurrency";

const useFetchPayment = (amount) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/createPaymentIntent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
            })
                
            const result = await response.json();
            setData(result);
        };
        fetchData();
    }, [amount]);

    return data;
};

export default useFetchPayment
