import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { map } from 'lit/directives/map.js';
import { resets } from '../components-css/resets';
import { getDetails } from '../api/data';

export default function renderDetails(ctx) {
	ctx.render(html`
			<details-page id=${ctx.params.id} slot="main"></details-page>
		`);
}

class DetailsPage extends LitElement {
	static properties = {
		id: { type: String }
	}

	static styles = [
		resets,
		css`
		:host {
			display: grid;  
			grid-template-columns: 1fr 2fr; 
			gap: 10px;
			margin: 0 auto; 
			max-width: 980px; 
		}
		.main > *:not(:last-child) {
			margin-bottom: 10px; 
		} 
		user-post:first-child {
			font-size: 1.5rem;
		}
	`
	];
	constructor() {
		super();
		this.id = '';
	}

	async userPost() {
		const data = await getDetails(this.id);
		return html`
				<user-post creatorUsername=${data.creatorUsername ? data.creatorUsername : 'User'} body=${data.body}
					photoURL=${data.photoURL}>
				</user-post>`;
	}
	render() {
		return html`
		<div class="side">
			<details-nav slot="side"></details-nav>
		</div>
		<div class="main">
			${until(this.userPost(), html`Loading...`)}
			<new-post></new-post>
			<user-post></user-post>
			<user-post></user-post>
			<user-post></user-post>
			<user-post></user-post>
		</div>
		
		`
	}
}

customElements.define('details-page', DetailsPage);