/**
 * Strategy Module for Survival Mode
 *
 * High Scores:
 *   Map 1 - 1422 (Something must have been updated in the game, previously it was 556 with only minor changes to the strat)
 *   Map 2 - 1611
 *   Map 3 -
 *
 * Notes:
 * Energy Runs out fast building DPS, probably need to scale harvesters with something and increase default.
 * Work on a way to keep them close together.
 *
 * Going to need a more advanced unit management strat past the 500 mark. Probably with the queue and do away with
 * the maxes. Determining what to build by what units are active. Will also need healer role developed. Ranged DPS
 * for point defence will probably help some as well. The melee attack within range and guarding flag seems to
 * be working better then the previous. If they lose move ability at least they are still somewhat useful.
 *
 * Will also need to be able to start harvesting a second source around 400. I wonder if there is any timing info
 * available within the game.
 *
 * Should have a generic DPS role then break that down into classes.
 *
 * Run Notes:
 * Energy regen seems to have been patched and largely increased, trying more harvesters per node.
 *
 * Around 1600 the waves are coming in with massive 10 part units.
 *
 */

/**
 * Modules
 */
var _ = require('lodash');

// Roles
var assault   = require('assault');
var harvester = require('harvester');
var Spawn     = require('spawn');

/**
 * Strategy Config Values
 */

/**
 * Unit counts to auto-build per role.
 */
var MAX_HARVESTERS = 4;
var MAX_ASSAULT    = 9;
var MAX_BUILDER    = 0;


/**
 * Strategy Logic
 */


/**
 * Status Scan - Strategy Level
 *
 * Update unit counts based on progress and eventually emplement unit tiers
 */
function statusScan() {
    if (Memory.roles.ranged.numActive >= MAX_ASSAULT) {
        MAX_HARVESTERS = 6;
    }
}


function spawn(role) {

}

/**
 * Spawn creeps as needed. Spawn harvesters first, only spawn melee if harvesters are at max.
 *
 * Should this be moved out to a screep factory type module? It is strat specific so not sure yet.
 * Some sort of queue for spawning would be good. This logic could get complicated without it.
 */
function spawnCreeps() {
    if (Memory.roles.harvester.numActive < MAX_HARVESTERS) {
        Spawn.spawn(Memory.roles.harvester);
    }
    if (Memory.roles.harvester.numActive == MAX_HARVESTERS && Memory.roles.melee.numActive != MAX_ASSAULT) {
        Spawn.spawn(Memory.roles.ranged);
    }

    // Only spawn a builder after harvesters and dps are maxed
    if (Memory.roles.ranged.numActive >= MAX_ASSAULT && Memory.roles.builder.numActive != MAX_BUILDER) {
        Spawn.spawn(Memory.roles.builder);
    }
}

/**
 * Guard Location. If there are no hostile creeps then bring all the melee back to the given point.
 */
function guardPoint(location) {
    // var spawn   = Game.spawns.Spawn1
    var enemies = location.room.find(FIND_MY_CONSTRUCTION_SITES);

    var ret;
    if (_.isEmpty(enemies)) {
        var melee = _.filter(Game.creeps, {
            memory: {role: 'ranged'}
        });

        _.forEach(melee, function (creep) {
            if (0 != creep.fatigue) {
                // return if this one can't move
                return;
            }

            ret = creep.moveTo(location);
            if (ret === OK) {
                var direction = creep.pos.getDirectionTo(location);
                creep.move(direction);
            }
            else {
                console.log('Move return: ' + ret);
            }
        });
    }
}

/**
 * Main strategy hook, main game loop calls this. And only this?
 */
module.exports.run = function () {
    statusScan();
    spawnCreeps();
    guardPoint(Game.spawns.Spawn1);
    // guardPoint(Game.flags.Flag1);
};
