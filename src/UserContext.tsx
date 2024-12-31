import React, { createContext, useContext, useEffect, useState } from 'react';
import { PRODUCTS } from './data/data';

const User = createContext<{
    isOnSale: boolean;
    setIsIsOnSale: React.Dispatch<React.SetStateAction<boolean>>;
    rangePrices: number[];
    setRangePrices: React.Dispatch<React.SetStateAction<number[]>>;
    categoriesState: string[];
    setCategoriesState: React.Dispatch<React.SetStateAction<string[]>>;
    colorsState: string[];
    setColorsState: React.Dispatch<React.SetStateAction<string[]>>;
    sizesState: string[];
    setSizesState: React.Dispatch<React.SetStateAction<string[]>>;
    sortOrderStates: string;
    setSortOrderStates: React.Dispatch<React.SetStateAction<string>>;
    filterProduct: typeof PRODUCTS;
    setFilterProduct: React.Dispatch<React.SetStateAction<typeof PRODUCTS>>;
} | undefined>(undefined);

const UserContext = ({ children }: { children: React.ReactNode }) => {
    const [isOnSale, setIsIsOnSale] = useState(true);
    const [rangePrices, setRangePrices] = useState<number[]>([0, 200]);
    const [categoriesState, setCategoriesState] = useState<string[]>([]);
    const [colorsState, setColorsState] = useState<string[]>([]);
    const [sizesState, setSizesState] = useState<string[]>([]);
    const [sortOrderStates, setSortOrderStates] = useState<string>("");
    const [filterProduct, setFilterProduct] = useState(PRODUCTS);

    useEffect(() => {
        const filterData = () => {
            let filtered = PRODUCTS;

            // Filter by price range
            filtered = filtered.filter(item =>
                item.price >= rangePrices[0] && item.price <= rangePrices[1]
            );

            // Filter by categories
            if (categoriesState.length > 0) {
                filtered = filtered.filter(item =>
                    categoriesState.includes(item.category)
                );
            }

            // Filter by colors
            if (colorsState.length > 0) {
                filtered = filtered.filter(item =>
                    item.tags.some(tag => colorsState.includes(tag))
                );
            }

            // Filter by sizes
            if (sizesState.length > 0) {
                filtered = filtered.filter(item => {
                    // Ensure item.sizes is an array before calling .some()
                    return Array.isArray(item.sizes) && item.sizes.length > 0 && item.sizes.some(size => sizesState.includes(size));
                });
            }
            // Sort by selected order
            if (sortOrderStates) {
                if (sortOrderStates === "price-asc") {
                    filtered = filtered.sort((a, b) => a.price - b.price);
                } else if (sortOrderStates === "price-desc") {
                    filtered = filtered.sort((a, b) => b.price - a.price);
                }
            }

            // Update the filtered products
            setFilterProduct(filtered);
        };

        filterData();
    }, [isOnSale, rangePrices, categoriesState, colorsState, sizesState, sortOrderStates]);

    return (
        <User.Provider value={{
            isOnSale,
            setIsIsOnSale,
            rangePrices,
            setRangePrices,
            categoriesState,
            setCategoriesState,
            colorsState,
            setColorsState,
            sizesState,
            setSizesState,
            sortOrderStates,
            setSortOrderStates,
            filterProduct, // Passing filtered products
            setFilterProduct
        }}>
            {children}
        </User.Provider>
    );
};

export default UserContext;

export const UserState = () => {
    const context = useContext(User);

    if (!context) {
        throw new Error('UserState must be used within a UserContext Provider');
    }

    return context;
};
