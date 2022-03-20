import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

export class SearchPage extends LitElement {
	static properties = {
		name: { type: String },
	}

	static styles = [
		resets,
		css`
		:host {
			width: 100%;
			display: flex;
			flex-direction: row;
			justify-content: center;
			padding: 10px;
		}
	`
	];
	constructor(name = 'World') {
		super();
		this.name = name;
	}

	render() {
		return html`
			<search-form></search-form>
		`;
	}
}

customElements.define('search-page', SearchPage);
