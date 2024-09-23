import Navbar from "../components/Navbar";
import TransactionCard from "../components/TransactionCard";

export default function ClientTransactionPage() {

    return (
        <>
            <Navbar />
            <div className="clientPages">
                <TransactionCard />
            </div>
        </>
    )
}