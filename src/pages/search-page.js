import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

export default function renderSearch(ctx) {
	ctx.render(html`
		<app-root activePage=${'/search'}> <search-page slot="side">
			</search-page>
			<p style="text-align: center; font-size: 3rem; font-weight: 700" slot="main">No Results</p>
		</app-root>`);
}

class SearchPage extends LitElement {
	static properties = {
		name: { type: String },
	}

	static styles = [
		resets,
		css`
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
