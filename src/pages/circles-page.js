import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

export default function renderCircles(ctx) {
	ctx.render(html`
			<circles-page slot="main"></circles-page>`)
}

class CirclesPage extends LitElement {
	static styles = [
		resets,
		css`
		:host {
			overflow: hidden;
		}
		h1 {
			font-size: 3vw;
			font-weight: 700;
			text-align: center;
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
