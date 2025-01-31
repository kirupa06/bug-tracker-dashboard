import { configureStore } from '@reduxjs/toolkit'
import BugDataSlice from './BugDataSlice'

const store = configureStore({
    reducer:{
        BugInfo:BugDataSlice
    }
})
export default store;

