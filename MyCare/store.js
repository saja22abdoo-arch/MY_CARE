/**
 * MyCare Shared Store & Supabase Cloud Database Integration
 * متجر عنايتي - ربط حقيقي مباشر مع قاعدة بيانات Supabase
 * مشروع: mycare-store (ishibbnqlwkwimwyrhpt)
 * Palette: #0F3D33, #186655, #218A73, #2CB899, #C5E0C9, #A2B8A5
 */

const SUPABASE_CONFIG = {
  url: "https://ishibbnqlwkwimwyrhpt.supabase.co",
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlzaGliYm5xbHdrd2ltd3lyaHB0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI3NDUxMzAsImV4cCI6MjEwODMyMTEzMH0.91faCOV51r94c-gdC1xVW1by6GO1HPaC43o_olVQDck"
};

const INITIAL_PRODUCTS = [
  { 
    id: 1, 
    name: "سيروم فيتامين سي", 
    cat: "بشرة", 
    price: 145, 
    stock: 24,
    tag: "الأكثر مبيعًا", 
    color: "#C5E0C9", 
    image: "d.jpg",
    size: "30 مل",
    desc: "سيروم غني بمضادات الأكسدة وفيتامين سي النقي لتفتيح البشرة، توحيد لونها، ومحاربة البقع الداكنة وعلامات التقدم في السن.",
    usage: "توضع 3-4 قطرات على بشرة نظيفة ومرطبة صباحاً ومساءً، مع تدليك خفيف بحركات دائرية حتى يتم امتصاصه تماماً."
  },
  { 
    id: 2, 
    name: "كريم ترطيب الورد", 
    cat: "بشرة", 
    price: 98, 
    stock: 18,
    tag: "مميز", 
    color: "#C5E0C9", 
    image: "7.jpg",
    size: "50 مل",
    desc: "كريم مرطب بخلاصة ماء الورد العضوي، يمنح البشرة ترطيباً عميقاً وطويلاً دون أي ملمس دهني أو تسبب في انسداد المسام.",
    usage: "يُوضع صباحاً ومساءً على الوجه والعنق بعد تنظيفهما، ويدلك بلطف حتى الامتصاص."
  },
  { 
    id: 3, 
    name: "غسول الوجه بالشاي الأخضر", 
    cat: "بشرة", 
    price: 65, 
    stock: 35,
    tag: "", 
    color: "#C5E0C9", 
    image: "5.jpg",
    size: "150 مل",
    desc: "غسول لطيف ومنعش بخلاصة الشاي الأخضر، ينظف المسام بعمق ويزيل الشوائب والزيوت الزائدة مع الحفاظ على ترطيب البشرة الطبيعي.",
    usage: "توضع كمية صغيرة على بشرة مبللة، تدلك رغوياً بلطف بحركات دائرية، ثم تشطف جيداً بالماء الفاتر."
  },
  { 
    id: 4, 
    name: "زيت الأرغان النقي", 
    cat: "شعر", 
    price: 110, 
    stock: 12,
    tag: "جديد", 
    color: "#C5E0C9", 
    image: "m.jpg",
    size: "100 مل",
    desc: "زيت الأرغان المغربي النقي 100%، غني بفيتامين أ و هـ، يغذي الشعر بعمق ويعالج التقصف ويمنحه لمعاناً ونعومة فائقة.",
    usage: "توضع قطرات قليلة على راحتي اليدين وتوزع على الشعر الرطب أو الجاف من الوسط حتى الأطراف دون الحاجة للشطف."
  },
  { 
    id: 5, 
    name: "ماسك الطين المغربي", 
    cat: "بشرة", 
    price: 78, 
    stock: 20,
    tag: "", 
    color: "#C5E0C9", 
    image: "1.jpg",
    size: "120 غرام",
    desc: "ماسك طبيعي من الطين المغربي النقي، يعمل على تنقية المسام بعمق، امتصاص السموم والزيوت الزائدة، ومنح البشرة نقاءً وحيوية.",
    usage: "يوزع طبقة متساوية على وجه نظيف مع تجنب منطقة العينين، يترك لمدة 10-15 دقيقة ثم يشطف بالماء الفاتر."
  },
  { 
    id: 6, 
    name: "زبدة الشيا للجسم", 
    cat: "جسم", 
    price: 89, 
    stock: 15,
    tag: "عضوي", 
    color: "#C5E0C9", 
    image: "3.jpg",
    size: "200 مل",
    desc: "زبدة شيا خام غنية ومرطبة للجسم، تعالج الجفاف الشديد وتمنح البشرة ملمساً مخملياً ناعماً يدوم طويلاً.",
    usage: "توضع كمية مناسبة على الجسم وتدلك بحركات دائرية حتى يتم امتصاصها بالكامل، ويفضل استخدامها بعد الاستحمام مباشرة."
  },
  { 
    id: 7, 
    name: "تونر ماء الورد", 
    cat: "بشرة", 
    price: 55, 
    stock: 28,
    tag: "", 
    color: "#C5E0C9", 
    image: "4.jpg",
    size: "200 مل",
    desc: "تونر منقٍ ومقشر لطيف بخلاصة ماء الورد الطبيعي، ينعش البشرة ويساعد في قبض المسام الواسعة وإعادة التوازن لها.",
    usage: "يوضع على قطنة ويمسح بها الوجه والعنق برفق بعد التنظيف صباحاً ومساءً."
  },
  { 
    id: 8, 
    name: "بلسم الشعر بزيت الأركان", 
    cat: "شعر", 
    price: 92, 
    stock: 16,
    tag: "", 
    color: "#C5E0C9", 
    image: "dd.jpg",
    size: "250 مل",
    desc: "بلسم مغذٍ ومصلح للشعر التالف والجاف بخلاصة زيت الأركان، يفك التشابك ويمنح الشعر نعومة ولمعاناً صحياً.",
    usage: "يوزع على الشعر النظيف المبلل من الوسط للأطراف، يترك لمدة 3-5 دقائق ثم يشطف جيداً بالماء."
  }
];

