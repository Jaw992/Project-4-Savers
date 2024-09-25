import Navbar from "../components/Navbar";
import HistoryCard from "../components/HistoryCard";
import SaversBar from "../components/SaversBar";

export default function ClientTransHistoryPage() {

    return (
        <>
            <SaversBar />
            <Navbar />
            <div className="clientMain">
                <h1>Transaction History</h1>
                <HistoryCard />
            </div>
        </>
    )
}