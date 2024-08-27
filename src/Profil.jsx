import React, { useEffect, useState } from "react";
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { onAuthStateChanged, updatePassword, EmailAuthProvider, reauthenticateWithCredential, sendPasswordResetEmail } from "firebase/auth";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HeaderAppBar from "./HeaderAppBar";
import { useNavigate } from "react-router-dom";


const Profil = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        currentPassword: ""
    });
    const [user, setUser] = useState(null);
    const [resetEmail, setResetEmail] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                const docRef = doc(db, "users", currentUser.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setFormData(docSnap.data());
                }
            } else {
                setUser(null);
            }
        });

        return () => {
            unsubscribe();
        }
    }, []);


    const handleChange = (e) => {

        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };
    const handleResetEmailChange = (e) => {
        setResetEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (user) {
            try {
                // Kullanıcı profili güncelleme
                const userRef = doc(db, "users", user.uid);
                await setDoc(userRef, formData, { merge: true });

                // Şifre güncelleme
                if (formData.password && formData.currentPassword) {
                    const credential = EmailAuthProvider.credential(user.email, formData.currentPassword);
                    await reauthenticateWithCredential(user, credential);
                    await updatePassword(user, formData.password);
                }

                console.log("Profil güncellendi");
                navigate('/login');
            } catch (error) {
                console.error("Profil güncelleme hatası: ", error);
                alert("Profil güncellenirken bir hata oluştu. Lütfen bilgilerinizi kontrol edin ve tekrar deneyin.");
            }
        }

    };
    const handleResetPassword = async () => {
        try {
            if (resetEmail) {
                await sendPasswordResetEmail(auth, resetEmail);
                alert("Şifre sıfırlama e-postası gönderildi. Lütfen e-posta adresinizi kontrol edin.");
                setResetEmail("");
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
                        Profil Düzenleme
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ mt: 5, width: '100%' }}
                    >
                        <TextField
                            label="Adınız"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            variant="outlined"
                            InputProps={{
                                style: { backgroundColor: '#f5f5f5' }

                            }}
                        />
                        <TextField
                            label="E-posta"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                            margin="normal"
                            type="email"

                            variant="outlined"
                            InputProps={{
                                style: { backgroundColor: '#f5f5f5' }

                            }}
                        />
                        <TextField
                            label="Mevcut Şifre"
                            name="currentPassword"
                            value={formData.currentPassword}
                            onChange={handleChange}
                            fullWidth
                            required={!!formData.password}
                            margin="normal"
                            type="password"
                            variant="outlined"
                            InputProps={{
                                style: { backgroundColor: '#f5f5f5' }

                            }}
                        />
                        <TextField
                            label="Yeni Şifre"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            margin="normal"
                            type="password"
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
                            Güncelle
                        </Button>

                    </Box>
                    <Box sx={{ mt: 5, width: '100%' }}>
                        <Typography variant="h6" component="h2" gutterBottom>

                        </Typography>
                        <Typography
                            variant="body1"
                            component="p"
                            sx={{ cursor: 'pointer', color: 'primary.main' }}
                            onClick={() => {
                                navigate('/ForgotPassword');
                            }}
                        >
                            Şifremi Unuttum
                        </Typography>



                    </Box>
                </Box>
            </Container>




        </HeaderAppBar>
    );
};
export default Profil;