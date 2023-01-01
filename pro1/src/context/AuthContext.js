import { createContext, useState, useEffect, useContext } from "react"
import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    updateEmail,
    updatePassword
} from "firebase/auth"
import auth from "../firebase"

const AuthContext = createContext()

const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const logout = () => {
        return signOut(auth)

    }
    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)

    }
    const resetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)
    }
    const updateUserEmail = (email) => {
        return updateEmail(auth.currentUser,email)
    }
    const updateUserPassword = (password) => {
        return updatePassword(auth.currentUser,password)
    }

    useEffect(() => {
        const unsubcribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user)
            setLoading(false)
        })
        return () => {
            unsubcribe()
        };
    }, []);

    return <AuthContext.Provider value={{ currentUser,
     signup, logout, login, resetPassword,updateUserEmail ,updateUserPassword}}>
        {!loading && children}
    </AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => {
    return useContext(AuthContext)
}
