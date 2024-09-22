import SaversBar from "../components/SaversBar";
import Navbar from "../components/Navbar";
import TransactionCard from "../components/TransactionCard";

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