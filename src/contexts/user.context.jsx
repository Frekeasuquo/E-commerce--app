import { createContext, useEffect, useState } from "react";

// So whenever i want to re-render any component i have to hook(call) into the useContext to help re-render.
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";

// The actual value i want to access
export const UserContext = createContext({
    currentUser : null,
    setCurrentUser : () => null, 
});

// The provider is actual component, so the provider is what will wrap around any components we need access to the values inside
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocumentFromAuth(user);
            }
            setCurrentUser(user)
        })

        return unsubscribe
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
