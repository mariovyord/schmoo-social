import { html, render } from 'lit';
import page from 'page';

const outlet = document.getElementById('outlet');

page('/', () => render(html`
<app-root activePage=${'/'}> <home-page>
	</home-page>
</app-root>`, outlet));

page('/profile', () => render(html`<app-root activePage=${'/profile'}> <profile-page>
	</profile-page>
</app-root>`, outlet));

page('/circles', () => render(html`<app-root activePage=${'/circles'}> <circles-page>
	</circles-page>
</app-root>`, outlet));

page('/search', () => render(html`<app-root activePage=${'/search'}> <search-page>
	</search-page>
</app-root>`, outlet));

page('/settings', () => render(html`<app-root activePage=${'/settings'}> <settings-page>
	</settings-page>
</app-root>`, outlet));

page('/login', () => render(html`<app-root activePage=${'/login'}> <login-page>
	</login-page>
</app-root>`, outlet));

page('/register', () => render(html`<app-root activePage=${'/register'}> <register-page>
	</register-page>
</app-root>`, outlet));

page('/posts/:id', () => render(html`<app-root activePage=${'/'}> <home-page>
	</home-page>
</app-root>`, outlet));


page.start();