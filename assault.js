/**
 * Assault Module
 *
 * Might want to develop modules for each type of combat screep (melee, range, heals, etc).
 * Would a tank type be worth it? How would it pull fire? Maybe moving into range first?
 *
 * Note from docs: "Under attack, the first parts to take hits are those specified first."
 * So Game.TOUGH parts should probably be specified first.
 */

module.exports.assault = function (creep) {
    var target = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    if (target) {
        creep.moveTo(target);
        creep.attack(target);
    }
};

module.exports.spawn = function () {
    var result = Game.spawns.Spawn1.createCreep(
        [Game.TOUGH, Game.MOVE, Game.MOVE, Game.ATTACK],
        'Assault' + (Memory.config.assaultCount + 1),
        {'role': 'assault'}
    );

    // better error handling?
    if (_.isString(result)) {
        Memory.config.assaultCount++;
    }

    console.log('spawn assault return val: ' + result);
};
