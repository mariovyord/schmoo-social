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
		@media only screen and (max-width: ${windowBreakpoint}px) {
			#wrapper {
				grid-template-columns: 1fr; 
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
				${this.windowWidth >= windowBreakpoint ? html`<side-nav></side-nav>` : html`<main-nav></main-nav>`}
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
