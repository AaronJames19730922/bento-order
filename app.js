// Import Firebase SDKs from CDN
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, set, onValue } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFMLCp8Uu1gOwzhiWIBToPMMfICy7Pzgs",
  authDomain: "bentoorderapp-e416a.firebaseapp.com",
  databaseURL: "https://bentoorderapp-e416a-default-rtdb.firebaseio.com",
  projectId: "bentoorderapp-e416a",
  storageBucket: "bentoorderapp-e416a.firebasestorage.app",
  messagingSenderId: "378611236622",
  appId: "1:378611236622:web:d6c49a4f43d371483c615f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// State Management
const INITIAL_TEMPLATES = [
    { 
        id: 't1', name: '標準便當範本', type: 'bento', 
        menu: [
            { id: 'b1', name: '招牌大雞腿便當', price: 110, desc: '酥脆多汁，人氣第一', isHidden: false },
            { id: 'b2', name: '古早味滷排骨便當', price: 95, desc: '特製滷汁，經典口味', isHidden: false },
            { id: 'b3', name: '香酥炸排骨便當', price: 95, desc: '外酥內嫩，傳統美味', isHidden: false },
            { id: 'b4', name: '鹽烤鯖魚便當', price: 105, desc: '挪威鯖魚，鮮美營養', isHidden: false },
            { id: 'b5', name: '蜜汁烤雞腿便當', price: 110, desc: '甜鹹適中，香氣四溢', isHidden: false },
            { id: 'b6', name: '三杯雞便當', price: 100, desc: '台式經典，九層塔香', isHidden: false },
            { id: 'b7', name: '蔥爆牛肉便當', price: 120, desc: '大火快炒，肉質軟嫩', isHidden: false },
            { id: 'b8', name: '糖醋排骨便當', price: 105, desc: '酸甜開胃，老少咸宜', isHidden: false },
            { id: 'b9', name: '控肉便當', price: 95, desc: '肥瘦相間，入口即化', isHidden: false },
            { id: 'b10', name: '炸雞排便當', price: 100, desc: '比臉還大，超級滿足', isHidden: false },
            { id: 'b11', name: '蒲燒鯛魚便當', price: 100, desc: '日式風味，甜醬烤製', isHidden: false },
            { id: 'b12', name: '香煎鱈魚便當', price: 130, desc: '嚴選深海，鮮嫩多汁', isHidden: false },
            { id: 'b13', name: '宮保雞丁便當', price: 100, desc: '微辣開胃，花生香脆', isHidden: false },
            { id: 'b14', name: '黑胡椒豬排便當', price: 95, desc: '濃郁醬汁，下飯神物', isHidden: false },
            { id: 'b15', name: '泰式椒麻雞便當', price: 115, desc: '酸辣帶勁，異國風味', isHidden: false },
            { id: 'b16', name: '咖哩雞肉便當', price: 95, desc: '濃郁咖哩，馬鈴薯軟爛', isHidden: false },
            { id: 'b17', name: '紅燒牛腩便當', price: 130, desc: '慢火燉煮，軟嫩入味', isHidden: false },
            { id: 'b18', name: '素食什錦便當', price: 85, desc: '豐富時蔬，全素可食', isHidden: false },
            { id: 'b19', name: '烤肉飯便當', price: 95, desc: '炭烤風味，經典不敗', isHidden: false },
            { id: 'b20', name: '雙拼便當(雞+排)', price: 130, desc: '選擇困難症救星', isHidden: false }
        ]
    },
    { 
        id: 't2', name: '人氣飲料範本', type: 'drink', 
        menu: [
            { id: 'd1', name: '錫蘭紅茶', price: 30, desc: '茶香濃厚', isHidden: false },
            { id: 'd2', name: '茉莉綠茶', price: 30, desc: '清新淡雅', isHidden: false },
            { id: 'd3', name: '四季春青茶', price: 30, desc: '回甘不澀', isHidden: false },
            { id: 'd4', name: '黃金烏龍', price: 30, desc: '炭焙香氣', isHidden: false },
            { id: 'd5', name: '冰淇淋紅茶', price: 50, desc: '香草冰淇淋', isHidden: false },
            { id: 'd6', name: '多多綠茶', price: 45, desc: '酸甜滋味', isHidden: false },
            { id: 'd7', name: '檸檬紅茶', price: 45, desc: '新鮮現搾', isHidden: false },
            { id: 'd8', name: '百香綠茶', price: 45, desc: '果香濃郁', isHidden: false },
            { id: 'd9', name: '葡萄柚綠茶', price: 55, desc: '滿滿果肉', isHidden: false },
            { id: 'd10', name: '鮮榨柳橙綠', price: 60, desc: '富含維他命C', isHidden: false },
            { id: 'd11', name: '珍珠奶茶', price: 50, desc: 'Q彈珍珠', isHidden: false },
            { id: 'd12', name: '波霸奶茶', price: 50, desc: '大顆滿足', isHidden: false },
            { id: 'd13', name: '椰果奶茶', price: 50, desc: '口感豐富', isHidden: false },
            { id: 'd14', name: '布丁奶茶', price: 50, desc: '一整顆統一布丁', isHidden: false },
            { id: 'd15', name: '仙草凍奶茶', price: 50, desc: '滑順消暑', isHidden: false },
            { id: 'd16', name: '烏龍奶茶', price: 50, desc: '茶香奶香交織', isHidden: false },
            { id: 'd17', name: '阿華田', price: 50, desc: '巧克力麥芽', isHidden: false },
            { id: 'd18', name: '紅茶拿鐵', price: 60, desc: '新鮮小農鮮乳', isHidden: false },
            { id: 'd19', name: '綠茶拿鐵', price: 60, desc: '茉香鮮奶', isHidden: false },
            { id: 'd20', name: '烏龍拿鐵', price: 60, desc: '炭焙鮮奶茶', isHidden: false },
            { id: 'd21', name: '珍珠鮮奶茶', price: 65, desc: '鮮奶+Q彈珍珠', isHidden: false },
            { id: 'd22', name: '波霸抹茶拿鐵', price: 70, desc: '日式抹茶', isHidden: false },
            { id: 'd23', name: '黑糖珍珠鮮奶', price: 70, desc: '無茶咖啡因', isHidden: false },
            { id: 'd24', name: '觀音拿鐵', price: 60, desc: '鐵觀音鮮奶', isHidden: false },
            { id: 'd25', name: '冬瓜茶', price: 30, desc: '古早味', isHidden: false },
            { id: 'd26', name: '冬瓜檸檬', price: 40, desc: '酸甜解渴', isHidden: false },
            { id: 'd27', name: '冬瓜鮮奶', price: 50, desc: '順口香甜', isHidden: false },
            { id: 'd28', name: '蜂蜜綠茶', price: 40, desc: '純天然蜂蜜', isHidden: false },
            { id: 'd29', name: '蜜茶', price: 35, desc: '清甜解渴', isHidden: false },
            { id: 'd30', name: '鮮柚QQ', price: 60, desc: '葡萄柚加珍珠椰果', isHidden: false },
            { id: 'd31', name: '梅子綠茶', price: 40, desc: '酸甜古早味', isHidden: false },
            { id: 'd32', name: '冰淇淋紅茶', price: 50, desc: '香草冰淇淋', isHidden: false },
            { id: 'd33', name: '布丁奶綠', price: 50, desc: '茉香綠加布丁', isHidden: false },
            { id: 'd34', name: '金桔檸檬', price: 45, desc: '酸爽夠味', isHidden: false },
            { id: 'd35', name: '百香雙響炮', price: 55, desc: '珍珠加椰果', isHidden: false },
            { id: 'd36', name: '洛神花茶', price: 40, desc: '酸甜養生', isHidden: false },
            { id: 'd37', name: '蘋果冰茶', price: 50, desc: '蘋果果肉', isHidden: false },
            { id: 'd38', name: '水蜜桃青茶', price: 50, desc: '蜜桃香氣', isHidden: false },
            { id: 'd39', name: '鳳梨冰茶', price: 55, desc: '熬煮鳳梨醬', isHidden: false },
            { id: 'd40', name: '黑糖珍珠厚鮮奶', price: 75, desc: '加厚奶霜', isHidden: false },
            { id: 'd41', name: '焦糖奶茶', price: 55, desc: '焦糖香氣', isHidden: false },
            { id: 'd42', name: '法式可可', price: 60, desc: '濃郁巧克力', isHidden: false },
            { id: 'd43', name: '靜岡抹茶拿鐵', price: 70, desc: '純正抹茶', isHidden: false },
            { id: 'd44', name: '芋頭鮮奶', price: 65, desc: '大甲芋泥', isHidden: false },
            { id: 'd45', name: '紅豆鮮奶', price: 65, desc: '綿密萬丹紅豆', isHidden: false },
            { id: 'd46', name: '紫薯拿鐵', price: 65, desc: '浪漫紫薯', isHidden: false },
            { id: 'd47', name: '芝芝芒芒', price: 80, desc: '芒果冰沙加奶蓋', isHidden: false },
            { id: 'd48', name: '芝芝莓莓', price: 80, desc: '草莓冰沙加奶蓋', isHidden: false },
            { id: 'd49', name: '海鹽奶蓋紅', price: 55, desc: '微鹹奶霜', isHidden: false },
            { id: 'd50', name: '海鹽奶蓋綠', price: 55, desc: '微鹹奶霜', isHidden: false }
        ]
    }
];

