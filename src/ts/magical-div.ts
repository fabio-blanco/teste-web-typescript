import * as c from "./commands";
import * as $ from "jquery";

const DIV_ID:string = 'divMagical';
const BUTTON_ID:string = '#btnMagicalDiv';

enum FlowState {
	NEW = "new",
	DIV_CREATED = "div created",
	BACKGROUND_COLOR_CHANGED = "background colour changed",
	COLOR_CHANGED = "color changed"
}

interface FlowCommands {
	createDiv:c.Command,
	changeBackgroundColor:c.Command,
	changeColor:c.Command,
	removeDiv:c.Command
}

function createCommand(state:string, $button:JQuery): c.Command {
	switch (state) {
		case FlowState.DIV_CREATED:
			return new c.CreateDivCommand("Magical Div!!!", DIV_ID, ()=>{$button.html("Change the background color")});
			break;
		case FlowState.BACKGROUND_COLOR_CHANGED:
			return new c.ChangeBackgroundColorCommand(DIV_ID, "#00FF00", ()=>{$button.html("Change de color")});
			break;
		case FlowState.COLOR_CHANGED:
			return new c.ChangeFontColor(DIV_ID, "#FFFFFF", ()=>{$button.html("Remove the div")});
			break;
		case FlowState.NEW:
			return new c.RemoveDiv(DIV_ID, ()=>{$button.html("Create a div")});
			break;
		default:
			return null;
	}
}

class FlowStateController {

	private _actualState:string;
	private commands:FlowCommands;

	constructor(button: string) {
		this._actualState = FlowState.NEW;
		this.commands = {
			createDiv: createCommand(FlowState.DIV_CREATED, $(button)),
			changeBackgroundColor: createCommand(FlowState.BACKGROUND_COLOR_CHANGED, $(button)),
			changeColor: createCommand(FlowState.COLOR_CHANGED, $(button)),
			removeDiv: createCommand(FlowState.NEW, $(button))
		};
	}

	get actualState(): string {
		return this._actualState;
	}

	next():void {
		switch (this._actualState) {
			case FlowState.NEW:
				this.commands.createDiv.execute();
				this._actualState = FlowState.DIV_CREATED;
				break;
			case FlowState.DIV_CREATED:
				this.commands.changeBackgroundColor.execute();
				this._actualState = FlowState.BACKGROUND_COLOR_CHANGED;
				break;
			case FlowState.BACKGROUND_COLOR_CHANGED:
				this.commands.changeColor.execute();
				this._actualState = FlowState.COLOR_CHANGED;
				break;
			case FlowState.COLOR_CHANGED:
				this.commands.removeDiv.execute();
				this._actualState = FlowState.NEW;
				break;
			default:
				throw Error('Unknown state');
		}
	}
}

export class MagicalDiv {
	private flowController: FlowStateController;

	constructor(button: string = BUTTON_ID) {
		this.flowController = new FlowStateController(button);
	}

	doIt():void {
		this.flowController.next();
	}
}