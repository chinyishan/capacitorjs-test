<template>
  <div class="app-container">
    <!--父元件只傳遞一個資料 -->
    <!-- <child v-model="modelValue" /> -->

    <!-- 父元件傳遞多個資料 -->
    <h2>defineModel()</h2>
    <p>父元件值: {{ counterValue }}</p>
    <p>父元件字串: {{ stringValue }}</p>
    <Child
      v-model:couterValue="counterValue"
      v-model:stringValue="stringValue"
    />

    <h2>defineProps() 和 defineEmits()</h2>
    <p>{{ value }}</p>
    <ChildPropsEmit v-model="value" />

    <!-- 深層組件 -->
    <h2>深層組件 provide 和 inject</h2>
    <input v-model="message" />
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import Child from './components/child.vue';
import ChildPropsEmit from './components/childPropsEmit.vue';

// 父元件跟之前的寫法沒啥變化，可以自己定義要傳到子元件的值與型別，

// 父元件只傳遞一個資料
const value = ref(0);

// 父元件傳遞多個資料
const counterValue = ref(1);
const stringValue = ref('hello name');

// 深層組件provide
const message = ref('hello');
provide('message', message);
</script>
