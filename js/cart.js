// cart: cart display and actions
function loadBuyerCart() {
    const container = document.getElementById('buyerCartContent');

    if (store.cart.length === 0) {
        container.innerHTML = `<p style="text-align: center; color: #999; padding: 2rem;">${t('empty_cart')}</p>`;
        return;
    }

    const total = store.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    container.innerHTML = `
        <div class="products-grid">
            ${store.cart.map(item => `
                <div class="product-card">
                    <div class="product-image" style="background-image: url('${item.image}'); background-size: cover; background-position: center;">
                        ${!item.image ? '<i class="fas fa-cube"></i>' : ''}
                    </div>
                    <div class="product-info">
                        <div class="product-title">${item.name}</div>
                        <div class="product-seller"><i class="fas fa-user"></i> ${item.sellerName}</div>
                        <div class="product-price">${item.price.toFixed(2)} د.ك</div>
                        <div style="margin: 0.5rem 0;">
                            <button class="qty-btn" onclick="updateQty(${item.id}, -1)" style="padding: 4px 8px; background: #f0f0f0; border: none; border-radius: 3px; cursor: pointer;">-</button>
                            <span style="margin: 0 8px;">${item.quantity}</span>
                            <button class="qty-btn" onclick="updateQty(${item.id}, 1)" style="padding: 4px 8px; background: #f0f0f0; border: none; border-radius: 3px; cursor: pointer;">+</button>
                        </div>
                        <div style="color: #f39c12; font-weight: 700; margin-top: 0.5rem;">${(item.price * item.quantity).toFixed(2)} د.ك</div>
                        <button class="btn-small btn-delete" onclick="removeFromCart(${item.id})" style="margin-top: 0.5rem;">
                            <i class="fas fa-trash"></i> ${t('delete')}
                        </button>
                    </div>
                </div>
            `).join('')}
        </div>
        <div style="background: white; padding: 1.5rem; border-radius: 10px; margin-top: 2rem; text-align: center;">
            <div style="font-size: 1.3rem; color: #1e2b3a; margin-bottom: 1rem;">
                ${t('total')} <span style="color: #f39c12;">${total.toFixed(2)} د.ك</span>
            </div>
            <button class="btn btn-primary" onclick="checkout()" style="width: 100%; padding: 12px;">${t('checkout')}</button>
        </div>
    `;
}

function updateQty(productId, change) {
    const item = store.cart.find(i => i.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            store.save();
            loadBuyerCart();
        }
    }
}

function removeFromCart(productId) {
    store.cart = store.cart.filter(item => item.id !== productId);
    store.save();
    loadBuyerCart();
}

function checkout() {
    if (store.cart.length === 0) {
        showNotification(t('empty_cart'));
        return;
    }

    const total = store.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(t('purchase_success') + '\n\n' + t('total_purchase', { total: total.toFixed(2) }));
    store.cart = [];
    store.save();
    loadBuyerCart();
}
