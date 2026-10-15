const map = new mapboxgl.Map({
    accessToken: mapToken,
    container: "map", // container ID
    center: listing.geometry.coordinates, // starting position [lng, lat]. Note that lat must be set between -90 and 90
    zoom: 9 // starting zoom
});

const marker1 = new mapboxgl.Marker({ color: 'red' })
.setLngLat(listing.geometry.coordinates) // Listing.geometry.coordinates
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(`<h4>${listing.title}</h4>
     <div class="popup-badge">
        <span class="badge-icon">🔒</span>
        <span>Exact location will be provided after booking</span>
    </div>`))
.addTo(map);