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

const fs = require("fs");
const path = require("path");

const configPath = require("./configPath");
const readJsonDb = require("./readJsonDb");
const writeJsonDb = require("./writeJsonDb");

const commandsByCmd = {};

const CMD_DIR_PATH = path.resolve(path.join("src","cmd"));

const availableCommands = fs.readdirSync(CMD_DIR_PATH).map((cmd) => {
  if ([".", ".."].indexOf(cmd) > -1) {
    return;
  }
  cmd = cmd.replace(/\.js$/, "");
  commandsByCmd[cmd] = require(`${CMD_DIR_PATH}/${cmd}`)(readJsonDb, writeJsonDb);
  return commandsByCmd[cmd];
});

class InvalidCommandError extends Error {
  constructor (cmd) {
    super(...arguments);
    this.message = `${cmd} is not in list of valid commands (${Object.keys(commandsByCmd).join(",")})`;
  }
}

function exec (command) {
  let cmd = command.cmd;
  let invalidCommand = !commandAvailable(cmd);
  if (invalidCommand) {
    throw new InvalidCommandError(cmd);
  }
  return commandsByCmd[cmd](command);
}

Object.defineProperties(exec, {
  "InvalidCommandError": {
    value: InvalidCommandError,
  },
});

function commandAvailable (cmd) {
  return cmd in commandsByCmd;
}

module.exports = exec;
