import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class RegisterForm extends LitElement {
	static properties = {
		error: { type: Boolean },
		errorMsg: { type: String },
		errorUsername: { type: Boolean },
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
		font-weight: 500;
		color: #0095f6;
	}
	h1 {
		font-family: 'Dancing Script', cursive;
		font-size: 2.5rem;
		font-weight: 500;
		text-align: center;
		margin: 0 0 1rem 0;
	}
	.subheader {
		font-weight: 600;
		color: gray;
		text-align: center;
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
	.footnotes {
		font-size: 0.7rem;
		text-align: center;
		padding: 0 10px;
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
		this.errorUsername = false;
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
		const username = formData.get('username').trim();
		// @ts-ignore
		const email = formData.get('email').trim();
		// @ts-ignore
		const password = formData.get('password').trim();
		// @ts-ignore
		const repass = formData.get('repass').trim();

		try {
			// ERROR HANDLING
			if (username === '' || email === '' || password === '') {
				this.errorUsername = true;
				this.errorEmail = true;
				this.errorPassword = true;
				throw new Error('Please fill all fields.')
			}

			if (password.length < 6 || password.length > 30) {
				this.errorPassword = true;
				throw new Error('Password should be 6 to 30 characters long.')
			}

			if (password !== repass) {
				this.errorPassword = true;
				throw new Error('Passwords should match.')
			}
		} catch (err) {
			this.errorMsg = err.message;
			this.error = true;
			this.errorUsername = username === '';
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
		<h1>Schmoozer</h1>
		<p class="subheader">Sign up to share with the world</p>
		<div class="input-container ${classMap({ error: this.errorUsername, })}">
			<input type="text" name="username" placeholder="Username">
		</div>
		<div class="input-container ${classMap({ error: this.errorEmail, })}">
			<input type="text" name="email" placeholder="Email">
		</div>
		<div class="input-container ${classMap({ error: this.errorPassword, })}">
			<input class="pass" type="password" name="password" placeholder="Password">
			<button class="show-btn" @click=${this.showHidePassword}>&equiv;</button>
		</div>
		<div class="input-container ${classMap({ error: this.errorPassword, })}">
			<input class="pass" type="password" name="repass" placeholder="Repeat password">
		</div>
		<input type="submit" value="Register">
		${this.error ? html`<p class="errorMsg error">${this.errorMsg}</p>` : null}
		<p class="footnotes">By signing up, you agree to our Terms . Learn how we collect, use and share your data in our
			Data Policy and how
			we use cookies and similar technology in our Cookies Policy .</p>
	</form>
	<div class="form-footer">
		<p>Have an account? <a href="#">Login</a></p>
	</div>
    `;
	}
}
customElements.define('register-form', RegisterForm);
