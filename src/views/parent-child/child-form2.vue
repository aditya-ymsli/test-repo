<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';

const props = defineProps(['parentValue']);
const emits = defineEmits(['clearFirstName', 'valueAtSelect']);
const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

const nameList = ref([]);
defineOptions({
  name: 'child-form2',
});

const form = ref();
const getBtn = ref();
const nameDropdown = ref();

const formData = reactive({
  nameDropdown: '',
});

const nameDropdownProps = computed(() => {
    	return {
    label: 'name',
    value: 'name',

  };
});

const getBtnClick = () => {
  getValueFromParent();
};
const nameDropdownChange = (val, option, oldVal, oldOption) => {
  emits('valueAtSelect', val);
};

function getValueFromParent() {
  nameList.value.push({ name: props.parentValue });
  emits('clearFirstName');
}
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueButton id="getBtn" ref="getBtn" icon-position="left" @click="getBtnClick">
      Get Value From Parent
    </VueButton>

    <VueFormItem

      label="Data from Parent "

      prop="nameDropdown"
    >
      <VueSelect

        id="nameDropdown"
        ref="nameDropdown"

        v-model="formData.nameDropdown"

        :options="nameList"

        :props="nameDropdownProps"

        @change="nameDropdownChange"
      />
    </VueFormItem>
  </VueForm>
</template>
