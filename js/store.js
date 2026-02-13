// store: data persistence wrapper around localStorage
class Store {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || [];
        this.products = JSON.parse(localStorage.getItem('products')) || [];
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;
    }

    save() {
        localStorage.setItem('users', JSON.stringify(this.users));
        localStorage.setItem('products', JSON.stringify(this.products));
        localStorage.setItem('cart', JSON.stringify(this.cart));
        localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
}

const store = new Store();