let templates = [];
let stores = [];
let orders = [];
let cart = [];
let currentCategory = 'bento'; 

let selectedBentoStoreId = '';
let selectedDrinkStoreId = '';
let isAppInitialized = false;

let adminPassword = 'admin';
let isAdminAuthenticated = false;

// DOM Elements
const menuList = document.getElementById('menu-list');
const cartDrawer = document.getElementById('cart-drawer');
const cartItems = document.getElementById('cart-items');
const drawerCartCount = document.getElementById('drawer-cart-count');
const cartTotalAmount = document.getElementById('cart-total-amount');
const userNameInput = document.getElementById('user-name');
const adminOrdersList = document.getElementById('orders-list');
const adminStatsList = document.getElementById('stats-list');
const bentoStoreSelect = document.getElementById('bento-store-select');
const drinkStoreSelect = document.getElementById('drink-store-select');
const storesAdminList = document.getElementById('stores-admin-list');
const templatesAdminList = document.getElementById('templates-admin-list');

// --- Real-time Sync with Firebase ---
onValue(ref(db, '/'), (snapshot) => {
    const data = snapshot.val();
    
    // 1. If database is completely empty, initialize it with default templates
    if (!data) {
        if (!isAppInitialized) {
            set(ref(db, '/'), {
                bento_stores: [
                    { id: 's1', name: '我的便當店', type: 'bento', menu: JSON.parse(JSON.stringify(INITIAL_TEMPLATES[0].menu)) },
                    { id: 's2', name: '我的飲料店', type: 'drink', menu: JSON.parse(JSON.stringify(INITIAL_TEMPLATES[1].menu)) }
                ],
                bento_templates: INITIAL_TEMPLATES,
                bento_orders: [],
                active_bento_id: 's1',
                active_drink_id: 's2',
                admin_password: 'admin'
            });
        }
        return;
    }

    // 2. Load data from Firebase
    stores = data.bento_stores ? (Array.isArray(data.bento_stores) ? data.bento_stores : Object.values(data.bento_stores)).filter(Boolean) : [];
    // Ensure each store's menu is also an array and remove nulls
    stores.forEach(s => {
        if (!s.menu) s.menu = [];
        else if (!Array.isArray(s.menu)) s.menu = Object.values(s.menu);
        s.menu = s.menu.filter(Boolean);
    });
    
    templates = data.bento_templates ? (Array.isArray(data.bento_templates) ? data.bento_templates : Object.values(data.bento_templates)).filter(Boolean) : INITIAL_TEMPLATES;
    // Ensure each template's menu is also an array
    templates.forEach(t => {
        if (!t.menu) t.menu = [];
        else if (!Array.isArray(t.menu)) t.menu = Object.values(t.menu);
        t.menu = t.menu.filter(Boolean);
    });
    
    // Convert object orders to array if needed and sort by newest
    orders = data.bento_orders ? (Array.isArray(data.bento_orders) ? data.bento_orders : Object.values(data.bento_orders)).filter(Boolean) : [];
    orders.sort((a, b) => b.id - a.id);
    
    selectedBentoStoreId = data.active_bento_id || '';
    selectedDrinkStoreId = data.active_drink_id || '';
    adminPassword = data.admin_password || 'admin';

    const currentPwdInput = document.getElementById('current-password-input');
    if (currentPwdInput) currentPwdInput.value = adminPassword;

    // 3. First time setup
    if (!isAppInitialized) {
        isAppInitialized = true;
        setupEventListeners();
    }

    // 4. Update UI automatically!
    renderStoreSelectors();
    renderAdmin();
    renderMenu();
});

