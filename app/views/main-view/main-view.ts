import frameModule = require("ui/frame");
let topmost;

exports.onLoaded = function(args){
  topmost = frameModule.topmost();
}

exports.get_effect_tap = function(){
  var navigationEntry = {
    moduleName: "views/get-effect/get-effect",
    context: {buildUI:true},
    animated: true
    }
    
  topmost.navigate(navigationEntry);
}

exports.about_tap = function(){
  topmost.navigate("views/about/about");
}