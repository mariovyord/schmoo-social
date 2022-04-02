import { LitElement, css, html } from 'lit';
import { userLogout } from '../api/auth';

class SettingsNav extends LitElement {
	static styles = css`
	:host {
		max-width: 100%;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		padding: 10px;
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
  
	.danger {
		color: darkred;
	}

	/* Hamburger Menu */
	#hamburger-icon {
		box-sizing: border-box;
		margin: auto 0;
		display: none;
		cursor: pointer;
	}
	
	#hamburger-icon div {
		width: 25px;
		height: 2px;
		background-color: black;
		margin: 6px 0;
		transition: 0.4s;
	}
	
	/* Hamburger Animation */
	.open .bar1 {
		-webkit-transform: rotate(-45deg) translate(-6px, 6px);
		transform: rotate(-45deg) translate(-6px, 6px);
	}
	
	.open .bar2 {
		opacity: 0;
	}
	
	.open .bar3 {
		-webkit-transform: rotate(45deg) translate(-6px, -6px);
		transform: rotate(45deg) translate(-6px, -6px);
	}
	
	.open .mobile-menu {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: flex-start;
	}
	
	.mobile-menu {
		display: none;
		position: absolute;
		top: 50px;
		left: 0;
		width: 100%;
		height: calc(100vh - 100px);
		padding-top: 50px;
		background-color: white;
	}
	
	.mobile-menu li {
		padding: 10px;
	}
	
	// @media only screen and (max-width: 1000px) {
	// 	#navbar {
	// 		display: none;
	// 	}

	// 	#nav-wrapper {
	// 		height: 50px;
	// 		flex-direction: row;
	// 	}
	
	// 	#hamburger-icon {
	// 		display: block;
	// 	}
	}
	`;

	constructor() {
		super();
	}

	toggleHamburger(e) {
		e.preventDefault();
		console.log(e.target);
		e.currentTarget.classList.toggle('open');
	}

	render() {
		return html`
				<nav>
					<ul>
						<li>
							<a href="/settings/edit">
								<span>Edit Profile</span>
							</a>
						</li>
						<li>
							<a href="javascript:void(0)" @click=${userLogout}>
								<span>Logout</span>
							</a>
						</li>
					</ul>
				</nav>
		`
	}
}

customElements.define('settings-nav', SettingsNav);
