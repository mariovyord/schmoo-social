import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { map } from 'lit/directives/map.js';
import { resets } from '../components-css/resets';
import { getAllPosts } from '../api/data';

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
	async allPosts() {
		const data = await getAllPosts();
		return Object.values(data).map(el => html`<user-post creatorUsername=${el.creatorUsername ? el.creatorUsername : 'User' } body=${el.body}></user-post>`)
	}
	render() {
		return html`
		<new-post></new-post>
		${until(this.allPosts(), html`Loading`)}
		`
	}
}

customElements.define('home-page', HomePage);