import { useState } from 'react';
import { TextField, Button, Card, CardContent, Typography, Container, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import LoginAppBar from './LoginAppBar';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';
import firebase from 'firebase/compat/app';


const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };
    const validate = () => {
        const errors = {};
        if (!formData.email) {
            errors.email = "E-mail gerekli";
        }
        if (!formData.password) {
            errors.password = "Şifre gerekli";
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (false) {

            const validationErrors = validate();
            setErrors(validationErrors);
            if (Object.keys(validationErrors).length === 0) {
                const users = JSON.parse(localStorage.getItem("users")) || [];
                const user = users.find(
                    (user) =>
                        user.email === formData.email &&
                        user.password === formData.password
                );

                if (user) {

                    localStorage.setItem("currentUser", JSON.stringify(user));
                    setSuccessMessage("Giriş başarılı! Dashboard'a yönlendiriliyorsunuz...");
                    setErrorMessage("");
                    console.log("User logged in", user);


                    setTimeout(() => {
                        window.location.href = "/dashboard"; // Dashboard'a yönlendirme
                    }, 1000);
                } else {

                    setErrorMessage("Kullanıcı adı veya şifre hatalı.");
                    setSuccessMessage("");
                }
            }
        }
        else {
            signInWithEmailAndPassword(auth, formData.email, formData.password)
                .then((response) => {
                    localStorage.setItem("currentUser", JSON.stringify(response.user));
                    setTimeout(() => {
                        window.location.href = "/dashboard"; // Dashboard'a yönlendirme
                    }, 1000);

                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
        }



    }






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
                            <Typography variant='h5' component="h2" gutterBottom>Login</Typography>
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='email'
                                    label='email'
                                    name='email'
                                    autoComplete='email'
                                    autoFocus
                                    value={formData.email}
                                    onChange={handleChange}

                                />
                                <TextField
                                    margin='normal'
                                    required
                                    fullWidth
                                    id='password'
                                    label='password'
                                    name='password'
                                    type='password'
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <Button
                                    type='submit'
                                    fullWidth
                                    variant='contained'
                                    sx={{ mt: 3, mb: 2 }}
                                    onClick={handleSubmit}
                                >
                                    ENTER
                                </Button>
                            </Box>
                        </CardContent>
                    </Card>
                </Box>

            </Container>
        </LoginAppBar>


    );

};

export default Login;
