import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class SearchForm extends LitElement {
	static properties = {
		error: { type: Boolean },
		errorMsg: { type: String },
	};

	static styles = css`
	form {
		display: flex;
		flex-direction: column;
		max-width: 300px;
		background-color: white;
		border: 1px solid gray;
		border-radius: 3px;
		padding: 50px;
		margin-bottom: 1rem;
	}
	.form-footer p {
		text-align: center;
	}
	a {
		text-decoration: none;
		color: #0095f6;
		font-weight: 500;
	}
	label {
		font-size: 1.5rem;
		font-weight: 500;
		text-align: center;
		margin: 0 0 1rem 0;
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
		margin-bottom: 1rem;
	}
	`;

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
		<label>Search the Schmoozer</label>
		<div class="input-container ${classMap({ error: this.error, })}">
			<input type="text" name="search" placeholder="Type something">
		</div>
		<input type="submit" value="Search">
		${this.error ? html`<p class="errorMsg error">${this.errorMsg}</p>` : null}
	</form>
    `;
	}
}
customElements.define('search-form', SearchForm);
