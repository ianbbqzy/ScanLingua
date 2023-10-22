import React, { useState, useEffect } from 'react';
import { Button } from "@chakra-ui/button";
import { firebaseApp } from './firebase_config'
import {
    getAuth,
    onAuthStateChanged,
    signInWithCredential,
    GoogleAuthProvider,
    setPersistence,
    browserLocalPersistence,
    signOut,
    User,
} from 'firebase/auth';
import { updateFirebaseToken } from './messages';

// Auth instance for the current firebaseApp
const auth = getAuth(firebaseApp);
setPersistence(auth, browserLocalPersistence)

export function Signin() {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        // Detect auth state
        onAuthStateChanged(auth, async user => {
            if (user != null) {
                console.log('User is logged in:');
                console.log(user);
                setUser(user);
                // Set Firebase token from the user object
                const firebaseToken = await user.getIdToken();
                updateFirebaseToken(firebaseToken);
            } else {
                console.log('No user logged in!');
                updateFirebaseToken("");
                setUser(null);
            }
        });
    }, []);

    const handleSignIn = () => {
        // Start the sign-in process
        startAuth(true);
    };

    const handleSignOut = () => {
        // Sign out the user
        signOut(auth).then(() => {
            console.log('User signed out');
        });
    };

    return (
        <div>
            {user ? (
                <Button onClick={handleSignOut}>Logout</Button>
            ) : (
                <Button onClick={handleSignIn}>Sign In</Button>
            )}
        </div>
    );
}

/**
 * Start the auth flow and authorizes to Firebase.
 * @param{boolean} interactive True if the OAuth flow should request with an interactive mode.
 */
function startAuth(interactive) {
    // Request an OAuth token from the Chrome Identity API.
    chrome.identity.getAuthToken({ interactive: true }, function (token) {
        if (chrome.runtime.lastError && !interactive) {
            console.log('It was not possible to get a token programmatically.');
        } else if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
        } else if (token) {
            // Authorize Firebase with the OAuth Access Token.
            const credential = GoogleAuthProvider.credential(null, token);
            signInWithCredential(auth, credential).catch((error) => {
                // Handle errors here
                console.log(error);
            });
        } else {
            console.error('The OAuth token was null');
        }
    });
}
