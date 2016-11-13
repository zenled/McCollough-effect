import observable = require("data/observable");
import pages = require("ui/page");
import textFieldModule = require("ui/text-field");
import EventData = require("data/observable")

let page: pages.Page
let imageDuration: number;
let imageDuration_field: textFieldModule.TextField;

exports.onLoaded = function(args: observable.EventData){
    page = <pages.Page> args.object;
    imageDuration_field 


    setEventHandlers()

}

exports.onStart_tap = function(){

}

function setEventHandlers(){
        imageDuration_field.on(textFieldModule.TextField.propertyChangeEvent,function callback(data:EventData.EventData):void{
        console.log(data)
    })
}