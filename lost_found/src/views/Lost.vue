<script setup>
import { ref, computed } from "vue";
import Login from "./auth/Login.vue";
import Register from "./auth/Register.vue";

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

const zoom = ref(8);
const iconWidth = ref(50);
const iconHeight = ref(60);

const iconUrl = computed(
  () => `https://placekitten.com/${iconWidth.value}/${iconHeight.value}`
);
const iconSize = computed(() => [iconWidth.value, iconHeight.value]);

const log = (a) => {
  console.log(a);
};

const changeIcon = () => {
  iconWidth.value += 2;
  if (iconWidth.value > iconHeight.value) {
    iconWidth.value = Math.floor(iconHeight.value / 2);
  }
};
</script>
<template>
  <div>
    <h1>Report lost pet</h1>
    <!--check if user is logged-->
    <Register />
    <!-- if not login data -->
    <Login />
    <!-- else report data -->
    <form>
      <div class="mb-3">
        <label for="exampleInputName1" class="form-label">Pet name:</label>
        <input
          type="text"
          class="form-control"
          id="exampleInputPetName1"
          aria-describedby="petName"
        />
      </div>
      <div class="mb-3">
        <select class="form-select" aria-label="Default select example">
          <option selected>Species</option>
          <option value="1">Cat</option>
          <option value="2">Dog</option>
          <option value="3">Other - specify</option>
          <!--show bottom input if selected-->
        </select>
        <div>
          <label for="otherSpecie" class="form-label">Specie:</label>
          <input
            type="text"
            class="form-control"
            id="otherSpecie"
            aria-describedby="petSpecie"
          />
        </div>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label"
          >Explain how it is lost: Where, what is like, last seen, favorite
          places etc.</label
        >
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
      </div>
      <div class="form-check">
        <input
          class="form-check-input"
          type="checkbox"
          value="Yes"
          id="flexCheckDefault"
        />
        <label class="form-check-label" for="flexCheckDefault">
          Annonce award:
        </label>
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Specify reward:</label
        >
        <input
          type="number"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="100-10000 $"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Show on map where is lost:</label
        >
        <!--add logic on click to put circle and put the lat long in the box bellow-->
        <div style="height: 60vh; width: 100vw">
          <LMap
            :zoom="zoom"
            :center="[47.41322, -1.219482]"
            :use-global-leaflet="false"
            @move="log('move')"
          >
            <LTileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LControlLayers />
            <!--        
            <LMarker :lat-lng="[47.41322, -1.219482]">
            <LIcon :icon-url="iconUrl" :icon-size="iconSize" />
            </LMarker> -->
          </LMap>
        </div>
        <input
          type="text"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="latitude, longitude"
        />
      </div>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label"
          >Telephone for contact</label
        >
        <input
          type="tel"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="+123456"
        />
      </div>
      <div>
        Social media information
        <div class="input-group mb-3">
          <h3>Instagram:</h3>
          <span class="input-group-text" id="basic-addon1">@</span>
          <input
            type="text"
            class="form-control"
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
          />
        </div>

        <div class="input-group mb-3">
          <h3>Facebook:</h3>
          <input
            type="text"
            class="form-control"
            id="facebook"
            aria-describedby="facebook"
          />
        </div>
        <div class="input-group mb-3">
          <h3>Twitter:</h3>
          <input
            type="text"
            class="form-control"
            id="twitter"
            aria-describedby="twitter"
          />
        </div>
        <div class="mb-3">
          <label for="exampleFormControlTextarea2" class="form-label"
            >Other way - please specify how:</label
          >
          <textarea
            class="form-control"
            id="exampleFormControlTextarea2"
            rows="3"
          ></textarea>
        </div>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="exampleCheck1" />
        <label class="form-check-label" for="exampleCheck1">Check me out</label>
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>



<style lang="scss" scoped>
</style>