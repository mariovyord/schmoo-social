import { LitElement, css, html } from 'lit';

export class ProfilePage extends LitElement {
	static styles = css`
	`;
	constructor(name = 'John') {
		super();
		this.name = name;
	}

	render() {
		return html`
		<h1>Hello, ${this.name}</h1>
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
