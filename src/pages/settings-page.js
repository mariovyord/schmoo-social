import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

export class SettingsPage extends LitElement {
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
		<h1>The Settings of ${this.name}</h1>
		<user-post></user-post>
		<user-post></user-post>
		<user-post></user-post>
		<user-post></user-post>
		<user-post></user-post>
		<user-post></user-post>
		<user-post></user-post>
		<user-post></user-post>
		<user-post></user-post>
		`;
	}
}

customElements.define('settings-page', SettingsPage);
