import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password, displayName) {
    return auth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => res.user.updateProfile({ displayName }))
      .then((res) => {
        setCurrentUser(null);
        createUserProfileDocument(auth.currentUser);
        return auth.currentUser;
      });
  }

  function createUserProfileDocument(user) {
    let { email, displayName } = user;
    if (!displayName) return
    const dbRef = db.doc(`users/${user.uid}`)
    let userDetails;
    dbRef.get()
      .then(doc => {
        userDetails = doc.data();
        if (doc.exists) return;
        return dbRef.set({ displayName: displayName, email: email })
      })
      .then(() => {
        // This then indicates everything is stored
        // user.lastName = userDetails.lastName;
        // user.phoneNumber = userDetails.pho
        user.bio = userDetails.bio;
        setCurrentUser(user);
        setLoading(false);
      })
      .catch(err => console.log(err))
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updateDisplayName(displayName) {
    return currentUser.updateProfile({
      DisplayName: displayName,
      PhotoUrl: null,
    });
  }

  useEffect(() => {
    const unsubscriibe = auth.onAuthStateChanged((user) => {
      if (user) createUserProfileDocument(user);
    });

    return unsubscriibe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    updateDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
