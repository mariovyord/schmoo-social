import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';
import { resets } from '../common/resetsCSS';
import { logout } from '../api/data';

class MainNav extends LitElement {
	static properties = {
		ctx: {type: Object},
		activePage: { type: String },
	}

	static styles = [
		resets,
		css`
	:host {
		display: block;
		color: white;
		width: 100%;
		height: 50px;
		background-color: #0095f6;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
	}
	#wrapper {
		background-color: #0095f6;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-content: center;
		align-items: center;
		max-width: 980px;
		padding: 0 10px;
		height: 100%;
	}
	#logo {
		display: block;
	}
	#logo img {
		width: 33px;
	}
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
	 }
	li {
		display: inline-block;
	  }  
	#navbar a {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 50px;
		width: 50px;
		text-decoration: none;
		border: 3px solid transparent;
	}
	#navbar a:hover {
		border-bottom: 3px solid darkred;
	}
	#navbar a.active {
		border-bottom: 3px solid darkred;
	}
	svg {
		fill: white;
		width: 23px;
		height: 23px;
	} 

	/* Hamburger Menu */
	#hamburger-icon {
		box-sizing: border-box;
		margin: auto 0;
		display: none;
		cursor: pointer;
	}
	
	#hamburger-icon div {
		width: 30px;
		height: 2px;
		background-color: white;
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
	.mobile-menu a {
		text-align: center;
		display: block;
		min-width: 100px;
		border-radius: 10%;
		padding: 10px;
		color: black;
		text-decoration: none;
	}

	.mobile-menu a.active {
		text-decoration: underline;
	}

	.mobile-menu a:hover {
		color: orange;
	}

	.mobile-menu a.danger {
		color: red;
	}

	@media only screen and (max-width: 980px) {
	
		#wrapper {
			padding: 0 15px;
		}

	}
	@media only screen and (max-width: 700px) {
		#navbar {
			display: none;
		}

		#hamburger-icon {
			display: block;
		}
	}
	`
	];

	constructor() {
		super();
		this.ctx = {};
	}

	mainNavTemplate() {
		return html`
			<div id="navbar">
				<ul>
					${this.ctx.user
					? html`<!-- Home -->
					<li><a href="/" class=${classMap({ active:  this.ctx.path === '/' })}> <svg xmlns="http://www.w3.org/2000/svg"
								class="bi bi-house" viewBox="0 0 16 16">
								<path fill-rule="evenodd"
									d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
								<path fill-rule="evenodd"
									d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
							</svg>
						</a></li>
					<!-- Profile -->
					<li><a href="/profile/${this.ctx.user.objectId}" class=${classMap({ active:  this.ctx.path.includes('/profile') })}>
							<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-person" viewBox="0 0 16 16">
								<path
									d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
							</svg>
						</a></li>
					<!-- Circles -->
					<li><a href="/favourites" class=${classMap({ active:  this.ctx.path === '/favourites' })}>
					<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-heart"
								viewBox="0 0 16 16">
								<path
									d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
									</svg>
						</a></li>
					<!-- Search -->
					<!-- <li><a href="/search" class=${classMap({ active:  this.ctx.path === '/search' })}>
							<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-search" viewBox="0 0 16 16">
								<path
									d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
							</svg>
						</a></li> -->
					<!-- Settings -->
					<li><a href="/settings" class=${classMap({ active:  this.ctx.path === '/settings' })}>
							<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-gear" viewBox="0 0 16 16">
								<path
									d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
								<path
									d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
							</svg>
						</a>
					</li>`
					: html`
					<!-- Login -->
					<li><a href="/login">
							<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-box-arrow-in-right" viewBox="0 0 16 16">
								<path fill-rule="evenodd"
									d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0v-2z" />
								<path fill-rule="evenodd"
									d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z" />
							</svg>
						</a>
					</li>`
					}
				</ul>
			</div>
		`
	}

	hamburgerTemplate() {
		return html`
			<div id="hamburger-icon" @click=${this.toggleHamburger}>
					<div class="bar1"></div>
					<div class="bar2"></div>
					<div class="bar3"></div>
					<ul class="mobile-menu">
						${this.ctx.user 
						? html`<!-- Home -->
						<li><a href="/" class=${classMap({ active: this.ctx.path === '/' })}>Home</a></li>
						<!-- Profile -->
						<li><a href="/profile/${this.ctx.user.objectId}" class=${classMap({ active: this.ctx.path.includes('/profile') })}>Profile</a></li>
						<!-- Circles -->
						<li><a href="/favourites" class=${classMap({ active: this.ctx.path === '/favourites' })}>Favourites</a></li>
						<!-- Search -->
						<!-- <li><a href="/search" class=${classMap({ active: this.ctx.path === '/search' })}>Search</a></li> -->
						<!-- About -->
						<li><a href="/about" class=${classMap({ active: this.ctx.path === '/about' })}>About</a></li>
						<!-- Settings -->
						<li><a href="/settings" class=${classMap({ active: this.ctx.path === '/settings' })}>Settings</a></li>
						<li><a class="danger" href="javascript:void(0)" @click=${logout}>Logout</a></li>`
						: html`
						<!-- Login -->
						<li><a href="/login" class=${classMap({ active: this.ctx.path === '/login' })}>Login</a></li>
						<!-- Register -->
						<li><a href="/register" class=${classMap({ active: this.ctx.path === '/register' })}>Register</a></li>
						`}
					</ul>
				</div>`
	}

	toggleHamburger(e) {
		e.currentTarget.classList.toggle('open');
	}

	render() {
		return html`
		<div id="wrapper">
			<div>
				<a id="logo" href="/"><img src="https://i.ibb.co/0VB99wP/logo-color.png" alt="Schmoozer"></a>
			</div>
			<nav>
				${this.mainNavTemplate()}
				${this.hamburgerTemplate()}
			</nav>
		</div>
		`
	}
}

customElements.define('main-nav', MainNav);
