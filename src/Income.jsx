import React, { useEffect, useState } from "react";
import AutoComplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import HeaderAppBar from "./HeaderAppBar";
import { collection, addDoc, updateDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from "./firebase";
import { v4 as uuidv4 } from 'uuid';

const Income = (props) => {

    const [categories, setCategories] = useState([]);
    const [incomeEntries, setIncomeEntries] = useState([]);
    const [amount, setAmount] = useState('');
    const [selectedCategory, setSelectedCategory] = useState();
    useEffect(() => {
        const fetchCategories = async () => {

            const categoriesSnapshot = await getDocs(collection(db, "categories"));
            const categoriesList = categoriesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(categoriesList);
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        if (props.id) {
            const fetchIncomeEntry = async () => {
                try {
                    const incomeQuery = query(collection(db, "incomeEntries"));
                    if (selectedCategory) {
                        incomeQuery = query(incomeQuery, where("category.id", "==", selectedCategory.id));
                    }
                    const querySnapshot = await getDocs(incomeQuery);
                    const incomeList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    const income = incomeList.find(entry => entry.id === props.id);
                    if (income) {
                        setAmount(income.amount.toString());
                        setSelectedCategory(income.category || null);
                    }
                } catch (error) {
                    console.error("Error fetching income entry: ", error);
                }
            };


            fetchIncomeEntry();
        }
    }, [props.id]);

    useEffect(() => {
        const storedCategories = JSON.parse(localStorage.getItem('categoryList')) || [];
        setCategories(storedCategories);
        if (props.id) {
            let incomeList = JSON.parse(localStorage.getItem('incomeEntries'));
            let income = incomeList.find(x => x.id == props.id);
            if (income) {
                setAmount(income.amount);
                let category = storedCategories.find(x => x.id == income.category.id)
                setSelectedCategory(category || null);
            }
        }
    }, [props.id]);

    const handleSave = async () => {
        if (!selectedCategory || !amount) {
            alert("Lütfen bir kategori seçin ve tutarı girin.");
            return;

        }
        if (props.isFirebaseEnable) {
            const entry = {
                id: uuidv4(),
                category: selectedCategory,
                amount: parseFloat(amount),
                categoryName: selectedCategory.categoryName,
                categoryCode: selectedCategory.categoryCode
            };
            try {
                if (props.id) {
                    // Güncelleme yap
                    const incomeRef = doc(db, "incomeEntries", props.id);
                    await updateDoc(incomeRef, entry);
                } else {
                    // Yeni kayıt ekle
                    await addDoc(collection(db, "incomeEntries"), entry);
                }
                setSelectedCategory();
                setAmount('');
                if (props.onSave) {
                    props.onSave();
                }
            } catch (e) {
                console.error("Error saving data: ", e);
            }
        }
        if (!props.isFirebaseEnable) {

            const user = JSON.parse(localStorage.getItem('currentUser')) || {};
            const existingEntries = JSON.parse(localStorage.getItem('incomeEntries')) || [];
            if (props.id) {
                const updatedEntries = existingEntries.map(income => {
                    if (income.id === props.id) {
                        return {
                            ...income,
                            categories,
                            amount,
                            category: selectedCategory,
                            categoryName: selectedCategory.categoryName,
                            categoryCode: selectedCategory.categoryCode,
                        };
                    }
                    return income;
                })
                localStorage.setItem('incomeEntries', JSON.stringify(updatedEntries));
            }
            else {
                const newIncome = {
                    id: uuidv4(),
                    categories,
                    amount,
                    category: selectedCategory,
                    userId: user.id,
                    categoryName: selectedCategory.categoryName,
                    categoryCode: selectedCategory.categoryCode,
                };
                existingEntries.push(newIncome);
                localStorage.setItem('incomeEntries', JSON.stringify(existingEntries));
            }
            setSelectedCategory();
            setAmount('');
            if (props.onSave) {
                props.onSave();
            }
        }
    };

    return (
        <Container maxWidth="lg">
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                    Gelir Gider Seçimi
                </Typography>
                <AutoComplete
                    fullWidth
                    options={categories}
                    getOptionLabel={(option) => option.categoryName || ''}
                    value={selectedCategory}
                    onChange={(event, newValue) =>
                        setSelectedCategory(newValue)
                    }
                    renderInput={(params) =>
                        <TextField {...params} label="Kategori Seç" />
                    }
                    sx={{ mb: 2 }}
                    renderOption={(props, option) => (
                        <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    marginRight: 2,
                                }}
                            />
                            {option.categoryName || ''}
                        </li>
                    )}
                >
                </AutoComplete>
                <TextField
                    fullWidth
                    label="Tutar"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                >
                    Kaydet
                </Button>

            </Box>

        </Container>
    );
};
export default Income;