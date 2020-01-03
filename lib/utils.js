import { TimeoutError } from './errors';
import ow from 'ow';

class CancelableTimeout {
  constructor(ms) {
    // The stack is way more useful here than it would be from inside the Promise.
    const error = new TimeoutError();
    this._promise = new Promise((_resolve, reject) => {
      this._handle = setTimeout(() => {
        reject(error);
      }, ms);
    });
  }

  cancel() {
    if (this._handle) {
      clearTimeout(this._handle);
      delete this._handle;
    }
  }

  then(resolved, rejected) {
    return this._promise.then(resolved, rejected);
  }

  catch(rejected) {
    return this._promise.catch(rejected);
  }
}

export const checkAddress = ow.create('address', ow.string.length(6));
export const checkOptionalAddress = ow.create('address',
  ow.any(ow.nullOrUndefined, ow.string.length(6)));

export function timed(p, ms) {
  return new Promise((resolve, reject) => {
    const timeout = new CancelableTimeout(ms);
    timeout.catch(reject);

    p.then(val => {
      timeout.cancel();
      resolve(val);
    }, err => {
      timeout.cancel();
      reject(err);
    });
  });
}
