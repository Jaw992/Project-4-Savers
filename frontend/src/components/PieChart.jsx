import { useEffect, useState } from 'react';
import { useAtomValue } from 'jotai';
import { tokenAtom } from '../App';
import { Chart } from "react-google-charts";

import { transactionSummary } from '../services/apiTransactions'; 

const options = {
    title: "Savings Plan",
    titleTextStyle: {
        fontSize: 30,  
        bold: true, 
    },
    pieHole: 0.4,
    is3D: false,
    fontSize: 15,
    colors: ["#d35050", "#067c1c", "#ffcc00", "#ff6600", "#ff9900", "#3399ff", "#00cc99"],
    backgroundColor: "transparent",
    chartArea: {
        left: 20, // Spacing from the left
        top: 70,  // Spacing from the top
        width: "100%",  // Chart area width
        height: "100%", // Chart area height
    },
};

export default function PieChart() {
    
    const token = useAtomValue(tokenAtom);
    const [summary, setSummary] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSummary = async () => {
            try {
                const data = await transactionSummary(token);
                setSummary(data[0]);
            } catch (error) {
                setError(error.message); 
            }
        };

        fetchSummary();
    }, [token]);

    // Handle loading state
    if (!summary && !error) {
        return <div>Loading...</div>; // Show a loading message while fetching data
    }

    // Handle error state
    if (error) {
        return <div>Error: {error}</div>; // Display error message
    }

    console.log("summary:", summary.total_deposit_savings);

    // Extract values for the pie chart from the summary
    const data = [
        ["Category", "Amount"],
        ["Savings", parseFloat(summary.total_deposit_savings) || 0],
        ["Food Withdrawals", parseFloat(summary.total_withdrawal_food) || 0],
        ["Entertainment Withdrawals", parseFloat(summary.total_withdrawal_entertainment) || 0],
        ["Shopping Withdrawals", parseFloat(summary.total_withdrawal_shopping) || 0],
        ["Payments Withdrawals", parseFloat(summary.total_withdrawal_payments) || 0],
        ["Internal Transfers", parseFloat(summary.total_transfer_internal) || 0],
        ["External Transfers", parseFloat(summary.total_transfer_external) || 0],
    ];

    console.log("data:", data);

    return (
        <>
            <div className="piechart">
                <Chart
                    chartType="PieChart"
                    width="500px"
                    height="400px"
                    data={data}
                    options={options}
                />
            </div>
        </>
    );
}