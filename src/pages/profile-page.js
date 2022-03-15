import { LitElement, css, html } from 'lit';

export class ProfilePage extends LitElement {
	static styles = css`
		#wrapper {
			display: grid;  
			grid-template-columns: 1fr 2fr; 
			width: 980px; margin: 0 auto; 
			padding-top: 15px;
		}
	`;
	constructor(name) {
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
				<h1>Hello ${this.name}</h1>
			</main>
		</div>
		`;
	}
}

customElements.define('profile-page', ProfilePage);
