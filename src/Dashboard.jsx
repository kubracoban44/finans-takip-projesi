import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";

import HeaderAppBar from "./HeaderAppBar";
import TotalIncome from "./TotalIncome";
import IncomeCategoryChart from "./IncomeCategoryChart";

const Dashboard = () => {
    return (
        <HeaderAppBar>
            <Grid container>
                <Grid item>
                    <TotalIncome />
                </Grid>
                <Grid item>
                    <IncomeCategoryChart />
                </Grid>
            </Grid>
        </HeaderAppBar>


    );
}
export default Dashboard;






