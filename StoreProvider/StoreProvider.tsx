'use client';

import store from "@/store/store";
import React from "react";
import { Provider } from 'react-redux';
import PersistStore from "./PersistStore";

const StoreProvider = ({children}:{children:React.ReactNode}) => {
    return (
        <Provider store={store}>
            <PersistStore />
            {children}
        </Provider>
    )
}

export default StoreProvider;