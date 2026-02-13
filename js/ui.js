// ui: utilities and boot
function switchTab(event, tabId) {
    event.target.parentElement.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    const dashboard = event.target.closest('.dashboard');
    dashboard.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
    dashboard.querySelector(`#${tabId}`).classList.add('active');
}

function showNotification(message) {
    const notification = document.getElementById('notification');
    if (!notification) return;
    notification.textContent = message;
    notification.className = 'notification show';

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Boot: wait until all functions are defined
window.addEventListener('DOMContentLoaded', () => {
    // set language selector
    const langSelect = document.getElementById('langSelect');
    if (langSelect) langSelect.value = currentLanguage;
    updateAllText();
    updateUI();
});
