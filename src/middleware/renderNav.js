import { LitElement, css, html, render } from 'lit';

export default function renderNav(ctx, next) {
	console.log(ctx);
	render(html`
		<main-nav .ctx=${ctx}></main-nav>`, document.querySelector('header'));

	next();
}