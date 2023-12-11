import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./uislice";
import cartSlice from "./cartslice";


const store = configureStore({
    reducer: {
        ui : uiSlice.reducer,
        cart : cartSlice.reducer
    }
});

export default store;