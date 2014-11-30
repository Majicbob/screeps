/**
 * Strategy Module for Survival Mode
 *
 * High Score: 480
 *
 * Notes:
 * Energy Runs out fast building DPS, probably need to scale harvesters with something and increase default.
 *
 * Run Notes:
 * Creeps with no move is a problem.
 * Running out of energy still an issue.
 *
 * @TODO: Need to get some ranged dps in.
 * @TODO: If no enemies are around then return dps to spawn point.
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
var MAX_HARVESTERS = 3;
var MAX_ASSAULT    = 3;


/**
 * Strategy Logic
 */

/**
 * Spawn creep
 *
 * Should there be a check for available energy before trying to spawn?
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
        role.name + (role.numActive + 1),
        {'role': role.role}
    );
}

/**
 * Spawn creeps as needed. Spawn harvesters first, only spawn melee if harvesters are at max.
 *
 * Should this be moved out to a screep factory type module? It is strat specific so not sure yet.
 */
function spawnCreeps() {
    if (Memory.roles.harvester.numActive != MAX_HARVESTERS) {
        spawn(Memory.roles.harvester);
    }
    if (Memory.roles.harvester.numActive == MAX_HARVESTERS && Memory.roles.melee.numActive != MAX_ASSAULT) {
        spawn(Memory.roles.melee);
    }
}

/**
 * Main strategy hook, main game loop calls this. And only this?
 */
module.exports.run = function () {
    spawnCreeps();
};
