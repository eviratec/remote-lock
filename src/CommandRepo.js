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

class CommandRepo extends EventEmitter {
  constructor () {
    super();
    this.commands = [];
    this.commandsByUuid = {};
  }
  addCommands (commands) {
    commands = commands || [];
    if (commands.length === 0) {
      return this.commands;
    }
    commands.forEach(command => {
      this.addCommand(command);
    });
    return this.commands;
  }
  addCommand (command) {
    let uuid;
    command = command || {};
    if (!command.uuid) {
      return this.commands;
    }
    uuid = command.uuid;
    this.commands.push(command);
    this.commandsByUuid[uuid] = command;
    process.nextTick(() => {
      this.emit("command:added", command);
    });
    return this.commands;
  }
  getCommandByUuid (uuid) {
    return this.commandsByUuid[uuid];
  }
  toJSON () {
    return this.commands;
  }
}

module.exports = CommandRepo;
