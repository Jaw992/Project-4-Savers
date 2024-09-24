import NavbarRm from "../components/NavbarRm";
import TableList from "../components/RmTableList";
import CreateCard from "../components/RmCreateAccount";

export default function RmMainPage() {

    return (
        <>
            <NavbarRm />
            <div className="rmPages">
                <TableList />
                <CreateCard />
            </div>
        </>
    );
}