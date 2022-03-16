import { LitElement, css, html } from 'lit';

const windowBreakpoint = 700;

export class HomePage extends LitElement {
	static properties = {
		name: { type: String },
		isLogged: { type: Boolean },
		windowWidth: { type: Number },
		navigation: { type: String },
	}

	static styles = css`
		#wrapper {
			display: grid;  
			grid-template-columns: 1fr 2fr; 
			gap: 10px;
			max-width: 980px; 
			margin: 0 auto; 
		}
		main {
			padding-top: 23px;
		}
		main > *:not(:last-child) {
			margin-bottom: 10px; 
		} 
		h4 {
			margin: 0;
			padding: 5px 0;
			text-align: center;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
			background-color: white;
		}

		@media only screen and (max-width: ${windowBreakpoint}px) {
			#wrapper {
				grid-template-columns: 1fr; 
			}
			main {
				padding-top: 0px;
			}
		}
	`;
	constructor(name = 'World') {
		super();
		this.name = name;
		this.isLogged = true;
		this.windowWidth = this.getWindowWidth();
		this.navigation = this.windowWidth >= windowBreakpoint ? `<side-nav></side-nav>` : `<mobile-nav></mobile-nav>`
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
		// this.updateComplete.then(
		// 	() => this.requestUpdate()
		// );
	}

	render() {
		return html`
		<div id="wrapper">
			<header>
				${this.windowWidth >= windowBreakpoint ? html`<side-nav></side-nav>` : html`<mobile-nav></mobile-nav>`}
			</header>
			<main>
				<new-post></new-post>
				<user-post></user-post>
				<user-post></user-post>
				<user-post></user-post>
				<user-post></user-post>
				<user-post></user-post>
				<user-post></user-post>
			</main>
		</div>
		`;
	}
}

customElements.define('home-page', HomePage);
