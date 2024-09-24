import { useState, useEffect } from "react";
// import { useAtomValue } from "jotai";
// import { tokenAtom } from "../App"; 
import { updateUserParticulars } from "../services/apiUsers";
import { extractPayload, isValidToken } from "../utils/jwUtils";

import { Container, Box, TextField, Paper, Button, Typography } from '@mui/material';

export default function UpdateParticularCard({ setClient, token}) {
    // const token = useAtomValue(tokenAtom); 

    const [formData, setFormData] = useState({ 
        name: "", 
        email: "", 
        contact: "", 
    });
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [id, setId] = useState(''); 

    useEffect(() => {
        if (token && isValidToken(token)) {
            const payload = extractPayload(token);
            setId(payload.id);
        }
    }, [token]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value, 
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setSuccess(false);

        // Filter out empty fields from formData before sending to backend
        const updatedData = Object.fromEntries(
            Object.entries(formData).filter(([key, value]) => value.trim() !== "")
        );

        if (Object.keys(updatedData).length === 0) {
            setError("Please fill out at least one field to update.");
            return;
        }

        try {
            console.log(updatedData);
            const updatedParts = await updateUserParticulars(token, id, updatedData); 
            setClient(updatedParts)
            setSuccess(true); 
        } catch (err) {
            setError(err.message || "Failed to update particulars.");
        }
    };

    return (
        <Container maxWidth='sm'>
            <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Paper elevation={10} sx={{ padding: 6 }}>
                    <Typography variant='h6' sx={{ fontWeight: 500 }}>Update Particulars</Typography>
                    
                    {error && <Typography color="error">{error}</Typography>}
                    {success && <Typography color="success">Particulars updated successfully!</Typography>}

                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="name"
                            label="Name"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="email"
                            label="Email"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </Box>
                    <Box sx={{ marginBottom: 2 }}>
                        <TextField
                            id="contact"
                            label="Contact Number"
                            fullWidth
                            margin="dense"
                            variant="outlined"
                            type="text"
                            name="contact"
                            value={formData.contact}
                            onChange={handleChange}
                        />
                    </Box>
                    <Button
                        size='large'
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Update
                    </Button>
                </Paper>
            </Box>
        </Container>
    );
}