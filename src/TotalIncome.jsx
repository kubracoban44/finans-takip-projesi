import React, { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';


const a = [
    { id: 0, value: 10, label: 'Gelir' },
    { id: 1, value: 15, label: 'Gider' },

];


const TotalIncome = () => {
    const [totalData, setTotalData] = useState([]);

    useEffect(() => {

        let incomeEntries = JSON.parse(localStorage.getItem('incomeEntries'));
        const user = JSON.parse(localStorage.getItem("currentUser"));
        incomeEntries = incomeEntries.filter(x => x.userId == user.id);
        const totals = { Gelir: 0, Gider: 0 };
        incomeEntries.forEach(category => {
            if (category.category.incomeExpense === 'Gelir') {
                totals['Gelir'] += parseFloat(category.amount);
            }
            else if (category.category.incomeExpense === 'Gider') {
                totals['Gider'] += parseFloat(category.amount);
            }
        });
        const pieChartData = Object.keys(totals).map(key => ({
            id: key,
            value: totals[key],
            label: key
        }));
        setTotalData(pieChartData);
    }, []);

    return (
        <PieChart
            series={[
                {
                    data: totalData,
                    highlightScope: { faded: 'global', highlighted: 'item' },
                    faded: { innerRadius: 30, additionalRadius: -30, color: 'red' },
                },
            ]}
            width={400}
            height={200}>


        </PieChart>

    );
}
export default TotalIncome