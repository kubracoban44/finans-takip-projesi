import { useState, createContext, useContext } from "react";

export const GlobalContext = createContext({isFirebaseEnable:true,user:null,updateFirebaseEnable: () => {},
updateUser: null});

export const GlobalProvider = (props) => {

    const [isFirebaseEnable, setIsFirebaseEnable] = useState(true);
    const [user,setUser]=useState();

    const updateFirebaseEnable = (value) => {
        setIsFirebaseEnable(value);
       
    }
    const  updateUser=(value)=>{
        setUser(value);
    }

    return (
        <GlobalContext.Provider
            value={{
                isFirebaseEnable: isFirebaseEnable,
                user,
                updateFirebaseEnable,
                updateUser
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
};

const useGlobalContext = () => {
    return useContext(GlobalContext);
};

export { useGlobalContext };