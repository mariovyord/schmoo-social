import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { formsCSS } from '../components-css/forms';

class SearchForm extends LitElement {
	static properties = {
		error: { type: Boolean },
		errorMsg: { type: String },
	};

	static styles = [
		css`
		:host {
			width: 100%;
			padding: 10px;
			background-color: white;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
			border-radius: 5px;
		}
		form {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		.input-container {
			background-color: rgb(247, 248, 255);
			border: 1px solid gray;
		}
		input {
			all: unset;
			padding: 1rem;
			width: 100%;
			border-radius: 5px;
			box-sizing: border-box;
		}
		input[type="submit"] {
			color: white;
			font-size: 0.9rem;
			font-weight: 500;
			text-align: center;
			border: 0px;
			background-color: #0095f6;
			padding: 0.7rem;
		}
		input[type="submit"]:hover {
			background-color: rgba(0, 149, 246, 0.8);
			cursor: pointer;
		}
		.error {
			border: 1px solid red;
		}
		.errorMsg {
			font-size: 0.8rem;
			text-align: center;
			background-color: rgba(255, 0, 0, 0.1);
			border-radius: 3px;
			padding: 0.5rem 1rem;
			margin: 1rem 0;
		}
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
		<input class="input-container ${classMap({ error: this.error, })}" type="text" name="search"
			placeholder="Try your luck">
		<input type="submit" value="Search">
		${this.error ? html`<p class="errorMsg error">${this.errorMsg}</p>` : null}
	</form>
    `;
	}
}
customElements.define('search-form', SearchForm);
