import React, { useState, useEffect } from "react";
import { PieChart } from '@mui/x-charts/PieChart';
import { collection, getDocs, doc, where, query } from "firebase/firestore";
import { db } from "./firebase";

const a = [
    { id: 0, value: 10, label: 'Gelir' },
    { id: 1, value: 15, label: 'Gider' },

];


const TotalIncome = (props) => {
    const [totalData, setTotalData] = useState([]);
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    useEffect(() => {

        if (props.isFirebaseEnable) {
            const getData = async () => {
                const q = query(collection(db, 'incomeEntries'), where("userId", "==", user.uid));
                const querySnapShot = await getDocs(q);
                let incomeEntries = querySnapShot.docs.map(doc => {
                    return ({ ...doc.data(), id: doc.id })
                });

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
            };
            getData();

        }
        else {
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
        }




    }, [user.uid, props.isFirebaseEnable]);

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
            height={200}

        >

            isFirebaseEnable={props.isFirebaseEnable}

        </PieChart>

    );
}
export default TotalIncome