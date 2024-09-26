import "./css/styles.css";

import { Route, Routes } from "react-router-dom";
import { useAtomValue } from "jotai";
import { atomWithStorage } from "jotai/utils";

import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import RmMainPage from "./pages/RmMainPage";
import ClientMainPage from "./pages/ClientMainPage";
import ClientProfilePage from "./pages/ClientProfilePage";
import ClientTransHistoryPage from "./pages/ClientTransHistoryPage";
import ClientTransactionPage from "./pages/ClientTransactionsPage";
import ClientTransferPage from "./pages/ClientTransferPage";
import RmLoginPage from "./pages/RmLoginPage";
// import Footer from "./components/Footer";


export const tokenAtom = atomWithStorage("token", "");

function App() {

  const token = useAtomValue(tokenAtom);

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/rm-login" element={<RmLoginPage />} />
        {token === "" ? null : (
          <>
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/rm-main" element={<RmMainPage />} />
        <Route path="/client-main" element={<ClientMainPage />} />
        <Route path="/client-profile" element={<ClientProfilePage />} />
        <Route path="/client-history" element={<ClientTransHistoryPage />} />
        <Route path="/client-transactions" element={<ClientTransactionPage />} />
        <Route path="/client-transfers" element={<ClientTransferPage />} />
        </>
        )}
      </Routes>
      {/* <Footer /> */}
    </>
  );
}

export default App;
