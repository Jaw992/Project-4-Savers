//* All Accounts
export async function allAccountsLoad() {
    const url = `/api/accounts/`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
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
export async function sumLoad() {
  const url = `/api/accounts/sum`;
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
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
export async function accountLoad(id) {
    const url = `/api/accounts/${id}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
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
export async function createAccount(data) {
    const url = `/api/accounts/create`;
    try {
      // const token = localStorage.getItem("authToken");
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
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

    // If successful, return the account data
    const json = await response.json();
    return json.account;
} catch (error) {
    console.error("Error creating account:", error.message);
    throw error;
    }
  }

  //* Delete Accounts
export async function deleteAccount(id) {
    const url = `/api/accounts/delete/${id}`;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${token}`,
            },
        });
        if (!response.ok) {
            const errorResponse = await response.json();

            // Handle specific status codes
            if (response.status === 404) {
                throw new Error(errorResponse.msg || "Account not found.");
            } else if (response.status === 500) {
                throw new Error("Internal server error. Please try again later.");
            } else {
                throw new Error(`Unexpected error: ${response.status}`);
            }
        }

        // If successful, return the success message
        return await response.json();
    } catch (error) {
        console.error("Error deleting account:", error.message);
        throw error; 
    }
}