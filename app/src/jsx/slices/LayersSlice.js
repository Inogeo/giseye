import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
    layersList: []
};

// This slice handle layer additions and deletions
export const layersSlice = createSlice({
    name: 'Layers',
    initialState,

    reducers: {

        /*
        => Adds "newLayer" to App
            action.payload = {
                layer: layer,
                style: style
            }
        */
        addLayer: (state, action) => {
            // Here the payload is a layer object
            const uniqueNewLayer = Object.assign({}, action.payload);
            uniqueNewLayer.pk = uuidv4().toString()
            uniqueNewLayer.style = {
                layout : {
                    'visibility': 'visible',
                },
                paint : {
                    'raster-opacity': 1,
                }
            }
            state.layersList = [...state.layersList, uniqueNewLayer]
        },

        /*
        => Remove "layer" from App
            action.payload = {
                layer: layer,
                style: style
            }
        */
        removeLayer: (state, action) => {
            // Here the action payload is a layer object
            state.layersList = state.layersList.filter(layer => layer.pk !== action.payload.pk);
        },

        /*
        => Update "layer" style
            action.payload = {
                layerPK: layer.pk,
                style: style
            }
        */
        setLayerStyle: (state, action) => {
            var layerUpdated = state.layersList.filter(layer => layer.pk === action.payload.layerPK)[0]
            layerUpdated.style = action.payload.layer.pk.newStyle
            state.layersList = [...state.layersList.filter(layer => layer.pk !== action.payload.pk), layerUpdated]
        },

        /*
        => Update "layer" style paint prop from prop name
            action.payload = {
                layerPK: layer.pk,
                paintPropName: Paint prop. name,
                paintPropvalue: Paint prop. value
            }
        */
        setLayerStylePaintProp: (state, action) => {
            var layerUpdated = state.layersList.filter(layer => layer.pk === action.payload.layerPK)[0]
            var layerListToKeep = state.layersList.filter(layer => layer.pk !== action.payload.layerPK);

            layerUpdated.style.paint[action.payload.paintPropName] = action.payload.paintPropValue
            state.layersList = [...layerListToKeep, layerUpdated]

        },

        /*
        => Update "layer" style layout prop from prop name
            action.payload = {
                layerPK: layer.pk,
                layoutPropName: Layout prop. name,
                layoutPropvalue: Layout prop. value
            }
        */
        setLayerStyleLayoutProp: (state, action) => {
            var layerUpdated = state.layersList.filter(layer => layer.pk === action.payload.layerPK)[0]
            var layerListToKeep = state.layersList.filter(layer => layer.pk !== action.payload.layerPK);

            layerUpdated.style.layout[action.payload.layoutPropName] = action.payload.layoutPropValue
            state.layersList = [...layerListToKeep, layerUpdated]
        }

    },
});

// This function exports the action methods
export const { addLayer, removeLayer, setLayerStyle, setLayerStylePaintProp, setLayerStyleLayoutProp } = layersSlice.actions;

// This functions exports the reducer as default
export default layersSlice.reducer;