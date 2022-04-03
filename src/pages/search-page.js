import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';

const windowBreakpoint = 700;

export default function renderSearch(ctx) {
	ctx.render(html`
		<search-page slot="side">
		</search-page>
		`);
}

class SearchPage extends LitElement {
	static properties = {
		name: { type: String },
	}

	static styles = [
		resets,
		css`
		:host {
			display: grid;  
			grid-template-columns: 1fr 2fr; 
			gap: 10px;
		}
		:host > *:not(:last-child) {
			margin-bottom: 10px; 
		} 

		@media only screen and (max-width: ${windowBreakpoint}px) {
			:host {
				grid-template-columns: 1fr; 
			}
		}
	`
	];

	render() {
		return html`
			<search-form></search-form>
			<p style="text-align: center; font-size: 3rem; font-weight: 700" slot="main">No Results</p>
		`;
	}
}

customElements.define('search-page', SearchPage);
