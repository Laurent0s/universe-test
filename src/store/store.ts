import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import {pdfReqSlice} from "./slices/pdfReqSlice.ts";

export const store = configureStore({
    reducer: {
    pdfReq: pdfReqSlice.reducer,
    },
});

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<
    ReturnType<typeof store.getState>
> = useSelector;