import React, { useState, useEffect, useContext } from "react";
import { Grid } from "@mui/material";

import HeaderAppBar from "./HeaderAppBar";
import TotalIncome from "./TotalIncome";
import IncomeCategoryChart from "./IncomeCategoryChart";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { GlobalContext } from "./ApplicationContext";

const Dashboard = () => {
    const [user, setUser] = useState([]);
    const {  isFirebaseEnable } = useContext(GlobalContext);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            }
            else {
                setUser(null);
            }
        });
        return () => unsubscribe();
    }, []);
    return (
        <HeaderAppBar>
            <Grid container>
                <Grid item>
                    <TotalIncome isFirebaseEnable={true} />
                </Grid>
                <Grid item>
                    <IncomeCategoryChart isFirebaseEnable={true} />
                </Grid>
            </Grid>
        </HeaderAppBar>


    );
}
export default Dashboard;






