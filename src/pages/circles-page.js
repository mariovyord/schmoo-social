import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

export class CirclesPage extends LitElement {
	static styles = [
		resets,
		css`
	`
	];
	constructor(name = 'John') {
		super();
		this.name = name;
	}

	render() {
		return html`
		<profile-card></profile-card>
		<user-card></user-card>
		<user-card></user-card>
		<user-card></user-card>
		<user-card></user-card>
		<user-card></user-card>
		`;
	}
}

customElements.define('circles-page', CirclesPage);
