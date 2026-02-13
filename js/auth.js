// auth: login/register/update UI
function showLoginModal() {
    document.getElementById('loginModal').classList.add('active');
}

function showRegisterModal() {
    document.getElementById('registerModal').classList.add('active');
}

function closeModal(modalId) {
    const el = document.getElementById(modalId);
    if (el) el.classList.remove('active');
}

function toggleForms() {
    document.getElementById('loginModal').classList.toggle('active');
    document.getElementById('registerModal').classList.toggle('active');
}

function login(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    const user = store.users.find(u => u.email === email && u.password === password);

    if (user) {
        store.currentUser = user;
        store.save();
        closeModal('loginModal');
        updateUI();
        updateAllText();
        showNotification(t('welcome', { name: user.name }));
        document.getElementById('loginEmail').value = '';
        document.getElementById('loginPassword').value = '';
    } else {
        showNotification(t('invalid_login'));
    }
}

function register(event) {
    event.preventDefault();
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    const role = document.getElementById('registerRole').value;

    if (store.users.find(u => u.email === email)) {
        showNotification(t('email_exists'));
        return;
    }

    const newUser = { id: Date.now(), name, email, password, role, products: [] };
    store.users.push(newUser);
    store.currentUser = newUser;
    store.save();
    closeModal('registerModal');
    updateUI();
    updateAllText();
    showNotification(t('register_success', { name: name }));
    document.getElementById('registerName').value = '';
    document.getElementById('registerEmail').value = '';
    document.getElementById('registerPassword').value = '';
}

function logout() {
    store.currentUser = null;
    store.save();
    updateUI();
    updateAllText();
    showNotification(t('logout_success'));
}

function updateUI() {
    if (store.currentUser) {
        const authButtons = document.getElementById('authButtons');
        if (authButtons) authButtons.style.display = 'none';
        const userInfo = document.getElementById('userInfo');
        if (userInfo) userInfo.style.display = 'flex';
        const userName = document.getElementById('userName');
        if (userName) userName.textContent = store.currentUser.name;
        const roleText = store.currentUser.role === 'seller' ? t('seller') : t('buyer');
        const userRole = document.getElementById('userRole');
        if (userRole) userRole.textContent = roleText;

        document.getElementById('homePage').style.display = 'none';

        if (store.currentUser.role === 'seller') {
            document.getElementById('sellerDashboard').classList.add('active');
            document.getElementById('buyerDashboard').classList.remove('active');
            if (typeof loadSellerProducts === 'function') loadSellerProducts();
        } else {
            document.getElementById('buyerDashboard').classList.add('active');
            document.getElementById('sellerDashboard').classList.remove('active');
            if (typeof loadAllProducts === 'function') loadAllProducts();
            if (typeof loadBuyerCart === 'function') loadBuyerCart();
        }
    } else {
        const authButtons = document.getElementById('authButtons');
        if (authButtons) authButtons.style.display = 'flex';
        const userInfo = document.getElementById('userInfo');
        if (userInfo) userInfo.style.display = 'none';
        document.getElementById('homePage').style.display = 'block';
        document.getElementById('sellerDashboard').classList.remove('active');
        document.getElementById('buyerDashboard').classList.remove('active');
    }
}
