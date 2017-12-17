export default class ParamError {
  
  constructor (index, param, message) {
    this.index   = index;
    this.param   = param;
    this.message = message;
    this.name    = 'ParamError';
  }
}