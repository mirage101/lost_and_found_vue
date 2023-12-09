<script>
import {
  LControlLayers,
  LIcon,
  LMap,
  LMarker,
  LPolygon,
  LPolyline,
  LPopup,
  LRectangle,
  LTileLayer,
  LTooltip,
} from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";
export default {
  components: {
    LMap,
    LIcon,
    LTileLayer,
    LMarker,
    LControlLayers,
    LTooltip,
    LPopup,
    LPolyline,
    LPolygon,
    LRectangle,
  },
  data() {
    return {
      zoom: 8,
      iconWidth: 50,
      iconHeight: 60,
    };
  },
  computed: {
    iconUrl() {
      return `https://placekitten.com/${this.iconWidth}/${this.iconHeight}`;
    },
    iconSize() {
      return [this.iconWidth, this.iconHeight];
    },
  },
  methods: {
    log(a) {
      console.log(a);
    },
    changeIcon() {
      this.iconWidth += 2;
      if (this.iconWidth > this.iconHeight) {
        this.iconWidth = Math.floor(this.iconHeight / 2);
      }
    },
  },
};
</script>

<template>
  <main>
    <h1>Lost and found pets in your area:</h1>
    <div style="height: 75vh; width: 100vw">
      <LMap
        :zoom="zoom"
        :center="[47.41322, -1.219482]"
        :use-global-leaflet="false"
        @move="log('move')"
      >
        <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <LControlLayers />
        <!-- <LMarker :lat-lng="[0, 0]" draggable @moveend="log('moveend')">
          <LTooltip> lol </LTooltip>
        </LMarker> -->

        <LMarker :lat-lng="[47.41322, -1.219482]">
          <LIcon :icon-url="iconUrl" :icon-size="iconSize" />
        </LMarker>

        <!-- <LMarker :lat-lng="[50, 50]" draggable @moveend="log('moveend')">
          <LPopup> lol </LPopup>
        </LMarker> -->

        <!-- <LPolyline
          :lat-lngs="[
            [47.334852, -1.509485],
            [47.342596, -1.328731],
            [47.241487, -1.190568],
            [47.234787, -1.358337],
          ]"
          color="green"
        /> -->
        <!-- <LPolygon
          :lat-lngs="[
            [46.334852, -1.509485],
            [46.342596, -1.328731],
            [46.241487, -1.190568],
            [46.234787, -1.358337],
          ]"
          color="#41b782"
          :fill="true"
          :fill-opacity="0.5"
          fill-color="#41b782"
        /> -->
        <!-- <LRectangle
          :lat-lngs="[
            [46.334852, -1.509485],
            [46.342596, -1.328731],
            [46.241487, -1.190568],
            [46.234787, -1.358337],
          ]"
          :fill="true"
          color="#35495d"
        />
        <LRectangle
          :bounds="[
            [46.334852, -1.190568],
            [46.241487, -1.090357],
          ]"
        >
          <LPopup> lol </LPopup>
        </LRectangle> -->
      </LMap>
      <button @click="changeIcon">New kitten icon</button>
    </div>
    <!--Tabs-->
    <!--List of lost pets from this species and contact icon for the owner-->
    <!--List of found pets from this species and contact icon for the owner-->
  </main>
</template>
  