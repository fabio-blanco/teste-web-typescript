import '../css/styles.css';
import * as $ from "jquery";
import * as greeter from "./greeter";

$(function() {
	$('body').append(`<div id="divTexto">${greeter.greet("mundo")}</div>`);
});