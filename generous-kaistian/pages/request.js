import { useState } from 'react';
import { useRouter } from 'next/router';


export default function Request() {
    const { itemid } = req.query;       // ItemID를 받아와야함 일단. itemID ItemID 대소문자?
    const [amount, setAmount] = useState('');
    const [request, setRequest] = useState('');
    const router = useRouter();

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleRequestChange = (e) => {
        setRequest(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Redirect to another page and pass the email and name via query parameters
        if (typeof window !== 'undefined') {
            router.push(`/api/request-handler?itemid=${itemid}&amount=${amount}&request=${request}`);
        };
    };
  
    return (
        <div>
            <img></img>
            <div>Category:</div>
            <div>Number of Items:</div>
            <div>Description:</div>
            <form>
                <label>Request Amount:</label>
                <input type='number' value={amount} onChange={handleAmountChange} />
                <label>Request:</label>
                <input type='text' value={request} onChange={handleRequestChange} />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}