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
    ...mapGetters(["userName"]),
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    initializeMap() {
      mapboxgl.accessToken = 'pk.eyJ1IjoiOTZ5dWtpIiwiYSI6ImNseWk3MzVwMDBicWUyam9td3E4dXl6ODMifQ.fIecSqBE2QaBM_ZBP5X4wQ';

      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/96yuki/cm3f62sl9000i01sq8yul9ama', // カスタムスタイルのURLに変更
        center: [139.43218650873203, 35.65835525480004],
        zoom: 16,
        scrollZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        dragRotate: false,
        keyboard: false,
        touchZoomRotate: false,
        dragPan: false,
      });


      // 地図のスタイルがロードされたら、指定されたレイヤーを非表示にする
      map.on('style.load', function () {
        const layersToHide = [
          'poi-label',         // 施設名のラベル
          'place-label',       // 場所のラベル
          'settlement-label',  // 集落のラベル
          'country-label',     // 国名ラベル
          'region-label',      // 地域のラベル
          'state-label',       // 州のラベル
          'district-label'     // 地区のラベル
        ];

        // 各レイヤーを非表示に設定
        layersToHide.forEach(function (layer) {
          if (map.getLayer(layer)) {
            map.setLayoutProperty(layer, 'visibility', 'none');
          }
        });
      });

      const locate = [
        { name: '地点1', coords: [139.43218650873203, 35.65835525480004] },
        { name: '地点2', coords: [139.43181308817225, 35.657951626396134] },
        { name: '地点3', coords: [139.43268126920947, 35.65758613795024] },
        { name: '地点4', coords: [139.43283599195956, 35.658345319880716] },
        { name: '地点5', coords: [139.43218896955014, 35.65836327893575] }
      ];

      locate.forEach(station => {
        const markerElement = document.createElement('div');
        markerElement.className = 'marker';

        // マーカーのスタイル
        markerElement.style.backgroundColor = 'red';
        markerElement.style.width = '10px';
        markerElement.style.height = '10px';
        markerElement.style.borderRadius = '50%';

        new mapboxgl.Marker(markerElement)
          .setLngLat(station.coords)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(station.name))
          .addTo(map);
      });

      // 地図の表示範囲を調整
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
