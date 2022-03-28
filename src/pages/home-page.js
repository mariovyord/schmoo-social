import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { classMap } from 'lit/directives/class-map.js';
import { map } from 'lit/directives/map.js';
import { resets } from '../components-css/resets';
import { getAllPosts } from '../api/data';
import { getUser } from '../api/auth';
import { newPost } from '../api/data';

class HomePage extends LitElement {
	static properties = {
		error: { type: Boolean },
		errorMsg: { type: String },
		usersPosts: {type: Array},
	}

	static styles = [
		resets,
		css`
		:host {
			padding-top: 23px;
		}
		:host > *:not(:last-child) {
			margin-bottom: 10px; 
		} 
		* {
			box-sizing: border-box;
		}
		.new-post-field {
			display: flex;
			width: 100%;
			background-color: white;
			border-radius: 5px;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		}
		.profile-pic {
			border-radius: 50%;
			max-width: 50px;
		} 
		.left-div {
			padding: 10px;
		}
		.right-div {
			width: 100%;
			padding: 10px 10px 10px 0;
		}
		textarea {
			all: unset;
			width: 100%;
			height: 80px;
			resize: none;
			padding: 10px;
			margin-bottom: 10px;
			border: 1px solid gray;
			border-radius: 3px;
			box-sizing: border-box;
			overflow-x: hidden;
		}
		textarea:focus {
			border: 1px solid #0095f6;
			box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
		}
		.options {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.icon {
			padding: 0 5px;
		}
		.icon:hover {
			cursor: pointer;
		}
		svg:hover {
			fill: orange;
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
		}
		input[type="submit"]:hover {
			background-color: rgba(0, 149, 246, 0.8);
			cursor: pointer;
		}
		.error {
			border: 1px solid red !important;
		}
		.errorMsg {
			font-size: 0.8rem;
			text-align: center;
			background-color: rgba(255, 0, 0, 0.1);
			border-radius: 3px;
			padding: 0.5rem 1rem;
			margin-bottom: 0.5rem;
		}
		.errorMsg span {
			font-size: 0.8rem;
		}
	`
	];
	constructor() {
		super();
		this.usersPosts = [];
		this.maximumLength = 200;
		this.error = false;
		this.errorMsg = '';
	}

	onInput(e) {
		e.preventDefault();
		const textarea = e.target;
		if (textarea.value.length > this.maximumLength) {
			this.error = true;
			this.errorMsg = 'Maximum length is 200 characters.';
		} else {
			this.error = false;
			this.errorMsg = '';
		}
	}

	async onSubmit(e) {
		e.preventDefault();
		const text = new FormData(e.target).get('textarea');
		try {
			// @ts-ignore
			if (text.length < 10) {
				throw new Error('Minimum length is 10 characters.');
			}
			// @ts-ignore
			if (text.length > this.maximumLength) {
				throw new Error('Maximum length is 100 characters.');
			}

			const user = await getUser();

			const data = {
				body: text,
				createdAt: Date.now(),
				creatorID: user.uid,
				creatorUsername: user.displayName,
				photoURL: user.photoURL
			}
			e.target.reset();
			await newPost(data);
			this.allPosts();
		} catch(err) {
			this.errorMsg = err.message;
			this.error = true;
			setTimeout(() => {
				this.error = false;
				this.errorMsg = '';
			}, 3000);
		}
	}

	newPostTemplate = () => html`
	<div class="new-post-field">
	<div class="left-div">
		<!-- profile picture -->
		<a href="#">
			<img class="profile-pic" src="https://picsum.photos/200/200">
		</a>
	</div>
	<div class="right-div">
		<!-- New Post -->
		<form @submit=${this.onSubmit}>
			<div>
				<textarea name="textarea" class="${classMap({ error: this.error })}" placeholder="Say something"
					@input="${this.onInput}"></textarea>
			</div>
			${this.errorMsg 
				? html`<div class="errorMsg error">
				<span>${this.errorMsg}</span>
				</div>` 
				: null}
			<div class="options">
				<!-- Options -->
				<div>
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0095f6" viewBox="0 0 16 16">
							<path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
							<path
								d="M4.285 9.567a.5.5 0 0 1 .683.183A3.498 3.498 0 0 0 8 11.5a3.498 3.498 0 0 0 3.032-1.75.5.5 0 1 1 .866.5A4.498 4.498 0 0 1 8 12.5a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .183-.683zM7 6.5C7 7.328 6.552 8 6 8s-1-.672-1-1.5S5.448 5 6 5s1 .672 1 1.5zm4 0c0 .828-.448 1.5-1 1.5s-1-.672-1-1.5S9.448 5 10 5s1 .672 1 1.5z" />
						</svg>
					</span>
					<span class="icon">
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#0095f6" viewBox="0 0 16 16">
							<path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
							<path
								d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2h-12zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1h12z" />
						</svg>
					</span>
				</div>
				<input type="submit" value="Shmooze">
			</div>
		</form>
	</div>
	</div>
`;

	connectedCallback() {
		super.connectedCallback();
		this.allPosts();
	}

	async allPosts() {
		const newData = await getAllPosts();
		this.usersPosts = Object.entries(newData);
	}
	render() {
		return html`
		${this.newPostTemplate()}
		${until(this.usersPosts
			.reverse()
			.map(el =>
				html`
				<user-post data-id=${el[0]} creatorUsername=${el[1].creatorUsername ? 	el[1].creatorUsername : 'User'}
					body=${el[1].body} photoURL=${el[1].photoURL}>
				</user-post>`)
				, html`Loading...`)}
		`
	}
}

customElements.define('home-page', HomePage);

export default function renderHome(ctx) {
	ctx.render(ctx.html`
		<app-root activePage=${'/'}> 
			<sidebar-usercard slot="side"></sidebar-usercard>
			<home-page slot="main"></home-page>
		</app-root>`);
}