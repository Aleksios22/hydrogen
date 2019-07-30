const html = require('html-template-tag');

module.exports = async ({ title, content, head }) => html`
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="/public/css/main.css">
    <link href="https://fonts.googleapis.com/css?family=Palanquin&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/tomorrow-night-bright.css">
    <script src="https://yandex.st/highlightjs/8.0/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
    <script async defer src="https://buttons.github.io/buttons.js"></script>
    $${head}
    <title>${title}</title>
  </head>
  <body>
    <nav>
      <p class="float-ballon"><a href="/">🎈</a></p>
    </nav>
    $${content}
  </body>
  <hr style="margin-top: 40px;">
  <footer style="display: flex; justify-content: space-between;">
    <p>
      Made with Hydrogen by <a style="color: #007acc;" href="https://twitter.com/shailen_naidoo">@shailen_naidoo</a> 🤎
    </p>
    <p>
      <button id="theme-toggle" class="theme-toggle-dark">Enable Dark Mode</button>
    </p>
  </footer>
  <script>
    const initLocalStorage = () => {
      if (localStorage.getItem('theme')) {
        return false;
      }

      localStorage.setItem('theme', JSON.stringify({ darkMode: false }));
    }

    initLocalStorage();

    document.getElementById('theme-toggle').onclick = (e) => {
      if (e.target.className === 'theme-toggle-dark') {
        e.target.className = 'theme-toggle-light';
        
        const getThemeState = JSON.parse(localStorage.getItem('theme'));
        const state = {
          darkMode: !getThemeState.darkMode,
        };

        localStorage.setItem('theme', JSON.stringify(state));
      } else {
        e.target.className = 'theme-toggle-dark';

        const getThemeState = JSON.parse(localStorage.getItem('theme'));
        const state = {
          darkMode: !getThemeState.darkMode,
        };

        localStorage.setItem('theme', JSON.stringify(state));
      }
    }
  </script>
  </html>
`;
