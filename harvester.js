/**
 * Harvester Module
 */

var _ = require('lodash');

module.exports.harvest = function (creep) {
    var spawn = Game.spawns.Spawn1;

    if(creep.energy < creep.energyCapacity) {
        var source = creep.pos.findNearest(Game.SOURCES);
        creep.moveTo(source);
        creep.harvest(source);
    }
    else {
        creep.moveTo(spawn);
        creep.transferEnergy(spawn);
    }
};

module.exports.spawn = function () {
    var result = Game.spawns.Spawn1.createCreep(
        [Game.MOVE, Game.MOVE, Game.CARRY, Game.WORK],
        'Harvester' + (Memory.harvesterCount + 1),
        {'role': 'harvester'}
    );

    if (_.isString(result)) {
        Memory.harvesterCount++;
    }

    console.log('spawn harvester return val: ' + result);
};
