import { css } from 'lit';

export const resets = css`
*, *:before, *:after {
	font-size: 16px;
	box-sizing: border-box;
}

body, h1, h2, h3, h4, h5, h6, p, ol, ul {
	margin: 0;
	padding: 0;
	font-weight: normal;
}

ol, ul {
	list-style: none;
}

img {
	max-width: 100%;
	height: auto;
}
`;