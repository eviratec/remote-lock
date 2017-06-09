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
(function (angular) {"use strict";

  var remoteLock = angular.module("remoteLock", [
    "ngAnimate",
    "ngAria",
    "ngMaterial",
    "ngMessages",
  ]);

  remoteLock
    .factory("Command", CommandFactory);

  CommandFactory.$inject = [];
  function CommandFactory () {

    function Command (cmd, target) {

      this.cmd = cmd;
      this.target = target;

    }

    Command.prototype.toString = function () {
      return `Command<${this.cmd}>`;
    };

    return Command;

  }

  remoteLock
    .factory("CommandProxy", CommandProxyFactory);

  CommandProxyFactory.$inject = ["Command", "$http"];
  function CommandProxyFactory (Command, $http) {

    function CommandProxy () {

      this.queued = [];
      this.inProgress = [];
      this.finished = [];

    }

    CommandProxy.prototype.exec = function (cmd, target) {
      var command = new Command(cmd, target);
      $http.post("/incoming/commands", command)
        .then(function (res) {
          console.log(res);
        }, function (err) {
          console.log(err);
        });
      return this.queued.push(command);
    };

    return CommandProxy;

  }

  remoteLock
    .factory("commandProxy", commandProxyFactory);

  commandProxyFactory.$inject = ["CommandProxy"];
  function commandProxyFactory (CommandProxy) {
    return new CommandProxy();
  }

  remoteLock
    .factory("Device", DeviceFactory);

  DeviceFactory.$inject = ["commandProxy"];
  function DeviceFactory (commandProxy) {

    function Device (id, uuid, key) {

      this.id = id;
      this.uuid = uuid;
      this.key = key;

      this.loggedIn = false;

    }

    Device.prototype.toString = function () {
      return `Device<${this.id}/${this.uuid}>`;
    };

    Device.prototype.login = function () {
      commandProxy.exec("login", this);
      return this.loggedIn = true;
    };

    Device.prototype.logout = function () {
      commandProxy.exec("logout", this);
      return this.loggedIn = false;
    };

    return Device;

  }

  remoteLock
    .controller("DeviceListController", DeviceListController);


  DeviceListController.$inject = ["$scope", "commandProxy", "Device"];
  function DeviceListController ($scope, commandProxy, Device) {
    this.foo = "bars";
    this.cmds = commandProxy;
    this.devices = [
      new Device(
        "ENLIM-ROG",
        "3fdbb941-8695-439c-970d-33647fb503c2",
        "cRu5r@+E3ruFRA3awU2U7erEPR&-Rusw"
      ),
      new Device(
        "SOME-PC",
        "9156379b-7204-4a30-be9e-12bd8edb901f",
        "braPrapE#unuxustataf&e-U7@espU--"
      ),
    ];
  }

})(angular);
