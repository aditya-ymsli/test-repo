<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/useApi';

const emit = defineEmits(['select']);
const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

defineOptions({
  name: 'value-list-child',
});

const form = ref();
const fullNameTable = ref();
const setBtn = ref();

const formData = reactive({
});

const fullNameTableEditConfig = reactive({
  trigger: 'click',

});

const fullNameTableMouseConfig = reactive({

  extension: true,

});

const fullNameTableRowConfig = reactive({
  isCurrent: true,
});

const fullNameDataSetApi = useApi({
  method: 'post',
  localData: [
    { firstName: 'Aditya', lastName: 'Gupta' },
    { firstName: 'Abhinav', lastName: 'Gupta' },
    { firstName: 'Priyanshu', lastName: 'Sharma' },
  ],

});
const fullNameDataSet = fullNameDataSetApi.data;

const fullNameTableFirstNameEditRender = computed(() => {
  return {
    enabled: false,
  };
});

const fullNameTableLastNameEditRender = computed(() => {
  return {
    enabled: false,
  };
});

const setBtnClick = () => {
  setData();
};

function setData() {
  const selectedRecord = fullNameTable.value.getCurrentRecord();
  emit('select', selectedRecord);
}
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueTable

      id="fullNameTable"

      ref="fullNameTable"

      :stripe="true"
      :border="true"

      :data="fullNameDataSet"

      :edit-config="fullNameTableEditConfig"
      :mouse-config="fullNameTableMouseConfig"
      :row-config="fullNameTableRowConfig"
    >
      <VueInputColumn

        :edit-render="fullNameTableFirstNameEditRender"

        field="firstName"

        width="200px"

        title="First Name"
      />
      <VueInputColumn

        :edit-render="fullNameTableLastNameEditRender"

        field="lastName"

        width="200px"

        title="Last Name"
      />
    </VueTable>

    <VueButton id="setBtn" ref="setBtn" icon-position="left" @click="setBtnClick">
      Set Data
    </VueButton>
  </VueForm>
</template>
