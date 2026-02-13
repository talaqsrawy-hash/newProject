// i18n: translation system
const translations = {
  ar: {
    platform_name: "منصة البناء",
    login: "دخول",
    register: "تسجيل",
    logout: "تسجيل خروج",
    browse_products: "تصفح المنتجات",
    shopping_cart: "السلة",
    invoices: "الفواتير",
    all_products: "جميع المنتجات",
    my_cart: "سلة المشتريات",
    login_title: "دخول",
    register_title: "تسجيل حساب جديد",
    full_name: "الاسم الكامل",
    email: "البريد الإلكتروني",
    password: "كلمة المرور",
    account_type: "نوع الحساب",
    buyer: "مشتري",
    seller: "بائع",
    register_btn: "تسجيل",
    cancel: "إلغاء",
    have_account: "هل لديك حساب؟",
    login_now: "دخول",
    no_account: "ليس لديك حساب؟",
    register_now: "سجل الآن",
    product_added: "تمت إضافة المنتج {name}",
    product_updated: "تم تحديث المنتج {name}",
    product_deleted: "تم حذف المنتج",
    no_products: "لا توجد منتجات",
    add: "إضافة",
    added_to_cart: "تمت إضافة {name} إلى السلة",
    empty_cart: "سلة المشتريات فارغة",
    total: "الإجمالي:",
    checkout: "إتمام الشراء",
    delete: "حذف",
    edit_btn: "تعديل",
    no_invoices: "لا توجد فواتير",
    invoice_id: "رقم الفاتورة",
    invoice_date: "تاريخ الفاتورة",
    invoice_total: "إجمالي الفاتورة",
    invoice_items: "المشتريات"
  },
  en: {
    platform_name: "Build Platform",
    login: "Login",
    register: "Register",
    logout: "Logout",
    browse_products: "Browse Products",
    shopping_cart: "Cart",
    invoices: "Invoices",
    all_products: "All Products",
    my_cart: "My Cart",
    login_title: "Login",
    register_title: "Register New Account",
    full_name: "Full Name",
    email: "Email",
    password: "Password",
    account_type: "Account Type",
    buyer: "Buyer",
    seller: "Seller",
    register_btn: "Register",
    cancel: "Cancel",
    have_account: "Already have an account?",
    login_now: "Login",
    no_account: "Don't have an account?",
    register_now: "Register now",
    product_added: "Product {name} added",
    product_updated: "Product {name} updated",
    product_deleted: "Product deleted",
    no_products: "No products available",
    add: "Add",
    added_to_cart: "{name} added to cart",
    empty_cart: "Cart is empty",
    total: "Total:",
    checkout: "Checkout",
    delete: "Delete",
    edit_btn: "Edit",
    no_invoices: "No invoices found",
    invoice_id: "Invoice ID",
    invoice_date: "Invoice Date",
    invoice_total: "Invoice Total",
    invoice_items: "Items"
  }
};

let currentLanguage = localStorage.getItem('lang') || 'ar';

function t(key, params) {
  let str = translations[currentLanguage][key] || key;
  if (params) {
    Object.keys(params).forEach(k => {
      str = str.replace(`{${k}}`, params[k]);
    });
  }
  return str;
}

function changeLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('lang', lang);
  updateAllText();
}

function updateAllText() {
  document.querySelectorAll('[data-text]').forEach(el => {
    const key = el.getAttribute('data-text');
    el.innerText = t(key);
  });
}
