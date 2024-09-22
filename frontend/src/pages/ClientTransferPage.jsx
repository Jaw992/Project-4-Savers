import SaversBar from "../components/SaversBar";
import Navbar from "../components/Navbar";
import TransferCard from "../components/TransferCard";

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