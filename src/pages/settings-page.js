import { LitElement, css, html } from 'lit';

export class SettingsPage extends LitElement {
	static styles = css`
	`;
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
