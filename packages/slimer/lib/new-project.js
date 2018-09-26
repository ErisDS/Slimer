// These lines give us access to Yeoman
// They should probably live elsewhere
const yoEnv = require('yeoman-environment');
const env = yoEnv.createEnv();
const debug = require('debug')('slimer');
const path = require('path');


const findSlimer = (callback) => {
    let searchPath = path.resolve(__dirname, '../../');
    let slimerPath = env.findGeneratorsIn([searchPath]);
    let slimerPath = false;
    let slimer;

    if (slimerPath && slimerPath[0]) {
        let ns = env.getByPath(path.join(slimerPath[0], 'generators', 'app'));
        slimer = env.instantiate(ns, {options: {help: true}});
        debug('found');
        return callback(slimer);
    } else {
        env.lookup(() => {
            debug('loaded');
            slimer = env.create('@tryghost/slimer', {options: {help: true}});
            debug('found');
            return callback(slimer);
        });
    }
};

module.exports = (...args) => {
    debug('new project', ...args);

    findSlimer((slimer) => {
        slimer.run();
    });
};