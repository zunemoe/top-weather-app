// Import CSS files
import './styles/base.css';
import './styles/layout.css';
import './styles/variables.css';
import './styles/responsive.css';

// Import JavaScript modules
import { renderHomePage } from './view/pages/home-page';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');
    const homePageElement = renderHomePage();
    app.appendChild(homePageElement);
});