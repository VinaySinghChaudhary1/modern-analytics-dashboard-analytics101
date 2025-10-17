document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    let isDarkTheme = false;

    themeToggle.addEventListener('click', function() {
        isDarkTheme = !isDarkTheme;
        if (isDarkTheme) {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
        } else {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
        }
    });

    // Load JSON data
    fetch('user-stats.json')
        .then(response => response.json())
        .then(data => {
            document.getElementById('user-stats').textContent = JSON.stringify(data, null, 2);
        })
        .catch(error => console.error('Error loading user stats:', error));

    // Load CSV data
    fetch('activity.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n');
            const tableBody = document.querySelector('#csv-data tbody');
            rows.forEach(row => {
                const cols = row.split(',');
                const tr = document.createElement('tr');
                cols.forEach(col => {
                    const td = document.createElement('td');
                    td.textContent = col;
                    tr.appendChild(td);
                });
                tableBody.appendChild(tr);
            });
        })
        .catch(error => console.error('Error loading activity data:', error));

    // Set default theme
    body.classList.add('light-theme');
});