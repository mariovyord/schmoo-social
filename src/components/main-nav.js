import { LitElement, css, html } from 'lit';

class MainNav extends LitElement {
	static styles = css`
	nav {
		width: 100%;
		height: 50px;
		background-color: white;
		box-shadow: rgba(0, 0, 0, 0.2) 0px 2px 4px;
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
	ul {
		list-style-type: none;
		margin: 0;
		padding: 0;
		overflow: hidden;
	 }
	li {
		display: inline-block;
	  }
	a {
		display: block;
		color: black;
		padding: 5px 10px;
		text-align: center;
		text-decoration: none;
	}

	li a:hover, .dropdown:hover .dropbtn {
		color: orange;
	}
	  
	li.dropdown {
		display: inline-block;
	}
	  
	.dropdown-content {
		display: none;
		position: absolute;
		z-index: 1;
		background-color: white;
	}
	  
	.dropdown-content a {
		padding: 7px 10px;
		display: block;
		text-align: left;
	}
	  	  
	.dropdown:hover .dropdown-content {
		display: block;
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
					<div id="navbar">
						<ul>
							<li><a href="#">Home</a></li>
							<li><a href="#">Profile</a></li>
							<li class="dropdown">
								<a href="javascript:void(0)">More</a>
								<div class="dropdown-content">
									<a href="#">Settings</a>
									<a class="danger" href="#">Logout</a>
								</div>
							</li>
						</ul>
					</div>
					<div id="hamburger-icon" @click=${this.toggleHamburger}>
						<div class="bar1"></div>
						<div class="bar2"></div>
						<div class="bar3"></div>
						<ul class="mobile-menu">
							<li><a href="#">Home</a></li>
							<li><a href="#">Profile</a></li>
							<li><a href="#">Settings</a></li>
							<li><a class="danger" href="#">Logout</a></li>
						</ul>
					</div>
				</div>
			</nav>
		`
	}
}

customElements.define('main-nav', MainNav);
