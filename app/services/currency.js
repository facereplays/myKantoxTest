import Service from '@ember/service';

export default class CurrencyService extends Service {
  /****
   *
   * Dollar Symbol - $
   * Euro Symbol - €
   * Pound Sterling Symbol – £
   * Yen Symbol – ¥
   *
   *
   *
   * @type {string[]}
   */
  currencies = ['$', '€', '£', '¥'];
  currency = this.currencies[2];
  get symbol() {
    return this.currency;
  }
}
