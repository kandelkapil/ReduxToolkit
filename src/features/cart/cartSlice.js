import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import cartItems from '../../cartItems'


const url = 'https://course-api.com/react-useReducer-cart-project'


const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: true,
}

export const getCartItems = createAsyncThunk('cart/getCartItems',
    async () => {
        try {
            const response = await axios(url);
            return response.data
        }
        catch (error) {

        }
    }
)

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        clearCart: (state) => {
            state.cartItems = [];
        },
        removeItems: (state, action) => {
            const itemId = action.payload;
            state.cartItems = state.cartItems.filter((item) => item.id !== itemId)
        },
        incDecHandler: (state, action) => {
            const itemId = action.payload.id;
            const actionType = action.payload.type;
            const cartItem = state.cartItems.find((item) => item.id === itemId);
            if (actionType === 'inc') {
                cartItem.amount += 1
            }
            else if (cartItem.amount > 0) {
                cartItem.amount -= 1
            }
        },
        calculateTotal: (state) => {
            let amount = 0;
            let total = 0;
            state.cartItems.forEach((item) => {
                amount += item.amount;
                total += item.amount * item.price
            });

            state.amount = amount;
            state.total = total.toFixed(2);
        },

    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            console.log(action);
            state.isLoading = false;
            state.cartItems = action.payload
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false
        }
    }
})

export const { clearCart, removeItems, incDecHandler, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;   