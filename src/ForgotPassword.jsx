import React, { useState, useEffect } from 'react';
import { auth } from './firebase';
import { sendPasswordResetEmail } from "firebase/auth";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import HeaderAppBar from './HeaderAppBar';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const handleEmailChange = (e) => {
        setEmail(e.target.value);

    };
    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            if (email) {
                await sendPasswordResetEmail(auth, email);
                alert("Şifre sıfırlama e-postası gönderildi. Lütfen e-posta adresinizi kontrol edin.");
                navigate('/login');
            } else {
                alert("Lütfen geçerli bir e-posta adresi girin.");
            }
        } catch (error) {
            console.error("Şifre sıfırlama hatası: ", error);
            alert("Şifre sıfırlama e-postası gönderilirken bir hata oluştu.");
        }
    }
    return (
        <HeaderAppBar>
            <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Şifre Sıfırlama
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleResetPassword}
                        sx={{ mt: 5, width: '100%' }}
                    >
                        <TextField
                            label="E-posta"
                            value={email}
                            onChange={handleEmailChange}
                            fullWidth
                            required
                            margin="normal"
                            type="email"
                            variant="outlined"
                            InputProps={{
                                style: { backgroundColor: '#f5f5f5' }
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Şifreyi Sıfırla
                        </Button>
                    </Box>
                </Box>
            </Container>
        </HeaderAppBar>

    );
};
export default ForgotPassword;