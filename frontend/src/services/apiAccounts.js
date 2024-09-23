//* All Accounts
export async function allAccountsLoad(token) {
    const url = `/api/accounts/`;
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
    const url = `/api/accounts/${id}`;
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
export async function contractorProjectDetails(data, token) {
    const url = `/api/accounts/create`;
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
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      return json.token;
    } catch (error) {
      console.error(error.message);
      throw error;
    }
  }