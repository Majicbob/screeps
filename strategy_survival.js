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
 * Run Notes:
 * Energy regen seems to have been patched and largely increased, trying more harvesters per node.
 *
 * @TODO: Need to get some ranged dps in.
 */

/**
 * Modules
 */
var _ = require('lodash');

// Roles
var assault   = require('assault');
var harvester = require('harvester');


/**
 * Strategy Config Values
 */

/**
 * Unit counts to auto-build per role.
 */
var MAX_HARVESTERS = 4;
var MAX_ASSAULT    = 4;
var MAX_BUILDER    = 0;


/**
 * Strategy Logic
 */

/**
 * Spawn creep
 *
 * Should there be a check for available energy before trying to spawn? Yes, name id
 *
 * @TODO: Pull this out to its own module since it will be shared across strats
 * @TODO: Param for spawn
 */
function spawn(role) {
    var spawner = Game.spawns.Spawn1;

    if (spawner.spawning) {
        return false;
    }

    var result = spawner.createCreep(
        role.build,
        role.name + (role.nameIndex + 1),
        {'role': role.role}
    );

    if (_.isString(result)) {
        role.nameIndex++;
    }
    else {
        console.log('Spawn error: ' + result);
    }
}

/**
 * Spawn creeps as needed. Spawn harvesters first, only spawn melee if harvesters are at max.
 *
 * Should this be moved out to a screep factory type module? It is strat specific so not sure yet.
 * Some sort of queue for spawning would be good. This logic could get complicated without it.
 */
function spawnCreeps() {
    if (Memory.roles.harvester.numActive != MAX_HARVESTERS) {
        spawn(Memory.roles.harvester);
    }
    if (Memory.roles.harvester.numActive == MAX_HARVESTERS && Memory.roles.melee.numActive != MAX_ASSAULT) {
        spawn(Memory.roles.ranged);
    }

    // Only spawn a builder after harvesters and dps are maxed
    if (Memory.roles.melee.numActive == MAX_ASSAULT && Memory.roles.builder.numActive != MAX_BUILDER) {
        spawn(Memory.roles.builder);
    }
}

/**
 * Guard Location. If there are no hostile creeps then bring all the melee back to the given point.
 */
function guardPoint(location) {
    // var spawn   = Game.spawns.Spawn1
    var enemies = location.room.find(Game.HOSTILE_CREEPS);

    if (_.isEmpty(enemies)) {
        var melee = _.filter(Game.creeps, {
            memory: {role: 'ranged'}
        });
        _.forEach(melee, function (creep) {
            creep.moveTo(location);
        });
    }
}

/**
 * Main strategy hook, main game loop calls this. And only this?
 */
module.exports.run = function () {
    spawnCreeps();
    guardPoint(Game.flags.Flag1);
};
