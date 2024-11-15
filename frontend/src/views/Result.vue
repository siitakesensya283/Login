<template>
  <div class="content">
    <main class="dashboard-content">
      <p v-if="userName">ようこそ、{{ userName }}さん！</p>
      <p v-else>ユーザー名が見つかりません。</p>

      <section class="user-section">
        <h2>Result</h2>
        <div id="map" class="map-container"></div>
      </section>
    </main>
  </div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { mapGetters } from "vuex";
import "@/assets/style.css";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["userName", "gps"]),
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiOTZ5dWtpIiwiYSI6ImNseWk3MzVwMDBicWUyam9td3E4dXl6ODMifQ.fIecSqBE2QaBM_ZBP5X4wQ';

      const locate = this.gps.map((point, index) => ({
        name: `地点${index + 1}`,
        coords: [point.longitude, point.latitude]
      }));
      console.log(locate);///

      const totalCoords = locate.reduce(
        (acc, station) => {
          acc[0] += station.coords[0];
          acc[1] += station.coords[1];
          return acc;
        },
        [0, 0]
      );

      const centerCoords = [
        totalCoords[0] / locate.length,
        totalCoords[1] / locate.length
      ];

      console.log(centerCoords);///

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/96yuki/cm3f62sl9000i01sq8yul9ama',
        center: centerCoords,
        zoom: 16,
        scrollZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        dragRotate: false,
        keyboard: false,
        touchZoomRotate: false,
        dragPan: false,
      });



      locate.forEach(station => {
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';
        markerElement.style.backgroundColor = 'red';
        markerElement.style.width = '10px';
        markerElement.style.height = '10px';
        markerElement.style.borderRadius = '50%';
        const popup = new mapboxgl.Popup({ offset: 25 }).setText(station.name);

        markerElement.addEventListener('mouseenter', () => {
          popup.setLngLat(station.coords).addTo(map);
        });

        markerElement.addEventListener('mouseleave', () => {
          popup.remove();
        });

        new mapboxgl.Marker(markerElement)
          .setLngLat(station.coords)
          .addTo(map);
      });


      const line = {
        type: 'Feature',
        geometry: {
          type: 'LineString',
          coordinates: locate.map(station => station.coords)
        }
      };

      map.on('load', () => {
        map.addSource('line', {
          type: 'geojson',
          data: line
        });

        map.addLayer({
          id: 'line',
          type: 'line',
          source: 'line',
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': '#FF5733',
            'line-width': 4
          }
        });
      });

      const bounds = new mapboxgl.LngLatBounds();
      locate.forEach(station => bounds.extend(station.coords));
      map.fitBounds(bounds, { padding: 100 });
    }
  },
};
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 600px;
  border: 1px solid #ddd;
}

.marker {
  background-color: #FF5733;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 3px solid #fff;
}
</style>
