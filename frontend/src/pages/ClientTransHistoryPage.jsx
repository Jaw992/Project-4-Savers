import Navbar from "../components/Navbar"
import HistoryCard from "../components/HistoryCard"

export default function ClientTransHistoryPage() {

    return (
        <>
            <Navbar />
            <div className="clientMain">
                <h1>Transaction History</h1>
                <HistoryCard />
            </div>
        </>
    )
}