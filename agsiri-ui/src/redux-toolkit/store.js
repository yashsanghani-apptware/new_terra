import { configureStore } from "@reduxjs/toolkit";
import inputsReducer from "./reducers/inputsReducer";
import { addToWishListReducer } from "./reducers/addToWishListReducer";
import { addToCompareReducer } from "./reducers/addToCompareReducer";
import { currencyReducer } from "./reducers/currencyReducer";
import { gridReducer } from "./reducers/gridReducer";
import { loginReducer } from "./reducers/loginReducer";

export const store = configureStore({
  reducer: {
    inputsReducer,
    addToWishListReducer,
    addToCompareReducer,
    currencyReducer,
    gridReducer,
    loginReducer
  },
});
