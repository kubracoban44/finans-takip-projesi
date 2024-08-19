import React, { useState, useEffect } from "react";
import TextField from "@mui/material/TextField";
import AutoComplete from "@mui/material/Autocomplete";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { db } from "./firebase";
import { collection, addDoc, updateDoc, doc, getDocs, query, where, getDoc } from "firebase/firestore";
import HeaderAppBar from "./HeaderAppBar";
import { v4 as uuidv4 } from 'uuid';

/*
Düzenleme ile açıldıgında firestoredan data cekecek şekilde geliştirme yapılacak
props.id dogru geldiginden emin olunmalı
props.isFirebaseEnable true oldugunda firebaseden olmadıgında localstoragedan alınmalı.
 */
const Category = (props) => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryCode, setCategoryCode] = useState('');
    const [incomeExpense, setIncomeExpense] = useState(null);
    const [color, setColor] = useState(null);
    const [categories, setCategories] = useState([]);
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const incomeExpenseOptions = ['Gelir', 'Gider'];
    const colorOptions = [
        { label: 'Kırmızı', color: '#FF0000' },
        { label: 'Sarı', color: '#FFFF00' },
        { label: 'Mavi', color: '#0000FF' },
        { label: 'Mor', color: '#660099' },
    ]

    useEffect(() => {
        const fetchCategories = async () => {
            const q = query(collection(db, "categoryList"), where("userId", "==", "currentUserId"));
            const querySnapShot = await getDocs(q);
            const categoriesList = querySnapShot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(categoriesList);
        };
        fetchCategories();
    }, []);



    useEffect(() => {
       if(props.id){
        if (props.isFirebaseEnable) {
            const fetchCategory = async () => {
                const categoryRef = doc(db, "categories", props.id);
                const categoryDoc = await getDoc(categoryRef);
                if (categoryDoc.exists()) {
                    const categoryData = categoryDoc.data();
                    setCategoryName(categoryData.categoryName);
                    setCategoryCode(categoryData.categoryCode);
                    setIncomeExpense(categoryData.incomeExpense);
                    setColor(categoryData.color);
                }
            };
            fetchCategory();
        }


        if (!props.isFirebaseEnable) {
            let categoryList = JSON.parse(localStorage.getItem("categoryList")) || [];
            let category = categoryList.find(x => x.id == props.id);
            if (category) {
                setCategoryName(category.categoryName);
                setCategoryCode(category.categoryCode);
                setIncomeExpense(category.incomeExpense);
                setColor(category.color);
            }
        }
       }
    }, [props.id]);

    const handleSave = async () => {
        console.log('Adı:', categoryName);
        console.log('Kod:', categoryCode);
        console.log('Gelir/Gider:', incomeExpense);
        console.log('Renk:', color);


        if (props.isFirebaseEnable) {

            if (props.id) {
                const categoryRef = doc(db, "categories", props.id);
                await updateDoc(categoryRef, {
                    categoryName,
                    categoryCode,
                    incomeExpense,
                    color,
                    userId: user.id
                });
            }
            else {
                await addDoc(collection(db, "categories"), {
                    id: uuidv4(),
                    categoryName,
                    categoryCode,
                    incomeExpense,
                    color,
                    userId: user.id

                });
            }
        }
        if (!props.isFirebaseEnable) {

            const existingCategories = JSON.parse(localStorage.getItem('categoryList')) || [];
            if (props.id) {
                const updatedCategories = existingCategories.map(category => {
                    if (category.id === props.id) {
                        return {
                            ...category,
                            categoryName,
                            categoryCode,
                            incomeExpense,
                            color,
                            userId: user.id
                        };
                    }
                    return category;
                });

                localStorage.setItem('categoryList', JSON.stringify(updatedCategories));

            }
            else {
                // kategori ekleme işlemi
                const newCategory = {
                    id: uuidv4(),
                    categoryName,
                    categoryCode,
                    incomeExpense,
                    color,
                    userId: user.id
                };
                existingCategories.push(newCategory);
                localStorage.setItem('categoryList', JSON.stringify(existingCategories));
            }

        }
        if (props.onSave) {
            props.onSave();
        }
    };
    return (

        <Container maxWidth='sm'>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h4" gutterBottom>
                </Typography>
                <TextField
                    fullWidth
                    label='Adı'
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    sx={{ mb: 2 }}>
                </TextField>
                <TextField
                    fullWidth
                    label='Kod'
                    value={categoryCode}
                    onChange={(e) => setCategoryCode(e.target.value)}
                    sx={{ mb: 2 }}>
                </TextField>
                <AutoComplete
                    fullWidth
                    options={incomeExpenseOptions}
                    value={incomeExpense}
                    onChange={(event, newValue) => setIncomeExpense(newValue)}
                    renderInput={(params) => <TextField {...params} label="Gelir/Gider" />}
                    sx={{ mb: 2 }}
                >
                </AutoComplete>
                <AutoComplete
                    fullWidth
                    options={colorOptions}
                    value={color}
                    onChange={(event, newValue) => setColor(newValue)}
                    renderInput={(params) => <TextField {...params} label="Renk" />}
                    getOptionLabel={(option) => option.label}
                    sx={{ mb: 2 }}
                    renderOption={(props, option) => (
                        <li {...props} style={{ display: 'flex', alignItems: 'center' }}>
                            <Box
                                sx={{
                                    width: 24,
                                    height: 24,
                                    borderRadius: '50%',
                                    backgroundColor: option.color,
                                    marginRight: 2,
                                }}
                            />
                            {option.label}
                        </li>
                    )}


                />


                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}>Kaydet</Button>
            </Box>
        </Container>

    );
}
export default Category;