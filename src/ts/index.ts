import '../css/styles.css';
import * as $ from "jquery";
import * as greeter from "./greeter";
import {MagicalDiv} from "./magical-div";

$(function() {
	let magicalDivId = "btnMagicalDiv";
	let magicalDiv:MagicalDiv;

	$('body').append(`<div id="divTexto">${greeter.greet("mundo")}</div>`)
		.append(`<button id="${magicalDivId}" type="button">Create a div</button>`);
	$('#btnMagicalDiv').on('click', function () {
		if (!magicalDiv) {
			magicalDiv = new MagicalDiv(`#${magicalDivId}`);
		}
		magicalDiv.doIt();
		console.log('index',typeof this);
	});
});