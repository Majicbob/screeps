/**
 * Strategy Module for Survival Mode
 *
 * High Score: 506
 *
 * Notes:
 * Energy Runs out fast building DPS, probably need to scale harvesters with something and increase default.
 * Maybe create a range from base that the dps squad will attack, also work on a way to keep them close together.
 *
 * Run Notes:
 * Running out of energy still an issue.
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
var MAX_HARVESTERS = 3;
var MAX_ASSAULT    = 3;
var MAX_BUILDER    = 1;


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
        spawn(Memory.roles.melee);
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
            memory: {role: 'melee'}
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
