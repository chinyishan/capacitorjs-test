<template>
  <div class="child">
    <h2>子組件</h2>

    <!-- 父元件傳遞多個資料 -->
    <input v-model="childCounterValue" />
    <div>{{ childStringValue }}</div>
    <button @click="update">update</button>

    <!-- 父元件只傳遞一個資料 -->
    <!-- <div>{{ modelValue }}</div> -->

    <!-- 深層組件 -->
    <h3>深層組件 provide 和 inject</h3>
    <GrandChild />
  </div>
</template>

<script setup>
import GrandChild from './GrandChild.vue';
// 子元件可以自由定義接收的變數，不再需要制式化的使用 v-model 定義好的 modelValue

// 父元件只傳遞一個資料
// const modelValue = defineModel({ type: String, default: 'sunny' });

// 父元件傳遞多個參數
// const childCounterValue = defineModel('couterValue');
// const childStringValue = defineModel('stringValue');

const childCounterValue = defineModel('couterValue', {
  type: Number,
  default: 100,
});
const childStringValue = defineModel('stringValue', {
  type: String,
  default: 'hello name',
});

// 可以連同父組件一起改變
const update = () => {
  // 使用 .value 就能直接與父組件 v-model 綁定的值(counterValue)同步
  childCounterValue.value++;
  childStringValue.value = 'hello sunny';
};
</script>

<style>
.child {
  width: 90%;
  padding: 10px;
  border: 1px solid #1bf;
}
</style>
