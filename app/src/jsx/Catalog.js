// Import REACT
import React, {
    //useEffect,
    useState
} from "react";

// JSX components
import CatalogServiceConnect from './CatalogServiceConnect'
import CatalogNewService from "./CatalogNewService";
import CatalogServicesList from "./CatalogServicesList";


export default function Catalog({handleLayerAdd}){


    const [services, setServices] = useState([])
    const [serviceConnect, setserviceConnect] = useState({})


    function handleServiceAdd(newService){
        setServices(services.concat(newService));
    }

    function handleServiceConnect(e, service){
        setserviceConnect(service)
    }


    return (
        <div className = "uk-width-2-5@l" filter-catalog='true'>
            <div className="uk-grid-collapse" uk-grid=''>
                {/* Catalog Sources */}
                <div className='uk-width-2-5@s uk-padding-small uk-text-left uk-background-default'>
                    <div>
                        <CatalogNewService handleNewServiceAddToCatalog={handleServiceAdd}></CatalogNewService>
                        <CatalogServicesList services={services} handleServiceConnect={handleServiceConnect}></CatalogServicesList>
                    </div>
                </div>

                {/* Service connected (ServiceConnect) */}
                <div className='uk-width-3-5@s uk-padding-small uk-text-left uk-background-default'>
                    <CatalogServiceConnect key={serviceConnect.uuid} serviceConnect={serviceConnect} handleLayerAdd={handleLayerAdd}></CatalogServiceConnect>
                </div>
            </div>
        </div >
    )
    
}