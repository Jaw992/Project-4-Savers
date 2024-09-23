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
        const errorResponse = await response.json();
        
        // Handle specific status codes
        if (response.status === 400) {
          throw new Error(errorResponse.message || "User already exists.");
        } else if (response.status === 500) {
          throw new Error(errorResponse.error || "Internal server error.");
        } else {
          throw new Error(`Unexpected error: ${response.status}`);
        }
      }
  
      // If successful, return token
      const json = await response.json();
      return json.token;
    } catch (error) {
      // Log and re-throw error for further handling
      console.error("Signup error:", error.message);
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
        const errorResponse = await response.json();
        
        // Handle specific status codes
        if (response.status === 401) {
          throw new Error(errorResponse.error || "Invalid username or password.");
        } else if (response.status === 500) {
          throw new Error(errorResponse.error || "Internal server error.");
        } else {
          throw new Error(`Unexpected error: ${response.status}`);
        }
      }
  
      // If successful, return token
      const json = await response.json();
      return json.token;
    } catch (error) {
      // Log and re-throw error for further handling
      console.error("Login error:", error.message);
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
        const errorResponse = await response.json();
  
        // Handle specific status codes
        if (response.status === 401) {
          throw new Error("Unauthorized access. Invalid or expired token.");
        } else if (response.status === 404) {
          throw new Error(errorResponse.message || "No clients found.");
        } else if (response.status === 500) {
          throw new Error("Internal server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.status}`);
        }
      }
  
      // If successful, return the list of clients
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error loading clients:", error.message);
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
        const errorResponse = await response.json();
  
        // Handle specific status codes
        if (response.status === 404) {
          throw new Error(errorResponse.message || "Client not found.");
        } else if (response.status === 500) {
          throw new Error("Internal server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.status}`);
        }
      }
  
      // If successful, return the client data
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error loading client:", error.message);
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
        const errorResponse = await response.json();
  
        // Handle specific status codes
        if (response.status === 404) {
          throw new Error(errorResponse.message || "Relationship Manager not found.");
        } else if (response.status === 500) {
          throw new Error("Internal server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.status}`);
        }
      }
  
      // If successful, return the manager data
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error loading relationship manager:", error.message);
      throw error;
  }
}

//* Update particulars of client
export async function updateUserParticulars(token, id, data) {
    const url = `/api/update-particulars/${id}`;
    try {
      const response = await fetch(url, {
        method: "PUT",
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
          throw new Error(errorResponse.message || "Invalid input data.");
        } else if (response.status === 500) {
          throw new Error("Internal server error. Please try again later.");
        } else {
          throw new Error(`Unexpected error: ${response.status}`);
        }
      }
  
      // If successful, return the updated user data
      const json = await response.json();
      return json;
    } catch (error) {
      console.error("Error updating user particulars:", error.message);
      throw error; 
    }
  }