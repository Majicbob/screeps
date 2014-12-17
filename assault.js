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
    var target  = creep.pos.findNearest(Game.HOSTILE_CREEPS);
    if (target) {
        if (creep.pos.inRangeTo(target.pos, 5)) {
            creep.moveTo(target);
            creep.attack(target);
        }
    }
};

module.exports.rangedAttack = function (creep) {

    // attach any active healers first
    var targets = creep.room.find(
        Game.HOSTILE_CREEPS, {
        filter: function(i) {
            return i.getActiveBodyparts('heal') > 0;
        }
    });

    if (targets.length) {
        // for each here?
        var target = targets[0];

        if (creep.pos.inRangeTo(target.pos, 3)) {
            creep.rangedAttack(target);
        }
        else {
            var direction = creep.pos.getDirectionTo(target);
            creep.move(direction);
        }
    }
};