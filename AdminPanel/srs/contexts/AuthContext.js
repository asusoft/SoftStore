import React, { createContext, useContext, useState } from "react";
import { db, auth } from '../../FirebaseConfig';
import { getFirestore, collection, getDocs, query, where, onSnapshot } from "firebase/firestore";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

import { getAuth } from "firebase/auth";

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {

    const user = getAuth().currentUser;
    const uid = user?.uid;

    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);

    const sub = uid;

    React.useEffect(() => {
        setAuthUser(user)
    }, [user])

    React.useEffect(() => {
        if (user) {
            const dbInstance = db;
            const workersQuery = query(collection(dbInstance, "Workers"), where("sub", "==", uid));

            const unsubscribe = onSnapshot(workersQuery, (querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    const dbUserData = doc.data();
                    const dbUserObject = { ...dbUserData, id: doc.id };
                    if (dbUserData !== '') {
                        setDbUser(dbUserObject);
                    }
                });
            });

            return () => unsubscribe();  // clean up the listener on component unmount
        }
    }, [uid, authUser]);


    const createDbUser = async (sub, name, phoneNumber, email) => {
        try {
            const dbInstance = db;
            const docRef = await addDoc(collection(dbInstance, "Workers"), {
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                sub: sub,
            });
            setDbUser(docRef);
        } catch (error) {
            alert(error.message);
        }
    };

    const createWorker = async (email, password, name) => {
        const authInstance = auth;
        try {
            const userCredentials = await createUserWithEmailAndPassword(authInstance, email, password);
            if (userCredentials.user) {
                await updateProfile(userCredentials.user, { displayName: name });
            }
        } catch (error) {
            throw new Error(error.message);
        }
    };

    const signIn = async (email, password) => {

        try {
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user;
            setAuthUser(user);
        } catch (error) {
            throw new Error(error.message);
        }
    };


    const signUserOut = async () => {
        try {
            await signOut(auth);
            setAuthUser(null);
            setDbUser(null);
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            authUser,
            dbUser,
            sub,
            signIn,
            signUserOut,
            setDbUser,
            setAuthUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);