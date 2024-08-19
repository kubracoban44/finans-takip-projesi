import React, { useState, useEffect } from "react";
import { BarChart } from "@mui/x-charts/BarChart";


const IncomeCategoryChart = () => {
    const [data, setData] = useState([]);
    const [series, setSeries] = useState([]);
    const [xAxisData, setXAxisData] = useState([]);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("currentUser"));
        let categories = JSON.parse(localStorage.getItem('categoryList'));
        categories = categories.filter(x => x.userId == user.id);
        let incomeEntries = JSON.parse(localStorage.getItem('incomeEntries'));
        incomeEntries = incomeEntries.filter(x => x.userId == user.id);

        let xAxisDataTemp = [];
        let seriesTemp = [];
        const categoryTotals = categories.map(category => {
            let categoryIncome = 0;
            let categoryExpense = 0;
            incomeEntries.forEach(entry => {
                if (entry.category.id === category.id) {
                    if (category.incomeExpense === 'Gelir') {
                        categoryIncome += parseFloat(entry.amount);
                    }
                    else if (category.incomeExpense === 'Gider') {
                        categoryExpense += parseFloat(entry.amount);
                    }
                }
            });
            xAxisDataTemp.push(category.categoryName);
            seriesTemp.push(categoryIncome || -categoryExpense);
            return {
                categoryName: category.categoryName,
                income: categoryIncome,
                expense: categoryExpense
            };

        });
        setXAxisData(xAxisDataTemp);
        setSeries(seriesTemp);
        setData(categoryTotals);
    }, []);


    return (
        <BarChart
            xAxis={[{ scaleType: 'band', data: xAxisData }]}
            yAxis={[
                {
                    colorMap: {
                        type: 'piecewise',
                        thresholds: [0],
                        colors: ['red', 'green'],
                    },
                },
            ]}
            series={[{ data: series }]}
            width={series.length * 100}
            height={300}
        />
    );
}
export default IncomeCategoryChart;
