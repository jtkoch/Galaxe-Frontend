import React, {useState, useEffect} from 'react'
import {GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow} from 'react-google-maps'
import axios from 'axios'

function MapFunction() {
    const [pharmacy, setPharmacy] = useState([])
    const [selectedPharmacy, setSelectedPharmacy] = useState(null)

    useEffect(() => {
        axios 
            .get("http://localhost:9191/pharmacies")
            .then(res => {
                setPharmacy(res.data)
                console.log(res.data)
            })
            .catch(error => 
                {console.log('error', error)
            })
    }, [])

    return (
        <GoogleMap 
            defaultZoom={12} 
            defaultCenter={{lat: 38.627003, lng: -90.199402}}
        >
            {pharmacy.map((pharmacy) => (
                <Marker 
                    key={pharmacy.id} 
                    position={{lat: pharmacy.latitude, lng: pharmacy.longitude }}
                    onClick={() => {
                        setSelectedPharmacy(pharmacy)
                    }}
                />
            ))}

            {selectedPharmacy && (
                <InfoWindow
                    position={{
                        lat: selectedPharmacy.latitude, 
                        lng: selectedPharmacy.longitude 
                    }} 
                    onCloseClick={() => {
                        setSelectedPharmacy(null)
                    }}
                >
                    <div>
                        <h5>{selectedPharmacy.name}</h5>
                        <p>{selectedPharmacy.address}</p>
                        <p>{selectedPharmacy.city}</p>
                        <p>{selectedPharmacy.state}</p>
                        <p>{selectedPharmacy.zipCode}</p>
                    </div>
                </InfoWindow>
            )}
        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(MapFunction))

export default function Map() {

    return (
        <div style={{width: '65vw', height: '100vh'}}>
            <WrappedMap 
                googleMapURL={`//maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}`}
                loadingElement={<div style={{height: "80%" }} />}
                containerElement={<div style={{height: "80%" }} />}
                mapElement={<div style={{height: "80%" }} />}
            />
        </div>
    )
}
