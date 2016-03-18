/**
 * Strategy for World
 *
 * Initial attempt as a world strat.
 *
 */

var _ = require('lodash');
var harvester = require('harvester');
var Spawn = require('spawn');


function spawnCreep() {
    var roles = Memory.roles;

    if (roles.harvester.numActive <= 4) {
        Spawn.spawn(roles.harvester, Game.spawns.Spawn1);
    }
    else if (roles.builder.numActive === 0) {
        Spawn.spawn(roles.builder, Game.spawns.Spawn1);
    }
}

/**
 * Main strategy hook, main game loop calls this. And only this?
 */
module.exports.run = function () {
    // statusScan();
    spawnCreep();
};