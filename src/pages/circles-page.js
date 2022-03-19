import { LitElement, css, html } from 'lit';

export class CirclesPage extends LitElement {
	static styles = css`
	`;
	constructor(name = 'John') {
		super();
		this.name = name;
	}

	render() {
		return html`
		<h1>Your Circles of People of ${this.name}</h1>
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

customElements.define('circles-page', CirclesPage);
