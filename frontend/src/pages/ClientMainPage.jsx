import Navbar from "../components/Navbar"
import SummaryCard from "../components/SummaryCard"
import AccountsCard from "../components/AccountsCard"
import PieChart from "../components/PieChart"

export default function ClientMainPage() {

    return (
        <>
            <Navbar />
            <div className="clientMain">
                <h1>Client Main Page </h1>
                <div className="pieAndsummary">
                <PieChart />
                <SummaryCard />
                </div>
                <AccountsCard />
            </div>
        </>
    )
}