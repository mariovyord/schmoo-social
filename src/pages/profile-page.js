import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';
import { getUser, userState } from '../api/auth';

const windowBreakpoint = 700;

export default function renderProfile(ctx) {
	ctx.render(html`
		<profile-page activePage=${'/profile'}> </profile-page>`);
}

class ProfilePage extends LitElement {
	static properties = {
		name: { type: String },
		userState,
		windowWidth: { type: Number },
		navigation: { type: String },
		activePage: { type: String },
	}

	static styles = [
		resets,
		css`
		#wrapper {
			display: grid;  
			grid-template-columns: 1fr 2fr; 
			gap: 10px;
			margin: 0 auto; 
			max-width: 980px; 
			padding-top: 10px;
		}
		main > *:not(:last-child) {
			margin-bottom: 10px; 
		} 

		@media only screen and (max-width: ${windowBreakpoint}px) {
			#wrapper {
				grid-template-columns: 1fr; 
			}
		}
	`
	];
	constructor(name = 'World') {
		super();
		this.name = name;
		this.activePage = '/';
		this.isLogged = getUser();
		this.windowWidth = this.getWindowWidth();
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('resize', this.updateWindowWidth.bind(this));
	}

	disconnectedCallback() {
		window.removeEventListener('resize', this.updateWindowWidth.bind(this));
		super.disconnectedCallback();
	}

	getWindowWidth() {
		return window.innerWidth;
	}

	async updateWindowWidth() {
		this.windowWidth = window.innerWidth;
	}

	render() {
		console.log('THIS ' + this.isLogged);
		return html`
			<main-nav activePage=${this.activePage}></main-nav>
			<div id="wrapper">
				<div>
					${this.windowWidth >= windowBreakpoint 
						? html`<sidebar-usercard></sidebar-usercard>` 
						: null}
				</div>
				<main>
					<profile-feed .isLogged=${this.isLogged}></profile-feed>
				</main>
			</div>
		`;
	}
}

customElements.define('profile-page', ProfilePage);
