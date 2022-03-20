import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { formsCSS } from '../components-css/forms';

class SearchForm extends LitElement {
	static properties = {
		error: { type: Boolean },
		errorMsg: { type: String },
	};

	static styles = [
		formsCSS,
		css`

	`
	];

	constructor() {
		super();
		this.error = false;
		this.errorMsg = '';
	}

	onSubmit(e) {
		// TODO Add error handling for API calls
		e.preventDefault();
		const formData = new FormData(e.target);
		// @ts-ignore
		const search = formData.get('search').trim();
		try {
			// ERROR HANDLING
			if (search === '' || search.length < 3) {
				throw new Error('Please write atleast 3 characters.')
			}
		} catch (err) {
			this.errorMsg = err.message;
			this.error = true;
			setTimeout(() => {
				this.error = false;
			}, 3000);
		}
	}

	render() {
		return html`
	<form @submit=${this.onSubmit}>
		<div class="input-container ${classMap({ error: this.error, })}">
			<input type="text" name="search" placeholder="Try your luck in the Schoozersphere">
		</div>
		<input type="submit" value="Search">
		${this.error ? html`<p class="errorMsg error">${this.errorMsg}</p>` : null}
	</form>
    `;
	}
}
customElements.define('search-form', SearchForm);
