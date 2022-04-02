import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, onAuthStateChanged } from "firebase/auth";
import { auth } from '../api/auth';
import { getUserData } from '../utils/userData';

const windowBreakpoint = 700;

export default function renderHome(ctx) {
	ctx.render(html`
		<home-page activePage=${'/'}> </home-page>`);
}

class HomePage extends LitElement {
	static properties = {
		name: { type: String },
		windowWidth: { type: Number },
		navigation: { type: String },
		activePage: { type: String },
		user: { type: Object },
	}

	static styles = [
		resets,
		css`
		:host {
			display: grid;  
			grid-template-columns: 1fr 2fr; 
			gap: 10px;
		}
		:host > *:not(:last-child) {
			margin-bottom: 10px; 
		} 

		@media only screen and (max-width: ${windowBreakpoint}px) {
			:host {
				grid-template-columns: 1fr; 
			}
		}
	`
	];
	constructor(name = 'World') {
		super();
		this.name = name;
		this.activePage = '/';
		this.isLogged = getUserData();
		this.user = null;
		this.windowWidth = this.getWindowWidth();
	}

	connectedCallback() {
		super.connectedCallback();
		window.addEventListener('resize', this.updateWindowWidth.bind(this));
		onAuthStateChanged(auth, (user) => {
			if (user) {
				this.user = user;
			} else {
				this.user = null;
			}
		});
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
		return html`
				<div>
					${this.isLogged ? html`<sidebar-usercard .user=${this.user}></sidebar-usercard>` : null}
				</div>
				<div>
					<home-feed .isLogged=${this.isLogged} .user=${this.user}></home-feed>
				</div>
		`;
	}
}

customElements.define('home-page', HomePage);

