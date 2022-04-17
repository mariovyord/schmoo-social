import { LitElement, css, html } from 'lit';
import { resets } from '../common/resetsCSS';
import { getAllPosts } from '../api/data';

export default function renderAbout(ctx) {
	ctx.render(html`
		<about-page activePage=${'/'} .user=${ctx.user}>
		</about-page>`);
}

class AboutPage extends LitElement {
	static properties = {
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
			grid-template-columns: 1fr; 
			gap: 10px;
		}
		:host > *:not(:last-child) {
			margin-bottom: 10px; 
		} 
		.main {
			max-width: 320px;
			margin: 0 auto;
		}
	`
	];
	constructor() {
		super();
		this.activePage = '/about';
		// USER comes from the outside as attribute
		this.user = null;
	}

	render() {
		return html`
				<div class="main">
					<welcome-sidebar user=${this.user?.username || 'guest' }></welcome-sidebar>
				</div>`
	}
}

customElements.define('about-page', AboutPage);

