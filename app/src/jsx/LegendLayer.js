// Import REDUX
import { useDispatch, useSelector } from 'react-redux'
import { removeLayer, setLayerStylePaintProp, setLayerStyleLayoutProp } from "./slices/LayersSlice";

// Import debouncer hook
import { useDebouncedCallback } from "use-debounce";

// Import REDUX custom selectors
import { layerSliceStateGetLayer } from "./utils/ReduxSelectors";

export default function LegendLayer({layerPK}){
    
    // Loading dispatch function from REDUX
    const dispatch = useDispatch()

    // We subscribe to layer from REDUX store
    const layer = useSelector(state => layerSliceStateGetLayer(state, layerPK))

    // Function standardizing Paint Properties changes
    function handleLayerStylePaintProp(paintPropName, paintPropValue){
        const payload = {
            layerPK : layer.pk,
            paintPropName: paintPropName,
            paintPropValue: paintPropValue
        }

        // Applying property change
        dispatch(setLayerStylePaintProp(payload))
    }

    // Function standardizing Layout Properties changes
    function handleLayerStyleLayoutProp(layoutPropName, layoutPropValue) {
        const payload = {
            layerPK: layer.pk,
            layoutPropName: layoutPropName,
            layoutPropValue: layoutPropValue
        }

        // Applying property change
        dispatch(setLayerStyleLayoutProp(payload))
    }

    // Function to handle layer opacity (applying updated value to REDUX store)
    const handleLegendLayerOpacity = useDebouncedCallback((e) => {
        const paintPropName = 'raster-opacity'
        const paintPropValue = parseInt(e.target.value, 10) / 100
        handleLayerStylePaintProp(paintPropName, paintPropValue)
    }, 20)

    // Function to handle layer opacity (applying updated value to REDUX store)
    const handleLegendLayerVisibility = useDebouncedCallback(() => {
        const layoutPropName = 'visibility'

        var layoutPropValue
        if (layer.style.layout['visibility'] === 'visible'){
            layoutPropValue = 'none'
        }
        else{
            layoutPropValue = 'visible'
        }
        handleLayerStyleLayoutProp(layoutPropName, layoutPropValue)
    }, 20)

    // The code belox determines the color of layer hide/unhide button
    var visibilityButtonClassName
    if (layer.style.layout['visibility'] === 'visible'){
        visibilityButtonClassName = "uk-margin-small-right uk-text-center"
    }
    else {
       visibilityButtonClassName = "uk-margin-small-right uk-text-center uk-text-danger"
    }

    return (
        <li key={layer.uuid} className='uk-open uk-background-muted uk-padding-small'>
            <a className='uk-accordion-title uk-text-small uk-text-bold' href="/" uk-tooltip="Drag/Drop to re-order layers; delay: 500">
                {/* <span className="uk-sortable-handle uk-margin-small-right uk-text-center" uk-icon="icon: table" uk-tooltip="Change layer order"></span> */}
                {layer.title}
            </a>
            <div className='uk-accordion-content'>
                <div uk-grid="">
                    <div className="uk-width-auto">
                        <button className={visibilityButtonClassName} uk-icon="icon: ban; ratio: 0.9" uk-tooltip="Toggle visibility" onClick={() => { handleLegendLayerVisibility() }}></button>
                        <button className="uk-margin-small-right uk-text-center" uk-icon="icon: trash; ratio: 0.9" uk-tooltip="Remove layer" onClick={() => { dispatch(removeLayer(layer)) }}></button>
                    </div>
                    <div className="uk-width-expand uk-padding-remove-left">
                        <input className="uk-range" type="range" defaultValue={layer.style.paint['raster-opacity']*100} min="0" max="100" step="0.1" aria-label="Range" onChange={(e) => { handleLegendLayerOpacity(e) }}></input>
                    </div>
                </div>
            </div>
        </li>
    )
}