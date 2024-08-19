import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate } from "react-router-dom";
import HeaderAppBar from "./HeaderAppBar";
import { Button, Modal } from "@mui/material";
import Category from "./Category";
import { collection, deleteDoc, getDocs,docgit  } from "firebase/firestore";
import { db } from "./firebase";




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



const CategoryList = (props) => {

    const [categoryId, setCategoryId] = useState();
    const [open, setOpen] = React.useState(false);
    const [rows, setRows] = useState([]);

    const [formData, setFormData] = useState({
        id: '',
        adi: '',
        code: '',
        incomeexpense: '',
        color: ''


    });

    const navigate = useNavigate();

    useEffect(() => {
        if (props.isFirebaseEnable) {
            const getData = async () => {
                const querySnapshot = await getDocs(collection(db, 'categories'));
                const categoryList = querySnapshot.docs.map(doc => {
                    return ({ ...doc.data(), id: doc.id })
                });
                setRows(categoryList);
            };
            getData();

        }
        else {

            const storedData = localStorage.getItem('categoryList');
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

    const columns = [

        { field: 'id', headerName: 'ID', width: 100 },
        {
            field: 'categoryName',
            headerName: 'Adı',
            width: 120,
            editable: true,
        },
        {
            field: 'categoryCode',
            headerName: 'Code',
            width: 120,
            editable: true,
        },
        {
            field: 'incomeExpense',
            headerName: 'Gelir/Gider',
            type: 'number',
            width: 120,
            editable: true,
        },
        {
            field: 'color',
            headerName: 'Renk',
            width: 100,
            valueGetter: (value, row) => {
                return row.color?.label;
            },
            renderCell: (params) => (
                <div
                    style={{
                        backgroundColor: params.row.color?.color,
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff', // Ensure text is visible on the background color
                    }}
                >
                    {params.row.color?.label || 'No Label'} {/* Display label or fallback */}
                </div>
            ),
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
                        >Sil</Button>
                    </Box>
                )
            }
        }

    ];
    const handleActionClick = (row) => {
        console.log(row);
        setOpen(true);
        setCategoryId(row.id);
    }
    const handleDelete = async(id) => {
        if(props.isFirebaseEnable){
            try{
                const docRef=doc(db,'categories',id);
                await deleteDoc(docRef);
            }
            catch(error){
                console.error('döküman silinirken hata oluştu',error);
            }

        }

        else{
        const updatedRows = rows.filter(row => row.id !== id);
        setRows(updatedRows);
        localStorage.setItem('categoryList', JSON.stringify(updatedRows));
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
            <Box sx={{ height: 400, width: '100%' }}>

                <Button onClick={handleOpen}>EKLE</Button>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Category
                                onSave={() => {
                                    setOpen(false);
                                    if (props.isFirebaseEnable) {
                                        const getData = async () => {
                                            const querySnapshot = await getDocs(collection(db, 'categories'));
                                            const categoryList = querySnapshot.docs.map(doc => {
                                                return ({ ...doc.data(), id: doc.id })
                                            });
                                            setRows(categoryList);
                                        };
                                        getData();


                                    }
                                    else {
                                        let categoryList = JSON.parse(localStorage.getItem('categoryList')) || [];
                                        const user = JSON.parse(localStorage.getItem("currentUser"));
                                        categoryList = categoryList.filter(x => x.userId == user.id);
                                        setRows(categoryList);
                                        //düzenle butonunda kaydet diyince burası çalışır
                                        //datagridin datası güncellenmeli
                                    }

                                }
                                }
                                id={categoryId}
                                isFirebaseEnable={props.isFirebaseEnable}
                            />

                        </Box>


                    </Modal>
                </div>
            </Box>

        </HeaderAppBar>
    );

};
export default CategoryList;