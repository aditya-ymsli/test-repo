<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/useApi';

import { CONST_SYSTEM_DATE_FORMAT, CONST_SYSTEM_DATE_VALUE_FORMAT } from '@/constants';

const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

defineOptions({
  name: 'table-demo',
});

const form = ref();
const employeeTable = ref();
const addBtn = ref();
const deleteBtn = ref();
const saveBtn = ref();

const formData = reactive({
});

const employeeTableEditConfig = reactive({
  trigger: 'click',

});

const employeeTableMouseConfig = reactive({

  extension: true,

});

const employeeTableRowConfig = reactive({
  isCurrent: true,
});

const employeeDataSetApi = useApi({
  method: 'post',
  localData: [
    { employeeId: 'YN235', firstName: 'Aditya', lastName: 'Gupta', age: 20, dob: '20050206', gender: 'M' },
  ],

});
const employeeDataSet = employeeDataSetApi.data;

const employeeTableEmployeeIdEditRender = computed(() => {
  return {
    enabled: false,
  };
});

const employeeTableFirstNameEditRender = computed(() => {
  return {
    enabled: true,
  };
});

const employeeTableLastNameEditRender = computed(() => {
  return {
    enabled: true,
  };
});

const employeeTableAgeEditRender = computed(() => {
  return {
    enabled: true,
  };
});

const employeeTableDobEditRender = computed(() => {
  return {
    enabled: true,
    defaultValue: '20250821',
    attrs: {

      valueFormat: CONST_SYSTEM_DATE_VALUE_FORMAT.yyyymmdd,
      format: CONST_SYSTEM_DATE_FORMAT.ddmmyyyy,

    },
  };
});

const employeeTableGenderEditRender = computed(() => {
  return {
    enabled: true,
    attrs: {

      activeValue: 'F',
      inactiveValue: 'M',

    },
  };
});

const addBtnClick = () => {
  addRowData();
};
const deleteBtnClick = () => {
  deleteRowData();
};
const saveBtnClick = () => {
  saveRowData();
};

function addRowData() {
  const record = { employeeId: 'YN' };
  employeeTable.value.insertAt(record, -1);
}

function deleteRowData() {
  const selectedRow = employeeTable.value.getCurrentRecord();
  const deletedData = employeeTable.value.remove(selectedRow);
  console.log(deletedData);
}

function saveRowData() {
  // let selectedRow=employeeTable.value.getCurrentRecord();
  // alert(employeeTable.value);
  console.log(employeeTable.value.getTableData());
}
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueTable

      id="employeeTable"

      ref="employeeTable"

      :stripe="true"
      :border="true"

      :data="employeeDataSet"

      :edit-config="employeeTableEditConfig"
      :mouse-config="employeeTableMouseConfig"
      :row-config="employeeTableRowConfig"
    >
      <VueIndexColumn

        align="center"

        width="50px"

        min-width="50px"

        header-align="center"

        title="S.No."
      />

      <VueInputColumn

        :edit-render="employeeTableEmployeeIdEditRender"

        field="employeeId"

        width="200px"

        title="employeeId"
      />
      <VueInputColumn

        :edit-render="employeeTableFirstNameEditRender"

        field="firstName"

        width="200px"

        :title="t('label.firstName')"
      />
      <VueInputColumn

        :edit-render="employeeTableLastNameEditRender"

        field="lastName"

        width="200px"

        :title="t('label.lastName')"
      />
      <VueNumberColumn

        :edit-render="employeeTableAgeEditRender"

        field="age"

        width="200px"

        title="Age"
      />
      <VueDateTimeColumn

        :edit-render="employeeTableDobEditRender"

        field="dob"

        width="200px"

        :title="t('label.dob')"
      />

      <VueSwitchColumn

        :edit-render="employeeTableGenderEditRender"

        field="gender"

        width="200px"

        :title="t('label.gender')"
      />
    </VueTable>

    <VueButton id="addBtn" ref="addBtn" icon-position="left" @click="addBtnClick">
      Add
    </VueButton>
    <VueButton id="deleteBtn" ref="deleteBtn" icon-position="left" @click="deleteBtnClick">
      Delete
    </VueButton>
    <VueButton id="saveBtn" ref="saveBtn" icon-position="left" @click="saveBtnClick">
      Save
    </VueButton>
  </VueForm>
</template>
