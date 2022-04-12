import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { resets } from '../common/resetsCSS';
import { getUserData } from '../utils/userData';

class WelcomeSidebar extends LitElement {
	static properties = {
		user: { type: String },
	}

	static styles = [
		resets,
		css`
			:host {
				display: block;
				position: sticky;
				top: 20px;
			}
			:host > *:not(:last-child) {
				margin-bottom: 10px; 
			} 
			.section {
				background-color: white;
				border-radius: 5px;
				padding: 20px;
				box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
			}
			h2 {
				text-align: center;
				font-size: 1.3rem;
				font-weight: 600;
				margin-bottom: 0.5rem;
			}
			p {
				font-size: 0.9rem;
				margin-bottom: 5px;
			}
			.bold {
				font-weight: 500;
				font-size: 0.9rem;
			}
			.link {
				display: block;
				color: white;
				font-size: 0.9rem;
				font-weight: 500;
				text-align: center;
				border: 0px;
				background-color: #0095f6;
				padding: 0.7rem;
				border-radius: 5px;
			}
			.link:hover {
				background-color: rgba(0, 149, 246, 0.8);
				cursor: pointer;
			}

		`
	];

	constructor() {
		super();
		this.user = 'guest';
	}

	render() {
		return html`
			<div class="section">
				<h2>Welcome, ${this.user}</h2>
				<p><span class="bold">Schmoo Social is a simple web app for sharing the best jokes on the internet.</p></span>
				<p>It's
					created by <span class="bold">Mario Yordanov</span>
					solely as a
					training exercise in web development.</p>
				<p><span class="bold">Tech stack:</span> JavaScript, Lit (web components), Page (routing), Back4App (backend),
					webpack (bundler)
				</p>
			</div>
			<div class="section">
				<a class="link" href="https://github.com/NecroBread/Schmoozer" target="_blank">Github</a>
			</div>
		`;
	}
}

customElements.define('welcome-sidebar', WelcomeSidebar);