import observable = require("data/observable");
import pages = require("ui/page");
import textFieldModule = require("ui/text-field");
import EventData = require("data/observable")
import ImageModule = require("ui/image");
import buttonModule = require("ui/button");
import frameModule = require("ui/frame");
var topmost = frameModule.topmost();
let timer = require("timer");
var imageSource = require("image-source");

import * as Toast from 'nativescript-toast';

import {stringValidator} from "../../shared";

// Page Components
let page: pages.Page;
let imageDuration_field: textFieldModule.TextField;
let displayForMinutes_field: textFieldModule.TextField;
let displayForSeconds_field: textFieldModule.TextField;
let effectGet_image: ImageModule.Image;
let start_button: buttonModule.Button;

// data
enum McColloughImage{
    red,
    green
}

enum Mode{
    gettingEffect,
    stopped
}

let imageDuration: number;
let displayForMinutes: number;
let displayForSeconds: number;
let displayDuration: number = 20; //in seconds
let mode:Mode;
let currentImage;

// defaults
let imageDuration_default:number = 3;
let displayForMinutes_defaul:number = 3;
let displayForSeconds_default:number = 0;



// Resources
let IMAGE_get_red:string = "res://get_red"
let IMAGE_get_green:string = "res://get_green"

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

    timerStop();
}

// ****************************************** Inputs *****************************
exports.onStart_tap = function(){
    switch(mode){
        case Mode.stopped:
            let suces = UpdateInputs()
            if (!suces)
                break;
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

// ******************************************** UI ******************************
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

function makeToast(message:string="Please check your Settings"){
    let toast:Toast.Toast = Toast.makeText(message);
    toast.show()

}

exports.onNavBtnTapBack = function(){
    topmost.navigate("views/main-view/main-view")
}

// ******************************************** Data *************************************
/**
 * @returns True if input is valid
 */
function UpdateInputs():boolean{
    let sucess = updateImageDuration()
    if (!sucess){
        makeToast()
    }
    if (sucess){
        sucess = updateDisplayFor()
        if (!sucess){
            makeToast()
        }
    }
    return sucess
}

function updateImageDuration():boolean{
    let str = imageDuration_field.text;
    
    if (str == ""){
        imageDuration = imageDuration = imageDuration_default;
        return true;
    }

    if (stringValidator.isValidInt(str)){
        let duration = parseInt(str)
        if (duration > 0 && duration < 60){
            imageDuration = duration;
            return true;
        }
    }
    return false;
}

function updateDisplayFor():boolean{
    let str_seconds = displayForSeconds_field.text
    let str_minutes = displayForMinutes_field.text

    if ((stringValidator.isValidInt(str_seconds) || str_seconds == "") && 
        (stringValidator.isValidInt(str_minutes)|| str_minutes == "")){
        let sec, min;
        if (str_seconds != "")    
            sec = parseInt(str_seconds);
        else
            sec = displayForSeconds_default;
        if (str_minutes != "")
            min = parseInt(str_minutes);
        else
            min = displayForMinutes_defaul;

        if (sec > 59 || min > 59){
            return false
        }

        let inSeconds = sec + (min * 60)
        if (inSeconds == 0)
            return false;
        
        displayDuration = inSeconds

        return true
    }

}

// *********************************************** TIMER *******************************
// Timer Events -------------

function onTimerEnd(){
    mode = Mode.stopped;
    updateStartButton();
}

function onTimerStep(){
    if (currentImage == McColloughImage.red){
        effectGet_image.src = IMAGE_get_green
        currentImage = McColloughImage.green;
    }
    else{
        effectGet_image.src = IMAGE_get_red
        currentImage = McColloughImage.red;
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