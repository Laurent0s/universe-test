import {postPdfText, pdfReqSlice} from "../store/slices/pdfReqSlice";
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { configureStore } from '@reduxjs/toolkit';

const mockAxios = new MockAdapter(axios);

describe('pdfReqSlice', () => {
    const initialState = {
        text: '',
        loading: false,
        error: null,
    };

    it('should handle initial state', () => {
        const reducer = pdfReqSlice.reducer(undefined, { type: 'unknown' });
        expect(reducer).toEqual(initialState);
    });

    it('should handle pending state for postPdfText', () => {
        const action = { type: postPdfText.pending.type };
        const reducer = pdfReqSlice.reducer(initialState, action);
        expect(reducer).toEqual({
            ...initialState,
            loading: true,
        });
    });

    it('should handle fulfilled state for postPdfText', () => {
        const payload = 'data:application/pdf;base64,...'; // Example Base64 Data URL
        const action = { type: postPdfText.fulfilled.type, payload };
        const reducer = pdfReqSlice.reducer(initialState, action);
        expect(reducer).toEqual({
            ...initialState,
            loading: false,
            text: payload,
            error: null,
        });
    });

    it('should handle rejected state for postPdfText', () => {
        const error = 'Some error occurred';
        const action = { type: postPdfText.rejected.type, payload: error };
        const reducer = pdfReqSlice.reducer(initialState, action);
        expect(reducer).toEqual({
            ...initialState,
            loading: false,
            error,
        });
    });

    describe('postPdfText asyncThunk', () => {
        it('dispatches fulfilled action on successful API call', async () => {
            const responseBlob = new Blob(['PDF content'], { type: 'application/pdf' });
            mockAxios.onPost().reply(200, responseBlob);

            const store = configureStore({
                reducer: pdfReqSlice.reducer,
            });

            await store.dispatch<any>(postPdfText('Test Text'));

            const actions = store.getActions();
            expect(actions[0].type).toEqual(postPdfText.pending.type);
            expect(actions[1].type).toEqual(postPdfText.fulfilled.type);
            expect(typeof actions[1].payload).toBe('string'); // Ensure payload is a Data URL
        });

        it('dispatches rejected action on failed API call', async () => {
            mockAxios.onPost().reply(500);

            const store = configureStore({
                reducer: pdfReqSlice.reducer,
            });

            await store.dispatch<any>(postPdfText('Test Text'));

            const actions = store.getActions();
            expect(actions[0].type).toEqual(postPdfText.pending.type);
            expect(actions[1].type).toEqual(postPdfText.rejected.type);
            expect(actions[1].payload).toBeDefined(); // Error message should exist
        });
    });
});
