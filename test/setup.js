import { setup } from '@ymc-group/test-utils';
import i18n from '@/i18n';

setup({
  vue: { plugins: [i18n] },
  mocks: import.meta.glob('@/../test/**/mocks/**/*.js'),
});
