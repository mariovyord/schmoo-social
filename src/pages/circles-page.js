import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

export default function renderCircles(ctx) {
	ctx.render(html`
		<app-root activePage=${'/circles'}> <sidebar-usercard slot="side">
			</sidebar-usercard>
			<circles-page slot="main"></circles-page>
		</app-root>`);
}

class CirclesPage extends LitElement {
	static styles = [
		resets,
		css`
		h1 {
			font-size: 3rem;
			font-weight: 700;
		}
	`
	];
	constructor(name = 'John') {
		super();
		this.name = name;
	}

	render() {
		return html`
		<h1>UNDER CONSTRUCTION</h1>
		`;
	}
}

customElements.define('circles-page', CirclesPage);
