<template>
  <div class="child">
    <h2>子組件</h2>

    <!-- 父元件傳遞多個資料 -->
    <div>接收的值：{{ props.modelValue }}</div>
    <input :value="props.modelValue" />
    <button @click="update">update</button>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emits = defineEmits(['update:modelValue']);

const update = () => {
  emits('update:modelValue', props.modelValue + 1);
};
</script>

<style>
.child {
  width: 90%;
  padding: 10px;
  border: 1px solid #1bf;
  margin-bottom: 40px;
}
</style>
