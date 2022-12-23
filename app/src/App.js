// Import UIKIT (front-end css framework)
import UIkit from 'uikit';
import 'uikit/dist/css/uikit.css';
import Icons from 'uikit/dist/js/uikit-icons';

// Import REACT
import React, {
  //useEffect,
  useState,
} from "react";

// Import JSX components
import Catalog from './jsx/Catalog';
import Map from './jsx/Map'

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

  // Fetching params from window
  const queryParameters = new URLSearchParams(window.location.search)
  var xURLParam
  var yURLParam
  var zURLParam
  if (queryParameters.get("x") && queryParameters.get("y") && queryParameters.get("z")){
    xURLParam = queryParameters.get("x")
    yURLParam = queryParameters.get("y")
    zURLParam = queryParameters.get("z")
  }
  else {
    xURLParam = 18.411385
    yURLParam = 25.850485
    zURLParam = 1.766200
  }


  return (
    <div className='uk-text-center uk-height-1-1' uk-filter="target: .js-filter">

      {/* Content */}

      {/*Toolbar*/}
      <div className='uk-grid-collapse uk-height-1-1' uk-grid=''>

  
        <div className='uk-width-auto uk-height-1-1 uk-text-left uk-background-primary uk-light' filter-catalog='true' filter-map='true' filter-maponly='true'>
          <ul className="uk-iconnav uk-iconnav-vertical">
            <li className="uk-active" uk-filter-control="[filter-maponly='true']">
              <a href="/" className="uk-padding-small uk-padding-remove-bottom">
                <span uk-icon="icon: location" uk-tooltip="title: Map; pos: right;"></span>
              </a>
            </li>
            <li uk-filter-control="[filter-map='true']">
              <a href="/" className="uk-padding-small uk-padding-remove-bottom">
                <span uk-icon="icon: list" uk-tooltip="title: Map with legend; pos: right;"></span>
              </a>
            </li>
            <li uk-filter-control="[filter-catalog='true']">
              <a href="/" className="uk-padding-small uk-padding-remove-bottom">
                <span uk-icon="icon: search" uk-tooltip="title: Add service; pos: right;"></span>
              </a>
            </li>
            <li href=''>
              <a href="https://github.com/Inogeo/giseye/issues" target="_blank" rel="noreferrer" className="uk-padding-small uk-padding-remove-bottom">
                <span uk-icon="icon: warning" uk-tooltip="title: Report a bug; pos: right;"></span>
              </a>
            </li>
          </ul>
        </div>
        
        <div className='uk-grid-collapse js-filter uk-height-1-1 uk-width-expand uk-overflow-auto' uk-grid=''>

          {/*Catalog*/}
          <Catalog handleLayerAdd={handleLayerAdd}></Catalog>

          {/* Main map */}
          <div className='uk-width-expand@m uk-height-1-1 uk-text-left' filter-catalog='true' filter-map='true' filter-maponly='true'>
            <Map x={xURLParam} y={yURLParam} z={zURLParam} ></Map>
          </div>

          {/* Main map legend */}
          <div className='uk-width-1-6@l uk-width-1-5@m uk-padding-small uk-text-left uk-background-default' filter-catalog='true' filter-map='true'>
            <p className='uk-text-large'>Legend</p>
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
    </div>
  );
}

export default App;
