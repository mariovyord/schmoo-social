import { LitElement, css, html } from 'lit';

class MobileNav extends LitElement {
	static styles = css`
	nav {
		width: 100%;
		height: 50px;
		background-color:white;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	}
	.nav-wrapper {
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		max-width: 980px;
		height: 100%;
		margin: 0 auto;
		padding: 0 20px;
	}
	#logo {
		font-family: 'Dancing Script', cursive;
		font-size: 1.6rem;
		font-weight: 500;
	}
	a {
		font-size: 1.2rem;
		display: block;
		color: black;
		padding: 5px 10px;
		text-align: center;
		text-decoration: none;
	}
	.danger {
		color: darkred;
	}

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
		list-style: none;
		position: absolute;
		top: 50px;
		left: 0;
		width: 100%;
		background-color: white;
  		list-style: none;
  		text-align: center;
 		margin: auto;
 		padding: 30px 0 60px 0;
	}
	
	.mobile-menu li {
		padding: 10px;
	}
	
	@media only screen and (max-width: 700px) {
		#navbar {
			display: none;
		}
	
		#hamburger-icon {
			display: block;
		}
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
				<div class="nav-wrapper">
					<div>
						<span id="logo"><a href="#">Schmoozer</a></span>
					</div>
					<div id="hamburger-icon" @click=${this.toggleHamburger}>
						<div class="bar1"></div>
						<div class="bar2"></div>
						<div class="bar3"></div>
						<ul class="mobile-menu">
							<li><a href="/">Home</a></li>
							<li><a href="/profile">Profile</a></li>
							<li><a href="/circles">Circles</a></li>
							<li><a href="/search">Search</a></li>
							<li><a href="/settings">Settings</a></li>
							<li><a href="/login">Login</a></li>
							<li><a href="/register">Register</a></li>
							<li><a class="danger" href="#">Logout</a></li>
						</ul>
					</div>
				</div>
			</nav>
		`
	}
}

customElements.define('mobile-nav', MobileNav);
