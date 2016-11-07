import LabelModule = require("ui/label");
import view = require("ui/core/view");
let myLabel;

exports.onLoaded = function(args){
      var page = args.object;

    myLabel = view.getViewById(page,"time_label")
}

exports.start = function(){
    myLabel.visibility="collapsed";
}