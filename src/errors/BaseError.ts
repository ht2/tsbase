/* tslint:disable:no-class no-this readonly-keyword */
export default class implements Error {
  public name: string;
  public message: string;
  public stack?: string;

  constructor() {
    this.message = 'Error';
    this.name = this.constructor.name;
    this.stack = (new Error(this.message)).stack;
  }
}
