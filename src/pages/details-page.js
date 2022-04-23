import { LitElement, css, html, render } from 'lit';
import { until } from 'lit/directives/until.js';
import { map } from 'lit/directives/map.js';
import { resets } from '../common/resetsCSS';
import { getCommentById, getCommentsByPostId, getDetails, postNewComment } from '../api/data';
import { classMap } from 'lit/directives/class-map.js';
import { getUserData } from '../utils/userData';

export default function renderDetails(ctx) {
	ctx.render(html`
			<details-page .ctx=${ctx} id=${ctx.params.id} .user=${ctx.user}></details-page>
		`);
}

class DetailsPage extends LitElement {
	static properties = {
		id: { type: String },
		user: { type: Object },
		ctx: {type: Object},
		usersComments: {type: Array},
	}

	// Reset comes from outside
	static styles = [
		resets,
		css`
		:host {
			display: grid;  
			grid-template-columns: 1fr; 
			margin: 0 auto; 
			max-width: 600px; 
			padding-bottom: 20px;
		}
		.main > *:not(:last-child) {
			margin-bottom: 10px; 
		} 
		.new-comment-template {
			display: flex;
			width: 100%;
			background-color: white;
			border-radius: 5px;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		}
		.comments-section {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
		.user-post {
			display: flex;
			background-color: white;
			border-radius: 5px;
			box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
		}
		.main-pic-container {
			display: block;
			border-radius: 50%;
			width: 100px;
			overflow: hidden;
			aspect-ratio: 1;
		}
		.pic-container {
			display: block;
			border-radius: 50%;
			width: 50px;
			overflow: hidden;
			aspect-ratio: 1;
		}
		.new-comment-pic {
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
		#name {
			font-weight: 700;
			font-size: 1.2rem;
		}
		#name:hover {
			text-decoration: underline;
			cursor: pointer;
		}
		#handle-and-time {
			font-size: 0.9rem;
			color: gray;
		}
		.body-container {
			padding: 10px 0;
		}
		#post-content {
			font-size: 1.4rem;
			hyphens: auto;
			word-break: break-word;
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
			justify-content: end;
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
		.comments-header {
			font-size: 1.5rem;
			font-weight: 700;
			text-align: center;
		}
		.no-comments {
			text-align: center;
		}
	`
	];

	// ID and USER come as attributes from Context
	constructor() {
		super();
		this.usersComments = [];
		this.id = '';
		this.user = null;
		this.postData = null;
		this.ctx = {};
	}

	connectedCallback() {
		super.connectedCallback();
		this.allComments();
	}
	
	async allComments() {
		const res = await getCommentsByPostId(this.id);
		this.usersComments = this.usersComments.concat(res.results);
	}

	// Get POST details and return promise
	async userPost() {
		if (this.postData === null) {
			const res = await getDetails(this.id);
			this.postData = res.results[0];
		}
		return html`
				${this.userPostTemplate()}
				<details-nav .ctx=${this.ctx} .postData=${this.postData} .currentUser=${getUserData()}></details-nav>
				`;
	}

	// Submit new comment and append as first child 
	onSubmit = async (e) => {
		e.preventDefault();
		const target = e.target;
		const formData = new FormData(target).get('textarea');
		try {
			const res = await postNewComment(formData, this.id);
			target.reset();
			const comment = await getCommentById(res.objectId);
			this.usersComments = comment.results.concat(this.usersComments);
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
						
						<input type="submit" value="Comment">
					</div>
				</form>
	`
	// Sceleton template for new comment form
	newCommentTemplate = () => html`
			<div class="new-comment-template">
			<div class="left-div">
				<!-- profile picture -->
				<a class="pic-container" href="/profile/${this.user?.objectId}">
					<img class="new-comment-pic" src="${this.user?.pictureUrl}">
				</a>
			</div>
			<div class="right-div">
				<!-- New Post -->
				${this.newCommentForm()}
			</div>
			</div>
	`;

	userPostTemplate = 	() => {
			const date = new Date(this.postData.createdAt);
			return html`
				<div class="user-post">
					<div class="left-div">
						<!-- profile picture -->
						<a class="main-pic-container" href="/profile/${this.postData.creator.objectI}">
							<img class="profile-pic" src="${this.postData.creator.picture.url}" alt="Profile Picture">
						</a>
					</div>
					<div class="right-div">
						<!-- New Post -->
						<div>
							<!-- User Information -->
							<div class="user-info">
								<a href="/profile/${this.postData.creator.objectId}" id="name">${this.postData.creator.username}</a>
								<span id="handle-and-time">(${date.toLocaleString()})</span>
							</div>
							<!-- Post Content -->
							<div class="body-container">
								<p id="post-content">${this.postData.body}</p>
							</div>					
						</div>
					</div>
				</div>
			`;
		}

		blankPostTemplate = () => {
			return html`
				<div class="user-post">
					<div class="left-div">
						<!-- profile picture -->
						<a href="/profile/">
							<img class="profile-pic" src="/img/default-user-image.png" >
						</a>
					</div>
					<div class="right-div">
						<!-- New Post -->
						<div>
							<!-- User Information -->
							<div class="user-info">
								<a href="/profile/" id="name">User</a>
								<span id="handle-and-time">(4/16/2022, 5:09:03 PM)</span>
							</div>
							<!-- Post Content -->
							<div class="body-container">
								<p id="post-content">Loading...</p>
							</div>					
						</div>
					</div>
				</div>
			`;
		}

	render() {
		return html`
			<div class="main">
				${until(this.userPost(), this.blankPostTemplate())}
				${this.user ? html`${this.newCommentTemplate()}` : null}
				<h3 class="comments-header">Comments:</h3>
				<div class="comments-section">
				${this.usersComments.length > 0 
				? html`${map(this.usersComments, (el) =>
					html`
						<user-post postType="commment" data-id=${el.objectId} .postData=${el} .currentUser=${this.user}></user-post>`)}`
					: html`<p class="no-comments">No comments</p>`}
				</div>
			</div>
		
		`
	}
}

customElements.define('details-page', DetailsPage);