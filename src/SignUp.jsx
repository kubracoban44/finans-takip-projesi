import React, { useState } from "react";
import { TextField, Button, Card, CardContent, Typography, Grid, Box, Container } from "@mui/material";
import {v4 as uuidv4 } from "uuid";
import LoginAppBar from "./LoginAppBar";
import {createUserWithEmailAndPassword}from "firebase/auth";
import { auth } from "./firebase";
const SignUp = () => {
    const [formData, setFormData] = useState({
        id:uuidv4(),
        name: '',
        surname: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({});
    

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validate = () => {
        const errors = {};
        if (!formData.name) {
            errors.name = "İsim gerekli";
        }
        if (!formData.surname) {
            errors.surname = "Soyisim gerekli";
        }
        if (!formData.email) {
            errors.email = "Email gerekli";
        }
        else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            errors.email = 'Geçerli bir e-posta adresi girin';
        }
        if (!formData.username) {
            errors.username = "Kullanıcı Adı gerekli";
        }
        if (!formData.password) {
            errors.password = "Şifre Gerekli";
        }
        else if (formData.password.length < 6) {
            errors.password = "Şifre en az 6 karakterli olmalı";
        }
        if (formData.password !== formData.confirmPassword) {
            errors.confirmPassword = "Şifreler Uyuşmuyor";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        createUserWithEmailAndPassword(auth,formData.email,formData.password)
        .then(()=>{
            alert('you have sign up');
        })
        const validationErrors = validate();
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length == 0) {
            
            const users=JSON.parse(localStorage.getItem("users"))||[];
            users.push(formData);
            localStorage.setItem("users",JSON.stringify(users));
            alert("Kayıt Başarılı");

            console.log('form submited', formData);

            
        }
        
    };

    return (
        <LoginAppBar>
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100vh'
                }}
            >
                <Card>
                    <CardContent>
                        <Typography variant="h5" component="h2" gutterBottom  >SignUp</Typography>
                        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        name="name"
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='name'
                                        label='Name'
                                        autoComplete='name'
                                        autoFocus
                                        value={formData.name}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        name="surname"
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='surname'
                                        label='Surname'
                                        autoComplete='surname'
                                        autoFocus
                                        value={formData.surname}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={2}>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        name="email"
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='email'
                                        label='Email'
                                        autoComplete='email'
                                        autoFocus
                                        value={formData.email}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                                <Grid item xs={6} sm={6}>
                                    <TextField
                                        name="username"
                                        margin='normal'
                                        required
                                        fullWidth
                                        id='username'
                                        label='Username'
                                        autoComplete='username'
                                        autoFocus
                                        value={formData.username}
                                        onChange={(e) => handleChange(e)}
                                    />
                                </Grid>
                            </Grid>

                            <TextField
                                name="password"
                                margin='normal'
                                required
                                fullWidth
                                id='password'
                                label='Password'
                                autoComplete='password'
                                autoFocus
                                value={formData.password}
                                onChange={(e) => handleChange(e)}
                                type="password"
                            />

                            <TextField
                                name="confirmPassword"
                                margin='normal'
                                required
                                fullWidth
                                id='confirmPassword'
                                label='Confirm Password'
                                autoComplete='confirmPassword'
                                autoFocus
                                value={formData.confirmPassword}
                                onChange={(e) => handleChange(e)}
                                type="password"
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                                onClick={handleSubmit}
                            >
                                SAVE
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
        </Container >
        </LoginAppBar>
    )
}
export default SignUp;
