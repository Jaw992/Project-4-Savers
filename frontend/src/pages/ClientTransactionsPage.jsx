import Navbar from "../components/Navbar";
import TransactionCard from "../components/TransactionCard";
import SaversBar from "../components/SaversBar";

export default function ClientTransactionPage() {

    return (
        <>
            <SaversBar />
            <Navbar />
            <div className="clientPages">
                <TransactionCard />
            </div>
        </>
    )
}