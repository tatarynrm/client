import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/users";
// import { cargosReducer } from "./slices/cargos";
import { authReducer } from "./slices/auth";
import { zapReducer } from "./slices/zap";
import { commentsReducer } from "./slices/comments";
import { editReducer } from "./slices/edit";
import { eventsReducer } from "./slices/events";
import { urReducer } from "./slices/ur";
import { cargosReducer } from "./slices/cargos";
import { cartReducer } from "./slices/cartriges";
const store = configureStore({
  reducer: {
    users: userReducer,
    auth: authReducer,
    zap: zapReducer,
    comments: commentsReducer,
    edit: editReducer,
    events:eventsReducer,
    ur:urReducer,
    cargos:cargosReducer,
    cart:cartReducer
  },
});

export default store;
