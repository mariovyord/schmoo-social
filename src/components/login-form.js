import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class LoginForm extends LitElement {
	static properties = {
		error: { type: Boolean },
		errorMsg: { type: String },
		errorEmail: { type: Boolean },
		errorPassword: { type: Boolean },
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
	.form-footer {
		max-width: 300px;
		background-color: white;
		border: 1px solid gray;
		border-radius: 3px;
		padding: 8px 50px;
	}
	.form-footer p {
		text-align: center;
	}
	a {
		text-decoration: none;
		color: #0095f6;
		font-weight: 500;
	}
	h1 {
		font-family: 'Dancing Script', cursive;
		font-size: 2.5rem;
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
		this.errorEmail = false;
		this.errorPassword = false;
	}

	showHidePassword(e) {
		e.preventDefault();
		this.renderRoot.querySelectorAll('.pass').forEach(x => {
			const attr = x.getAttribute('type');
			if (attr === 'password') {
				x.setAttribute('type', 'text');
				e.target.innerHTML = '&#10005';
			} else {
				x.setAttribute('type', 'password');
				e.target.innerHTML = `&equiv;`;
			}
		})
	}

	onSubmit(e) {
		// TODO Add error handling for API calls
		e.preventDefault();
		const formData = new FormData(e.target);
		// @ts-ignore
		const email = formData.get('email').trim();
		// @ts-ignore
		const password = formData.get('password').trim();
		try {
			// ERROR HANDLING
			if (email === '' || password === '') {
				this.errorEmail = true;
				this.errorPassword = true;
				throw new Error('Please fill all fields.')
			}
		} catch (err) {
			this.errorMsg = err.message;
			this.error = true;
			this.errorEmail = email === '';
			this.errorPassword = password === '';
			setTimeout(() => {
				this.error = false;
				this.errorEmail = false;
				this.errorPassword = false;
			}, 3000);
		} finally {
			console.log('yes');
		}
	}

	render() {
		return html`
	<form @submit=${this.onSubmit}>
		<h1>Schmoozer</h1>
		<div class="input-container ${classMap({ error: this.errorEmail, })}">
			<input type="text" name="email" placeholder="Email">
		</div>
		<div class="input-container ${classMap({ error: this.errorPassword, })}">
			<input class="pass" type="password" name="password" placeholder="Password">
			<button class="show-btn" @click=${this.showHidePassword}>&equiv;</button>
		</div>
		<input type="submit" value="Login">
		${this.error ? html`<p class="errorMsg error">${this.errorMsg}</p>` : null}
	</form>
	<div class="form-footer">
		<p>Don't have an account? <a href="#">Register</a></p>
	</div>
    `;
	}
}
customElements.define('login-form', LoginForm);
