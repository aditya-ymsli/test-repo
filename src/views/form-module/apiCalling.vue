<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/useApi';

const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

defineOptions({
  name: 'apiCalling',
});

const form = ref();
const technologyDropdown = ref();
const fetchBtn = ref();

const formData = reactive({
  TechnologyDropdown: '',
});

const technologyDropdownProps = computed(() => {
    	return {
    label: 'name',
    value: 'id',

  };
});

const techDatasetApi = useApi({
  url: 'http://localhost:8086/trainee',
  method: 'get',

}, {
  onSuccess: (data, params) => {
    alert('success');
    console.log(data);
  },
  manual: true,
});
const techDataset = techDatasetApi.data;

const fetchBtnClick = () => {
  loadAPIData();
};

function loadAPIData() {
  techDatasetApi.runAsync();
}
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueFormItem

      :label="t('label.technologyDropdown')"

      prop="TechnologyDropdown"
    >
      <VueSelect

        id="technologyDropdown"

        ref="technologyDropdown"
        v-model="formData.TechnologyDropdown"

        placeholder="Select Technology...."

        :options="techDataset"

        :props="technologyDropdownProps"
      />
    </VueFormItem>

    <VueButton id="fetchBtn" ref="fetchBtn" icon-position="left" @click="fetchBtnClick">
      FetchButton
    </VueButton>
  </VueForm>
</template>