// Write to Firebase instead of LocalStorage
function saveData() {
    set(ref(db, '/'), {
        bento_stores: stores,
        bento_templates: templates,
        bento_orders: orders,
        active_bento_id: selectedBentoStoreId,
        active_drink_id: selectedDrinkStoreId,
        admin_password: adminPassword
    });
}

// --- UI Logic ---

function switchCategory(cat) {
    document.querySelectorAll('.cat-tab').forEach(t => {
        t.classList.toggle('active', t.dataset.category === cat);
    });
    currentCategory = cat;
    renderMenu();
}

window.goToCategory = (cat) => {
    switchCategory(cat);
    cartDrawer.classList.remove('open');
};

function renderStoreSelectors() {
    const bentoStores = stores.filter(s => s.type === 'bento');
    const drinkStores = stores.filter(s => s.type === 'drink');
    
    if (bentoStoreSelect) bentoStoreSelect.innerHTML = bentoStores.map(s => `<option value="${s.id}" ${s.id === selectedBentoStoreId ? 'selected' : ''}>${s.name}</option>`).join('') || '<option value="">請先新增商家</option>';
    if (drinkStoreSelect) drinkStoreSelect.innerHTML = drinkStores.map(s => `<option value="${s.id}" ${s.id === selectedDrinkStoreId ? 'selected' : ''}>${s.name}</option>`).join('') || '<option value="">請先新增商家</option>';
    
    const activeBento = stores.find(s => s.id === selectedBentoStoreId);
    const activeDrink = stores.find(s => s.id === selectedDrinkStoreId);
    
    const bentoLabel = document.getElementById('active-bento-name');
    const drinkLabel = document.getElementById('active-drink-name');
    if (bentoLabel) bentoLabel.innerText = activeBento ? activeBento.name : '尚未指定';
    if (drinkLabel) drinkLabel.innerText = activeDrink ? activeDrink.name : '尚未指定';
}

