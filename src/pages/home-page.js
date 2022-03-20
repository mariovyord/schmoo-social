import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

export class HomePage extends LitElement {
	static properties = {
		name: { type: String },
	}

	static styles = [
		resets,
		css`
		:host {
			padding-top: 23px;
		}
		:host > *:not(:last-child) {
			margin-bottom: 10px; 
		} 
	`
	];
	constructor(name = 'World') {
		super();
		this.name = name;
	}

	render() {
		return html`
		<new-post></new-post>
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

customElements.define('home-page', HomePage);
