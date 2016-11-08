import labelModule = require("ui/label");
import stackLayout = require("ui/layouts/stack-layout");
import view = require("ui/core/view");
import listPickerModule = require("ui/list-picker");
import buttonModule = require("ui/button");

let label_setTime: labelModule.Label;
let main_layout;
let page: view.View;

// Time Picking views
let timePickingLayout: stackLayout.StackLayout;
let listPicker_Minutes: listPickerModule.ListPicker;
let ListPicker_Seconds: listPickerModule.ListPicker;

// Buttons
let btn_Start: buttonModule.Button;

exports.onLoaded = function(args){
    page = args.object;
    main_layout =  view.getViewById(page,"main_layout");

    // sets timePicking
    // Label
    label_setTime = new labelModule.Label();
    label_setTime.text = "Set time";
    main_layout.addChild(label_setTime);

    // timePicking
    timePickingLayout = new stackLayout.StackLayout({orientation:"horizontal"});
    timePickingLayout.orientation = "horizontal";

    listPicker_Minutes = new listPickerModule.ListPicker();
    listPicker_Minutes.items = generateItems(15,"minutes");

    ListPicker_Seconds = new listPickerModule.ListPicker();
    ListPicker_Seconds.items = generateItems(59, "seconds",10);

    timePickingLayout.addChild(listPicker_Minutes);
    timePickingLayout.addChild(ListPicker_Seconds);

    // start Button

    btn_Start = new buttonModule.Button();
    btn_Start.text = "Start";



    main_layout.addChild(timePickingLayout);
    main_layout.addChild(btn_Start);

}

function generateItems(n: number, ending:string, step:number = 1): Array<string>{
    let result:Array<string> = [];
    for (let i = 0; i <= n; i+= step){
        result.push(i.toString() + " " + ending);
    }

    return result;
}

exports.start = function(){
    //myLabel.visibility="collapsed";
}