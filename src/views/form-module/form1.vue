<script setup>
import { IconEdit, useLockScreen } from 'viy-ui';
import { useI18n } from 'vue-i18n';
import { useApi } from '@/composables/useApi';

import { CONST_SYSTEM_DATE_FORMAT, CONST_SYSTEM_DATE_VALUE_FORMAT } from '@/constants';

const { t } = useI18n();
const lockScreenUtils = useLockScreen();
const lockScreen = lockScreenUtils.lockScreen;

defineOptions({
  name: 'form1',
});

const form = ref();
const fName = ref();
const lName = ref();
const dob = ref();
const description = ref();
const calendar = ref();
const gender = ref();
const hobbies = ref();
const printBtn = ref();
const setBtn = ref();

const formData = reactive({
  firstName: '', lastName: '', DOB: undefined, descriptionText: '', Calendar: '', Gender: '', Hobbies: [],
});

const rules = reactive({
  fNameRules: [
    {
      required: true,

      message: computed(() => {
        return t('error.required');
      }),

      trigger: 'blur',

    },

  ],
  dobRules: [
    {
      validator: validator.numberValue,

      minValue: 0,

      maxValue: 200,

      message: computed(() => {
        return t('error.dob');
      }),

      trigger: 'blur',

    },

  ],
  descriptionRules: [
    {
      max: 100,

      message: computed(() => {
        return t('error.maxlength');
      }),

      trigger: ['change', 'manual'],

    },

  ],

});

const hobbiesOpts = [
  {
    label:
                        'Reading',
    value:
                        'Reading',
  },
  {
    label:
                        'Sports',
    value:
                        'Sports',
  },
  {
    label:
                        'Dancing',
    value:
                        'Dancing',
  },

];

const genderDatasetApi = useApi({
  method: 'post',
  localData: [
    { display: 'Male', actual: 'M' },
    { display: 'Female', actual: 'F' },

  ],

});
const genderDataset = genderDatasetApi.data;

const fNameOnSuffixIconClick = (event) => {
  onSuffixBtnClick();
  console.log(event);
};
const dobBlur = (event) => {
  console.log(event);
  console.log('Age is out of focus from now');
};

const printBtnClick = () => {
  printFormData();
};
const setBtnClick = () => {
  setFormData();
};

function printFormData() {
  console.log(formData.firstName);
  console.log(formData.lastName);
  console.log(formData.DOB);
  console.log(formData.descriptionText);
  console.log(formData.Gender);
  console.log(formData.Hobbies);
  console.log(formData.Calendar);
}

function setFormData() {
  formData.firstName = 'Aditya';
  formData.lastName = 'Gupta';
  formData.DOB = 20;
  formData.Calendar = '20050206';
  formData.descriptionText = 'Random Description Go';
  formData.Hobbies = [hobbiesOpts[1].value];
  formData.Gender = 'M';
}

function onSuffixBtnClick() {
  console.log('Suffix click event has been triggered');
}
</script>

<template>
  <VueForm ref="form" v-loading="lockScreen" :model="formData">
    <VueText id="heading" ref="heading" type="info" size="large" :style="{ width: '100%', display: 'inline-block', fontSize: '2rem', fontWeight: 'bolder', fontStyle: 'italic', color: '#883DD3', backgroundColor: '#FFFFFF', textAlign: 'center', lineHeight: '40px' }">
      Form Heading
    </VueText>

    <VueFormItem

      :label="t('label.firstName')"

      prop="firstName"

      :rules="rules.fNameRules"

      :show-message="true"

      :style="{ padding: '10px' }"
    >
      <VueInput

        id="fName"

        ref="fName"

        v-model="formData.firstName"

        data-type="string"

        :autofocus="true"

        placeholder="Enter First Name...."

        type="text"
        text-align="left"

        :clearable="true"

        :on-suffix-icon-click="fNameOnSuffixIconClick"

        :suffix-icon="IconEdit"
      />
    </VueFormItem>

    <VueFormItem

      :label="t('label.lastName')"

      prop="lastName"
    >
      <VueInput

        id="lName"

        ref="lName"
        v-model="formData.lastName"

        data-type="string"
      />
    </VueFormItem>

    <VueFormItem

      :label="t('label.dob')"

      prop="DOB"

      :rules="rules.dobRules"
    >
      <VueInputNumber

        id="dob"

        ref="dob"

        v-model="formData.DOB"

        suffix=" years"

        :min="0"

        :max="200"

        :step-strictly="false"

        controls-position="both"
        text-align="right"

        placeholder="Age..."

        @blur="dobBlur"
      >
        <template #suffix>
          years
        </template>
      </VueInputNumber>
    </VueFormItem>

    <VueText id="description-heading" ref="description-heading" :style="{ width: '100%', display: 'inline-block' }">
      {{ t('label.description') }}
    </VueText>

    <VueFormItem

      prop="descriptionText"

      :rules="rules.descriptionRules"

      :show-message="true"
    >
      <VueInput
        id="description"

        ref="description"

        v-model="formData.descriptionText"

        type="textarea"

        :uppercase="true"

        resize="none"

        :rows="5"
        :show-word-limit="true"

        :readonly="false"
      />
    </VueFormItem>

    <VueFormItem

      :label="t('label.calendar')"

      prop="Calendar"
    >
      <VueDatePicker

        id="calendar"

        ref="calendar"
        v-model="formData.Calendar"

        separator="/"

        :format="CONST_SYSTEM_DATE_FORMAT.ddmmyyyy"

        :value-format="CONST_SYSTEM_DATE_VALUE_FORMAT.yyyymmdd"
      />
    </VueFormItem>

    <VueFormItem

      :label="t('label.gender')"

      prop="Gender"
    >
      <VueRadioGroup

        id="gender"

        ref="gender"
        v-model="formData.Gender"

        direction="horizontal"

        split-size="default"
      >
        <VueRadio
          v-for="option in genderDataset"
          :key="option.actual"
          :label="option.actual"
          :name="option.name"
          :disabled="option.disabled"
        >
          {{ option.display }}
        </VueRadio>
      </VueRadioGroup>
    </VueFormItem>

    <VueFormItem

      :label="t('label.hobbies')"

      prop="Hobbies"
    >
      <VueCheckboxGroup

        id="hobbies"
        ref="hobbies"

        v-model="formData.Hobbies"

        split-size="default"
      >
        <VueCheckbox
          v-for="option in hobbiesOpts"
          :key="option.value"
          :label="option.value"
          :name="option.name"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </VueCheckbox>
      </VueCheckboxGroup>
    </VueFormItem>

    <VueButton id="printBtn" ref="printBtn" icon-position="left" @click="printBtnClick">
      {{ t('button.printBtn') }}
    </VueButton>
    <VueButton id="setBtn" ref="setBtn" icon-position="left" @click="setBtnClick">
      {{ t('button.setBtn') }}
    </VueButton>
  </VueForm>
</template>
