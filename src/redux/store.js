import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices/users";
// import { cargosReducer } from "./slices/cargos";
import { authReducer } from "./slices/auth";
import { zapReducer } from "./slices/zap";
import { commentsReducer } from "./slices/comments";
import { editReducer } from "./slices/edit";
import { eventsReducer } from "./slices/events";
const store = configureStore({
  reducer: {
    users: userReducer,
    // cargos: cargosReducer,
    auth: authReducer,
    zap: zapReducer,
    comments: commentsReducer,
    edit: editReducer,
    events:eventsReducer
  },
});

export default store;
