import { LitElement, css, html } from 'lit';

class SideNav extends LitElement {
	static styles = css`
	:host {
		position: fixed;
		background-color: white;
		height: 100vh;
		width: 305px;
		box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
	}
	#nav-wrapper {
		display: flex;
		height: 95%;
		flex-direction: column;
		justify-content: space-between; 
	}
	nav {
		margin: 0 auto;
		padding: 20px 30px;
	}
	#logo {
		font-family: 'Dancing Script', cursive;
		font-size: 3rem;
		font-weight: 500;
	}
	ul {
		list-style-type: none;
		margin: 0;
		padding: 25px 0 0 0;
	 }
	 li:hover  {
		box-shadow: rgba(0, 0, 0, 0.3) 0px 1px 4px;
	}	
	a {
		display: block;
		color: black;
		padding: 5px 10px;
		text-decoration: none;
		padding: 10px;
	}
	li span {
		font-size: 1.2rem;
		padding: 10px;
	}
	svg {
		fill: black;
		width: 16px;
		height: 16px;
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
	
	@media only screen and (max-width: 1000px) {
		:host {
			display: none;
		}
	
		#hamburger-icon {
			display: none;
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
			<div id="nav-wrapper">
				<nav>
					<div id="logo">
						<span><a href="/">Schmoozer</a></span>
					</div>
					<div id="navbar">
						<ul>
							<li>
								<a href="/">
									<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-house" viewBox="0 0 16 16">
										<path fill-rule="evenodd"
											d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
										<path fill-rule="evenodd"
											d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
									</svg>
									<span>Home</span>
								</a>
							</li>
							<li>
								<a href="/profile">
									<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-person" viewBox="0 0 16 16">
										<path
											d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
									</svg>
									<span>Profile</span>
								</a>
							</li>
							<li>
								<a href="/network">
									<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-people" viewBox="0 0 16 16">
										<path
											d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1h8zm-7.978-1A.261.261 0 0 1 7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002a.274.274 0 0 1-.014.002H7.022zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0zM6.936 9.28a5.88 5.88 0 0 0-1.23-.247A7.35 7.35 0 0 0 5 9c-4 0-5 3-5 4 0 .667.333 1 1 1h4.216A2.238 2.238 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816zM4.92 10A5.493 5.493 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275zM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0zm3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
									</svg>
									<span>Network</span>
								</a>
							</li>
							<li>
								<a href="/settings">
									<svg xmlns="http://www.w3.org/2000/svg" class="bi bi-gear" viewBox="0 0 16 16">
										<path
											d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
										<path
											d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
									</svg>
									<span>Settings</span>
								</a>
							</li>
						</ul>
					</div>
					<div id="hamburger-icon" @click=${this.toggleHamburger}>
						<div class="bar1"></div>
						<div class="bar2"></div>
						<div class="bar3"></div>
						<ul class="mobile-menu">
							<li><a href="/">Home</a></li>
							<li><a href="/profile">Profile</a></li>
							<li><a href="/network">Network</a></li>
							<li><a href="/settings">Settings</a></li>
							<li><a class="danger" href="#">Logout</a></li>
						</ul>
					</div>
				</nav>
				<user-card></user-card>
			</div>
		`
	}
}

customElements.define('side-nav', SideNav);
