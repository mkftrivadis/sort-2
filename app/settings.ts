/**
 * @description
 * `Settings` contains the object to be passed to a custom sorting function
 * 
 * @export
 * @class Settings
 */
export class Settings {
  property: string;
  order: string;
  type: string;
  default: string;
  preset: Array<Object>;

  /**
   * @description
   * `afterCustomSort` declares a function to be called after custom sorting function is done. This is needed to update the
   * sorting order and the css classes for the headers 
   * 
   * @type {Function}
   * @memberOf Settings
   */
  afterCustomSort: Function;
}
