<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';

import childSubpagePage from '/src/views/parent-child/child-form.vue';

const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

defineOptions({
  name: 'parent-form',
});

const form = ref();
const parentInput = ref();
const childSubpage = ref();

const formData = reactive({
  parentInput: '',
});

function valueFromChild(event) {
  formData.parentInput = event;
}
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueFormItem

      label="Parent Input"

      prop="parentInput"
    >
      <VueInput

        id="parentInput"

        ref="parentInput"
        v-model="formData.parentInput"

        data-type="string"
      />
    </VueFormItem>

    <childSubpagePage

      id="childSubpage"
      ref="childSubpage"
      last-name="Gupta"

      :parent-value="formData.parentInput"
      @on-child-emit="valueFromChild"
    />
  </VueForm>
</template>
