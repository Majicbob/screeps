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
    var target  = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    if (target) {
        if (creep.pos.inRangeTo(target.pos, 5)) {
            creep.moveTo(target);
            creep.attack(target);
        }
    }
};

module.exports.rangedAttack = function (creep) {

    var targets = creep.room.find(
        Game.HOSTILE_CREEPS, {
        filter: function(i) {
            return i.getActiveBodyparts('heal') > 0;
        }
    });

    // attack any active healers first, otherwise the closest
    var target;
    if (targets.length) {
        // for each here?
        target = targets[0];
    }
    else {
        target  = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (null === target) {
            return;
        }
    }

    if (creep.pos.inRangeTo(target.pos, 3)) {
        creep.rangedAttack(target);
    }
    else {
        var direction = creep.pos.getDirectionTo(target);
        creep.move(direction);
    }
};