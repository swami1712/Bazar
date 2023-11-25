// rootReducer.js
import { combineReducers } from "redux";
import productReducer from "./Reducers/Product.reducer";

const rootReducer = combineReducers({
  products: productReducer,
  // Add other reducers here if needed
});

export default rootReducer;
