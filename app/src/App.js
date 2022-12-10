// Import UIKIT (front-end css framework)
import UIkit from 'uikit';
import 'uikit/dist/css/uikit.css';
import Icons from 'uikit/dist/js/uikit-icons';

// Import REACT
import React, {
  //useEffect,
  useState
} from "react";

// Import Leaflet
import L from 'leaflet';
import { MapContainer, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

// Import JSX components
import Catalog from './jsx/Catalog';
import { WMSTileLayer } from 'react-leaflet/WMSTileLayer'

// Fix for leaflet default markers sources
delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({type
//   iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png').default,
//   iconUrl: require('leaflet/dist/images/marker-icon.png').default,
//   shadowUrl: require('leaflet/dist/images/marker-shadow.png').default
// });

// Fix for uikit icons
UIkit.use(Icons);

function App() {

  const [layers, setLayers] = useState([])

  function handleLayerAdd(e,layer) {
    setLayers(layers.concat([layer]))
  }

  var mapLayersDOM = []
  layers.forEach(layer => (
    mapLayersDOM.push(
      layer.DOM
    )
  ))

  return (
    <div className='uk-text-center uk-height-1-1' uk-filter="target: .js-filter">
      {/* Nav Bar to filter components */}
        <nav className="uk-navbar-container uk-margin-remove" uk-navbar="">
          <div className="uk-navbar-left">
            <a className="uk-navbar-item uk-logo" href="/"><span className="uk-margin-medium-left uk-text-center" uk-icon="icon: world; ratio: 1.4"></span></a>
            <ul className="uk-navbar-nav">
              <li uk-filter-control="[filter-map='true']">
                <a href="/">Default</a>
              </li>
              <li uk-filter-control="[filter-maponly='true']">
                <a href="/">Fullscreen</a>
              </li>
              <li className="uk-active" uk-filter-control="[filter-catalog='true']">
                <a href="/">Catalog</a>
              </li>
            </ul>
          </div>
        </nav>

      {/* Content */}
      <div className='uk-grid-collapse js-filter' uk-sortable="handle: .uk-sortable-handle" style={{ height: 'calc(100% - 80px)' }} uk-grid=''>

        {/*Catalog*/}
        <Catalog handleLayerAdd={handleLayerAdd}></Catalog>

        {/* Main map */}
        <div className='uk-width-expand@m uk-height-1-1 uk-text-left' filter-catalog='true' filter-map='true' filter-maponly='true'>
          <MapContainer center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} className="uk-height-1-1">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
            />
            {mapLayersDOM}
          </MapContainer>
        </div>

        {/* Main map legend */}
        <div className='uk-width-1-6@l uk-width-1-5@m uk-padding-small uk-text-left uk-background-default' filter-catalog='true' filter-map='true'>
          <p className='uk-text-large'><span className="uk-sortable-handle uk-margin-small-right uk-text-center" uk-icon="icon: table"></span>Legend</p>
          <hr></hr>
          <ul uk-accordion='' uk-sortable="handle: .uk-sortable-handle">
            <li className='uk-open uk-background-muted uk-padding-small'>
              <a className='uk-accordion-title' href="/" uk-tooltip="Drag/Drop to re-order layers; delay: 500">
                <span className="uk-sortable-handle uk-margin-small-right uk-text-center" uk-icon="icon: table" uk-tooltip="Change layer order"></span>
                Layer 1
              </a>
              <div className='uk-accordion-content'>
                <span className="uk-margin-small-right uk-text-center" uk-icon="icon: ban" uk-tooltip="Toggle visibility"></span>
                <span className="uk-margin-small-right uk-text-center" uk-icon="icon: search" uk-tooltip="Zoom to extent" uk-filter-control="[filter-attable='layer']"></span>
                <input className="uk-range" type="range" value="2" min="0" max="10" step="0.1" readOnly={true}></input>
              </div>
            </li>
          </ul>
        </div>

      </div>

    </div>
  );
}

export default App;
