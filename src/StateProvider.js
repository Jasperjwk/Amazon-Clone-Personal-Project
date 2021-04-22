import React, { createContext, useContext, useReducer } from "react";

//this is essentially preparing the data layer
export const StateContext = createContext();

//higher order component. Wrap the app inside the state provider and it provides
//that sort of data layer functionality 
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
);

//whenever we want to pull something from the data layer we use this state value hook
export const useStateValue = () => useContext(StateContext);