const INITIAL_REVIEWS = [
  { id: 1, name: "نورة العتيبي", rating: "★★★★★", stars: 5, date: "2026-10-20", text: "سيروم فيتامين سي غيّر نضارة بشرتي خلال ثلاثة أسابيع فقط، والقوام خفيف جداً ولا يترك أي أثر لزج.", status: "مقبول" },
  { id: 2, name: "هند الشمري", rating: "★★★★★", stars: 5, date: "2026-10-18", text: "أخيرًا كريم ترطيب لا يسبب حبوبًا لبشرتي المختلطة. أصبح جزءًا أساسياً من روتيني الصباحي اليومي.", status: "مقبول" },
  { id: 3, name: "ريم القحطاني", rating: "★★★★☆", stars: 4, date: "2026-10-15", text: "رائحة زيت الأرغان طبيعية ونقية وملموسة النتيجة على أطراف الشعر الجافة والتالفة من أول أسبوع.", status: "مقبول" },
  { id: 4, name: "مها السبيعي", rating: "★★★★★", stars: 5, date: "2026-10-12", text: "غسول الشاي الأخضر خيالي ينظف بدون أن يسبب جفاف أو شد للبشرة. منتجاتكم فخر الصناعة الطبيعية.", status: "مقبول" }
];

const INITIAL_ORDERS = [
  {
    id: "MC-9081",
    customer: "سارة عبد العزيز",
    phone: "0551234567",
    city: "الرياض",
    address: "حي الياسمين، شارع العليا",
    date: "2026-10-22 14:30",
    status: "مكتمل",
    paymentMethod: "مدى / بطاقة ائتمان",
    items: [
      { id: 1, name: "سيروم فيتامين سي", price: 145, qty: 1 },
      { id: 2, name: "كريم ترطيب الورد", price: 98, qty: 1 }
    ],
    total: 243
  },
  {
    id: "MC-9082",
    customer: "ريم خالد الدوسري",
    phone: "0509876543",
    city: "جدة",
    address: "حي الشاطئ، طريق الكورنيش",
    date: "2026-10-22 18:15",
    status: "تم الشحن",
    paymentMethod: "الدفع عند الاستلام",
    items: [
      { id: 4, name: "زيت الأرغان النقي", price: 110, qty: 2 }
    ],
    total: 220
  },
  {
    id: "MC-9083",
    customer: "أمل ناصر القحطاني",
    phone: "0563456789",
    city: "الدمام",
    address: "حي الفاخرية، شارع السلام",
    date: "2026-10-23 09:10",
    status: "قيد التجهيز",
    paymentMethod: "أبل باي (Apple Pay)",
    items: [
      { id: 3, name: "غسول الوجه بالشاي الأخضر", price: 65, qty: 1 },
      { id: 7, name: "تونر ماء الورد", price: 55, qty: 1 },
      { id: 6, name: "زبدة الشيا للجسم", price: 89, qty: 1 }
    ],
    total: 209
  },
  {
    id: "MC-9084",
    customer: "فاطمة الزهراني",
    phone: "0547891234",
    city: "مكة المكرمة",
    address: "حي العوالي",
    date: "2026-10-23 10:45",
    status: "جديد",
    paymentMethod: "مدى / بطاقة ائتمان",
    items: [
      { id: 1, name: "سيروم فيتامين سي", price: 145, qty: 2 }
    ],
    total: 290
  }
];

