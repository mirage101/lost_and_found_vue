<script setup>
import { ref, computed } from "vue";
import { useAuthStore } from "../stores/auth";
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

const authStore = useAuthStore();

const user = computed(() => {
  return authStore.user;
});

const isAuthenticated = computed(() => {
  return authStore.isAuthenticated;
});

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

//images
</script>
<template>
  <div>
    <h1>Report lost pet</h1>
    <!--check if user is logged-->
    <!-- if not login data -->

    <!-- else report data -->
    <template v-if="isAuthenticated">
      <form>
        <h3 v-if="isAuthenticated">Hello {{ user.username }} {{ user.id }}</h3>
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
        <div id="images" class="container my-3">
          <div class="row">
            <div class="col-12 text-center">
              <h1 class="mb-3">Upload Image</h1>
            </div>
            <div class="col-md-5 offset-md-1">
              <h5>1. single file</h5>
              <form>
                <div class="form-group">
                  <label for="my-file">Select Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    @change="previewImage"
                    class="form-control-file"
                    id="my-file"
                  />

                  <div class="border p-2 mt-3">
                    <p>Preview Here:</p>
                    <template v-if="preview">
                      <img :src="preview" class="img-fluid" />
                      <p class="mb-0">file name: {{ image.name }}</p>
                      <p class="mb-0">size: {{ image.size / 1024 }}KB</p>
                    </template>
                  </div>
                </div>
              </form>
            </div>

            <div class="w-100"></div>
            <div class="col-12 mt-3 text-center">
              <p class="text-primary">
                * You should send data "image" & "image_list" via API to upload
                image files.
              </p>
              Reset input file <button @click="reset">Clear All</button>
            </div>
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
          <label class="form-check-label" for="exampleCheck1"
            >Check me out</label
          >
        </div>

        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
    </template>
    <template v-else>
      <Login />
    </template>
  </div>
</template>



<style lang="scss" scoped>
</style>