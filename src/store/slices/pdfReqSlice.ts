import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export interface pdfTextState {
    text: string;
    loading: boolean;
    error: string | null;
}

const initialState: pdfTextState = {
    text: '',
    loading: false,
    error: null,
};

export const postPdfText = createAsyncThunk(
    "postPdfText",
    async(text: string, thunkAPI) => {
        try {
            const response =  await axios.post(
                'http://95.217.134.12:4010/create-pdf?apiKey=78684310-850d-427a-8432-4a6487f6dbc4',
                {'text': text},
                {responseType: 'blob'}
            );

            const blob = response.data;

            return await new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });
        } catch (error) {
            return thunkAPI.rejectWithValue(error || "An unknown error occurred");
        }
    }
);

export const pdfReqSlice = createSlice({
    name: "pdfHandle",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postPdfText.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postPdfText.fulfilled, (state, action) => {
                state.loading = false;
                state.text = action.payload;
                state.error = null;
            })
            .addCase(postPdfText.rejected, (state, action) => {
                state.loading = false;
                if (action.payload) {
                    state.error = action.payload as string;
                } else {
                    state.error = "An error occurred";
                }
            });
    }
})