function renderMenu() {
    const storeId = currentCategory === 'bento' ? selectedBentoStoreId : selectedDrinkStoreId;
    const store = stores.find(s => s.id === storeId);
    if (!store || !store.menu || store.menu.length === 0) {
        menuList.innerHTML = '<div class="empty-state">目前這個商家還沒有菜單喔</div>';
        return;
    }
    
    const visibleMenu = store.menu.filter(item => !item.isHidden);
    if (visibleMenu.length === 0) {
        menuList.innerHTML = '<div class="empty-state">這家店目前所有品項都缺貨中喔</div>';
        return;
    }

    menuList.innerHTML = visibleMenu.map(item => {
        const cartItem = cart.find(c => c.id === item.id);
        const qty = cartItem ? cartItem.quantity : 0;
        const imgHtml = item.img ? `<img src="${item.img}" class="menu-img" alt="${item.name}" onerror="this.innerHTML='🍱';this.src='';">` : `<div class="menu-img">🍱</div>`;
        return `
            <div class="menu-card">
                ${imgHtml}
                <div class="menu-info">
                    <div>
                        <h3>${item.name}</h3>
                        <p class="desc">${item.desc || ''}</p>
                        <p class="price">$${item.price}</p>
                    </div>
                    <div class="menu-controls">
                        <button class="qty-btn" onclick="updateQty('${item.id}', -1, '${store.id}')">-</button>
                        <span>${qty}</span>
                        <button class="qty-btn" onclick="updateQty('${item.id}', 1, '${store.id}')">+</button>
                    </div>
                </div>
            </div>`;
    }).join('');
}

window.updateQty = (id, delta, storeId) => {
    let item;
    let storeType = "";
    let storeName = "";
    if (storeId) {
        const store = stores.find(s => s.id === storeId);
        item = store.menu.find(i => i.id === id);
        storeType = store.type;
        storeName = store.name;
    } else {
        item = cart.find(c => c.id === id);
        storeType = item.type;
        storeName = item.storeName;
    }
    
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.quantity += delta;
        if (existing.quantity <= 0) cart = cart.filter(c => c.id !== id);
    } else if (delta > 0) {
        cart.push({ 
            ...item, 
            quantity: 1, 
            type: storeType,
            storeName: storeName,
            ice: storeType === 'drink' ? '正常' : '', 
            sugar: storeType === 'drink' ? '正常' : '' 
        });
    }
    updateCartUI();
    renderMenu();
};

