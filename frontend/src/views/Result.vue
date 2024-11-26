<template>
  <div id="map"></div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { mapGetters } from 'vuex';
import '@/assets/style.css';

export default {
  data() {
    return {
      mapboxToken: 'pk.eyJ1IjoiOTZ5dWtpIiwiYSI6ImNseWk3MzVwMDBicWUyam9td3E4dXl6ODMifQ.fIecSqBE2QaBM_ZBP5X4wQ',
      formatGps: [],
    };
  },
  computed: {
    ...mapGetters(['userName', 'gps', 'canSpeed']),
  },
  mounted() {
    this.initializeMap();
  },
  methods: {
    async createFormatGps() {//イベント込みのgpsの作成
      let formatGps = this.gps.map(gpsPoint => ({
        longitude: gpsPoint.longitude,
        latitude: gpsPoint.latitude,
        time: gpsPoint.time,
        flg: 0,//速度超過flg
        message: "",//イベント内容
      }));
      this.formatGps = formatGps;//formatGpsをdataに保存

      this.canSpeed.forEach(canSpeedPoint => {
        if (canSpeedPoint[4] !== 0) {//canSpeedPoint[4]=canSpeed.flg
          const closet = this.getClosestGps(canSpeedPoint[3]);//closetは添え字//canSpeedPoint[3]=canSpeed.time
          this.formatGps[closet].flg = canSpeedPoint[4];
        }
      });

      this.getMessage();
    },

    getMessage() {//イベントの内容を割り当て
      this.formatGps.forEach((formGps, index) => {
        if (index === 0) {
          this.formatGps[index].message = '開始';
        }
        else if (index === this.formatGps.length - 1) {
          this.formatGps[index].message = '終了';
        }
        else {
          if ((formGps.flg - this.formatGps[index - 1].flg) > 0) {//速度を超過
            this.formatGps[index].message = (formGps.flg === 1) ? '軽度速度超過'
              : (formGps.flg === 2) ? '重度速度超過'
                : '';
          }
        }
      });
    },

    getClosestGps(canTime) {//一番近いtimeを持つformatGpsを探索し、添え字を返す
      let minDiff = Math.abs(new Date(canTime) - new Date(this.formatGps[0].time));
      let closet = 0;
      for (let i = 1; i < this.formatGps.length; i++) {
        const diff = Math.abs(new Date(canTime) - new Date(this.formatGps[i].time));//timeの差を取得し、比べる
        if (diff < minDiff) {
          minDiff = diff;
          closet = i;
        }
      }
      return closet;//添え字を返す
    },

    calculateCenter() {//各座標の平均をとり地図の中心を決める
      let totalLongitude = 0;
      let totalLatitude = 0;
      const totalPoints = this.formatGps.length;

      this.formatGps.forEach(gpsPoint => {
        totalLongitude += gpsPoint.longitude;
        totalLatitude += gpsPoint.latitude;
      });

      const averageLongitude = totalLongitude / totalPoints;
      const averageLatitude = totalLatitude / totalPoints;

      return [averageLongitude, averageLatitude];
    },

    async initializeMap() {//最初に呼び出し
      await this.createFormatGps();
      const bounds = new mapboxgl.LngLatBounds();
      const center = this.calculateCenter();

      mapboxgl.accessToken = this.mapboxToken;
      const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/96yuki/cm3f62sl9000i01sq8yul9ama',
        center: center,
        zoom: 16,
        scrollZoom: false,
        doubleClickZoom: false,
        boxZoom: false,
        dragRotate: false,
        keyboard: false,
        touchZoomRotate: false,
        dragPan: false,
      });

      this.formatGps.forEach((gpsPoint, index) => {//gpsの各座標の設定
        const color = (index == 0 || index == this.formatGps.length - 1)//最初と最後の座標を#19FF29(黄緑)に設定
          ? '#19FF29'
          : (gpsPoint.flg - this.formatGps[index - 1].flg) > 0//速度超過した座標
            ? this.getMarkerColor(gpsPoint.flg)//マーカーの色を変更(flgを参照)
            : '';

        const markerElement = document.createElement('div');//各座標に<div>を付与
        markerElement.style.width = '12px';
        markerElement.style.height = '12px';
        markerElement.style.backgroundColor = color;
        markerElement.style.borderRadius = '50%';
        markerElement.style.cursor = 'pointer';

        if (index == 0 || (index == this.formatGps.length - 1) || (gpsPoint.flg - this.formatGps[index - 1].flg) > 0) {
          //最初と最後、速度超過した座標の添え字で条件分け
          const popup = new mapboxgl.Popup({//popupを定義(ホバーでmessageを表示)
            closeButton: false,
            closeOnClick: false
          }).setText(gpsPoint.message);

          new mapboxgl.Marker(markerElement)//markerを設定
            .setLngLat([gpsPoint.longitude, gpsPoint.latitude])
            .setPopup(popup)//popupを設定
            .addTo(map);

          let popupVisible=false;

          markerElement.addEventListener('mouseenter', () => {
            popup.addTo(map);
          });
          markerElement.addEventListener('mouseleave', () => {
            popup.remove();
          });
          markerElement.addEventListener('touchstart', () => {
            if(popupVisible){
              popup.remove();
            }else{
              popup.addTo(map);
            }
          });
        }

        bounds.extend([gpsPoint.longitude, gpsPoint.latitude]);
      });

      map.fitBounds(bounds, { padding: 50 });
      map.setMaxBounds(bounds);
      this.connectMarkers(map, this.formatGps);
    },

    getMarkerColor(flg) {//markerの色をflgで変える
      switch (flg) {
        case 0://制限速度内(事前に除外済み)
          return 'transparent';
        case 1://制限速度+5まで
          return '#FFB733';
        case 2://制限速度+6以上
          return '#FF0000';
        default:
          return 'gray';
      }
    },

    connectMarkers(map, formatGps) {//各座標をつなぐ
      const lineSegments = [];
      const coordinates = [];

      formatGps.forEach((gpsPoint, index) => {
        coordinates.push([gpsPoint.longitude, gpsPoint.latitude]);

        if (index > 0) {//添え字が0以上なら一つ前の座標とつなぐ
          const previousPoint = formatGps[index - 1];
          const currentPoint = formatGps[index];
          const lineColor = this.getLineColor(previousPoint.flg);

          lineSegments.push({
            type: 'Feature',
            geometry: {
              type: 'LineString',
              coordinates: [
                [previousPoint.longitude, previousPoint.latitude],
                [currentPoint.longitude, currentPoint.latitude]
              ]
            },
            properties: {
              flg: previousPoint.flg,
              color: lineColor
            }
          });
        }
      });

      map.on('load', () => {
        map.addSource('lineSegments', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: lineSegments
          },
        });

        map.addLayer({
          id: 'lineSegmentsLayer',
          type: 'line',
          source: 'lineSegments',
          layout: {
            'line-join': 'round',
            'line-cap': 'round',
          },
          paint: {
            'line-color': [
              'get', 'color'
            ],
            'line-width': 4,//lineの幅
          },
        });
      });
    },

    getLineColor(flg) {//lineの色をflgで変える
      switch (flg) {
        case 0://制限速度内
          return '#969696';
        case 1://制限速度+5まで
          return '#FF9829';
        case 2://制限速度+6以上
          return '#FF0000';
        default:
          return '#000000';
      }
    },
  },
};
</script>
