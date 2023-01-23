// Import UIKIT (front-end css framework)
import UIkit from 'uikit';
import 'uikit/dist/css/uikit.css';
import Icons from 'uikit/dist/js/uikit-icons';

// Import JSX components
import Catalog from './jsx/Catalog';
import Map from './jsx/Map'
import Legend from './jsx/Legend'

// Fix for uikit icons
UIkit.use(Icons);

function App() {
  return (
    <div className='uk-text-center uk-height-1-1' uk-filter="target: .js-filter">

      {/* Content */}      
      <div className='uk-grid-collapse uk-height-1-1' uk-grid=''>

        {/*Toolbar*/}
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
          <Catalog></Catalog>

          {/* Main map */}
          <div className='uk-width-expand@m uk-height-1-1 uk-text-left' filter-catalog='true' filter-map='true' filter-maponly='true'>
            <Map></Map>
          </div>

          {/* Main map legend */}
          <Legend></Legend>

        </div>
      </div>
    </div>
  );
}

export default App;
