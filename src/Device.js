/**
 * https://github.com/eviratec/remote-lock
 * Copyright (c) 2017 Callan Peter Milne
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
 * REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND
 * FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
 * INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
 * LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
 * OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
 * PERFORMANCE OF THIS SOFTWARE.
 */
"use strict";

const EventEmitter = require("events");

class ErrorNoLogin extends Error {
  constructor () {
    super(...arguments);
  }
}

class Device extends EventEmitter {
  static get ERR_NO_LOGIN () {
    return ErrorNoLogin;
  }

  static is (device) {
    return device instanceof Device;
  }

  constructor (device) {
    super();
    device = device || {};
    this.id = device.id;
    this.uuid = device.uuid;
    this.hash = device.hash;
    this.loggedIn = device.loggedIn;
  }

  login () {
    return new Promise((resolve, reject) => {
      this.loggedIn = true;
      resolve(this);
    });
  }

  logout () {
    return new Promise((resolve, reject) => {
      if (!this.loggedIn) {
        return reject(Device.ERR_NO_LOGIN);
      }
      this.loggedIn = false;
      resolve(this);
    });
  }

  lock () {
    return new Promise((resolve, reject) => {
      if (!this.loggedIn) {
        return reject(Device.ERR_NO_LOGIN);
      }
      this.loggedIn = false;
      resolve(this);
    });
  }

  unlock () {
    return new Promise((resolve, reject) => {
      if (!this.loggedIn) {
        return reject(Device.ERR_NO_LOGIN);
      }
      this.loggedIn = false;
      resolve(this);
    });
  }

  toJSON () {
    return {
      id: this.id,
      uuid: this.uuid,
      hash: this.hash,
      loggedIn: this.loggedIn,
    };
  }
}

module.exports = Device;
