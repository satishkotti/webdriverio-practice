var argv = require("yargs").argv;
var path = require('path');
var rootPath = path.normalize(__dirname)
var Page = require('./../../page');
//var input = require('./../../config/videotestdata');
var url = global.environment;
var browser = require('./../../common/browser');
//var pvElements = Object.create(Page, {
    
module.exports = {
  staging1: {
video_toolbar_playbutton:'div.dyn-controlbar>div.vjs-play-control.vjs-control.vjs-paused',
video_toolbar_pausebutton:'div.dyn-controlbar>div.vjs-play-control.vjs-control.vjs-playing',
video_toolbar_mutebutton:'div.vjs-mute-control.vjs-control.vjs-vol-3.vjs-vol-1',
video_toolbar_unmutebutton:'div.vjs-mute-control.vjs-control.vjs-vol-3.vjs-vol-0',
video_toolbar_closecaptionon:'div.vjs-captions-control.vjs-control.captions',
video_toolbar_closecaptionoff:'div.vjs-captions-control.vjs-control.captions-on',
video_toolbar_saveforlater:'div.vjs-favorites-control.vjs-control',
video_toolbar_playcontrol:'div.vjs-play-control.vjs-control',
video_toolbar:'div.vjs-control-bar',
video_toolbar_container:'div.info-container.clearfix',
video_toolbar_playdisabled:'div.vjs-play-control.vjs-control.vjs-paused.vjs-disabled',
video_toolbar_twitter:'div.cmd-twitr',
video_toolbar_facebook:'div.cmd-fb'
}
}
