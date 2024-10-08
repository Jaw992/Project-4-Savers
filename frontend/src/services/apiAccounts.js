import { extractPayload } from "../utils/jwUtils";
const BACKEND_URL = import.meta.env.VITE_EXPRESS_BACKEND_URL;

//* All Accounts
export async function allAccountsLoad(token) {
    const user_id = extractPayload(token).id;
    const url = `${BACKEND_URL}/api/accounts/${user_id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error.message);
      throw error;
  }
}

//* All Accounts for Rm Table
export async function getRmTable(token) {
  const manager_id = extractPayload(token).id;
  const url = `${BACKEND_URL}/api/accounts/rmtable/${manager_id}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

//* Get all accounts and total balance for a specific user
export async function sumLoad(token) {
  const user_id = extractPayload(token).id;
  const url = `${BACKEND_URL}/api/accounts/sum/${user_id}`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.log(error.message);
    throw error;
}
}

//* Get Single Account 
export async function accountLoad(id, token) {
    const url = `${BACKEND_URL}/api/accounts/${id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json;
    } catch (error) {
      console.log(error.message);
      throw error;
  }
}

//* Create Accounts
export async function createAccount(data, token) {
    const manager_id = extractPayload(token).id;
    const url = `${BACKEND_URL}/api/accounts/create/${manager_id}`;
    try {
      // const token = localStorage.getItem("authToken");
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
        if (response.status === 400) {
            throw new Error(errorResponse.error || "Account number already exists.");
        } else if (response.status === 500) {
            throw new Error("Internal server error. Please try again later.");
        } else {
            throw new Error(`Unexpected error: ${response.status}`);
        }
    }
    const json = await response.json();
    return json.account;
} catch (error) {
    console.error("Error creating account:", error.message);
    throw error;
    }
  }

//* Close Accounts (To formula Delete function)
export async function closeAccount(account_number, token) {
  const url = `${BACKEND_URL}/api/accounts/update-status`;
  try {
      const response = await fetch(url, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ account_number }),
      });

      if (!response.ok) {
          const errorResponse = await response.json();

          // Handle specific status codes
          if (response.status === 404) {
              throw new Error(errorResponse.msg || "Account not found.");
          } else if (response.status === 400) {
              throw new Error(errorResponse.msg || "Bad request. Please check the input.");
          } else if (response.status === 500) {
              throw new Error("Internal server error. Please try again later.");
          } else {
              throw new Error(`Unexpected error: ${response.status}`);
          }
      }
      return await response.json();
  } catch (error) {
      console.error("Error updating account status:", error.message);
      throw error; 
  }
}

//* Delete Accounts
// export async function deleteAccount(token) {
//   const url = `/api/accounts/delete`;
//   try {
//       const response = await fetch(url, {
//           method: "DELETE",
//           headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`,
//           },
//       });
//       if (!response.ok) {
//           const errorResponse = await response.json();

//           // Handle specific status codes
//           if (response.status === 404) {
//               throw new Error(errorResponse.msg || "Account not found.");
//           } else if (response.status === 500) {
//               throw new Error("Internal server error. Please try again later.");
//           } else {
//               throw new Error(`Unexpected error: ${response.status}`);
//           }
//       }
//       return await response.json();
//   } catch (error) {
//       console.error("Error deleting account:", error.message);
//       throw error; 
//   }
// }