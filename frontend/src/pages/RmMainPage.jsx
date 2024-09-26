import { useAtomValue } from "jotai";
import { tokenAtom } from "../App";
import { useState, useEffect } from 'react';
import { getRmTable } from "../services/apiAccounts";

import NavbarRm from "../components/NavbarRm";
import TableList from "../components/RmTableList";
import CreateCard from "../components/RmCreateAccount";
import CloseAccountCard from "../components/RmCloseAccount";
import SaversBar from "../components/SaversBar";

export default function RmMainPage() {

    const token = useAtomValue(tokenAtom);

    const [getList, setGetList] = useState([]);
    const [error, setError] = useState(null);

    console.log(error);

    useEffect(() => {
        const fetchTableData = async () => {
            try {
                const data = await getRmTable(token);  
                setGetList(data);  
            } catch (err) {
                console.error('Error fetching RM table data:', err.message);
                setError('Failed to fetch data. Please try again later.');
            }
        };
    
        fetchTableData();
    }, [token]);

    return (
        <>
            <SaversBar />
            <NavbarRm />
            <div className="rmPages">
                <TableList getList={getList} token={token}/>
            </div>
            <div className="rmCards">
                <CreateCard setGetList={setGetList} token={token}/>
                <CloseAccountCard setGetList={setGetList} token={token}/>
            </div>
        </>
    );
}