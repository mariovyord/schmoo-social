import { LitElement, css, html } from 'lit';
import { classMap } from 'lit/directives/class-map.js';

class DetailsNav extends LitElement {
	static styles = [
		css`
		:host {
			display: flex;
			flex-direction: column;
			gap: 10px;
			padding: 20px;
			width: 100%;
			border-radius: 5px;
			background-color: white;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		}
		button {
			display: block;
			width: 100%;
			color: white;
			font-size: 0.9rem;
			font-weight: 500;
			text-align: center;
			border: 0px;
			border-radius: 3px;
			background-color: #0095f6;
			padding: 0.7rem;
		}
		button:hover {
			background-color: rgba(0, 149, 246, 0.8);
			cursor: pointer;
		}
	`
	];

	goBack() {
		history.go(-1);
	}

	render() {
		return html`
		<button type="button" @click=${this.goBack}>Back</button>
		<button type="button">Share</button>
    `;
	}
}
customElements.define('details-nav', DetailsNav);
