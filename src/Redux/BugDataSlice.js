import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bugData: [],
    bugId:1111
};

export const BugDataSlice = createSlice({
    name: 'BugList',
    initialState,
    reducers: {
        ADDBUG: (state, action) => {
            // Add the new bug to the existing array of bugData
            state.bugData.push(action.payload);
        },
        INCREMENTBUGID:(state)=> {
          state.bugId++
        },
        UPDATEBUG: (state, action) => {
            console.log(action.payload,'lllll');
            state.bugData = state.bugData.map(item =>
                item.bugId === action.payload.bugId ? { ...item, ...action.payload } : item
            );        
        }
    }
});

export const { ADDBUG,INCREMENTBUGID,UPDATEBUG } = BugDataSlice.actions;
export default BugDataSlice.reducer;
