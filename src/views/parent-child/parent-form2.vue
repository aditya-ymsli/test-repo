<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';

import child2SubpagePage from '/src/views/parent-child/child-form2.vue';

const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

const selectedNameTextBox = ref('This is default Value of selected name');

defineOptions({
  name: 'parent-form2',
});

const form = ref();
const firstName = ref();
const child2Subpage = ref();
const selectedName = ref();

const formData = reactive({
  firstName: '', selectedName: '',
});

function clearFirstNameFunction(event) {
  formData.firstName = '';
  alert('transferred to selected name');
}

function fillSelectedName(event) {
  formData.selectedName = event;
  selectedNameTextBox.value = event;
}
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueFormItem

      label="First Name"

      prop="firstName"
    >
      <VueInput

        id="firstName"

        ref="firstName"

        v-model="formData.firstName"
        data-type="string"

        placeholder="First Name....."
      />
    </VueFormItem>

    <child2SubpagePage

      id="child2Subpage"
      ref="child2Subpage"
      :parent-value="formData.firstName"

      @clear-first-name="clearFirstNameFunction"
      @value-at-select="fillSelectedName"
    />

    <VueFormItem

      label="Selected Name"

      prop="selectedName"
    >
      <VueInput

        id="selectedName"

        ref="selectedName"
        v-model="formData.selectedName"

        data-type="string"
      />
    </VueFormItem>

    <VueText id="displayFirstName" ref="displayFirstName" :style="{ width: '100%', display: 'inline-block' }" v-html="selectedNameTextBox" />
  </VueForm>
</template>
