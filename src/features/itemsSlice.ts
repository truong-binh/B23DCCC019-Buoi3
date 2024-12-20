import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Item {
    id: number;
    name: string;
    price: number;
    category: string;
}

interface ItemsState {
    items: Item[];
}

const initialState: ItemsState = {
    items: [],
};

const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<Item>) => {
            state.items.push(action.payload);
        },
        removeItem: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },
        editItem: (state, action: PayloadAction<Item>) => {
            const index = state.items.findIndex(
                (item) => item.id === action.payload.id
            );
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
    },
});

export const { addItem, removeItem, editItem } = itemsSlice.actions;
export default itemsSlice.reducer;
