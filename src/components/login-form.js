import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { login } from '../api/db';
import { formsCSS } from '../common/formsCSS';
import { resets } from '../common/resetsCSS';

class LoginForm extends LitElement {
	static properties = {
		errorMsg: { type: String },
		ctx: { type: Object },
	};

	static styles = [
		resets,
		formsCSS,
		css`
		`
	];

	constructor() {
		super();
		this.ctx = {};
		this.errorMsg = '';
		this.errorEmail = false;
		this.errorPassword = false;
	}

	showHidePassword(e) {
		// TODO Bug where hitting Enter triggers show/hide button and not submiting
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

	simpleValidation(email, password) {
		if (email === '' || password === '') {
			throw new Error('Fill all fields.')
		}
	}

	async onSubmit(e) {
		e.preventDefault();
		const target = e.target;
		const formData = new FormData(e.target);
		// @ts-ignore
		const username = formData.get('username').trim();
		// @ts-ignore
		let password = formData.get('password').trim();

		try {
			if (username === '' || password === '') {
				throw {
					code: ('empty fields')
				};
			} else {
				await login(username, password)
				this.ctx.page.redirect('/');
			}
		} catch (err) {
			// const errorCode = err.code;
			// if (errorCode === 'empty fields') {
			// 	this.errorMsg = 'Please fill all fields.';
			// } else if (errorCode === 'auth/invalid-email') {
			// 	this.errorMsg = 'Invalid email.';
			// } else if (errorCode === 'auth/user-disabled') {
			// 	this.errorMsg = 'The user has been disabled.';
			// } else if (errorCode === 'auth/user-not-found') {
			// 	this.errorMsg = 'There is no such user.';
			// } else {
			// 	this.errorMsg = 'Email or password is wrong.';
			// }
			// Check if field is empty
			// this.errorEmail = email === '';
			this.errorPassword = password === '';
			//  Clear password on error
			target.querySelector('.pass').value = '';
			// Clear errors after 2 seconds
			setTimeout(() => {
				this.errorMsg = '';
				// this.errorEmail = false;
				this.errorPassword = false;
			}, 2000);
		}
	}

	render() {
		return html`
	<form @submit=${this.onSubmit}>
		<h1>Schmoo Social</h1>
		<div class="input-container ${classMap({ error: this.errorEmail, })}">
			<input type="text" name="username" placeholder="Email" value="joe">
		</div>
		<div class="input-container ${classMap({ error: this.errorPassword, })}">
			<input id="password-input" class="pass" type="password" name="password" placeholder="Password" value="123456">
			<button class="show-btn" @click=${this.showHidePassword}>&equiv;</button>
		</div>
		<input type="submit" value="Login">
		${this.errorMsg ? html`<p class="errorMsg error">${this.errorMsg}</p>` : null}
	</form>
	<div class="form-footer">
		<p>Don't have an account? <a href="/register">Register</a></p>
	</div>
    `;
	}
}
customElements.define('login-form', LoginForm);
