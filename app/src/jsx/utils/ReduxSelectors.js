// Select layerList without "style" elements in order to avoid re-rendering map if layer style changes
export function layerSliceStateGetLayerListWithoutStyle(state) {
    const selectedItem = state.LayersSlice.layersList.map(({ style, ...propsFilterItems }) => {
        return propsFilterItems;
    });
    return selectedItem
}

// Select one specific layer among layer list
export function layerSliceStateGetLayer (state, layerPK){
    const selectedItem = state.LayersSlice.layersList.filter(layer => layer.pk === layerPK)[0]
    return selectedItem
}

// Select map properties
export function mapSliceGet(state) {
    const selectedItem = state.MapSlice.center
    return selectedItem
}