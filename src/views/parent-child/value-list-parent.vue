<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';

import fullNamePopupComp from '/src/views/parent-child/value-list-child.vue';

const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

defineOptions({
  name: 'value-list-parent',
});

const form = ref();
const fullName = ref();

const formData = reactive({
  fullName: '',
});

const fullNameSelect = (selectedObj) => {
  inputInFullName(selectedObj);
};

function inputInFullName(selectedObj) {
  formData.fullName = `${selectedObj.firstName} ${selectedObj.lastName}`;
}
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueFormItem

      label="Full Name"

      prop="fullName"
    >
      <VueValueList

        id="fullName"

        ref="fullName"

        v-model="formData.fullName"

        popup-type="dialog"
        dialog-width="50rem"

        :use-popup="true"

        :popup-component="fullNamePopupComp"

        @select="fullNameSelect"
      />
    </VueFormItem>
  </VueForm>
</template>
