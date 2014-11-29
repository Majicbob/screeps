/**
 * Strategy Module for Survival Mode
 *
 * Notes:
 * Energy Runs out fast building DPS, probably need to scale harvesters with something and increase default.
 * Got my new high score though 465.
 *
 * Run Notes:
 * 1st - All 3 assaults were created but the harvester count got incremented.
 * 2nd - Did harvesters first but still ++'ed the assault. Assault move parts got distoryed.
 * 3rd - Status Scan fixed the issue, move and energy still an issue.
 *
 * @TODO: Have to build the harvesters first, at least one or two.
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
 * Spawn creeps as needed. Spawn harvesters first, only spawn melee if harvesters are at max.
 *
 * Should this be moved out to a screep factory type module? It is strat specific so not sure yet.
 */
function spawnCreeps() {
    if (Memory.roles['harvester'].numActive != MAX_HARVESTERS) {
        harvester.spawn();
    }
    if (Memory.roles['harvester'].numActive == MAX_HARVESTERS && Memory.roles['melee'].numActive != MAX_ASSAULT) {
        assault.spawn();
    }
}

/**
 * Main strategy hook, main game loop calls this. And only this?
 */
module.exports.run = function () {
    spawnCreeps();
};
