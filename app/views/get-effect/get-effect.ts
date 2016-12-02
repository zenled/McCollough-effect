import observable = require("data/observable");
import pages = require("ui/page");
import textFieldModule = require("ui/text-field");
import EventData = require("data/observable")
import ImageModule = require("ui/image");
import buttonModule = require("ui/button");
let timer = require("timer");
var imageSource = require("image-source");

import {stringValidator} from "../../shared";

// Page Components
let page: pages.Page;
let imageDuration_field: textFieldModule.TextField;
let displayForMinutes_field: textFieldModule.TextField;
let displayForSeconds_field: textFieldModule.TextField;
let effectGet_image: ImageModule.Image;
let start_button: buttonModule.Button;

// Data
enum McColloughImage{
    red,
    green
}

enum Mode{
    gettingEffect,
    stopped
}

let imageDuration: number = 3;
let displayForMinutes: number;
let displayForSeconds: number;
let displayDuration: number = 20; //in seconds
let mode:Mode;
let currentImage;



// Resources
let IMAGE_get_red = imageSource.fromResource("get_red");
let IMAGE_get_green = imageSource.fromResource("get_green");

// Timer Data
let timerID;
let secondsSinceLastStep: number; // seconds elapsed since onStep function was called
let secondsElapsed: number;       // seconds elapsed since timer was started
let timerWaitTime: number = 1000; // one second in milliseconds


exports.onLoaded = function(args: observable.EventData){
    page = <pages.Page> args.object;
    imageDuration_field = <textFieldModule.TextField> page.getViewById("imageDuration_field");
    displayForMinutes_field = <textFieldModule.TextField> page.getViewById("displayForMinutes_field");
    displayForSeconds_field = <textFieldModule.TextField> page.getViewById("displayForSeconds_field");
    effectGet_image = <ImageModule.Image> page.getViewById("effectGet_image");
    start_button = <buttonModule.Button> page.getViewById("start_button")

    let test = <textFieldModule.TextField> page.getViewById("Test");
    test.text = "Hello";


    setEventHandlers()

    timerStop();


}

function setEventHandlers(){
    // imageDuration_EventHandler
    imageDuration_field.on(textFieldModule.TextField.propertyChangeEvent,function callback(data:any):void{
        let value = data.value;
        if (stringValidator.isValidInt(value)){
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
            displayForSeconds_field.text = displayForSeconds.toString();
        }
    });

}


exports.onStart_tap = function(){
    switch(mode){
        case Mode.stopped:
            mode = Mode.gettingEffect
            updateStartButton()
            timerStart();
            break;
        case Mode.gettingEffect:
            mode = Mode.stopped
            timerStop();
            updateStartButton()
            break;
        }
}

// Timer Events ------------------------------

function onTimerEnd(){
    mode = Mode.stopped;
    updateStartButton();
}

function onTimerStep(){
    if (currentImage == McColloughImage.red){
        effectGet_image.src = IMAGE_get_green;
        currentImage = McColloughImage.green
    }
    else{
        effectGet_image.src = IMAGE_get_red;
        currentImage = McColloughImage.red;
    }

}

// UI Functions
function updateStartButton(){
    switch(mode){
        case Mode.gettingEffect:
            start_button.text="Stop";
            break;
        case Mode.stopped:
            start_button.text="Start";
            break;
    }
}

// Timer Functions ----------------------------
function timerStart(){
    currentImage = McColloughImage.red;
    effectGet_image.src = IMAGE_get_red;
    timerCheck(true);
}

function timerCheck(firstCall = false){
    if (firstCall){
        secondsElapsed = 0;
        secondsSinceLastStep = 0;
        

        timerID = timer.setTimeout(timerCheck, timerWaitTime)
    }
    else{
        secondsElapsed++;
        secondsSinceLastStep++;

        if (secondsElapsed >= displayDuration){
            onTimerEnd()
        }
        else{ 
            if (secondsSinceLastStep >= imageDuration){
            secondsSinceLastStep = 0;
            onTimerStep();
            }
            timerID = timer.setTimeout(timerCheck, timerWaitTime);
        }
    }

}

function timerStop(){
    timer.clearTimeout(timerID);
    mode = Mode.stopped;
    updateStartButton();
}