import { extractPayload } from "../utils/jwUtils";
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

//* Get All transaction history
export async function allTransactions(token) {
    const user_id = extractPayload(token).id;
    const url = `${BACKEND_URL}/api/transactions/history/${user_id}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json();

            // Handle specific status codes
            if (response.status === 404) {
                throw new Error(errorResponse.message || "No transactions found.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else {
                throw new Error(`Unexpected error: ${response.status}`);
            }
        }
        const json = await response.json();
        return json; 
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
        throw error;
    }
}

//* Get a single transaction
export async function fetchTransactionById(id, token) {
    const url = `${BACKEND_URL}/api/transactions/${id}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json();

            // Handle specific status codes
            if (response.status === 404) {
                throw new Error(errorResponse.message || "Transaction not found.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else {
                throw new Error(`Unexpected error: ${response.status}`);
            }
        }
        const json = await response.json();
        return json; 
    } catch (error) {
        console.error("Error fetching transaction:", error.message);
        throw error; 
    }
}

//* Deposit and Withdrawal Type Transactions
export async function createTransaction(data, token) {
    const url = `${BACKEND_URL}/api/transactions/newtransaction`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorResponse = await response.json();

            // Handle specific status codes
            if (response.status === 404) {
                throw new Error(errorResponse.error || "Account not found.");
            } else if (response.status === 400) {
                throw new Error(errorResponse.error || "Insufficient funds.");
            } else if (response.status === 500) {
                throw new Error("Transaction failed.");
            } else {
                throw new Error(`Unexpected error: ${response.status}`);
            }
        }
        const json = await response.json();
        return json; 
    } catch (error) {
        console.error("Error creating transaction:", error.message);
        throw error;
    }
}

//* Transfer Type Transactions
export async function createTransfer(data, token) {
    const url = `${BACKEND_URL}/api/transactions/transfer`;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            const errorResponse = await response.json();

            // Handle specific status codes
            if (response.status === 404) {
                if (errorResponse.error.includes('Sender account not found')) {
                    throw new Error("Sender account does not exist.");
                } else if (errorResponse.error.includes('Receiver account not found')) {
                    throw new Error("Receiver account does not exist.");
                }
            } else if (response.status === 400) {
                if (errorResponse.error.includes('Sender and receiver accounts cannot be the same')) {
                    throw new Error("You cannot transfer money to the same account.");
                } else if (errorResponse.error.includes('Insufficient funds in sender account')) {
                    throw new Error("Insufficient funds.");
                }
            } else if (response.status === 500) {
                throw new Error("Transfer transaction failed.");
            } else {
                throw new Error(`Unexpected error: ${response.status}`);
            }
        }
        const json = await response.json();
        return json; 
    } catch (error) {
        console.error("Error creating transfer transaction:", error.message);
        throw error;
    }
}

//* Get Transaction Summary for piechart
export async function transactionSummary(token) {
    const user_id = extractPayload(token).id;
    const url = `${BACKEND_URL}/api/transactions/summary/${user_id}`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json();

            // Handle specific status codes
            if (response.status === 404) {
                throw new Error(errorResponse.message || "No transaction summary found for this user.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else {
                throw new Error(`Unexpected error: ${response.status}`);
            }
        }
        const json = await response.json();
        return json; 
    } catch (error) {
        console.error("Error fetching transactions:", error.message);
        throw error;
    }
}