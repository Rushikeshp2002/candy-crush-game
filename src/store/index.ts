/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, configureStore, createSlice } from "@reduxjs/toolkit";
import { moveBelowReducer } from "./reducers/moveBelow";
import { dragEndReducer } from "./reducers/dragEnd";


const initialState:{
    board: string[];
    boardSize: number;
    squareBeingDragged: Element | undefined;
    squareBeingReplaced: Element | undefined;
}={
    board: [],
    boardSize: 8,
    squareBeingDragged: undefined,
    squareBeingReplaced: undefined
}

const candyCrushSlice = createSlice({
    name: 'candyCrush',
    initialState,
    reducers:{
        updateBoard:(state,action:PayloadAction<string[]>)=>{
            state.board = action.payload
        },
        dragStart:(state,action:PayloadAction<any>)=>{
            state.squareBeingDragged = action.payload
        },
        dragDrop:(state,action:PayloadAction<any>)=>{
            state.squareBeingReplaced = action.payload
        },
        dragEnd: dragEndReducer,
        moveBelow: moveBelowReducer,
    },
})

export const {updateBoard, moveBelow, dragStart, dragDrop,dragEnd} = candyCrushSlice.actions;

export const store = configureStore({
    reducer:{
        candyCrush : candyCrushSlice.reducer,
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware({
            serializableCheck:false,
        }),
    
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;