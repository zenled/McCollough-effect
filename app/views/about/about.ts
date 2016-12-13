import utils = require("utils/utils");
import frameModule = require("ui/frame");
var topmost = frameModule.topmost();

exports.onNavBtnTapBack = function(){
    topmost.navigate("views/main-view/main-view")
}

exports.openGithub = function(){
    utils.openUrl("https://github.com/ZedTheLed/McCollough-effect")
}