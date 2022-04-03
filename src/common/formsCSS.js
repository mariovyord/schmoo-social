import { css } from "lit";

export const formsCSS = css`
form {
	display: flex;
	flex-direction: column;
	width: 400px;
	background-color: white;
	border-radius: 3px;
	padding: 20px;
	margin-bottom: 1rem;
}
.form-footer {
	max-width: 400px;
	background-color: white;
	border-radius: 3px;
}
.form-footer p {
	text-align: center;
}
h1 {
	font-family: 'Dancing Script', cursive;
	font-size: 2.5rem;
	font-weight: 500;
	text-align: center;
	margin: 0 0 1rem 0;
}
a {
	text-decoration: none;
	font-weight: 500;
	color: #0095f6;
}
.input-container {
	display: flex;
	justify-content: space-between;
	padding: 0;
	margin-bottom: 1rem;
	background-color: rgb(247, 248, 255);
	border: 1px solid gray;
	border-radius: 3px;
}
.show-btn {
	width: 30px;
	align-self: center;
	height: 25px;
	border: 0;
	background-color: rgb(247, 248, 255);	
}
.show-btn:hover {
	cursor: pointer;
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
}
input[type="submit"]:hover {
	background-color: rgba(0, 149, 246, 0.8);
	cursor: pointer;
}
.error {
	border: 1px solid red;
}
.errorMsg {
	font-size: 0.8rem;
	text-align: center;
	background-color: rgba(255, 0, 0, 0.1);
	border-radius: 3px;
	padding: 0.5rem 1rem;
	margin: 1rem 0;
}
@media only screen and (max-width: 420px) {
	form {
		width: 100%; 
	}
}

`