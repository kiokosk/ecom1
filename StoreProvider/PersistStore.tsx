'use client';

import useLocalStorage from '@/hooks/use-localstorage';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { loadItems } from '@/store/cartSlice';
import { RootState } from '../store/store';

const PersistStore = () => {
    const items = useSelector((state:RootState) => state.cart.items);
    const [carts, setCarts] = useLocalStorage('items', []);
    const [isInit, setIsInit] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setIsInit(true);
        if (items.length === 0 && carts.length > 0) {
            dispatch(loadItems(carts))
        }
    }, []);

    useEffect(() => {
        if (isInit) setCarts(JSON.stringify(items));
    }, [items, isInit]);

    return (
        <></>
    )
}

export default PersistStore