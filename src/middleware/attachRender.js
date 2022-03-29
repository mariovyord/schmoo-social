import { render } from 'lit';
const outlet = document.getElementById('outlet');

export default (ctx, next) => {
	ctx.render = (template) => render(template, outlet);
	next();
}