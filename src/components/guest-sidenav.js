import { LitElement, css, html } from 'lit';

class GuestSidenav extends LitElement {
	static styles = css`
	:host {
		max-width: 100%;
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	}
	nav {
		margin: 0 auto;
	}
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		gap: 10px;
	 }
	a {
		display: block;
		text-decoration: none;
		color: white;
		font-size: 0.9rem;
		font-weight: 500;
		text-align: center;
		border: 0px;
		border-radius: 3px;
		background-color: #0095f6;
		padding: 0.7rem;
	}
	a:hover {
		background-color: rgba(0, 149, 246, 0.8);
		cursor: pointer;
	}
	`;

	constructor() {
		super();
	}

	toggleHamburger(e) {
		e.preventDefault();
		e.currentTarget.classList.toggle('open');
	}

	render() {
		return html`
				<nav>
					<ul>
						<li>
							<a href="/login">
								<span>Login</span>
							</a>
						</li>
						<li>
							<a href="/register">
								<span>Register</span>
							</a>
						</li>
					</ul>
				</nav>
		`
	}
}

customElements.define('guest-sidenav', GuestSidenav);
