import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

export class SettingsPage extends LitElement {
	static styles = [
		resets,
		css`
		h1 {
			font-size: 3rem;
			text-align: center;
			margin: 2rem 0;
			font-weight: 500;
		}
	`
	];
	constructor(name = 'John') {
		super();
		this.name = name;
	}

	render() {
		return html`
		<profile-card></profile-card>
		<h1>Settings</h1>
		`;
	}
}

customElements.define('settings-page', SettingsPage);
