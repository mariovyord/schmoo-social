// COMPONENTS
import './components/login-form.js';
import './components/register-form.js';
import './components/main-nav.js';
import './components/side-nav.js';
import './components/new-post.js';
import './components/user-post.js';
import './components/user-card.js';

// PAGES
import { HomePage } from './pages/home-page';
import { ProfilePage } from './pages/profile-page.js';
import { NetworkPage } from './pages/network-page.js';
import { SettingsPage } from './pages/settings-page.js';

// CSS
import '../static/app.css';

// LIBRARIES
import page from 'page';
import { render } from 'lit';

// CONSTANTS
const root = document.getElementById('root');

// ROUTER
page('/', () => render(new HomePage('Mario'), root));
page('/profile', () => render(new ProfilePage('Mario'), root));
page('/network', () => render(new NetworkPage, root));
page('/settings', () => render(new SettingsPage, root));
page.start();


