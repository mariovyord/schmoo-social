import { html, render } from 'lit';
import page from 'page';

const outlet = document.getElementById('outlet');

page('/', () => render(html`
<app-root>
	<home-page></home-page>
</app-root>`, outlet));

page('/profile', () => render(html`<app-root>
	<profile-page></profile-page>
</app-root>`, outlet));

page('/circles', () => render(html`<app-root>
	<circles-page></circles-page>
</app-root>`, outlet));

page('/search', () => render(html`<app-root>
	<search-page></search-page>
</app-root>`, outlet));

page('/settings', () => render(html`<app-root>
	<settings-page></settings-page>
</app-root>`, outlet));

page('/login', () => render(html`<app-root>
	<login-page></login-page>
</app-root>`, outlet));

page('/register', () => render(html`<app-root>
	<register-page></register-page>
</app-root>`, outlet));
page.start();