<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

defineOptions({
  name: 'first_page',
});

const form = ref();
const demo = ref();

const formData = reactive({
  demo: '',
});
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueFormItem

      label="Demo"

      prop="demo"
    >
      <VueInput

        id="demo"

        ref="demo"
        v-model="formData.demo"

        data-type="string"
      />
    </VueFormItem>
  </VueForm>
</template>
