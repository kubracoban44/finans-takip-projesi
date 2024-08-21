import { useState, createContext, useContext } from "react";

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {

    const [isFirebaseEnable, setIsFirebaseEnable] = useState(true);
    const [user,setUser]=useState([]);

    const updateFirebaseEnable = (value) => {
        setIsFirebaseEnable(value);
        setUser();
    }

    return (
        <GlobalContext.Provider
            value={{
                isFirebaseEnable: isFirebaseEnable,
                user:user,
                updateFirebaseEnable
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