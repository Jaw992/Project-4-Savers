import { useState, useEffect } from "react";
import { useAtomValue } from "jotai";
import { tokenAtom } from "../App";
import { clientLoad } from "../services/apiUsers"; 

import Navbar from "../components/Navbar";
import SaversBar from "../components/SaversBar";
import ClientDetailsCard from "../components/ClientDetailsCard";
import RmDetailsCard from "../components/RmDetailsCard";
import UpdateParticularCard from "../components/UpdateParticularCard";

export default function ClientMainPage() {

    const token = useAtomValue(tokenAtom);
  
    const [client, setClient] = useState([]);
    const [error, setError] = useState(null);
  
    console.log(error);
  
    useEffect(() => {
      async function fetchClient() {
        try {
          const clientData = await clientLoad(token); 
          setClient(clientData[0]); 
        } catch (err) {
          setError(err.message); 
        }
      }
  
      fetchClient();
    }, [token]); 

    return (
        <>
            <SaversBar />
            <Navbar />
            <div className="clientProfile">
                <h1 style={{ textDecoration: 'underline' }}>Profile</h1>
                <div className="twoCards">
                    <ClientDetailsCard client={client}/>
                    <RmDetailsCard/>
                </div>
                <UpdateParticularCard setClient={setClient} token={token}/>
            </div>
        </>
    )
}