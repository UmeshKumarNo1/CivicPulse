import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

function LocationMarker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : <Marker position={position} />;
}

const MapPicker = ({ location, setLocation }) => {
  const [position, setPosition] = useState(
    location ? { lat: location.lat, lng: location.lng } : { lat: 40.7128, lng: -74.0060 }
  );

  useEffect(() => {
    if (position) {
      // In a real app, you would use reverse geocoding API here
      const address = `${position.lat.toFixed(4)}, ${position.lng.toFixed(4)}`;
      setLocation({
        lat: position.lat,
        lng: position.lng,
        address: address
      });
    }
  }, [position, setLocation]);

  return (
    <div className="map-container">
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={13}
        style={{ height: '100%', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <LocationMarker position={position} setPosition={setPosition} />
      </MapContainer>
    </div>
  );
};

export default MapPicker;

