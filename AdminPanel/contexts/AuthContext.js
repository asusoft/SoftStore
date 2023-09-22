import React, { createContext, useContext, useState } from "react";
import { db, auth } from '../FirebaseConfig'

const AuthContext = createContext({});

const AuthContextProvider = ({ children }) => {

    const user = auth().currentUser;
    const uid = user?.uid;

    const [authUser, setAuthUser] = useState(null);
    const [dbUser, setDbUser] = useState(null);

    const sub = uid;

    React.useEffect(() => {
        setAuthUser(user)
    }, [user])

    React.useEffect(() => {
        user ?
            db.collection("Workers").where("sub", "==", uid)
                .onSnapshot((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        const dbUserData = doc.data()
                        const dbUserObject = { ...dbUserData, id: doc.id };
                        dbUserData !== '' ? setDbUser(dbUserObject) : []
                    });
                })
            : []
    }, [uid, authUser]);


    const createDbUser = async (sub, name, phoneNumber, email) => {
        db.collection("Workers")
            .add({
                name: name,
                email: email,
                phoneNumber: phoneNumber,
                sub: sub,
            })
            .then((docRef) => {
                setDbUser(docRef);
            })
            .catch(error => alert(error.message))
    };

    const createWorker = async (email, password, name) => {
        try {
            await auth()
                .createUserWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    user.updateProfile({
                        displayName: name,
                    })

                })
        } catch (error) {
            throw new Error(error.message);
        }
    }

    const signIn = async (email, password) => {
        try {
            await auth()
                .signInWithEmailAndPassword(email, password)
                .then(userCredentials => {
                    const user = userCredentials.user;
                    setAuthUser(user);
                })
        } catch (error) {
            throw new Error(error.message);
        }
    };


    const signOut = () => {
        auth()
            .signOut()
            .then(function () {
                setAuthUser(null)
                setDbUser(null)
            })
            .catch(error => alert(error.message));
    };


    return (
        <AuthContext.Provider value={{
            authUser,
            dbUser,
            sub,
            signUp,
            signIn,
            signOut,
            setDbUser,
            setAuthUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);