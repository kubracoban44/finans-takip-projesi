import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import HeaderAppBar from "./HeaderAppBar";
import { Button, CardActions } from "@mui/material";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Modal from "@mui/material/Modal";
import Income from "./Income";
import { collection, getDocs, doc, deleteDoc, where, query } from "firebase/firestore";
import { db } from "./firebase";
import { useGlobalContext } from "./ApplicationContext";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const IncomeList = (props) => {
    const { isFirebaseEnable, updateFirebaseEnable } = useGlobalContext();

    const [categoryId, setCategoryId] = useState();
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = useState([]);
    const [formData, setFormData] = useState({
        id: '',
        categoryName: '',
        categoryCode: '',
        amount: ''

    });
    const user = useGlobalContext().user||JSON.parse(localStorage.getItem('currentUser'))||[];
    const columns = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
            field: 'categoryName', headerName: 'Kategori Adı', width: 200, editable: true,
            valueGetter: (value, row) => {
                return row.category?.categoryName || ''
            },
        },
        {
            field: 'categoryCode', headerName: 'Kategori Kodu', width: 200, editable: true,
            valueGetter: (value, row) => {
                return row.category?.categoryCode || ''
            },
        },
        {
            field: 'amount',
            headerName: 'Tutar',
            type: 'number',
            width: 150,
            editable: true,
            valueFormatter: (value) => {
                if (value) {
                    return parseFloat(value).toFixed(2)
                }
                return 0;
            },
        },

        {
            field: 'action',
            headerName: 'Aksiyon',
            sortable: false,
            width: '170',

            renderCell: (params) => {
                return (

                    <Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => handleActionClick(params.row)}
                        >Düzenle</Button>
                        <Button
                            variant="contained"
                            color="error"
                            onClick={() => handleDelete(params.row.id)}
                        >SİL
                        </Button>

                    </Box>

                )
            }
        }

    ];


    const handleActionClick = (row) => {
        console.log(row);
        setOpen(true);
        setCategoryId(row.id);

    };
    const handleDelete = async (id) => {
        if (isFirebaseEnable) {
            try {
                const docRef = doc(db, 'incomeEntries', id);
                await deleteDoc(docRef);
                setRows(prevRows => prevRows.filter(row => row.id !== id));
            }
            catch (error) {
                console.error('döküman silinirken hata oluştu', error);
            }



        }
        else {
            const updatedRows = rows.filter(row => row.id !== id);
            setRows(updatedRows);
            localStorage.setItem('incomeEntries', JSON.stringify(updatedRows));
        }

    }
    const navigate = useNavigate();

    useEffect(() => {
        if (isFirebaseEnable) {
            //datayı firebaseden çekiyorum..
            const getData = async () => {
                const q = query(collection(db, 'incomeEntries'), where("userId", "==", user.uid));
                const querySnapshot = await getDocs(q);
                const incomeList = querySnapshot.docs.map(doc => {
                    return ({ ...doc.data(), id: doc.id })
                });
                setRows(incomeList);

            };
            getData();

        }
        else {
            const storedData = localStorage.getItem('incomeEntries');
            if (storedData) {
                let parsedData = JSON.parse(storedData);
                const user = JSON.parse(localStorage.getItem("currentUser"));
                parsedData = parsedData.filter(x => x.userId == user.id);
                const validRows = parsedData.map((row, index) => ({
                    ...row,
                    id: row.id ?? index + 1
                }));
                setRows(validRows);
            }
        }

    }, []);

    const handleRowEdit = (newRow) => {
        const updatedRows = rows.map((row) =>
            row.id === newRow.id ? { ...row, ...newRow } : row
        );
        setRows(updatedRows);
        localStorage.setItem('incomeEntries', JSON.stringify(updatedRows));
        return newRow;

    };


    const handleOpen = () => {
        setCategoryId(null);
        setOpen(true);
    }
    const handleClose = () => {
        setOpen(false);
    }

    return (
        <HeaderAppBar>
            <Card
                sx={{ maxWidth: 1200 }}>

                <Button onClick={handleOpen}>EKLE</Button>
                <CardActions>
                <CardContent>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                    processRowUpdate={handleRowEdit}
                    autoHeight
                />
                <div>


                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style} >
                            <Income
                                onSave={() => {
                                    setOpen(false);
                                    if (isFirebaseEnable) {
                                        const getData = async () => {
                                            const q = query(collection(db, 'incomeEntries'), where("userId", "==", user.uid))
                                            const querySnapshot = await getDocs(q);
                                            const incomeList = querySnapshot.docs.map(doc => {
                                                return ({ ...doc.data(), id: doc.id })
                                            });
                                            setRows(incomeList);

                                        };
                                        getData();

                                    }
                                    else {
                                        let x = JSON.parse(localStorage.getItem('incomeEntries')) || [];
                                        const user = JSON.parse(localStorage.getItem("currentUser"));
                                        x = x.filter(x => x.userId == user.id);
                                        setRows(x);
                                    }
                                }
                                }




                                id={categoryId}
                                
                            >

                            </Income>

                        </Box>

                    </Modal>

                </div>
                </CardContent>
                </CardActions>
            </Card>

        </HeaderAppBar>
    );

};




export default IncomeList;