import Navbar from "../components/Navbar";
import TransferCard from "../components/TransferCard";
import SaversBar from "../components/SaversBar";

export default function ClientTranferPage() {

    return (
        <>
            <SaversBar />
            <Navbar />
            <div className="clientPages">
                <TransferCard />
            </div>
        </>
    )
}