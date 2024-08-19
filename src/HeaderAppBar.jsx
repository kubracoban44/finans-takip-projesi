import React from "react";
import { AppBar, Toolbar, Typography, Container, IconButton, MenuItem, Menu, Button } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";


const HeaderAppBar = ({ children }) => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const user = JSON.parse(localStorage.getItem('currentUser'));

    const handleLogout = () => {
        localStorage.removeItem('currentUser');
        navigate('/login');
    };
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleIncome = () => {
        navigate('/income');
    }
   
    const handleCategoryList = () => {
        navigate('/category-list');
    }
    const handleIncomeList = () => {
        navigate('/Incomelist');
    }
    return (
        <Container maxWidth="lg">
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/Dashboard"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        DashBoard
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >

                    </IconButton>
                    
                    
                    <Button
                        color="inherit"
                        onClick={handleCategoryList}
                        sx={{ mr: 2 }}>Category</Button>
                    <Button
                        color="inherit"
                        onClick={handleIncomeList}
                        sx={{ mr: 2 }}>income/Expense</Button>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>

                    </Typography>
                    <div>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenu}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',

                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                        >
                            <MenuItem>{user.name}</MenuItem>
                            <MenuItem onClick={handleLogout}>Çıkış</MenuItem>

                        </Menu>
                    </div>
                </Toolbar>
            </AppBar>

            <div>{children}</div>
        </Container>





    );
}
export default HeaderAppBar;