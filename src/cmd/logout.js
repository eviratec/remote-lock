#!/usr/bin/env node
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

function LogoutCommand (PKG, readJsonDb, writeJsonDb) {
  return function exec (command, opt) {
    opt = opt || {};
    return new Promise((resolve, reject) => {
      // PKG.config.commands.unlock
      let deviceRepo;
      let deviceId;
      let deviceUuid;
      let device;
      try {
        deviceRepo = opt.deviceRepo;
        if (!deviceRepo) {
          reject(new Error("No devices repository"));
        }
        deviceId = command.target.id;
        deviceUuid = command.target.uuid;
        device = deviceRepo.getDeviceByUuid(deviceUuid);
      }
      catch (err) {
        return reject(err);
      }
      device.logout()
        .then(function (res) {
          console.log(`Success! Device<${deviceId}> should now be locked.`);
          resolve(res);
        })
        .catch(reject);
    });
  };
}

module.exports = LogoutCommand;
