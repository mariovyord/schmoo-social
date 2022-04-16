import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { getUserInfoById, setProfilePicture } from '../api/data';
import { resets } from '../common/resetsCSS';
import { formsCSS } from '../common/formsCSS';


class EditProfile extends LitElement {
	static properties = {
		user: { type: Object },
		error: { type: Object },
	}

	static styles = [
		resets,
		css`
		* {
			overflow: hidden;
		}
			:host {
				display: flex;
				flex-direction: column;
				gap: 10px;
			}
			.settings-section  {
				background-color: white;
				border-radius: 5px;
				padding: 20px;
				box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
			}
			label {
				font-size: 1.5rem;
				font-weight: 500;
			}
			.flex-ends {
				display: flex;
				justify-content: space-between;
			}
			input {
				all: unset;
				padding: 1rem;
				flex: 1;
			}
			input[type="submit"] {
				color: white;
				font-size: 0.9rem;
				font-weight: 500;
				text-align: center;
				border: 0px;
				border-radius: 3px;
				background-color: #0095f6;
				padding: 0.7rem;
				max-width: 100px;
				max-height: 20px;
			}
			input[type="submit"]:hover {
				background-color: rgba(0, 149, 246, 0.8);
				cursor: pointer;
			}
		`
	];

	constructor() {
		super();
		this.user = null;
		this.error = false;
	}

	async onSubmit(e) {
		e.preventDefault();
		const formData = new FormData(e.target);
		const file = formData.get('img');
	}

	render() {
		return html`
			<div class="settings-section">
				<form @submit=${this.onSubmit}>
					<label>Upload profile picture</label>
					<div class="flex-ends">
						<input type="file" id="img" name="img">
						<input type="submit" value="Submit">
					</div>
				</form>
				${this.error ? html`<p class="errorMsg error">${this.error?.message}</p>` : null}
			</div>
		`;
	}
}

customElements.define('edit-profile', EditProfile);