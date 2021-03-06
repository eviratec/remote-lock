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
const Device = require("./Device");

class DeviceRepo extends EventEmitter {
  constructor () {
    super();
    this.devices = [];
    this.devicesByUuid = {};
  }
  addDevices (devices) {
    devices = devices || [];
    if (devices.length === 0) {
      return this.devices;
    }
    devices.forEach(device => {
      this.addDevice(device);
    });
    return this.devices;
  }
  addDevice (device) {
    let uuid;
    device = device || {};
    if (!device.uuid) {
      return this.devices;
    }
    uuid = device.uuid;
    if (!Device.is(device)) {
      device = new Device(device);
    }
    this.devices.push(device);
    this.devicesByUuid[uuid] = device;
    process.nextTick(() => {
      this.emit("device:added", device);
    });
    return this.devices;
  }
  getDeviceByUuid (uuid) {
    return this.devicesByUuid[uuid];
  }
  toJSON () {
    return this.devices;
  }
}

module.exports = DeviceRepo;
