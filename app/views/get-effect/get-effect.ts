import observable = require("data/observable");
import pages = require("ui/page");
import textFieldModule = require("ui/text-field");
import EventData = require("data/observable")
import ImageModule = require("ui/image");

import {stringValidator} from "../../shared";

let page: pages.Page;
let imageDuration_field: textFieldModule.TextField;
let displayForMinutes_field: textFieldModule.TextField;
let displayForSeconds_field: textFieldModule.TextField;
let effectGet_image: ImageModule.Image;

let imageDuration: number;
let displayForMinutes: number;
let displayForSeconds: number;


exports.onLoaded = function(args: observable.EventData){
    page = <pages.Page> args.object;
    imageDuration_field = <textFieldModule.TextField> page.getViewById("imageDuration_field");
    displayForMinutes_field = <textFieldModule.TextField> page.getViewById("displayForMinutes_field");
    displayForSeconds_field = <textFieldModule.TextField> page.getViewById("displayForSeconds_field");
    effectGet_image = <ImageModule.Image> page.getViewById("effectGet_image");



    setEventHandlers()

}

exports.onStart_tap = function(){

}

function setEventHandlers(){
    // imageDuration_EventHandler
    imageDuration_field.on(textFieldModule.TextField.propertyChangeEvent,function callback(data:any):void{
        let value = data.value;
        let isValid:boolean = stringValidator.isValidInt(value);
        if (isValid){
            imageDuration = parseInt(value)
        }
        else{

        }
    });

    // displayFor_EventHandler
    displayForMinutes_field.on(textFieldModule.TextField.propertyChangeEvent, function callback(data: any):void{
        let value = data.value;
        let isValid:boolean = stringValidator.isValidInt(value);
        if (isValid){
            displayForMinutes = parseInt(value)
        }
        else{

        }
    });

    displayForSeconds_field.on(textFieldModule.TextField.propertyChangeEvent, function callback(data: any):void{
        let value = data.value;
        let isValid:boolean = stringValidator.isValidInt(value);
        if (isValid){
            displayForSeconds = parseInt(value)
        }
        else{

        }
    });

}