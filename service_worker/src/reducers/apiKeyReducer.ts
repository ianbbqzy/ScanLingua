import { createSlice } from "@reduxjs/toolkit";

const keySlice = createSlice({
    name: "key",
    initialState: '',
    reducers: {
    setApiKey(state, action) {
        // console.log('setApiKey action.payload', action.payload)
        if (action.payload === undefined) {
            return state
        }
            return state = action.payload;
        },
    },
});

export const { setApiKey } = keySlice.actions;

const firebaseTokenSlice = createSlice({
    name: "firebaseToken",
    initialState: '',
    reducers: {
    setFirebaseToken(state, action) {
        // console.log('setApiKey action.payload', action.payload)
        if (action.payload === undefined) {
            return state
        }
            return state = action.payload;
        },
    },
});

export const { setFirebaseToken } = firebaseTokenSlice.actions;

export const rememberUserKey = (userApi) => {
    chrome.storage.local.set({ "setApi": userApi })
    // console.log('userApi', userApi)
    return async (dispatch) => {
        dispatch(setApiKey(userApi))
    }
}

export const initializeKey = () => {
    return async dispatch => {
        const StateKey = await chrome.storage.local.get(["setApi"])
        // console.log('StateKey', StateKey)
        dispatch(setApiKey(StateKey.setApi))
    }
}

export const rememberFirebaseToken = (userToken) => {
    chrome.storage.local.set({ "setFirebaseToken": userToken })
    // console.log('userApi', userApi)
    return async (dispatch) => {
        dispatch(setFirebaseToken(userToken))
    }
}

export const initializeFirebaseToken = () => {
    return async dispatch => {
        const StateToken = await chrome.storage.local.get(["setFirebaseToken"])
        // console.log('StateKey', StateKey)
        dispatch(setFirebaseToken(StateToken.setFirebaseToken))
    }
}


export default keySlice.reducer;