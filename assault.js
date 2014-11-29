/**
 * Assault Module
 *
 * Might want to develop modules for each type of combat screep (melee, range, heals, etc).
 * Would a tank type be worth it? How would it pull fire? Maybe moving into range first?
 *
 * Note from docs: "Under attack, the first parts to take hits are those specified first."
 * So Game.TOUGH parts should probably be specified first.
 */

var _ = require('lodash');

module.exports.assault = function (creep) {
    var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    if (target) {
        creep.moveTo(target);
        creep.attack(target);
    }
};

module.exports.spawn = function () {
    var role = Memory.roles.melee;
    var result = Game.spawns.Spawn1.createCreep(
        role.build,
        role.name + (role.numActive + 1),
        {'role': role.role}
    );

    // better error handling?
    if (_.isString(result)) {
        role.numActive++;
    }

    console.log('spawn melee return val: ' + result);
};
