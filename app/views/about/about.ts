import frameModule = require("ui/frame");
var topmost = frameModule.topmost();

exports.onNavBtnTapBack = function(){
    topmost.navigate("views/main-view/main-view")
}