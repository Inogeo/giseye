// This service is used to list available services
export default function CatalogServicesList({ services, handleServiceConnect }){

    const servicesDOM = []

    services.forEach(service => {
        if (service.uuid){
            servicesDOM.push(
                <div key={service.uuid} className="uk-background-muted uk-padding-small uk-margin-small-top" >
                    <div className="uk-grid-collapse"  uk-grid="">
                        <div className="uk-width-3-4">
                            <p className="uk-padding-remove uk-margin-remove">{service.type}: {service.name}</p>
                        </div>
                        <div className="uk-width-1-4">
                            <ul className="uk-iconnav">
                                <li><button uk-icon="icon: sign-in" uk-tooltip="title: Connect" onClick={e => handleServiceConnect(e, service)}></button></li>
                            </ul>
                        </div>
                    </div>
                </div>
            )
        }

    });

    return (
        <div>
            <div className="uk-padding-remove uk-overflow-auto" style={{ height: 'calc(100vh - 337px)' }}>
                {servicesDOM}
            </div>
        </div>

    )
}