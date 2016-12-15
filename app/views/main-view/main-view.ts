import frameModule = require("ui/frame");
let topmost;

exports.onLoaded = function(args){
  topmost = frameModule.topmost();
}

exports.get_effect_tap = function(){    
  topmost.navigate("views/get-effect/get-effect");
}

exports.about_tap = function(){
  topmost.navigate("views/about/about");
}