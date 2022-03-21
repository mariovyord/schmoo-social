import { LitElement, css, html } from 'lit';
import { resets } from '../components-css/resets';

const windowBreakpoint = 700;

export class HomePage extends LitElement {
	static properties = {
		name: { type: String },
		isLogged: { type: Boolean },
		windowWidth: { type: Number },
		navigation: { type: String },
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
		}
		main {
			padding-top: 23px;
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
		this.isLogged = true;
		this.windowWidth = this.getWindowWidth();
		this.navigation = this.windowWidth >= windowBreakpoint ? `<side-nav></side-nav>` : null;
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
		return html`
			<main-nav></main-nav>
			<div id="wrapper">
				<header>
					${this.windowWidth >= windowBreakpoint ? html`<side-nav></side-nav>` : null}
				</header>
				<main>
					<slot></slot>
				</main>
			</div>
		`;
	}
}

customElements.define('app-root', HomePage);
