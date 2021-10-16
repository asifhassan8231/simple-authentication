import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { useEffect, useState } from "react";
import initializeAuthentication from "../firebase/firebase.init";
initializeAuthentication();
const useFirebase = () => {
    const [user, setUser] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const auth = getAuth();

    const createUser = ({ email, password }) => {
        if (!email && !password) {
            return;
        }
        setIsLoading(true);
        return createUserWithEmailAndPassword(auth, email, password)

            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }
    const signInWithEmail = ({ email, password }) => {
        if (!email && !password) {
            return;
        }
        setIsLoading(true);
        return signInWithEmailAndPassword(auth, email, password)

            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const googleSignIn = () => {
        setIsLoading(true);
        const googleProvider = new GoogleAuthProvider();
        return signInWithPopup(auth, googleProvider)
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    const googleSignOut = () => {
        setIsLoading(true);
        signOut(auth)
            .then(() => setUser(null))
            .catch(error => {
                setError(error.message);
            })
            .finally(() => setIsLoading(false));
    }

    useEffect(() => {
        const unsubscribed = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            }
            else {
                setUser(null)
            }
            setIsLoading(false);
        })
        return () => unsubscribed;
    }, [])
    return {
        user,
        error,
        isLoading,
        setIsLoading,
        googleSignIn,
        googleSignOut,
        createUser,
        signInWithEmail
    }
}
export default useFirebase;