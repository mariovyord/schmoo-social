import { LitElement, css, html } from 'lit';

export class ProfilePage extends LitElement {
	static styles = css`
	:host {
		padding-top: 23px;
	}
	:host > *:not(:last-child) {
		margin-bottom: 10px; 
	} 
	`;
	constructor(name = 'John') {
		super();
		this.name = name;
	}

	render() {
		return html`
		<profile-card></profile-card>
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

customElements.define('profile-page', ProfilePage);
