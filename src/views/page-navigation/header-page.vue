<script setup>
import { useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

const router = useRouter();

onMounted(() => {
  console.log('Header Page is Mounted');
});

onUnmounted(() => {
  console.log('Header Page is Unmounted.');
});

defineOptions({
  name: 'header-page',
});

const form = ref();
const openDetailsBtn = ref();
const openNonActiveTagBtn = ref();
const closeCurrentTagBtn = ref();
const closeDetailsTagBtn = ref();
const refreshBtn = ref();
const spaBtn = ref();
const nameInput = ref();
const age = ref();

const formData = reactive({
  nameInput: '', age: undefined,
});

const openDetailsBtnClick = () => {
  openDetailsPage();
};
const openNonActiveTagBtnClick = () => {
  openNonActiveTagPage();
};
const closeCurrentTagBtnClick = () => {
  closeCurrentTag();
};
const closeDetailsTagBtnClick = () => {
  closeDetailsTag();
};
const refreshBtnClick = () => {
  refreshCurrentPage();
};
const spaBtnClick = () => {
  openTagHere();
};

function openDetailsPage() {
  router.push({
    name: 'details-page',
    query: {
      id: 'ID001',
    },
  });
}

function openNonActiveTagPage() {
  useMultiTags().openTag({
    name: 'details-page',
    // query: {
    //     id: 'ID001',
    // },
  });
  router.push({ name: 'details-page' });
  useMultiTags().removeTagCache({ name: 'header-page' });
}

function closeCurrentTag() {
  useMultiTags().closeTag();
  router.push('/');
}

function closeDetailsTag() {
  useMultiTags().closeTag({
    name: 'details-page',
    query: {
      id: 'ID001',
    },
  });
}

function refreshCurrentPage() {
  useMultiTags().refreshCurrent();
}

function openTagHere() {
  useMultiTags().updateTag({
    name: 'details-page',
    // query: {
    //     id: 'ID002',
    // },
  });

  // When the parameters are the same as the updated tag, it will open in the current tag instead of creating a new one
  router.push({ name: 'details-page' });
  // useMultiTags().removeTagCache({ name: 'header-page' });
}
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueButton id="openDetailsBtn" ref="openDetailsBtn" icon-position="left" @click="openDetailsBtnClick">
      Open Details Page
    </VueButton>
    <VueButton id="openNonActiveTagBtn" ref="openNonActiveTagBtn" icon-position="left" @click="openNonActiveTagBtnClick">
      Open Non Active Tab
    </VueButton>
    <VueButton id="closeCurrentTagBtn" ref="closeCurrentTagBtn" icon-position="left" @click="closeCurrentTagBtnClick">
      Close Current Tag
    </VueButton>
    <VueButton id="closeDetailsTagBtn" ref="closeDetailsTagBtn" icon-position="left" @click="closeDetailsTagBtnClick">
      Close Details Tag
    </VueButton>
    <VueButton id="refreshBtn" ref="refreshBtn" icon-position="left" @click="refreshBtnClick">
      Refresh
    </VueButton>
    <VueButton id="spaBtn" ref="spaBtn" icon-position="left" @click="spaBtnClick">
      Open Page here only
    </VueButton>

    <VueFormItem

      label="Name"

      prop="nameInput"
    >
      <VueInput

        id="nameInput"

        ref="nameInput"
        v-model="formData.nameInput"

        data-type="string"
      />
    </VueFormItem>

    <VueFormItem

      label="Age"

      prop="age"
    >
      <VueInputNumber

        id="age"
        ref="age"

        v-model="formData.age"
      />
    </VueFormItem>
  </VueForm>
</template>
