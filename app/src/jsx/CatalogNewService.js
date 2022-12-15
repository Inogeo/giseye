
// Import REACT
import React, {
    //useEffect,
    useState
} from "react";

// Import UIKIT (front-end css framework)
import UIkit from 'uikit';

// UUID generator
import { v4 as uuidv4 } from 'uuid';

export default function CatalogNewService({handleNewServiceAddToCatalog}){

    const [serviceType, setServiceType] = useState('')
    const [serviceName, setServiceName] = useState('')
    const [serviceURL, setServiceURL] = useState('')

    function handleNewServiceAdd(e) {
        // Prevent page from reloading
        e.preventDefault()

        // Initial check of data

        // Service name
        if (!serviceName) {
            UIkit.notification('Name of service is empty', { status: 'warning' });
        }
        else {
            // Service type
            if (!serviceType || serviceType === "") {
                UIkit.notification('Please select service type', { status: 'warning' });
                // URL
            }
            else {
                if (!serviceURL) {
                    UIkit.notification('URL of service is empty', { status: 'warning' });
                }
                else {
                    try {
                        // Setting as URL to facilitate fetching
                        setServiceURL(new URL(serviceURL))

                        // Create a service among available services
                        const newService = [{
                            'name': serviceName,
                            'type': serviceType,
                            'url': serviceURL,
                            'uuid': uuidv4()
                        }]

                        // Add service to catalog
                        handleNewServiceAddToCatalog(newService);

                    } catch (error) {
                        UIkit.notification('URL of service is not valid', { status: 'warning' });
                    }
                }
            }

        }

    }
    function handleNewServiceTypeChange(e) {
        setServiceType(e.target.value)
    }

    function handleNewServiceURLChange(e) {
        setServiceURL(e.target.value)
    }

    function handleNewServiceURLFocus(e) {
        if (!serviceURL || serviceURL === '') (
            setServiceURL('https://')
        )
    }
    function handleNewServiceNameChange(e) {
        setServiceName(e.target.value)
    }

    return (
        <div>
            <p className='uk-text-large '>Data sources</p>
            <hr></hr>
            <form onSubmit={handleNewServiceAdd}>
                <fieldset className="uk-fieldset">
                    <div className="uk-margin-small">
                        <input className="uk-input uk-form-small" type="text" placeholder="Name of service" onChange={handleNewServiceNameChange} />
                    </div>
                    <div className="uk-margin-small">
                        <select className="uk-select uk-form-small" onChange={handleNewServiceTypeChange}>
                            <option value="">Select type</option>
                            <option value="WMTS">WMTS</option>
                            <option value="WMS">WMS</option>
                        </select>
                    </div>
                    <div className="uk-margin-small">
                        <input className="uk-input uk-form-small" type="text" placeholder="URL for service" value={serviceURL} onChange={handleNewServiceURLChange} onFocus={handleNewServiceURLFocus} />
                    </div>
                    <button className="uk-button uk-form-small uk-button-default" type="submit">Add service</button>
                </fieldset>
            </form>
            <hr></hr>
            <form className="uk-search uk-search-default uk-width-1-1">
                <span uk-search-icon=""></span> <input className="uk-search-input uk-width-1-1" type="search" placeholder="Search data sources" />
            </form>
        </div>
    )
}