import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { register } from '../api/db';
import { formsCSS } from '../common/formsCSS';
import { resets } from '../common/resetsCSS';

class RegisterForm extends LitElement {
	static properties = {
		ctx: { type: Object },
		error: { type: Boolean },
		errorMsg: { type: String },
		errorEmail: { type: Boolean },
		errorPassword: { type: Boolean },
	};

	static styles = [
		resets,
		formsCSS,
		css`
		.subheader {
			font-weight: 600;
			color: gray;
			text-align: center;
			margin-bottom: 15px;
		}
		.footnotes {
			font-size: 0.7rem;
			text-align: center;
			padding: 10px 0 0 0;
		}

		#upload-label {
			display: flex;
			align-items: center;
			padding: 0rem 1rem;
			color: gray;
		}
		`
	];

	constructor() {
		super();
		this.ctx = {};
		this.error = false;
		this.errorMsg = '';
		this.errorUsername = false;
		this.errorEmail = false;
		// this.errorPhoto = false;
		this.errorPassword = false;
	}

	showHidePassword(e) {
		e.preventDefault();
		// TODO Bug where hitting Enter triggers show/hide button and not submiting
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

	async onSubmit(e) {
		// TODO Add error handling for API calls
		e.preventDefault();
		const formData = new FormData(e.target);
		// @ts-ignore
		const username = formData.get('username').trim();
		// @ts-ignore
		const email = formData.get('email').trim();
		// @ts-ignore
		// const picture = formData.get('photoUrl');
		// @ts-ignore
		const password = formData.get('password').trim();
		// @ts-ignore
		const repass = formData.get('repass').trim();

		try {
			// TODO MORE ERROR HANDLING
			if (username === '' || email === '' || password === '') {
				throw new Error('Please fill all fields.')
			} else if (password.length < 6 || password.length > 30) {
				throw new Error('Password should be 6 to 30 characters long.')
			} else if (password !== repass) {
				this.errorPassword = true;
				throw new Error('Passwords should match.')
			} else {
				await register(username, email, password);
				this.ctx.page.redirect('/');
			}
		} catch (err) {
			this.errorMsg = err.message;
			this.error = true;
			this.errorUsername = email === '';
			this.errorEmail = email === '';
			this.errorPassword = password === '';
			setTimeout(() => {
				this.error = false;
				this.errorMsg = '';
				this.errorUsername = false;
				this.errorEmail = false;
				this.errorPassword = false;
			}, 3000);
		}
	}

	render() {
		return html`
	<form @submit=${this.onSubmit}>
		<h1>Schmoo Social</h1>
		<p class="subheader">Sign up to share with the world</p>
		<div class="input-container ${classMap({ error: this.errorUsername, })}">
			<input type="text" name="username" placeholder="Username">
		</div>
		<div class="input-container ${classMap({ error: this.errorEmail, })}">
			<input type="text" name="email" placeholder="Email">
		</div>
		<!-- <div class="input-container">
							<label id="upload-label" for="photoUrl">Picture<input type="file" name="photoUrl" id="photoUrl"
									accept="image/png, image/jpeg"></label>
						</div> -->
		<div class="input-container ${classMap({ error: this.errorPassword, })}">
			<input class="pass" type="password" name="password" placeholder="Password">
			<button class="show-btn" @click=${this.showHidePassword}>&equiv;</button>
		</div>
		<div class="input-container ${classMap({ error: this.errorPassword, })}">
			<input class="pass" type="password" name="repass" placeholder="Repeat password">
		</div>
		<input type="submit" value="Register">
		${this.error ? html`<p class="errorMsg error">${this.errorMsg}</p>` : null}
		<p class="footnotes">By signing up, you agree to our Terms . Learn how we collect, use and share your data in
			our
			Data Policy and how
			we use cookies and similar technology in our Cookies Policy .</p>
	</form>
	<div class="form-footer">
		<p>Have an account? <a href="/login">Login</a></p>
	</div>
    `;
	}
}
customElements.define('register-form', RegisterForm);
