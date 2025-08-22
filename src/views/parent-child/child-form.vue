<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';

const lastName = defineProps(['lastName', 'parentValue']);
const emit = defineEmits(['onChildEmit']);
const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

defineOptions({
  name: 'child-form',
});

const form = ref();
const childInput = ref();
const fetchBtn = ref();
const setBtn = ref();

const formData = reactive({
  childInput: '',
});

const fetchBtnClick = () => {
  setValueFromParent();
};
const setBtnClick = () => {
  setValueFormParent();
};

function setValueFromParent() {
  console.log(lastName);
  console.log(lastName.lastName);
  formData.childInput = lastName.parentValue;
}
function setValueFormParent() {
  emit('onChildEmit', formData.childInput);
}
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueFormItem

      label="Child Input"

      prop="childInput"
    >
      <VueInput

        id="childInput"

        ref="childInput"
        v-model="formData.childInput"

        data-type="string"
      />
    </VueFormItem>

    <VueButton id="fetchBtn" ref="fetchBtn" icon-position="left" @click="fetchBtnClick">
      Get Value from Parent
    </VueButton>
    <VueButton id="setBtn" ref="setBtn" icon-position="left" @click="setBtnClick">
      Set Value to Parent
    </VueButton>
  </VueForm>
</template>
