<template>
  <div class="child">
    <p>Message to grand child: {{ message }}</p>
  </div>
</template>

<script setup>
import { inject } from 'vue';

const message = inject('message');
console.log(message.value, 'inject message');
</script>
