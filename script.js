const themeToggleButton = document.getElementById('theme-button');
const themeStylesheet = document.getElementById('theme-stylesheet');

themeToggleButton.addEventListener('click', function () {
    const currentTheme = themeStylesheet.getAttribute('href');

    if (currentTheme === 'style.css') {
        themeStylesheet.setAttribute('href', 'styles.css');
        themeToggleButton.innerHTML = 'Click if you want to see light theme';
    } else {
        themeStylesheet.setAttribute('href', 'style.css');
        themeToggleButton.innerHTML = 'Click only if you want to see dark theme';
    }
});
