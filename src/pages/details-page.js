import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { map } from 'lit/directives/map.js';
import { resets } from '../components-css/resets';
import { getDetails } from '../api/data';

export class DetailsPage extends LitElement {
	static properties = {
		id: { type: String }
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
	constructor() {
		super();
		this.id = '';
	}

	async getDetails() {
		// const data = await getDetails(this.id);
		// return html`
		// 		<user-post creatorUsername=${data.creatorUsername ? data.creatorUsername : 'User'} body=${data.body}
		// 			photoURL=${data.photoURL}>
		// 		</user-post>`;
	}
	render() {
		console.log(this.id);
		return html`
		${until(html`Hello`, html`Loading...`)}
		`
	}
}

customElements.define('details-page', DetailsPage);