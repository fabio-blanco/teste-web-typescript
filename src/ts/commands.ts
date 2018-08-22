import * as $ from "jquery";

export interface Command {
	execute():void;
}

export class CreateDivCommand implements Command {
	private divId:string;
	private conteudo:string;
	private postExecute: Function;

	constructor(conteudo:string, divId:string, postExecute?: Function) {
		this.conteudo = conteudo;
		this.divId = divId;
		if (postExecute) {
			this.postExecute = postExecute;
		}
	}

	execute():void {
		$('body').append(`<div id="${this.divId}">Dinamic div!!!</div>`);
		if (this.postExecute) {
			this.postExecute();
		}
	}
}

export class ChangeBackgroundColorCommand implements Command {
	private tagId:string;
	private color:string;
	private postExecute: Function;

	constructor(tagId:string, color:string, postExecute?: Function) {
		this.tagId = tagId;
		this.color = color;
		if (postExecute) {
			this.postExecute = postExecute;
		}
	}

	execute():void {
		$(`#${this.tagId}`).css('background-color', this.color);
		if (this.postExecute) {
			this.postExecute();
		}
	}

}

export class ChangeFontColor implements Command {
	private tagId:string;
	private color:string;
	private postExecute: Function;

	constructor(tagId:string, color:string, postExecute?: Function) {
		this.tagId = tagId;
		this.color = color;
		if (postExecute) {
			this.postExecute = postExecute;
		}
	}

	execute():void {
		$(`#${this.tagId}`).css('color', this.color);
		if (this.postExecute) {
			this.postExecute();
		}
	}

}

export class RemoveDiv implements Command {
	private divId:string;
	private postExecute: Function;

	constructor(divId:string, postExecute?: Function) {
		this.divId = divId;
		if (postExecute) {
			this.postExecute = postExecute;
		}
	}

	execute():void {
		$(`#${this.divId}`).remove();
		if (this.postExecute) {
			this.postExecute();
		}
	}

}