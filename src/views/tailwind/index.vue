<template>
  <div class="app-container">
    <h1 class="text-4xl text-green-500">tailwind</h1>
    <p>Your location is:</p>
    <p>Latitude: {{ loc.lat }}</p>
    <p>Longitude: {{ loc.long }}</p>

    <button
      class="bg-cyan-500 hover:bg-cyan-600 rounded-md p-2 text-white"
      @click="getCurrentPosition"
    >
      Get Current Location
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation'; //追蹤設備目前位置
import { Camera, CameraResultType } from '@capacitor/camera'; //取用相機

const loc = ref({
  lat: null,
  long: null,
});

const getCurrentPosition = async () => {
  const pos = await Geolocation.getCurrentPosition();
  loc.value = {
    lat: pos.coords.latitude,
    long: pos.coords.longitude,
  };
};

const takePicture = async () => {
  const photo = await Camera.getPhoto({
    resultType: CameraResultType.Uri,
  });
  console.log(photo);
};
</script>

<style></style>
