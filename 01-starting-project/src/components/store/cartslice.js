import { createSlice } from "@reduxjs/toolkit";


 const cartSlice = createSlice({
    name: "cart",
    initialState : {
        items: [],
        totalQuantity : 0 ,
        changed : false,
    },
     reducers : {
        replaceCart(state,action){
      state.totalQuantity = action.payload.totalQuantity;
      state.items=action.payload.items;
        },
        addItemToCart(state, action){
            const newItem = action.payload;
            let existingItem=false;
            if(state.items){
                 existingItem = state.items.find((item) => item.id === newItem.id);
            }
            state.totalQuantity++;
            state.changed = true;
            if(!existingItem){
                state.items.push({
                    id : newItem.id,
                    price : newItem.price,
                    quantity : 1,
                    totalPrice : newItem.price,
                    name : newItem.title
                });
            }
              else {
                    existingItem.quantity++;
                    const priceToAdd = parseFloat(newItem.price); // or use parseInt for integer values
                    existingItem.totalPrice = parseFloat(existingItem.totalPrice) + priceToAdd;
                   }
        },
        removeItemFromCart (state, action) {
            const id = action.payload;
            const existingItem = state.items.find((item) => item.id === id);
            state.totalQuantity--;
            state.changed = true;
            if (existingItem.quantity === 1){
             state.items = state.items.filter((item) => item.id !== id);
            }
            else {
                existingItem.quantity--;
                const priceToremove = parseFloat(existingItem.price); // or use parseInt for integer values
                existingItem.totalPrice = parseFloat(existingItem.totalPrice) - priceToremove;
            }

        }
     }
 })

 export const cartActions = cartSlice.actions;
 export default cartSlice;