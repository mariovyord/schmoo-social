import { html, render } from 'lit';
export const outlet = document.getElementById('outlet');

export const attachMethods = (ctx, next) => {
	ctx.render = (template) => render(template, outlet);
	ctx.html = html;
	next();
}