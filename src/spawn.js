/**
 * Spawn module
 */

/**
 * Spawn creep
 *
 * Should there be a check for available energy before trying to spawn? Yes, name id
 *
 * @TODO: Pull this out to its own module since it will be shared across strats
 * @TODO: Param for spawn
 */
module.exports.spawn = function(role, spawner) {
    // var spawner = Game.spawns.Spawn1;

    if (spawner.spawning) {
        return false;
    }

    var name = role.name + (role.nameIndex + 1);

    if (spawner.canCreateCreep(role.build, name) == OK) {
        var result = spawner.createCreep(
            role.build,
            name,
            {'role': role.role}
        );

        if (_.isString(result)) {
            role.nameIndex++;
        }
        else {
            console.log('Spawn error: ' + result);
        }
    }
}