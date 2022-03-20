import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { formsCSS } from '../components-css/forms';
import { resets } from '../components-css/resets';
import { userLogin } from '../api/auth';

class LoginForm extends LitElement {
	static properties = {
		errorMsg: { type: String },
	};

	static styles = [
		resets,
		formsCSS,
		css`
		`
	];

	constructor() {
		super();
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

		if (email === '' || password === '') {
			this.errorMsg = 'Please fill all fields.';
		}

		userLogin(email, password).catch(err => {
			this.errorMsg = 'Invalid email or password.';
		})

		if (this.errorMsg) {
			this.errorEmail = email === '';
			this.errorPassword = password === '';
			setTimeout(() => {
				this.errorMsg = '';
				this.errorEmail = false;
				this.errorPassword = false;
			}, 3000);
		}
	}

	render() {
		return html`
	<form @submit=${this.onSubmit}>
		<h1>Schmoozer</h1>
		<div class="input-container ${classMap({ errorMsg: this.errorEmail, })}">
			<input type="text" name="email" placeholder="Email">
		</div>
		<div class="input-container ${classMap({ errorMsg: this.errorPassword, })}">
			<input class="pass" type="password" name="password" placeholder="Password">
			<button class="show-btn" @click=${this.showHidePassword}>&equiv;</button>
		</div>
		<input type="submit" value="Login">
		${this.errorMsg ? html`<p class="errorMsg error">${this.errorMsg}</p>` : null}
	</form>
	<div class="form-footer">
		<p>Don't have an account? <a href="#">Register</a></p>
	</div>
    `;
	}
}
customElements.define('login-form', LoginForm);
