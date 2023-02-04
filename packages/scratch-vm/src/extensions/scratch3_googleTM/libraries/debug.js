/**
 * A debug "index" module exporting VideoMotion and VideoMotionView to debug
 * VideoMotion directly.
 * @file debug.js
 */

const VideoMotion = require('./libraries/library');
const VideoMotionView = require('./libraries/view');

module.exports = {
    VideoMotion,
    VideoMotionView
};
