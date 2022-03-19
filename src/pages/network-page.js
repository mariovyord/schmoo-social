import { LitElement, css, html } from 'lit';

export class NetworkPage extends LitElement {
	static styles = css`
	`;
	constructor(name = 'John') {
		super();
		this.name = name;
	}

	render() {
		return html`
		<h1>The Network of ${this.name}</h1>
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

customElements.define('network-page', NetworkPage);
