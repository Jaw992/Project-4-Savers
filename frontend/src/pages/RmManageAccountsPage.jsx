import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import Button from '@mui/material/Button';

import NavbarRm from "../components/NavbarRm";
import AccountsTable from "../components/RmAccountsTable";
import CreateCard from "../components/RmCreateAccount";

export default function RmManageAccountsPage() {

    return (
        <>
            <NavbarRm />
            <ArrowBackIosNewIcon color='primary'/>
            <Button href='/rm-main'>Back</Button>
            <div className="rmPages">
                <AccountsTable />
                <CreateCard />
            </div>
        </>
    );
}