function updateCartUI() {
    if (!cartItems) return;

    cartItems.innerHTML = cart.map(item => {
        const optionsHtml = item.type === 'drink' ? `
            <div class="drink-options">
                <select onchange="updateOptions('${item.id}', 'sugar', this.value)">
                    <option value="無糖" ${item.sugar==='無糖'?'selected':''}>無糖</option>
                    <option value="微糖" ${item.sugar==='微糖'?'selected':''}>微糖</option>
                    <option value="半糖" ${item.sugar==='半糖'?'selected':''}>半糖</option>
                    <option value="正常" ${item.sugar==='正常'?'selected':''}>正常</option>
                </select>
                <select onchange="updateOptions('${item.id}', 'ice', this.value)">
                    <option value="去冰" ${item.ice==='去冰'?'selected':''}>去冰</option>
                    <option value="微冰" ${item.ice==='微冰'?'selected':''}>微冰</option>
                    <option value="半冰" ${item.ice==='半冰'?'selected':''}>半冰</option>
                    <option value="正常" ${item.ice==='正常'?'selected':''}>正常</option>
                </select>
            </div>
        ` : '';

        return `
            <div class="cart-item">
                <div class="cart-item-info">
                    <span class="name">${item.name}</span>
                    <span class="store-tag">${item.storeName}</span>
                    <span class="price-sm">$${item.price * item.quantity}</span>
                    ${optionsHtml}
                </div>
                <div class="cart-item-controls">
                    <button class="cart-qty-btn" onclick="updateQty('${item.id}', -1, null)">-</button>
                    <span class="qty">${item.quantity}</span>
                    <button class="cart-qty-btn" onclick="updateQty('${item.id}', 1, null)">+</button>
                    <button class="cart-del-btn" onclick="removeItem('${item.id}')">🗑️</button>
                </div>
            </div>`;
    }).join('');

    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (drawerCartCount) drawerCartCount.innerText = `${count} 項`;
    if (cartTotalAmount) cartTotalAmount.innerText = `$${total}`;

    const cartBar = document.getElementById('cart-bar');
    if (cartBar) {
        if (count > 0) {
            cartBar.classList.add('active');
            const bCount = cartBar.querySelector('.bar-count');
            const bTotal = cartBar.querySelector('.bar-total');
            if (bCount) bCount.innerText = count;
            if (bTotal) bTotal.innerText = `總計 $${total}`;
            renderSuggestions();
        } else {
            cartBar.classList.remove('active');
            cartDrawer.classList.remove('open');
        }
    }
}

window.updateOptions = (id, field, value) => {
    const item = cart.find(c => c.id === id);
    if (item) item[field] = value;
};

function renderSuggestions() {
    const hasBento = cart.some(item => stores.find(s => s.name === item.storeName)?.type === 'bento');
    const hasDrink = cart.some(item => stores.find(s => s.name === item.storeName)?.type === 'drink');
    let suggestionHtml = '';
    if (hasBento && !hasDrink) {
        suggestionHtml = `<div class="cart-suggestion"><span>💡 點了便當，要不要配杯飲料？</span><button onclick="goToCategory('drink')">去看看 🥤</button></div>`;
    } else if (!hasBento && hasDrink) {
        suggestionHtml = `<div class="cart-suggestion"><span>💡 點了飲料，要配個便當嗎？</span><button onclick="goToCategory('bento')">去看看 🍱</button></div>`;
    }
    
    // Only append if it's not already there
    if (suggestionHtml && cartItems && !cartItems.innerHTML.includes('cart-suggestion')) {
        cartItems.insertAdjacentHTML('beforeend', suggestionHtml);
    }
}

window.removeItem = (id) => {
    cart = cart.filter(c => c.id !== id);
    updateCartUI();
    renderMenu();
};

// --- Admin ---
function renderAdmin() {
    const stats = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            const key = item.type === 'drink' ? `${item.name}(${item.sugar}/${item.ice})` : item.name;
            stats[key] = (stats[key] || 0) + item.quantity;
        });
    });
    if (adminStatsList) adminStatsList.innerHTML = Object.entries(stats).map(([name, qty]) => `<div class="stat-item"><span>${name}</span><span>${qty} 份</span></div>`).join('') || '<p style="opacity:0.7">尚無訂單統計</p>';
    if (adminOrdersList) adminOrdersList.innerHTML = orders.map(order => `
        <div class="order-card">
            <div class="order-card-header"><span>👤 ${order.userName}</span><span>$${order.total}</span></div>
            <div class="order-card-details">
                ${order.items.map(i => `${i.name}${i.type==='drink'?'('+i.sugar+'/'+i.ice+')':''} x ${i.quantity}`).join(', ')}
            </div>
            <div class="order-time">${order.time}</div>
        </div>`).join('') || '<p style="text-align:center; padding:40px; opacity:0.5">目前還沒有人訂餐喔</p>';
    renderAdminStores();
    renderAdminTemplates();
}

