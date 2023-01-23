// Libraries
import {
    //useDispatch,
    useSelector,
} from "react-redux";

// JSX components
import LegendLayer from "./LegendLayer";

// REDUX Selectors
import { layerSliceStateGetLayerListWithoutStyle } from "./utils/ReduxSelectors";

export default function Legend() {

    // Attaching layers to REDUX Store State (here layers without style)
    const layers = useSelector(state => layerSliceStateGetLayerListWithoutStyle(state));

    const layersDOM = []
    for (var i = 0; i < layers.length; i++) {
        const layer = layers[i]
        layersDOM.push(
            <LegendLayer key={layer.pk} layerPK={layer.pk}></LegendLayer>
        )
    }

    return(
        <div className='uk-width-1-6@l uk-width-1-5@m uk-padding-small uk-text-left uk-background-default' filter-catalog='true' filter-map='true'>
            <p className='uk-text-large'>Legend</p>
            <hr></hr>
            <div className="uk-overflow-auto" style={{ height: 'calc(100vh - 151px)' }} >
                <ul uk-accordion='multiple: true' uk-sortable="handle: .uk-sortable-handle">
                    {layersDOM}
                </ul>
            </div>
        </div>
    )
}