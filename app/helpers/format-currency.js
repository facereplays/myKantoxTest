import { helper } from '@ember/component/helper';

export default helper(function formatCurrency(params ) {
  return params[0].toFixed(2);
});
