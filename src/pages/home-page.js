import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

export class HomePage extends LitElement {
	static styles = css`
		#wrapper {
			display: grid;  
			grid-template-columns: 1fr 2fr; 
			max-width: 980px; 
			margin: 0 auto; 
			padding-top: 15px;
		}
	`;
	constructor(name = 'World') {
		super();
		this.name = name;
		this.isLogged = true;
	}

	render() {
		return html`
		<div id="wrapper">
			<header>
				<side-nav></side-nav>
			</header>
			<main>
				<new-post></new-post>
				<user-post></user-post>
			</main>
		</div>
		`;
	}
}

customElements.define('home-page', HomePage);
