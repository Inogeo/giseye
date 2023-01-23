import { configureStore } from '@reduxjs/toolkit'

// Reducers
import LayersSlice from './slices/LayersSlice'
import MapSlice from './slices/MapSlice'

export default configureStore({
    reducer: {
        LayersSlice,
        MapSlice
    }
})