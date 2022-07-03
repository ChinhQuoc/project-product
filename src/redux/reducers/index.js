import productReducer from "./Product";
import {combineReducers} from "redux";

const rootReducer = combineReducers({
  product: productReducer
});
export default rootReducer;
