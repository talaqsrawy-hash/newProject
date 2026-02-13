// products: add/edit/list
let editingProductId = null;

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('productName').value;
    const desc = document.getElementById('productDesc').value;
    const price = parseFloat(document.getElementById('productPrice').value);
    const image = document.getElementById('productImage').value || 'https://via.placeholder.com/200?text=' + encodeURIComponent(name);
    const category = document.getElementById('productCategory').value;

    const product = {
        id: Date.now(),
        name,
        desc,
        price,
        image,
        category,
        sellerId: store.currentUser.id,
        sellerName: store.currentUser.name
    };

    store.products.push(product);
    if (!store.currentUser.products) store.currentUser.products = [];
    store.currentUser.products.push(product.id);
    store.save();

    document.getElementById('productName').value = '';
    document.getElementById('productDesc').value = '';
    document.getElementById('productPrice').value = '';
    document.getElementById('productImage').value = '';

    showNotification(t('product_added', { name: name }));
    if (typeof loadSellerProducts === 'function') loadSellerProducts();
}

function openEditModal(productId) {
    const product = store.products.find(p => p.id === productId);
    if (!product) return;

    editingProductId = productId;
    document.getElementById('editProductName').value = product.name;
    document.getElementById('editProductDesc').value = product.desc;
    document.getElementById('editProductPrice').value = product.price;
    document.getElementById('editProductImage').value = product.image;
    document.getElementById('editProductCategory').value = product.category;

    document.getElementById('editModal').classList.add('active');
}

function saveEditProduct(event) {
    event.preventDefault();
    const product = store.products.find(p => p.id === editingProductId);
    if (!product) return;

    product.name = document.getElementById('editProductName').value;
    product.desc = document.getElementById('editProductDesc').value;
    product.price = parseFloat(document.getElementById('editProductPrice').value);
    product.image = document.getElementById('editProductImage').value;
    product.category = document.getElementById('editProductCategory').value;

    store.save();
    closeModal('editModal');
    editingProductId = null;
    showNotification(t('product_updated', { name: product.name }));
    if (typeof loadSellerProducts === 'function') loadSellerProducts();
    if (store.currentUser && store.currentUser.role === 'buyer' && typeof loadAllProducts === 'function') {
        loadAllProducts();
    }
}

function loadSellerProducts() {
    const container = document.getElementById('sellerProducts');
    const products = store.products.filter(p => p.sellerId === store.currentUser.id);

    if (products.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #999;">${t('no_products')}</p>`;
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
                ${!product.image ? '<i class="fas fa-cube"></i>' : ''}
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div style="font-size: 0.9rem; color: #666; margin: 0.5rem 0;">${product.desc}</div>
                <div class="product-price">${product.price.toFixed(2)} د.ك</div>
                <div style="font-size: 0.85rem; color: #f39c12; margin-bottom: 1rem;">${getCategoryTranslation(product.category)}</div>
                <div class="product-actions">
                    <button class="btn-small" style="background: #3498db; color: white;" onclick="openEditModal(${product.id})">
                        <i class="fas fa-edit"></i> ${t('edit_btn')}
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteProduct(${product.id})">
                        <i class="fas fa-trash"></i> ${t('delete')}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function deleteProduct(productId) {
    store.products = store.products.filter(p => p.id !== productId);
    if (store.currentUser && store.currentUser.products) {
        store.currentUser.products = store.currentUser.products.filter(id => id !== productId);
    }
    store.save();
    showNotification(t('product_deleted'));
    if (typeof loadSellerProducts === 'function') loadSellerProducts();
}

function loadAllProducts() {
    const container = document.getElementById('allProducts');

    if (store.products.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #999;">${t('no_products')}</p>`;
        return;
    }

    container.innerHTML = store.products.map(product => `
        <div class="product-card">
            <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center;">
                ${!product.image ? '<i class="fas fa-cube"></i>' : ''}
            </div>
            <div class="product-info">
                <div class="product-title">${product.name}</div>
                <div class="product-seller"><i class="fas fa-user"></i> ${product.sellerName}</div>
                <div style="font-size: 0.9rem; color: #666; margin: 0.5rem 0;">${product.desc}</div>
                <div class="product-price">${product.price.toFixed(2)} د.ك</div>
                <div style="font-size: 0.85rem; color: #f39c12; margin-bottom: 1rem;">${getCategoryTranslation(product.category)}</div>
                <div class="product-actions">
                    <button class="btn-small btn-add-cart" onclick="addToCart(${product.id})">
                        <i class="fas fa-cart-plus"></i> ${t('add')}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(productId) {
    const product = store.products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = store.cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        store.cart.push({ ...product, quantity: 1 });
    }

    store.save();
    showNotification(t('added_to_cart', { name: product.name }));
    if (typeof loadBuyerCart === 'function') loadBuyerCart();
}
