import Navbar from "../components/Navbar"
import ClientDetailsCard from "../components/ClientDetailsCard"
import RmDetailsCard from "../components/RmDetailsCard"
import UpdateParticularCard from "../components/UpdateParticularCard"

export default function ClientMainPage() {

    return (
        <>
            <Navbar />
            <div className="clientProfile">
                <h1>My Profile</h1>
                <div className="twoCards">
                    <ClientDetailsCard />
                    <RmDetailsCard/>
                </div>
                <UpdateParticularCard />
            </div>
        </>
    )
}