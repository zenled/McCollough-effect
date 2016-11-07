var frameModule = require("ui/frame");

exports.tap_Effect = function(){
  let topmost = frameModule.topmost();
  topmost.navigate("views/effect-view/effect-view");
}