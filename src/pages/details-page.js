import { LitElement, css, html } from 'lit';
import { until } from 'lit/directives/until.js';
import { map } from 'lit/directives/map.js';
import { resets } from '../common/resetsCSS';
import { getCommentsByPostId, getDetails, postNewComment } from '../api/data';
import { classMap } from 'lit/directives/class-map.js';

export default function renderDetails(ctx) {
	ctx.render(html`
			<details-page id=${ctx.params.id} .user=${ctx.user}></details-page>
		`);
}

class DetailsPage extends LitElement {
	static properties = {
		id: { type: String },
		user: { type: Object },
	}

	// Resets come from outside
	static styles = [
		resets,
		css`
		:host {
			display: grid;  
			grid-template-columns: 1fr 2fr; 
			gap: 10px;
			margin: 0 auto; 
			max-width: 980px; 
		}
		.main > *:not(:last-child) {
			margin-bottom: 10px; 
		} 
		user-post:first-child {
			font-size: 1.6rem;
			padding-top: 25px;
			padding-bottom: 25px;
		}
		.new-comment-template {
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
			height: 60px;
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
			margin-bottom: 1rem;
		}
	`
	];

	// ID and USER come as attributes from Context
	constructor() {
		super();
		this.id = '';
		this.user = null;
	}

	// Get POST details and return promise
	async userPost() {
		const res = await getDetails(this.id);
		const data = res.results[0];
		return html`
				<user-post creatorUsername=${data.creator.username} body=${data.body}
					photoURL=${data.creator.picture.url} date=${data.createdAt}>
				</user-post>`;
	}

	// Get all COMMENTS  and return promise
	async comments() {
		const res = await getCommentsByPostId(this.id);
		const data = res.results;
		if (data) {
			return html`${map(data, (el) =>
				html`
				<user-post data-id=${el.objectId} creatorUsername=${el.creator.username}
					body=${el.body} } date=${el.createdAt} photoUrl=${el.creator.picture.url}>
				</user-post>`)}`;
		}
	}

	onSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target).get('textarea');
		try {
			const res = await postNewComment(formData, this.id);
		console.log(res);
		} catch(err) {
			console.log(err);
		}
	}

	// FORM for posting new comment
	newCommentForm = () => html`
				<form @submit=${this.onSubmit}>
					<div>
						<textarea id="textarea" name="textarea" class="${classMap({ error: this.error })}" placeholder="Say something"
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
						</div>
						<input type="submit" value="Comment">
					</div>
				</form>
	`
	// Sceleton template for new comment form
	newCommentTemplate = () => html`
			<div class="new-comment-template">
			<div class="left-div">
				<!-- profile picture -->
				<a href="/profile/${this.user.uid}">
					<img class="profile-pic" src="${this.user.photoURL}">
				</a>
			</div>
			<div class="right-div">
				<!-- New Post -->
				${this.newCommentForm()}
			</div>
			</div>
	`;

	render() {
		return html`
		<div class="side">
			<details-nav></details-nav>
		</div>
		<div class="main">
			${until(this.userPost(), html`Loading...`)}
			${this.newCommentTemplate()}
			${until(this.comments(), html`Loading...`)}
		</div>
		
		`
	}
}

customElements.define('details-page', DetailsPage);