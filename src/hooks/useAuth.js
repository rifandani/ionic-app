import { useState, useEffect } from 'react';
import firebase from '../config';

function useAuth() {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    // triggered ketika user signed in / signed out
    const unsubscribe = firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        // jika user signed in
        setAuthUser(user);
      } else {
        // jika user signed out
        setAuthUser(null);
      }
    });
    // cleanup
    return () => unsubscribe();
  }, []);

  return [authUser, setAuthUser];
}

export default useAuth;