const MyCareStore = {
  // Key names in LocalStorage (used as immediate cache)
  KEYS: {
    PRODUCTS: 'mycare_products_v3',
    ORDERS: 'mycare_orders_v3',
    REVIEWS: 'mycare_reviews_v3',
    SETTINGS: 'mycare_settings_v3'
  },

  client: null,
  isLive: false,
  isSyncing: false,
  realtimeSubscription: null,

  init() {
    // Seed local cache if not yet set
    if (!localStorage.getItem(this.KEYS.PRODUCTS)) {
      localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    }
    if (!localStorage.getItem(this.KEYS.ORDERS)) {
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    }
    if (!localStorage.getItem(this.KEYS.REVIEWS)) {
      localStorage.setItem(this.KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    }
    if (!localStorage.getItem(this.KEYS.SETTINGS)) {
      const defaultSettings = {
        storeName: "عنايتي",
        tagline: "عناية طبيعية لبشرتك",
        currency: "ر.س",
        freeShippingThreshold: 200,
        contactEmail: "hello@anayati.example",
        contactPhone: "0550001122",
        maintenanceMode: false
      };
      localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(defaultSettings));
    }

    // Initialize Supabase Client
    this.initSupabase();
  },

  initSupabase() {
    if (window.supabase && typeof window.supabase.createClient === 'function') {
      try {
        this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
        this.isLive = true;
        this.updateConnectionUI(true);
        this.syncWithSupabase();
        this.setupRealtime();
      } catch (err) {
        console.warn('Supabase client init error:', err);
        this.updateConnectionUI(false);
      }
    } else {
      // Load Supabase script dynamically if not loaded
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2';
      script.onload = () => {
        try {
          if (window.supabase) {
            this.client = window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey);
            this.isLive = true;
            this.updateConnectionUI(true);
            this.syncWithSupabase();
            this.setupRealtime();
          }
        } catch (e) {
          console.warn('Supabase init failed after script load:', e);
        }
      };
      script.onerror = () => {
        console.warn('Could not load Supabase SDK from CDN, using local storage cache.');
        this.updateConnectionUI(false);
      };
      document.head.appendChild(script);
    }
  },

  updateConnectionUI(connected) {
    const badge = document.getElementById('supabaseStatusBadge');
    const text = document.getElementById('supabaseStatusText');
    if (badge && text) {
      if (connected) {
        badge.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200";
      } else {
        badge.className = "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200";
        badge.innerHTML = `<span class="w-2 h-2 rounded-full bg-amber-500"></span><span>وضع الأوفلاين (كاش محلي)</span>`;
      }
    }
  },

  // Full 2-way sync with Supabase
  async syncWithSupabase() {
    if (!this.client || this.isSyncing) return;
    this.isSyncing = true;

    try {
      // 1. Fetch Products
      const { data: productsData, error: prodErr } = await this.client
        .from('products')
        .select('*')
        .order('id', { ascending: true });

      if (!prodErr && productsData && productsData.length > 0) {
        const formattedProducts = productsData.map(p => ({
          id: Number(p.id),
          name: p.name,
          cat: p.cat || "بشرة",
          price: Number(p.price) || 0,
          stock: Number(p.stock) || 0,
          tag: p.tag || "",
          color: p.color || "#C5E0C9",
          image: p.image || "d.jpg",
          size: p.size || "100 مل",
          desc: p.desc || "",
          usage: p.usage || ""
        }));
        localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(formattedProducts));
      }

      // 2. Fetch Orders
      const { data: ordersData, error: ordErr } = await this.client
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!ordErr && ordersData) {
        const formattedOrders = ordersData.map(o => ({
          id: o.id,
          customer: o.customer,
          phone: o.phone || "",
          city: o.city || "الرياض",
          address: o.address || "",
          date: o.date || new Date(o.created_at).toLocaleString('ar-SA'),
          status: o.status || "جديد",
          paymentMethod: o.payment_method || o.paymentMethod || "الدفع عند الاستلام",
          items: typeof o.items === 'string' ? JSON.parse(o.items) : (o.items || []),
          total: Number(o.total) || 0
        }));
        localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(formattedOrders));
      }

      // 3. Fetch Reviews
      const { data: reviewsData, error: revErr } = await this.client
        .from('reviews')
        .select('*')
        .order('id', { ascending: false });

      if (!revErr && reviewsData) {
        const formattedReviews = reviewsData.map(r => ({
          id: Number(r.id),
          name: r.name,
          rating: r.rating || "★★★★★",
          stars: Number(r.stars) || 5,
          date: r.date || new Date().toISOString().split('T')[0],
          text: r.text,
          status: r.status || "مقبول"
        }));
        localStorage.setItem(this.KEYS.REVIEWS, JSON.stringify(formattedReviews));
      }

      // 4. Fetch Settings
      const { data: settingsData, error: setErr } = await this.client
        .from('settings')
        .select('*')
        .eq('id', 'general')
        .maybeSingle();

      if (!setErr && settingsData) {
        const formattedSettings = {
          storeName: settingsData.store_name || "عنايتي",
          tagline: settingsData.tagline || "عناية طبيعية لبشرتك",
          currency: settingsData.currency || "ر.س",
          freeShippingThreshold: Number(settingsData.free_shipping_threshold) || 200,
          contactEmail: settingsData.contact_email || "hello@anayati.example",
          contactPhone: settingsData.contact_phone || "0550001122",
          maintenanceMode: Boolean(settingsData.maintenance_mode)
        };
        localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(formattedSettings));
      }

      this.updateConnectionUI(true);
      this.dispatchUpdate('sync_complete');
    } catch (e) {
      console.warn('Sync with Supabase completed with warning:', e);
    } finally {
      this.isSyncing = false;
    }
  },

  // Setup Supabase Realtime Listener
  setupRealtime() {
    if (!this.client || this.realtimeSubscription) return;

    try {
      this.realtimeSubscription = this.client
        .channel('mycare_realtime_channel')
        .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
          this.handleRealtimeProduct(payload);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
          this.handleRealtimeOrder(payload);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'reviews' }, (payload) => {
          this.handleRealtimeReview(payload);
        })
        .on('postgres_changes', { event: '*', schema: 'public', table: 'settings' }, (payload) => {
          this.handleRealtimeSettings(payload);
        })
        .subscribe((status) => {
          if (status === 'SUBSCRIBED') {
            console.log('🟢 Supabase Realtime connected successfully!');
          }
        });
    } catch (e) {
      console.warn('Failed to setup Realtime channel:', e);
    }
  },

  handleRealtimeProduct(payload) {
    const products = this.getProducts();
    if (payload.eventType === 'INSERT') {
      const p = payload.new;
      if (!products.some(item => item.id === Number(p.id))) {
        products.unshift({
          id: Number(p.id),
          name: p.name,
          cat: p.cat || "بشرة",
          price: Number(p.price) || 0,
          stock: Number(p.stock) || 0,
          tag: p.tag || "",
          color: p.color || "#C5E0C9",
          image: p.image || "d.jpg",
          size: p.size || "100 مل",
          desc: p.desc || "",
          usage: p.usage || ""
        });
        localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
        this.dispatchUpdate('products');
      }
    } else if (payload.eventType === 'UPDATE') {
      const p = payload.new;
      const idx = products.findIndex(item => item.id === Number(p.id));
      if (idx !== -1) {
        products[idx] = {
          ...products[idx],
          name: p.name,
          cat: p.cat,
          price: Number(p.price),
          stock: Number(p.stock),
          tag: p.tag,
          color: p.color,
          image: p.image,
          size: p.size,
          desc: p.desc,
          usage: p.usage
        };
        localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
        this.dispatchUpdate('products');
      }
    } else if (payload.eventType === 'DELETE') {
      const id = payload.old.id;
      const filtered = products.filter(p => p.id !== Number(id));
      localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(filtered));
      this.dispatchUpdate('products');
    }
  },

  handleRealtimeOrder(payload) {
    const orders = this.getOrders();
    if (payload.eventType === 'INSERT') {
      const o = payload.new;
      if (!orders.some(item => item.id === o.id)) {
        orders.unshift({
          id: o.id,
          customer: o.customer,
          phone: o.phone || "",
          city: o.city || "الرياض",
          address: o.address || "",
          date: o.date || new Date().toLocaleString('ar-SA'),
          status: o.status || "جديد",
          paymentMethod: o.payment_method || "الدفع عند الاستلام",
          items: typeof o.items === 'string' ? JSON.parse(o.items) : (o.items || []),
          total: Number(o.total) || 0
        });
        localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
        this.dispatchUpdate('orders');
      }
    } else if (payload.eventType === 'UPDATE') {
      const o = payload.new;
      const idx = orders.findIndex(item => item.id === o.id);
      if (idx !== -1) {
        orders[idx].status = o.status;
        localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
        this.dispatchUpdate('orders');
      }
    } else if (payload.eventType === 'DELETE') {
      const filtered = orders.filter(o => o.id !== payload.old.id);
      localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(filtered));
      this.dispatchUpdate('orders');
    }
  },

  handleRealtimeReview(payload) {
    const reviews = this.getReviews();
    if (payload.eventType === 'INSERT') {
      const r = payload.new;
      if (!reviews.some(item => item.id === Number(r.id))) {
        reviews.unshift({
          id: Number(r.id),
          name: r.name,
          rating: r.rating || "★★★★★",
          stars: Number(r.stars) || 5,
          date: r.date || new Date().toISOString().split('T')[0],
          text: r.text,
          status: r.status || "مقبول"
        });
        localStorage.setItem(this.KEYS.REVIEWS, JSON.stringify(reviews));
        this.dispatchUpdate('reviews');
      }
    } else if (payload.eventType === 'DELETE') {
      const filtered = reviews.filter(r => r.id !== Number(payload.old.id));
      localStorage.setItem(this.KEYS.REVIEWS, JSON.stringify(filtered));
      this.dispatchUpdate('reviews');
    }
  },

  handleRealtimeSettings(payload) {
    if (payload.new) {
      const s = payload.new;
      const settings = {
        storeName: s.store_name || "عنايتي",
        tagline: s.tagline || "عناية طبيعية لبشرتك",
        currency: s.currency || "ر.س",
        freeShippingThreshold: Number(s.free_shipping_threshold) || 200,
        contactEmail: s.contact_email || "hello@anayati.example",
        contactPhone: s.contact_phone || "0550001122",
        maintenanceMode: Boolean(s.maintenance_mode)
      };
      localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(settings));
      this.dispatchUpdate('settings');
    }
  },

  // ================= Products API =================
  getProducts() {
    this.init();
    try {
      const cached = JSON.parse(localStorage.getItem(this.KEYS.PRODUCTS));
      return (cached && cached.length) ? cached : INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  },

  getProductById(id) {
    const products = this.getProducts();
    return products.find(p => p.id === Number(id));
  },

  saveProductsLocally(products) {
    localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(products));
    this.dispatchUpdate('products');
  },

  async addProduct(productData) {
    const products = this.getProducts();
    const tempId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    const newProduct = {
      id: tempId,
      name: productData.name,
      cat: productData.cat || "بشرة",
      price: Number(productData.price) || 0,
      stock: Number(productData.stock) || 10,
      tag: productData.tag || "",
      color: "#C5E0C9",
      image: productData.image || "d.jpg",
      size: productData.size || "100 مل",
      desc: productData.desc || "",
      usage: productData.usage || ""
    };

    // Optimistic update
    products.unshift(newProduct);
    this.saveProductsLocally(products);

    // Supabase cloud write
    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('products')
          .insert({
            name: newProduct.name,
            cat: newProduct.cat,
            price: newProduct.price,
            stock: newProduct.stock,
            tag: newProduct.tag,
            color: newProduct.color,
            image: newProduct.image,
            size: newProduct.size,
            desc: newProduct.desc,
            usage: newProduct.usage
          })
          .select()
          .single();

        if (!error && data) {
          // Replace temp ID with actual Supabase DB ID
          const current = this.getProducts();
          const target = current.find(p => p.id === tempId);
          if (target) {
            target.id = Number(data.id);
            this.saveProductsLocally(current);
          }
          return data;
        }
      } catch (e) {
        console.warn('Supabase addProduct warning:', e);
      }
    }
    return newProduct;
  },

  async updateProduct(id, updatedFields) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === Number(id));
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedFields };
      this.saveProductsLocally(products);

      // Supabase cloud update
      if (this.client) {
        try {
          const dbPayload = {};
          if (updatedFields.name !== undefined) dbPayload.name = updatedFields.name;
          if (updatedFields.cat !== undefined) dbPayload.cat = updatedFields.cat;
          if (updatedFields.price !== undefined) dbPayload.price = Number(updatedFields.price);
          if (updatedFields.stock !== undefined) dbPayload.stock = Number(updatedFields.stock);
          if (updatedFields.tag !== undefined) dbPayload.tag = updatedFields.tag;
          if (updatedFields.image !== undefined) dbPayload.image = updatedFields.image;
          if (updatedFields.size !== undefined) dbPayload.size = updatedFields.size;
          if (updatedFields.desc !== undefined) dbPayload.desc = updatedFields.desc;
          if (updatedFields.usage !== undefined) dbPayload.usage = updatedFields.usage;

          await this.client
            .from('products')
            .update(dbPayload)
            .eq('id', Number(id));
        } catch (e) {
          console.warn('Supabase updateProduct warning:', e);
        }
      }

      return products[index];
    }
    return null;
  },

  async deleteProduct(id) {
    let products = this.getProducts();
    products = products.filter(p => p.id !== Number(id));
    this.saveProductsLocally(products);

    if (this.client) {
      try {
        await this.client
          .from('products')
          .delete()
          .eq('id', Number(id));
      } catch (e) {
        console.warn('Supabase deleteProduct warning:', e);
      }
    }
  },

  // ================= Orders API =================
  getOrders() {
    this.init();
    try {
      const cached = JSON.parse(localStorage.getItem(this.KEYS.ORDERS));
      return (cached && cached.length) ? cached : INITIAL_ORDERS;
    } catch (e) {
      return INITIAL_ORDERS;
    }
  },

  saveOrdersLocally(orders) {
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(orders));
    this.dispatchUpdate('orders');
  },

  async createOrder(orderData) {
    const orders = this.getOrders();
    const randNum = Math.floor(1000 + Math.random() * 9000);
    const orderId = `MC-${randNum}`;
    const formattedDate = new Date().toLocaleString('ar-SA', { hour12: false });

    const newOrder = {
      id: orderId,
      customer: orderData.customer,
      phone: orderData.phone || "",
      city: orderData.city || "الرياض",
      address: orderData.address || "العنوان المسجل",
      date: formattedDate,
      status: "جديد",
      paymentMethod: orderData.paymentMethod || "الدفع عند الاستلام",
      items: orderData.items,
      total: Number(orderData.total) || 0
    };

    // Optimistic local update
    orders.unshift(newOrder);
    this.saveOrdersLocally(orders);

    // Update stock locally
    const products = this.getProducts();
    orderData.items.forEach(item => {
      const p = products.find(prod => prod.id === item.id);
      if (p && p.stock !== undefined) {
        p.stock = Math.max(0, p.stock - (item.qty || 1));
      }
    });
    this.saveProductsLocally(products);

    // Write order to Supabase
    if (this.client) {
      try {
        await this.client.from('orders').insert({
          id: newOrder.id,
          customer: newOrder.customer,
          phone: newOrder.phone,
          city: newOrder.city,
          address: newOrder.address,
          date: newOrder.date,
          status: newOrder.status,
          payment_method: newOrder.paymentMethod,
          items: newOrder.items,
          total: newOrder.total
        });

        // Also decrement stock in Supabase for each item
        for (const item of orderData.items) {
          const matchedProd = products.find(prod => prod.id === item.id);
          if (matchedProd) {
            await this.client
              .from('products')
              .update({ stock: matchedProd.stock })
              .eq('id', item.id);
          }
        }
      } catch (e) {
        console.warn('Supabase createOrder write warning:', e);
      }
    }

    return newOrder;
  },

  async updateOrderStatus(orderId, newStatus) {
    const orders = this.getOrders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = newStatus;
      this.saveOrdersLocally(orders);

      if (this.client) {
        try {
          await this.client
            .from('orders')
            .update({ status: newStatus })
            .eq('id', orderId);
        } catch (e) {
          console.warn('Supabase updateOrderStatus warning:', e);
        }
      }
      return order;
    }
    return null;
  },

  async deleteOrder(orderId) {
    let orders = this.getOrders();
    orders = orders.filter(o => o.id !== orderId);
    this.saveOrdersLocally(orders);

    if (this.client) {
      try {
        await this.client
          .from('orders')
          .delete()
          .eq('id', orderId);
      } catch (e) {
        console.warn('Supabase deleteOrder warning:', e);
      }
    }
  },

  // ================= Reviews API =================
  getReviews() {
    this.init();
    try {
      const cached = JSON.parse(localStorage.getItem(this.KEYS.REVIEWS));
      return (cached && cached.length) ? cached : INITIAL_REVIEWS;
    } catch (e) {
      return INITIAL_REVIEWS;
    }
  },

  saveReviewsLocally(reviews) {
    localStorage.setItem(this.KEYS.REVIEWS, JSON.stringify(reviews));
    this.dispatchUpdate('reviews');
  },

  async addReview(reviewData) {
    const reviews = this.getReviews();
    const tempId = reviews.length ? Math.max(...reviews.map(r => r.id || 0)) + 1 : 1;
    const newReview = {
      id: tempId,
      name: reviewData.name,
      rating: reviewData.rating || "★★★★★",
      stars: reviewData.stars || 5,
      date: new Date().toISOString().split('T')[0],
      text: reviewData.text,
      status: "مقبول"
    };

    reviews.unshift(newReview);
    this.saveReviewsLocally(reviews);

    if (this.client) {
      try {
        const { data, error } = await this.client
          .from('reviews')
          .insert({
            name: newReview.name,
            rating: newReview.rating,
            stars: newReview.stars,
            date: newReview.date,
            text: newReview.text,
            status: newReview.status
          })
          .select()
          .single();

        if (!error && data) {
          const current = this.getReviews();
          const target = current.find(r => r.id === tempId);
          if (target) {
            target.id = Number(data.id);
            this.saveReviewsLocally(current);
          }
          return data;
        }
      } catch (e) {
        console.warn('Supabase addReview warning:', e);
      }
    }

    return newReview;
  },

  async deleteReview(id) {
    let reviews = this.getReviews();
    reviews = reviews.filter(r => r.id !== Number(id));
    this.saveReviewsLocally(reviews);

    if (this.client) {
      try {
        await this.client
          .from('reviews')
          .delete()
          .eq('id', Number(id));
      } catch (e) {
        console.warn('Supabase deleteReview warning:', e);
      }
    }
  },

  // ================= Settings API =================
  getSettings() {
    this.init();
    try {
      return JSON.parse(localStorage.getItem(this.KEYS.SETTINGS)) || {};
    } catch (e) {
      return {};
    }
  },

  async saveSettings(newSettings) {
    const current = this.getSettings();
    const updated = { ...current, ...newSettings };
    localStorage.setItem(this.KEYS.SETTINGS, JSON.stringify(updated));
    this.dispatchUpdate('settings');

    if (this.client) {
      try {
        await this.client
          .from('settings')
          .upsert({
            id: 'general',
            store_name: updated.storeName,
            tagline: updated.tagline,
            currency: updated.currency,
            free_shipping_threshold: Number(updated.freeShippingThreshold),
            contact_email: updated.contactEmail,
            contact_phone: updated.contactPhone,
            maintenance_mode: Boolean(updated.maintenanceMode),
            updated_at: new Date().toISOString()
          });
      } catch (e) {
        console.warn('Supabase saveSettings warning:', e);
      }
    }

    return updated;
  },

  // ================= Analytics & Summary =================
  getStats() {
    const orders = this.getOrders();
    const products = this.getProducts();
    const reviews = this.getReviews();

    const totalSales = orders.reduce((sum, o) => sum + (Number(o.total) || 0), 0);
    const totalOrders = orders.length;
    const completedOrders = orders.filter(o => o.status === "مكتمل").length;
    const pendingOrders = orders.filter(o => o.status === "جديد" || o.status === "قيد التجهيز").length;
    const totalProducts = products.length;
    const lowStockCount = products.filter(p => (p.stock || 0) < 15).length;

    return {
      totalSales,
      totalOrders,
      completedOrders,
      pendingOrders,
      totalProducts,
      lowStockCount,
      reviewsCount: reviews.length
    };
  },

  // Reset to original mock data in database & local
  async resetAll() {
    localStorage.setItem(this.KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
    localStorage.setItem(this.KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
    localStorage.setItem(this.KEYS.REVIEWS, JSON.stringify(INITIAL_REVIEWS));
    this.dispatchUpdate('all');

    if (this.client) {
      try {
        // Reset DB tables to initial
        await this.client.from('orders').delete().neq('id', '____dummy____');
        await this.client.from('reviews').delete().neq('id', 0);
        await this.client.from('products').delete().neq('id', 0);

        for (const p of INITIAL_PRODUCTS) {
          await this.client.from('products').insert({
            id: p.id,
            name: p.name,
            cat: p.cat,
            price: p.price,
            stock: p.stock,
            tag: p.tag,
            color: p.color,
            image: p.image,
            size: p.size,
            desc: p.desc,
            usage: p.usage
          });
        }

        for (const o of INITIAL_ORDERS) {
          await this.client.from('orders').insert({
            id: o.id,
            customer: o.customer,
            phone: o.phone,
            city: o.city,
            address: o.address,
            date: o.date,
            status: o.status,
            payment_method: o.paymentMethod,
            items: o.items,
            total: o.total
          });
        }

        for (const r of INITIAL_REVIEWS) {
          await this.client.from('reviews').insert({
            id: r.id,
            name: r.name,
            rating: r.rating,
            stars: r.stars,
            date: r.date,
            text: r.text,
            status: r.status
          });
        }
      } catch (e) {
        console.warn('Reset error in Supabase:', e);
      }
    }
  },

  // Event dispatcher for reactive updates
  dispatchUpdate(type) {
    window.dispatchEvent(new CustomEvent('mycare:data_updated', { detail: { type } }));
  }
};

// Initialize right away
MyCareStore.init();