function renderAdminStores() {
    if (!storesAdminList) return;
    storesAdminList.innerHTML = stores.map(store => `
        <div class="store-admin-card">
            <div class="store-admin-header">
                <h3>${store.type === 'bento' ? '🍱' : '🥤'} ${store.name}</h3>
                <div class="store-actions">
                    <button class="btn-text secondary" onclick="openImportModal('${store.id}')">📥 套用範本</button>
                    <button class="btn-icon danger" onclick="deleteStore('${store.id}')">🗑️</button>
                </div>
            </div>
            <div class="admin-menu-list">
                ${(store.menu || []).map(item => `
                    <div class="admin-menu-item ${item.isHidden ? 'item-hidden' : ''}">
                        <div class="item-main-info">
                            <span>${item.name} ($${item.price})</span>
                            ${item.isHidden ? '<span class="hidden-badge">缺貨中</span>' : ''}
                        </div>
                        <div class="item-admin-controls">
                            <button class="btn-text ${item.isHidden ? 'primary' : 'muted'}" onclick="toggleVisibility('${store.id}', '${item.id}')">
                                ${item.isHidden ? '👁️ 顯示' : '🚫 隱藏'}
                            </button>
                            <button class="btn-text danger" onclick="deleteItem('${store.id}', '${item.id}')">刪除</button>
                        </div>
                    </div>`).join('')}
                <button class="btn-text primary" onclick="openAddItemModal('${store.id}', false)">+ 新增餐點</button>
            </div>
        </div>`).join('');
}

window.toggleVisibility = (storeId, itemId) => {
    const store = stores.find(s => s.id === storeId);
    const item = store.menu.find(i => i.id === itemId);
    item.isHidden = !item.isHidden;
    saveData(); // Syncs to Firebase instantly!
};

function renderAdminTemplates() {
    if (!templatesAdminList) return;
    templatesAdminList.innerHTML = templates.map(template => `
        <div class="store-admin-card template-card">
            <div class="store-admin-header">
                <h3>📋 ${template.name} (${template.type === 'bento' ? '便當' : '飲料'})</h3>
            </div>
            <div class="admin-menu-list">
                ${(template.menu || []).map(item => `
                    <div class="admin-menu-item">
                        <span>${item.name} ($${item.price})</span>
                        <button class="btn-text danger" onclick="deleteTemplateItem('${template.id}', '${item.id}')">刪除</button>
                    </div>`).join('')}
                <button class="btn-text primary" onclick="openAddItemModal('${template.id}', true)">+ 新增範本餐點</button>
            </div>
        </div>`).join('');
}

window.openImportModal = (storeId) => {
    const store = stores.find(s => s.id === storeId);
    const applicableTemplates = templates.filter(t => t.type === store.type);
    if (applicableTemplates.length === 0) return alert('目前沒有可套用的範本。');
    const templateId = prompt(`請選擇要從哪個範本載入菜單到「${store.name}」？\n\n可用範本 ID:\n${applicableTemplates.map(t => t.id + ': ' + t.name).join('\n')}`);
    if (templateId) {
        const template = templates.find(t => t.id === templateId);
        if (template) {
            store.menu = JSON.parse(JSON.stringify(template.menu));
            saveData();
            showToast('已成功套用範本！');
        } else {
            alert('找不到該範本 ID');
        }
    }
};

window.deleteStore = (id) => {
    if (confirm('確定要刪除此商家及其所有菜單嗎？')) {
        stores = stores.filter(s => s.id !== id);
        saveData();
    }
};

window.openAddItemModal = (id, isTemplate) => {
    document.getElementById('edit-item-store-id').value = id;
    document.getElementById('edit-item-is-template').value = isTemplate ? 'true' : 'false';
    document.getElementById('item-modal').classList.add('active');
};

window.deleteItem = (storeId, itemId) => {
    const store = stores.find(s => s.id === storeId);
    store.menu = store.menu.filter(i => i.id !== itemId);
    saveData();
};

window.deleteTemplateItem = (templateId, itemId) => {
    const template = templates.find(t => t.id === templateId);
    template.menu = template.menu.filter(i => i.id !== itemId);
    saveData();
};

