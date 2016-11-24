import NestedError from 'nested-error-stacks';

export default class SimpleLdapError extends NestedError {
  constructor (message, nested) {
    super(message, nested);  /* istanbul ignore next https://github.com/gotwarlost/istanbul/issues/690 */
    Object.assign(this, nested);
    this.name = 'SimpleLdapError';
  }
}