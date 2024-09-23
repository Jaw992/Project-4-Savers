import { extractPayload } from "../../utils/jwUtils";

//* User Signup
export async function userSignup(data) {
  const url = `/api/users/signup`; 
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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

//* User Login
export async function userLogin(data) {
  const url = `/api/users/login`; 
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    // localStorage.setItem("authToken", json.token);
    return json.token;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
}

//* All Client Profile
export async function allClientLoad(token) {
    const url = `/api/users/client`;
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

//* Client Profile
export async function clientLoad(token) {
    const id = extractPayload(token)._id;
    const url = `/api/users/client/${id}`;
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

//* Relationship Manager Profile
export async function rmLoad(token) {
    const id = extractPayload(token)._id;
    const url = `/api/users/manager/${id}`;
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