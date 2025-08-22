<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

onMounted(() => {
  console.log('Details Page is Mounted');
});

onUnmounted(() => {
  console.log('Details Page is Unmounted.');
});

defineOptions({
  name: 'details-page',
});

const form = ref();

const formData = reactive({
});
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueText id="welcomeMsg" ref="welcomeMsg" :style="{ width: '100%', display: 'inline-block', textAlign: 'center' }">
      Welcome to Details Page,You have successfully used routing
    </VueText>
  </VueForm>
</template>
