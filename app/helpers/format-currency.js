import { helper } from '@ember/component/helper';

export default helper(function formatCurrency(params) {
  const str = Number(params[0]);
  return str.toFixed(2);
});
