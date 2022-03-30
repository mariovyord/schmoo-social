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
		form {
			display: flex;
			flex-direction: column;
			background-color: white;
			border-radius: 3px;
			padding: 20px;
			margin-bottom: 1rem;
			border-radius: 5px;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		}
		.form-footer {
			max-width: 400px;
			background-color: white;
			border-radius: 3px;
		}
		.form-footer p {
			text-align: center;
		}
		h1 {
			font-family: 'Dancing Script', cursive;
			font-size: 2.5rem;
			font-weight: 500;
			text-align: center;
			margin: 0 0 1rem 0;
		}
		a {
			text-decoration: none;
			font-weight: 500;
			color: #0095f6;
		}
		.input-container {
			display: flex;
			justify-content: space-between;
			padding: 0;
			margin-bottom: 1rem;
			background-color: rgb(247, 248, 255);
			border: 1px solid gray;
			border-radius: 3px;
		}
		.show-btn {
			width: 30px;
			align-self: center;
			height: 25px;
			border: 0;
			background-color: rgb(247, 248, 255);	
		}
		.show-btn:hover {
			cursor: pointer;
		}
		input {
			all: unset;
			padding: 1rem;
			flex: 1;
		}
		input[type="submit"] {
			color: white;
			font-size: 0.9rem;
			font-weight: 500;
			text-align: center;
			border: 0px;
			border-radius: 3px;
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
		@media only screen and (max-width: 420px) {
			form {
				width: 100%; 
			}
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
		<div class="input-container ${classMap({ error: this.error, })}">
			<input type="text" name="search" placeholder="Try your luck">
		</div>
		<input type="submit" value="Search">
		${this.error ? html`<p class="errorMsg error">${this.errorMsg}</p>` : null}
	</form>
    `;
	}
}
customElements.define('search-form', SearchForm);