function setupEventListeners() {
    window.goToUserView = () => {
        document.getElementById('auth-modal').classList.remove('active');
        window.location.hash = 'user-view';
    };

    // --- Routing Logic ---
    let isInitialLoad = true;
    function handleRouting() {
        let hash = window.location.hash.replace('#', '') || 'user-view';
        
        // Prevent jumping to admin modal on initial direct site load
        if (isInitialLoad && hash === 'admin-view' && !isAdminAuthenticated) {
            window.location.hash = ''; // Clear hash
            hash = 'user-view';
        }
        isInitialLoad = false;

        const navItem = document.querySelector(`.nav-item[data-view="${hash}"]`);
        if (!navItem) return;

        // Check authentication for admin view
        if (hash === 'admin-view' && !isAdminAuthenticated) {
            document.getElementById('auth-modal').classList.add('active');
            return;
        }

        // Update UI
        document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
        navItem.classList.add('active');
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        const view = document.getElementById(hash);
        if (view) view.classList.add('active');

        // Scroll to top on view change
        window.scrollTo(0, 0);
    }

    window.addEventListener('hashchange', handleRouting);
    handleRouting(); // Handle initial load

    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.addEventListener('click', () => {
            const targetView = nav.dataset.view;
            window.location.hash = targetView;
        });
    });

    const authSubmitBtn = document.getElementById('auth-submit-btn');
    if (authSubmitBtn) authSubmitBtn.addEventListener('click', () => {
        const inputPwd = document.getElementById('auth-password-input').value;
        if (inputPwd === adminPassword) {
            isAdminAuthenticated = true;
            document.getElementById('auth-modal').classList.remove('active'); // 修正：登入成功後關閉視窗
            document.getElementById('auth-password-input').value = '';
            handleRouting(); // Trigger view update now that we are authenticated
            showToast('管理員登入成功！');
        } else {
            alert('密碼錯誤！請重新輸入。');
        }
    });

    // 額外加強：支援按 Enter 鍵登入
    const authPwdInput = document.getElementById('auth-password-input');
    if (authPwdInput) {
        authPwdInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') authSubmitBtn.click();
        });
    }

    const togglePwdBtn = document.getElementById('toggle-pwd-visibility');
    if (togglePwdBtn) togglePwdBtn.addEventListener('click', () => {
        const pwdInput = document.getElementById('current-password-input');
        pwdInput.type = pwdInput.type === 'password' ? 'text' : 'password';
    });

    const savePwdBtn = document.getElementById('save-password-btn');
    if (savePwdBtn) savePwdBtn.addEventListener('click', () => {
        const newPwd = document.getElementById('new-password-input').value.trim();
        if (!newPwd) return alert('密碼不能為空！');
        adminPassword = newPwd;
        saveData(); // Syncs to Firebase instantly
        document.getElementById('new-password-input').value = '';
        showToast('後台密碼已更新！');
    });

    document.querySelectorAll('.admin-sub-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            document.querySelectorAll('.admin-sub-tab').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            document.querySelectorAll('.subview').forEach(s => s.classList.remove('active'));
            const subview = document.getElementById(tab.dataset.subview);
            if (subview) subview.classList.add('active');
        });
    });

    document.querySelectorAll('.cat-tab').forEach(tab => {
        tab.addEventListener('click', () => switchCategory(tab.dataset.category));
    });

    if (bentoStoreSelect) bentoStoreSelect.addEventListener('change', (e) => {
        selectedBentoStoreId = e.target.value;
        saveData();
    });
    if (drinkStoreSelect) drinkStoreSelect.addEventListener('change', (e) => {
        selectedDrinkStoreId = e.target.value;
        saveData();
    });

    const addStoreBtn = document.getElementById('add-store-btn');
    if (addStoreBtn) addStoreBtn.addEventListener('click', () => document.getElementById('store-modal').classList.add('active'));

    const loadSampleBtn = document.getElementById('load-sample-btn');
    if (loadSampleBtn) loadSampleBtn.addEventListener('click', () => {
        if (confirm('這將會新增示範的便當店與飲料店資料到您的清單中，確定嗎？')) {
            const newBentoStoreId = 's' + Date.now() + '_b';
            const newDrinkStoreId = 's' + Date.now() + '_d';
            
            stores.push(
                { id: newBentoStoreId, name: '美味王便當店 (示範)', type: 'bento', menu: JSON.parse(JSON.stringify(INITIAL_TEMPLATES[0].menu)) },
                { id: newDrinkStoreId, name: '手搖飲示範店家 (示範)', type: 'drink', menu: JSON.parse(JSON.stringify(INITIAL_TEMPLATES[1].menu)) }
            );
            
            if (!selectedBentoStoreId) selectedBentoStoreId = newBentoStoreId;
            if (!selectedDrinkStoreId) selectedDrinkStoreId = newDrinkStoreId;
            
            saveData();
            showToast('已成功載入示範資料！');
        }
    });

    document.querySelectorAll('.close-modal-btn').forEach(btn => btn.addEventListener('click', () => btn.closest('.modal').classList.remove('active')));

    const saveStoreBtn = document.getElementById('save-store-btn');
    if (saveStoreBtn) saveStoreBtn.addEventListener('click', () => {
        const name = document.getElementById('store-name-input').value.trim();
        const type = document.getElementById('store-type-input').value;
        if (!name) return alert('請輸入商家名稱');
        stores.push({ id: 's' + Date.now(), name, type, menu: [] });
        saveData();
        document.getElementById('store-modal').classList.remove('active');
        document.getElementById('store-name-input').value = '';
    });

    const saveItemBtn = document.getElementById('save-item-btn');
    if (saveItemBtn) saveItemBtn.addEventListener('click', () => {
        const id = document.getElementById('edit-item-store-id').value;
        const isTemplate = document.getElementById('edit-item-is-template').value === 'true';
        const name = document.getElementById('item-name-input').value.trim();
        const price = parseInt(document.getElementById('item-price-input').value);
        const desc = document.getElementById('item-desc-input').value.trim();
        const img = document.getElementById('item-img-input').value.trim();
        if (!name || isNaN(price)) return alert('請輸入完整的餐點資訊');
        
        if (isTemplate) {
            const template = templates.find(t => t.id === id);
            if (!template.menu) template.menu = [];
            template.menu.push({ id: 'tm' + Date.now(), name, price, desc, img, isHidden: false });
        } else {
            const store = stores.find(s => s.id === id);
            if (!store.menu) store.menu = [];
            store.menu.push({ id: 'm' + Date.now(), name, price, desc, img, isHidden: false });
        }
        
        saveData();
        document.getElementById('item-modal').classList.remove('active');
        ['item-name-input', 'item-price-input', 'item-desc-input', 'item-img-input'].forEach(id => document.getElementById(id).value = '');
    });

    const cartHandle = document.querySelector('.cart-handle');
    if (cartHandle) cartHandle.addEventListener('click', () => cartDrawer.classList.remove('open'));

    const cartBar = document.getElementById('cart-bar');
    if (cartBar) cartBar.addEventListener('click', () => cartDrawer.classList.add('open'));

    const submitOrderBtn = document.getElementById('submit-order');
    if (submitOrderBtn) submitOrderBtn.addEventListener('click', () => {
        const name = userNameInput.value.trim();
        if (!name) {
            alert('請輸入您的姓名！');
            userNameInput.focus();
            window.scrollTo({ top: 0, behavior: 'smooth' });
            return;
        }
        if (cart.length === 0) return alert('購物車是空的喔！');
        
        // Push order to the orders array
        orders.unshift({ 
            id: Date.now(), 
            userName: name, 
            items: JSON.parse(JSON.stringify(cart)), 
            total: cart.reduce((sum, i) => sum + (i.price * i.quantity), 0), 
            time: new Date().toLocaleString() 
        });
        
        saveData(); // Instantly syncs the new order to Firebase!
        
        cart = [];
        updateCartUI();
        renderMenu();
        cartDrawer.classList.remove('open');
        showToast('訂購成功！');
    });

    const clearCartBtn = document.getElementById('clear-cart');
    if (clearCartBtn) clearCartBtn.addEventListener('click', () => {
        if (cart.length > 0 && confirm('確定要清空目前點的餐點嗎？')) {
            cart = [];
            updateCartUI();
            renderMenu();
            cartDrawer.classList.remove('open');
            showToast('已清空購物車');
        }
    });

    const clearOrdersBtn = document.getElementById('clear-orders');
    if (clearOrdersBtn) clearOrdersBtn.addEventListener('click', () => {
        if (confirm('確定要清除所有訂單紀錄嗎？')) {
            orders = [];
            saveData();
        }
    });

    const copySummaryBtn = document.getElementById('copy-summary');
    if (copySummaryBtn) copySummaryBtn.addEventListener('click', () => {
        const stats = {};
        orders.forEach(order => order.items.forEach(item => {
            const key = item.type === 'drink' ? `${item.name}(${item.sugar}/${item.ice})` : item.name;
            stats[key] = (stats[key] || 0) + item.quantity;
        }));
        let text = `🍱 便當訂購統計 (${new Date().toLocaleDateString()})\n====================\n`;
        Object.entries(stats).forEach(([name, qty]) => text += `${name}：${qty} 份\n`);
        text += `====================\n總計訂單數：${orders.length} 筆`;
        navigator.clipboard.writeText(text).then(() => alert('已複製到剪貼簿！'));
    });
}

function showToast(msg) {
    const toast = document.getElementById('toast');
    if (toast) {
        toast.querySelector('.toast-msg').innerText = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }
}
