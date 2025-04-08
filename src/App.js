import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  // Estados principales
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [purchaseData, setPurchaseData] = useState(null);
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [orderStatus, setOrderStatus] = useState("Pago confirmado");
  const [currentStep, setCurrentStep] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [showComplaintForm, setShowComplaintForm] = useState(false);
  const [complaintSubmitted, setComplaintSubmitted] = useState(false);
  const [complaint, setComplaint] = useState("");
  const [activeBrand, setActiveBrand] = useState("all");
  const [showPromoPopup, setShowPromoPopup] = useState(true);
  const [discountCode, setDiscountCode] = useState("");
  const [discountApplied, setDiscountApplied] = useState(false);
  
  // Estados para autenticación
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({ 
    name: "",
    email: "",
    password: "" 
  });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  // Estados para el formulario de pago
  const [deliveryMethod, setDeliveryMethod] = useState("recogida");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedStore, setSelectedStore] = useState("");
  const [address, setAddress] = useState({
    calle: "",
    codigoPostal: "",
    ciudad: "",
    provincia: "",
    telefono: ""
  });

  // Lista de sucursales para recoger
  const stores = [
    {
      id: 1,
      name: "Osuna Mobile Mariano Matamoros",
      address: "Calle Mariano Matamoros No 130, Hermosillo, Sonora, C.P. 83000",
      phone: "162120228",
      hours: "Lunes a Viernes: 9:00 - 20:00, Sábado: 10:00 - 18:00"
    },
    {
      id: 2,
      name: "Osuna Mobile Plutarco Elías Calles",
      address: "Avenida Plutarco Elías Calles No 159, Hermosillo, Sonora, C.P. 83000",
      phone: "66 2212 1096",
      hours: "Lunes a Viernes: 9:00 - 20:00, Sábado: 10:00 - 18:00"
    },
    {
      id: 3,
      name: "Osuna Mobile Luis Encinas",
      address: "Boulevard Luis Encinas, Hermosillo, Sonora, C.P. 550",
      phone: "6621234567",
      hours: "Lunes a Viernes: 9:00 - 20:00, Sábado: 10:00 - 18:00"
    },
    {
      id: 4,
      name: "Osuna Mobile Dila",
      address: "Boulevard José María Morelos Núm. 349, Loc. 248, Colonia Bugambilias, Hermosillo, Sonora, C.P. 83140",
      phone: "66 25 03 52 51",
      hours: "Lunes a Domingo: 11:00 a 21:00 hrs."
    }
  ];

  // Productos disponibles (Apple + Samsung)
  const products = [
    // Productos Apple
    { 
      name: "iPhone 13", 
      brand: "apple",
      imgSrc: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-iphone-13-mini-midnight-2022_AV1?wid=1144&hei=1144&fmt=jpeg&qlt=90&.v=1671646516129", 
      price: 8683.56, 
      description: "Gran rendimiento y diseño moderno.",
      specs: {
        pantalla: "6.1 pulgadas Super Retina XDR",
        procesador: "A15 Bionic",
        almacenamiento: "128GB, 256GB, 512GB",
        camara: "Sistema de doble cámara de 12MP",
        bateria: "Hasta 19 horas de reproducción de video"
      },
      colors: ["Midnight", "Azul", "Rosa", "Starlight", "Verde"]
    },
    { 
      name: "iPhone 14", 
      brand: "apple",
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRb2LK8FA_ZmdvfwZM8yCPVFYnXUza5oyafiA&s", 
      price: 14999.99, 
      description: "Excelente cámara y rendimiento rápido.",
      specs: {
        pantalla: "6.1 pulgadas Super Retina XDR",
        procesador: "A15 Bionic",
        almacenamiento: "128GB, 256GB, 512GB",
        camara: "Sistema avanzado de doble cámara de 12MP",
        bateria: "Hasta 20 horas de reproducción de video"
      },
      colors: ["Azul", "Púrpura", "Medianoche", "Starlight", "Rojo"]
    },
    { 
      name: "iPhone 15", 
      brand: "apple",
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAN-qdPenRpybH-Gue_yWeU0v17qWNg1qlIw&s", 
      price: 17499.89, 
      description: "Innovador con USB-C y gran batería.",
      specs: {
        pantalla: "6.1 pulgadas Super Retina XDR",
        procesador: "A16 Bionic",
        almacenamiento: "128GB, 256GB, 512GB",
        camara: "Sistema avanzado de doble cámara de 48MP",
        bateria: "Hasta 20 horas de reproducción de video"
      },
      colors: ["Negro", "Azul", "Verde", "Amarillo", "Rosa"]
    },
    { 
      name: "iPhone 16", 
      brand: "apple",
      imgSrc: "https://ishopmx.vtexassets.com/arquivos/ids/301895-800-auto?v=638751521807230000&width=800&height=auto&aspect=true", 
      price: 19999.69, 
      description: "Potente y con cámaras profesionales.",
      specs: {
        pantalla: "6.3 pulgadas Super Retina XDR Pro",
        procesador: "A17 Pro",
        almacenamiento: "256GB, 512GB, 1TB",
        camara: "Triple cámara de 48MP + 12MP + 12MP",
        bateria: "Hasta 23 horas de reproducción de video"
      },
      colors: ["Titanio Negro", "Titanio Blanco", "Titanio Azul", "Titanio Natural"]
    },
    { 
      name: "AirPods Pro", 
      brand: "apple",
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFgigwjyyVdSTFgNI9NsbVaohuFU_UrXO2Ig&s", 
      price: 2999.79, 
      description: "Sonido premium con cancelación activa.",
      specs: {
        tipo: "In-ear inalámbricos",
        conectividad: "Bluetooth 5.3",
        bateria: "Hasta 6 horas (30 con estuche)",
        resistencia: "IPX4 (resistencia al agua)",
        caracteristicas: "Cancelación activa de ruido, Modo Ambiente, Audio Espacial"
      },
      colors: ["Blanco"]
    },
    { 
      name: "AirPods Max", 
      brand: "apple",
      imgSrc: "https://unaluka.com/cdn/shop/products/AirpodsMaxPortada_1200x1200.jpg?v=1676390673", 
      price: 12999.99, 
      description: "Audio espacial y lujo en diseño.",
      specs: {
        tipo: "Over-ear inalámbricos",
        conectividad: "Bluetooth 5.0",
        bateria: "Hasta 20 horas",
        resistencia: "No resistentes al agua",
        caracteristicas: "Cancelación activa de ruido, Modo Ambiente, Audio Espacial, Calidad Hi-Fi"
      },
      colors: ["Plateado", "Verde", "Azul", "Rosa"]
    },
    { 
      name: "AirPods 3", 
      brand: "apple",
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSTum8vf3lFvjUPxBFfP7lVpXnJMOejQsDFxlweaLdH8NRQ9KELce432KMsFkKmPgweh4&usqp=CAU", 
      price: 3099.89, 
      description: "Sonido claro y excelente autonomía.",
      specs: {
        tipo: "In-ear inalámbricos",
        conectividad: "Bluetooth 5.0",
        bateria: "Hasta 6 horas (30 con estuche)",
        resistencia: "IPX4 (resistencia al agua)",
        caracteristicas: "Audio Espacial, Diseño ergonómico"
      },
      colors: ["Blanco"]
    },
    { 
      name: "AirPods 2", 
      brand: "apple",
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSCM-_UnL0-N7SkPxr2mKkTut-5B8ET1rHGvHeO_j7c4dh7LECFjmYxhL2biZa3it4f08E&usqp=CAU", 
      price: 2100.78, 
      description: "Conexión fácil y sonido nítido.",
      specs: {
        tipo: "In-ear inalámbricos",
        conectividad: "Bluetooth 5.0",
        bateria: "Hasta 5 horas (24 con estuche)",
        resistencia: "No resistentes al agua",
        caracteristicas: "Chip H1, Activación por voz con Siri"
      },
      colors: ["Blanco"]
    },
    { 
      name: "iPad 9", 
      brand: "apple",
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfr-1FBHYHxZx2Osru29YrYaYKaoIUCg__Bg&s", 
      price: 7369.29, 
      description: "Pantalla Retina y rendimiento sólido.",
      specs: {
        pantalla: "10.2 pulgadas Retina",
        procesador: "A13 Bionic",
        almacenamiento: "64GB, 256GB",
        bateria: "Hasta 10 horas",
        conectividad: "Wi-Fi, Opcional Cellular",
        compatibilidad: "Apple Pencil (1ra generación), Smart Keyboard"
      },
      colors: ["Gris Espacial", "Plateado"]
    },
    { 
      name: "iPad Air 10 GEN", 
      brand: "apple",
      imgSrc: "https://www.celudmovil.com.co/cdn/shop/files/ipad10generacion.1_6621d5c5-6b3d-4676-b4bf-6fb924825ac5.webp?v=1701194965&width=1000", 
      price: 9599.89, 
      description: "Diseño delgado con chip M1.",
      specs: {
        pantalla: "10.9 pulgadas Liquid Retina",
        procesador: "M1",
        almacenamiento: "64GB, 256GB",
        bateria: "Hasta 10 horas",
        conectividad: "Wi-Fi, Opcional 5G",
        compatibilidad: "Apple Pencil (2da generación), Magic Keyboard"
      },
      colors: ["Gris Espacial", "Rosa", "Azul", "Morado"]
    },
    { 
      name: "iPad Pro 11", 
      brand: "apple",
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTO-jxEVXgVNv9ZQo0dwNJK0bebeB3sfVCRALa3RTCGVnWpdtIih0AGII2lOtbJTIfSp0E&usqp=CAU", 
      price: 11899.99, 
      description: "Desempeño superior y pantalla Liquid.",
      specs: {
        pantalla: "11 pulgadas Liquid Retina XDR",
        procesador: "M2",
        almacenamiento: "128GB, 256GB, 512GB, 1TB, 2TB",
        bateria: "Hasta 10 horas",
        conectividad: "Wi-Fi 6E, 5G",
        compatibilidad: "Apple Pencil (2da generación), Magic Keyboard"
      },
      colors: ["Gris Espacial", "Plateado"]
    },
    { 
      name: "iPad Pro 12.9", 
      brand: "apple",
      imgSrc: "https://cdsassets.apple.com/live/SZLF0YNV/images/sp/111977_ipad-pro-12-2020.jpeg", 
      price: 13999.99, 
      description: "Pantalla XDR y rendimiento profesional.",
      specs: {
        pantalla: "12.9 pulgadas Liquid Retina XDR",
        procesador: "M2",
        almacenamiento: "128GB, 256GB, 512GB, 1TB, 2TB",
        bateria: "Hasta 10 horas",
        conectividad: "Wi-Fi 6E, 5G",
        compatibilidad: "Apple Pencil (2da generación), Magic Keyboard"
      },
      colors: ["Gris Espacial", "Plateado"]
    },
    
    // Productos Samsung
    { 
      name: "Samsung Galaxy S24", 
      brand: "samsung",
      imgSrc: "https://images.samsung.com/is/image/samsung/assets/mx/smartphones/galaxy-s24/buy/01_S24Series-Group-KV_Exclusive-MO_0527_final.jpg", 
      price: 14999.70, 
      description: "El nuevo Galaxy S24 con IA integrada y cámara profesional.",
      specs: {
        pantalla: "6.2 pulgadas Dynamic AMOLED 2X",
        procesador: "Exynos 2400 / Snapdragon 8 Gen 3",
        almacenamiento: "128GB, 256GB, 512GB",
        camara: "Triple cámara 50MP + 12MP + 10MP",
        bateria: "4000 mAh",
        sistema: "Android 14 con One UI 6.1"
      },
      colors: ["Negro", "Gris", "Violeta", "Amarillo"]
    },
    { 
      name: "Samsung Galaxy Z Fold5", 
      brand: "samsung",
      imgSrc: "https://images.samsung.com/mx/smartphones/galaxy-z-fold5/buy/kv_group_MO.jpg", 
      price: 12409.90, 
      description: "Teléfono plegable con pantalla dinámica AMOLED.",
      specs: {
        pantalla: "7.6 pulgadas Dynamic AMOLED 2X (interior) + 6.2 pulgadas (exterior)",
        procesador: "Snapdragon 8 Gen 2",
        almacenamiento: "256GB, 512GB, 1TB",
        camara: "Triple cámara 50MP + 12MP + 10MP",
        bateria: "4400 mAh",
        sistema: "Android 13 con One UI 5.1.1"
      },
      colors: ["Negro", "Beige", "Azul"]
    },
    { 
      name: "Samsung Galaxy A54", 
      brand: "samsung",
      imgSrc: "https://m.media-amazon.com/images/I/61k7EH2R12L.jpg", 
      price: 5999.75, 
      description: "Excelente relación calidad-precio con cámara de 50MP.",
      specs: {
        pantalla: "6.4 pulgadas Super AMOLED",
        procesador: "Exynos 1380",
        almacenamiento: "128GB, 256GB",
        camara: "Triple cámara 50MP + 12MP + 5MP",
        bateria: "5000 mAh",
        sistema: "Android 13 con One UI 5.1"
      },
      colors: ["Negro", "Blanco", "Verde"]
    },
    { 
      name: "Samsung Galaxy S23 FE", 
      brand: "samsung",
      imgSrc: "https://www.lesmobiles.com/upload/media/Nouveau%20projet%20-%202024-04-24T095057.279.jpg", 
      price: 9199.85, 
      description: "Edición Fan con lo mejor de la serie Galaxy.",
      specs: {
        pantalla: "6.4 pulgadas Dynamic AMOLED 2X",
        procesador: "Exynos 2200",
        almacenamiento: "128GB, 256GB",
        camara: "Triple cámara 50MP + 12MP + 8MP",
        bateria: "4500 mAh",
        sistema: "Android 13 con One UI 5.1"
      },
      colors: ["Negro", "Blanco", "Morado"]
    },
    { 
      name: "Samsung Galaxy Tab S9 Ultra", 
      brand: "samsung",
      imgSrc: "https://images.samsung.com/is/image/samsung/p6pim/ar/sm-x910nzaharo/gallery/ar-galaxy-tab-s9-ultra-wifi-x910-sm-x910nzaharo-537956616?$684_547_PNG$", 
      price: 6800.59, 
      description: "Tablet más grande y potente de Samsung con S Pen incluido.",
      specs: {
        pantalla: "14.6 pulgadas Dynamic AMOLED 2X",
        procesador: "Snapdragon 8 Gen 2",
        almacenamiento: "256GB, 512GB, 1TB",
        bateria: "11200 mAh",
        sistema: "Android 13 con One UI 5.1",
        caracteristicas: "S Pen incluido, 5G opcional"
      },
      colors: ["Negro", "Beige"]
    },
    { 
      name: "Samsung Galaxy Tab A8", 
      brand: "samsung",
      imgSrc: "https://m.media-amazon.com/images/I/71g9X7W9K3L.jpg", 
      price: 4500.49, 
      description: "Tablet económica con gran pantalla y rendimiento.",
      specs: {
        pantalla: "10.5 pulgadas TFT LCD",
        procesador: "Unisoc Tiger T618",
        almacenamiento: "32GB, 64GB, 128GB",
        bateria: "7040 mAh",
        sistema: "Android 11 con One UI 3.1",
        caracteristicas: "Quad speakers, LTE opcional"
      },
      colors: ["Gris", "Plateado"]
    },
    { 
      name: "Samsung Galaxy Tab A9", 
      brand: "samsung",
      imgSrc: "https://images.samsung.com/is/image/samsung/p6pim/mx/feature/164879804/mx-feature-galaxy-tab-a9-plus-sm-x210-538825390?$FB_TYPE_A_MO_JPG$", 
      price: 4900.99, 
      description: "Tablet premium con pantalla Dynamic AMOLED 2X.",
      specs: {
        pantalla: "11 pulgadas Dynamic AMOLED 2X",
        procesador: "Snapdragon 8 Gen 1",
        almacenamiento: "128GB, 256GB",
        bateria: "8000 mAh",
        sistema: "Android 13 con One UI 5.1"
      },
      colors: ["Negro", "Verde"]
    },
    { 
      name: "Samsung Galaxy Tab S6 Lite", 
      brand: "samsung",
      imgSrc: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrOiMMi5vzq5HHrxjA5ZUOdPcL7utjdTlGMQ&s", 
      price: 5200.99, 
      description: "Tablet ligera con S Pen incluido para creativos.",
      specs: {
        pantalla: "10.4 pulgadas TFT LCD",
        procesador: "Exynos 9611",
        almacenamiento: "64GB, 128GB",
        bateria: "7040 mAh",
        sistema: "Android 12 con One UI 4",
        caracteristicas: "S Pen incluido, LTE opcional"
      },
      colors: ["Azul", "Rosa"]
    }
  ];

  // Próximos lanzamientos
  const [upcomingProducts] = useState([
    {
      id: 1,
      name: "iPhone 16 Pro",
      image: "https://www.apple.com/mx/iphone-16-pro/images/overview/product-viewer/iphone-pro/all_colors__fdpduog7urm2_xlarge.jpg",
      description: "Próximo lanzamiento esperado para abril 2025 con nuevo diseño y mejoras en la cámara.",
      releaseDate: "Abril 2025"
    },
    {
      id: 2,
      name: "AirPods Pro 3",
      image: "https://www.apple.com/newsroom/images/product/airpods/standard/Apple-AirPods-Pro-2nd-gen-hero-220907.jpg.landing-big_2x.jpg",
      description: "Nueva generación con mejor cancelación de ruido y calidad de audio.",
      releaseDate: "Junio 2025"
    },
    {
      id: 3,
      name: "Apple Watch Series 10",
      image: "https://9to5mac.com/wp-content/uploads/sites/6/2024/09/iphone-16-event-13.26.17@2x.jpg?quality=82&strip=all&w=1024",
      description: "Mayor pantalla y nuevos sensores de salud.",
      releaseDate: "Mayo 2025"
    },
    {
      id: 4,
      name: "Samsung Galaxy Buds3 Pro",
      image: "https://m.media-amazon.com/images/I/61AbHKAwRrL.jpg",
      description: "Nuevos audífonos con cancelación de ruido inteligente y calidad de sonido Hi-Fi.",
      releaseDate: "Junio 2025"
    },
    {
      id: 5,
      name: "Samsung Galaxy Buds FE",
      image: "https://shop.samsung.com/latin/pub/media/catalog/product/cache/a69170b4a4f0666a52473c2224ba9220/s/m/sm-r400_000_black_white_4.png",
      description: "Edición Fan con lo mejor de los Galaxy Buds a un precio accesible.",
      releaseDate: "Julio 2025"
    },
    {
      id: 6,
      name: "Samsung Galaxy Buds Live 2",
      image: "https://images.samsung.com/is/image/samsung/cl/galaxy-note20/feature/342409/cl-feature-galaxy-buds-live-194-275666331?$ORIGIN_JPG$",
      description: "Nueva versión de los icónicos audífonos con diseño en forma de frijol.",
      releaseDate: "Agosto 2025"
    },
    {
      id: 7,
      name: "iPhone 16 E",
      image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-16e-finish-unselect-gallery-1-202502_FMT_WHH?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1738069509674",
      description: "Nueva versión económica del iPhone con chip A16 y diseño moderno.",
      releaseDate: "Septiembre 2025"
    },
    {
      id: 8,
      name: "Samsung Galaxy Z Flip6",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGKTPUD1ZMlc0W60MC94M4cFAcLj9P0pUyZQ&s",
      description: "El próximo plegable compacto de Samsung con mejoras en la durabilidad.",
      releaseDate: "Julio 2025"
    },
    {
      id: 9,
      name: "iPhone 14 Pro Max",
      image: "https://www.macstoreonline.com.mx/img//lp/categorias/iphone/iphone-14-pro.png",
      description: "El modelo más premium de Apple con cámara profesional y diseño de titanio.",
      releaseDate: "Septiembre 2025"
    }
  ]);

  // Noticias
  const [news] = useState([
    {
      id: 1,
      title: "Especulaciones del nuevo iPhone 17",
      image: "https://ipadizate.com/hero/2025/02/iphone-17-b.jpg?width=768&aspect_ratio=16:9&format=nowebp",
      excerpt: "iPhone 17: Lo que se rumorea. Se lanzaría en agosto 2025 con pantalla sin bordes, chip A19, mejoras en IA y cámaras.",
      date: "04 abril 2025"
    },
    {
      id: 2,
      title: "¡Nueva sucursal en construcción!",
      image: "https://www.apple.com/newsroom/images/r8-landing-page-tiles/Apple_Construction_LP_hero.jpg.og.jpg",
      excerpt: "Muy pronto en Hermosillo, Sonora. Seguimos creciendo para estar más cerca de ti.",
      date: "07 abril 2025"
    },
    {
      id: 3,
      title: "¿Se aproxima el nuevo auto Apple en Osuna Mobile Store?",
      image: "https://media.ambito.com/p/ecd10ac7f9a2d3e76ab487682dd34156/adjuntos/360/imagenes/041/286/0041286669/375x211/smart/apple-car.png",
      excerpt: "Innovación sobre ruedas, muy pronto disponible.",
      date: "09 abril 2025"
    },
    {
      id: 4,
      title: "¿Samsung Galaxy S25 con batería de una semana?",
      image: "https://cworld.id/wp-content/uploads/2025/01/samsung_galaxy_s25_ultra_titanium_silverblue_5.jpg",
      excerpt: "Rumores indican que el próximo Galaxy S25 podría incluir una revolucionaria batería que dura hasta 7 días.",
      date: "05 abril 2025"
    },
    {
      id: 5,
      title: "Samsung desarrolla pantalla plegable sin bisel",
      image: "https://androidmagazine.eu/wp-content/uploads/2017/10/Foldable-Samsung-Display-FB-545x300.jpg",
      excerpt: "Patentes revelan que Samsung estaría trabajando en una pantalla plegable completamente sin bisel.",
      date: "07 abril 2025"
    },
    {
      id: 6,
      title: "Posible alianza Samsung-Google para nuevo sistema operativo",
      image: "https://cloudfront-us-east-1.images.arcpublishing.com/infobae/MWNYTCQU7JEM5NUM5OPBMNDXAE.jpeg",
      excerpt: "Fuentes sugieren colaboración para desarrollar un nuevo sistema que combine lo mejor de Android y Tizen.",
      date: "09 abril 2025"
    },
    {
      id: 7,
      title: "iPhone 16 vs Galaxy S24: ¿Cuál es mejor?",
      image: "https://blob.posta.com.mx/images/2025/03/26/samsung-s24-vs-iphone-16-mejor-camara-1-bc1251b1-focus-0-0-1479-828.png",
      excerpt: "Comparativa detallada de los dos flagships más esperados del 2025 en rendimiento y cámara.",
      date: "10 abril 2025"
    },
    {
      id: 8,
      title: "AirPods Pro 3 vs Galaxy Buds3 Pro: Batalla de audífonos",
      image: "https://i.ytimg.com/vi/2eNZbmu04SA/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLC0lNN54N3cMaDLU0wqgeBZAJeeeQ",
      excerpt: "Análisis de los nuevos audífonos premium de Apple y Samsung en cancelación de ruido y sonido.",
      date: "11 abril 2025"
    },
    {
      id: 9,
      title: "Ecosistemas: Apple vs Samsung ¿Cuál elegir?",
      image: "https://www.repstatic.it/content/nazionale/img/2017/03/02/154627864-a18d398c-2908-476b-b9f5-2cbcc3430a15.jpg",
      excerpt: "Comparativa completa de los ecosistemas móviles y qué ofrece cada uno para el usuario.",
      date: "12 abril 2025"
    }
  ]);

  // Funciones del carrito
  const addToCart = (product) => {
    if (!selectedColor && product.colors && product.colors.length > 0) {
      alert("Por favor selecciona un color primero");
      return;
    }

    const productWithColor = {
      ...product,
      selectedColor: selectedColor || 'No especificado'
    };

    const existingProduct = cart.find((item) => item.name === product.name && item.selectedColor === selectedColor);
    
    if (existingProduct) {
      setCart(
        cart.map((item) =>
          item.name === product.name && item.selectedColor === selectedColor
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...productWithColor, quantity: 1 }]);
    }
    
    setSelectedColor(null);
    setSelectedProduct(null);
  };

  const updateQuantity = (productName, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(productName);
      return;
    }
    
    setCart(
      cart.map(item =>
        item.name === productName
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeFromCart = (productName) => {
    setCart(cart.filter((item) => item.name !== productName));
  };

  // Manejo de cambios en la dirección
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  // Validaciones para tarjeta
  const validateCardNumber = (value) => {
    return /^\d{16}$/.test(value.replace(/\s/g, ''));
  };

  const validateExpiryDate = (value) => {
    return /^\d{4}$/.test(value);
  };

  const validateCVV = (value) => {
    return /^\d{3}$/.test(value);
  };

  // Generar número de pedido aleatorio
  const generateOrderNumber = () => {
    return `OSUNA-${Math.floor(100000 + Math.random() * 900000)}`;
  };

  // Manejo de Login
  const handleLogin = (e) => {
    e.preventDefault();
    setUser({
      name: loginForm.name,
      email: loginForm.email,
      phone: "6621234567" // Este sería el teléfono registrado
    });
    setShowLogin(false);
    setLoginForm({ name: "", email: "", password: "" });
  };

  // Manejo de Registro
  const handleRegister = (e) => {
    e.preventDefault();
    setUser({
      name: registerForm.name,
      email: registerForm.email,
      phone: registerForm.phone
    });
    setShowRegister(false);
    setRegisterForm({
      name: "",
      email: "",
      password: "",
      phone: ""
    });
  };

  // Manejo del checkout
  const handleCheckout = (e) => {
    e.preventDefault();
    
    // Verificar si el usuario está autenticado
    if (!user) {
      alert("Debes iniciar sesión o registrarte para completar tu compra");
      setShowCheckout(false);
      setShowLogin(true);
      return;
    }

    const formData = new FormData(e.target);
    
    // Validaciones para pago con tarjeta
    if (paymentMethod === "tarjeta") {
      const cardNumber = formData.get("cardNumber");
      const expiryDate = formData.get("expiryDate");
      const cvv = formData.get("cvv");
      
      if (!validateCardNumber(cardNumber)) {
        alert("El número de tarjeta debe tener 16 dígitos");
        return;
      }
      
      if (!validateExpiryDate(expiryDate)) {
        alert("La fecha de vencimiento debe tener 4 dígitos (MMAA)");
        return;
      }
      
      if (!validateCVV(cvv)) {
        alert("El CVV debe tener 3 dígitos");
        return;
      }
    }
    
    // Validación para recogida en tienda
    if (deliveryMethod === "recogida" && !selectedStore) {
      alert("Por favor selecciona una sucursal para recoger tu pedido");
      return;
    }

    // Aplicar descuento si el código es válido
    let total = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    if (discountApplied && discountCode.toUpperCase() === "CBTIS132") {
      total = total * 0.9; // Aplicar 10% de descuento
    }

    const purchase = {
      orderNumber: generateOrderNumber(),
      name: user ? user.name : formData.get("name"),
      email: user ? user.email : formData.get("email"),
      paymentMethod,
      deliveryMethod,
      ...(deliveryMethod === "recogida" && { 
        store: stores.find(store => store.id === parseInt(selectedStore)) 
      }),
      ...(deliveryMethod === "envio" && { address }),
      items: cart,
      total: total,
      date: new Date().toLocaleString(),
      ...(discountApplied && { discountCode: discountCode.toUpperCase(), discountAmount: "10%" })
    };

    setPurchaseData(purchase);
    setCart([]);
    setShowCheckout(false);
    setCurrentStep(0);
    setDiscountApplied(false);
    setDiscountCode("");
  };

  // Simular progreso del pedido
  useEffect(() => {
    if (!showOrderStatus || !purchaseData) return;

    const statusSteps = [
      { status: "Pago confirmado", duration: 2000 },
      { status: "Preparando tu producto", duration: 3000 },
      { status: "Empaquetando", duration: 2500 },
      { status: "En camino", duration: 4000 },
      { status: "Entregado", duration: 0 }
    ];

    if (currentStep < statusSteps.length) {
      const timer = setTimeout(() => {
        setOrderStatus(statusSteps[currentStep].status);
        if (currentStep < statusSteps.length - 1) {
          setCurrentStep(currentStep + 1);
        }
      }, statusSteps[currentStep].duration);

      return () => clearTimeout(timer);
    }
  }, [showOrderStatus, purchaseData, currentStep]);

  // Generar reseñas aleatorias para cada producto
  useEffect(() => {
    if (selectedProduct) {
      const fakeReviews = [
        {
          id: 1,
          author: "Cliente Satisfecho",
          rating: 5,
          comment: "¡Excelente producto! Superó mis expectativas.",
          date: "05/04/2025"
        },
        {
          id: 2,
          author: "Comprador Frecuente",
          rating: 4,
          comment: "Muy buen producto, pero podría mejorar en algunos aspectos.",
          date: "03/04/2025"
        },
        {
          id: 3,
          author: "Usuario Tecnológico",
          rating: 5,
          comment: "Lo mejor que he comprado en mucho tiempo. Totalmente recomendado.",
          date: "01/04/2025"
        }
      ];
      setReviews(fakeReviews);
    }
  }, [selectedProduct]);

  // Filtrar productos según búsqueda y marca seleccionada
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
    (activeBrand === "all" || product.brand === activeBrand)
  );

  // Calcular total del carrito con descuento
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const finalTotal = discountApplied ? cartTotal * 0.9 : cartTotal;

  // Efecto para deshabilitar scroll cuando el modal de zoom está abierto
  useEffect(() => {
    if (zoomedImage || selectedProduct || showComplaintForm || complaintSubmitted) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [zoomedImage, selectedProduct, showComplaintForm, complaintSubmitted]);

  // Manejar envío de queja
  const handleComplaintSubmit = (e) => {
    e.preventDefault();
    // Aquí normalmente enviarías la queja a un servidor
    setComplaintSubmitted(true);
    setTimeout(() => {
      setShowComplaintForm(false);
      setComplaintSubmitted(false);
    }, 3000);
  };

  // Aplicar código de descuento
  const applyDiscount = () => {
    if (discountCode.toUpperCase() === "CBTIS132") {
      setDiscountApplied(true);
      alert("¡Descuento aplicado! 10% de descuento en tu compra.");
    } else {
      alert("Código de descuento no válido");
    }
  };

  return (
    <div className="app-container">
      {/* Popup de promoción */}
      {showPromoPopup && (
        <div className="promo-popup">
          <div className="promo-content">
            <button className="close-promo" onClick={() => setShowPromoPopup(false)}>×</button>
            <h2>¡Regístrate y obtén un 10% de descuento!</h2>
            <p>Usa el código <strong>CBTIS132</strong> al finalizar tu compra</p>
            <div className="discount-input">
              <input
                type="text"
                placeholder="Ingresa código CBTIS132"
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={applyDiscount}>Aplicar</button>
            </div>
            <button 
              className="register-btn"
              onClick={() => {
                setShowPromoPopup(false);
                setShowRegister(true);
              }}
            >
              Registrarme ahora
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="navbar">
        <div className="navbar-left">
          <a href="/" className="logo">Osuna Mobile Store</a>
        </div>
        <div className="navbar-right">
          <input
            type="text"
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos..."
          />
          
          {user ? (
            <div className="user-profile">
              <span>Hola, {user.name}</span>
              <button className="logout-btn" onClick={() => setUser(null)}>
                Cerrar sesión
              </button>
            </div>
          ) : (
            <>
              <button className="auth-btn" onClick={() => setShowLogin(true)}>
                Iniciar sesión
              </button>
              <button 
                className="auth-btn secondary" 
                onClick={() => setShowRegister(true)}
              >
                Registrarse
              </button>
            </>
          )}
          
          <button 
            className="cart-btn" 
            onClick={() => setShowCart(!showCart)}
          >
            🛒 ({cart.reduce((sum, item) => sum + item.quantity, 0)})
          </button>
        </div>
      </div>

      {/* Main Screen */}
      <div className="main-screen">
        <div className="main-content">
          <h1 className="main-title">Bienvenido a Osuna Mobile Store</h1>
          <p className="main-description">
            Compra los últimos smartphones, tablets y accesorios de Apple y Samsung, todo en un solo lugar.
          </p>
        </div>
      </div>

      {/* Filtros de marca */}
      <div className="brand-filters">
        <button 
          className={activeBrand === "all" ? "active" : ""}
          onClick={() => setActiveBrand("all")}
        >
          Todos los productos
        </button>
        <button 
          className={activeBrand === "apple" ? "active" : ""}
          onClick={() => setActiveBrand("apple")}
        >
          Apple
        </button>
        <button 
          className={activeBrand === "samsung" ? "active" : ""}
          onClick={() => setActiveBrand("samsung")}
        >
          Samsung
        </button>
      </div>

      {/* Productos */}
      <section className="product-section">
        <h2 className="section-title">
          {activeBrand === "all" ? "Productos Disponibles" : 
           activeBrand === "apple" ? "Productos Apple" : "Productos Samsung"}
        </h2>
        <div className="product-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div 
                className="product-card" 
                key={product.name}
                data-name={product.name}
              >
                <div className="product-image-container">
                  <img 
                    src={product.imgSrc} 
                    alt={product.name} 
                    className="product-image"
                    onClick={() => setSelectedProduct(product)}
                  />
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-description">{product.description}</p>
                  
                  {/* Selector de color */}
                  {product.colors && (
                    <div className="color-selector">
                      <label>Color:</label>
                      <select 
                        className="color-dropdown"
                        onChange={(e) => {
                          setSelectedColor(e.target.value);
                          setSelectedProduct(product);
                        }}
                        value={selectedProduct?.name === product.name ? selectedColor || "" : ""}
                      >
                        <option value="">Selecciona un color</option>
                        {product.colors.map(color => (
                          <option key={color} value={color}>{color}</option>
                        ))}
                      </select>
                    </div>
                  )}
                  
                  <p className="product-price">${product.price}</p>
                  
                  <div className="product-buttons">
                    <button 
                      className="view-product-btn"
                      onClick={() => {
                        if (product.colors && product.colors.length > 0 && !selectedColor) {
                          alert("Por favor selecciona un color primero");
                          return;
                        }
                        setSelectedProduct(product);
                      }}
                    >
                      Ver producto
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="no-results">No se encontraron productos</p>
          )}
        </div>
      </section>

      {/* Banner de próximos lanzamientos */}
      <div className="upcoming-banner">
        <div className="upcoming-banner-content">
          <h2>Próximamente</h2>
          <p>Descubre lo nuevo que Osuna Mobile Store tiene preparado para ti</p>
        </div>
      </div>

      {/* Sección de Próximos Lanzamientos */}
      <section className="upcoming-products-section">
        <h2 className="section-title">Próximos Lanzamientos</h2>
        <div className="upcoming-products-grid">
          {upcomingProducts.map(product => (
            <div className="upcoming-product-card" key={product.id}>
              <div className="upcoming-product-image-container">
                <img src={product.image} alt={product.name} className="upcoming-product-image" />
              </div>
              <div className="upcoming-product-info">
                <h3>{product.name}</h3>
                <p className="upcoming-product-description">{product.description}</p>
                <p className="upcoming-product-date">Lanzamiento: {product.releaseDate}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Sección de Noticias */}
      <section className="apple-news-section">
        <div className="news-container">
          <h2 className="section-title">Noticias Osuna Mobile Store</h2>
          <p className="section-subtitle">Mantente informado sobre nuestros eventos y promociones</p>
          
          <div className="news-grid">
            {news.map(item => (
              <div className="news-card" key={item.id}>
                <div className="news-image-container">
                  <img src={item.image} alt={item.title} className="news-image" />
                </div>
                <div className="news-content">
                  <span className="news-date">{item.date}</span>
                  <h3 className="news-title">{item.title}</h3>
                  <p className="news-excerpt">{item.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Quejas */}
      <section className="complaints-section">
        <div className="complaints-container">
          <h2 className="section-title">Atención al Cliente</h2>
          <p className="section-subtitle">¿Tienes alguna queja o sugerencia? Nos encantaría escucharte</p>
          <button 
            className="submit-complaint-btn"
            onClick={() => setShowComplaintForm(true)}
          >
            Enviar queja o sugerencia
          </button>
        </div>
      </section>

      {/* Modal de zoom para imágenes */}
      {zoomedImage && (
        <div className="image-zoom-modal" onClick={() => setZoomedImage(null)}>
          <div className="zoom-modal-content">
            <img 
              src={zoomedImage} 
              alt="Zoomed product" 
              className="zoomed-image"
            />
            <button 
              className="close-zoom-modal"
              onClick={(e) => {
                e.stopPropagation();
                setZoomedImage(null);
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Modal de detalle de producto */}
      {selectedProduct && (
        <div className="product-detail-modal" onClick={() => setSelectedProduct(null)}>
          <div className="product-detail-content" onClick={e => e.stopPropagation()}>
            <button 
              className="close-detail-modal"
              onClick={() => setSelectedProduct(null)}
            >
              ×
            </button>
            
            <div className="product-detail-grid">
              {/* Columna de imágenes */}
              <div className="product-images-column">
                <div className="main-product-image">
                  <img src={selectedProduct.imgSrc} alt={selectedProduct.name} />
                </div>
                <div className="product-thumbnails">
                  <div className="thumbnail active">
                    <img src={selectedProduct.imgSrc} alt="Miniatura 1" />
                  </div>
                  <div className="thumbnail">
                    <img src={selectedProduct.imgSrc} alt="Miniatura 2" />
                  </div>
                  <div className="thumbnail">
                    <img src={selectedProduct.imgSrc} alt="Miniatura 3" />
                  </div>
                </div>
              </div>
              
              {/* Columna de información */}
              <div className="product-info-column">
                <h2 className="product-detail-name">{selectedProduct.name}</h2>
                
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < 4 ? "star filled" : "star"}>★</span>
                    ))}
                  </div>
                  <span className="rating-count">(24 reseñas)</span>
                </div>
                
                <p className="product-detail-price">${selectedProduct.price}</p>
                
                <div className="product-detail-description">
                  <h3>Descripción</h3>
                  <p>{selectedProduct.description}</p>
                </div>
                
                <div className="product-specs">
                  <h3>Especificaciones técnicas</h3>
                  <ul>
                    {Object.entries(selectedProduct.specs || {}).map(([key, value]) => (
                      <li key={key}>
                        <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Selector de color en el modal */}
                {selectedProduct.colors && (
                  <div className="color-selector-modal">
                    <label>Color seleccionado:</label>
                    <select
                      value={selectedColor || ""}
                      onChange={(e) => setSelectedColor(e.target.value)}
                    >
                      <option value="">Selecciona un color</option>
                      {selectedProduct.colors.map(color => (
                        <option key={color} value={color}>{color}</option>
                      ))}
                    </select>
                  </div>
                )}
                
                <button 
                  className="add-to-cart-detail"
                  onClick={() => addToCart(selectedProduct)}
                >
                  Añadir al carrito
                </button>
              </div>
              
              {/* Columna de reseñas */}
              <div className="product-reviews-column">
                <h3>Reseñas de clientes</h3>
                
                <div className="reviews-summary">
                  <div className="average-rating">
                    <span className="average">4.8</span>
                    <span className="out-of">/5</span>
                  </div>
                  <div className="rating-bars">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="rating-bar">
                        <span className="stars-count">{stars}★</span>
                        <div className="bar-container">
                          <div 
                            className="bar-fill" 
                            style={{ width: `${stars === 5 ? 85 : stars === 4 ? 10 : stars === 3 ? 3 : stars === 2 ? 1 : 1}%` }}
                          ></div>
                        </div>
                        <span className="percentage">
                          {stars === 5 ? 85 : stars === 4 ? 10 : stars === 3 ? 3 : stars === 2 ? 1 : 1}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="reviews-list">
                  {reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <span className="review-author">{review.author}</span>
                        <div className="review-rating">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? "star filled" : "star"}>★</span>
                          ))}
                        </div>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                      <span className="review-date">{review.date}</span>
                    </div>
                  ))}
                </div>
                
                <button className="write-review-btn">Escribir una reseña</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de quejas */}
      {showComplaintForm && (
        <div className="complaint-modal">
          <div className="complaint-content">
            <button className="close-complaint" onClick={() => setShowComplaintForm(false)}>×</button>
            <h2>Formulario de Quejas y Sugerencias</h2>
            <form onSubmit={handleComplaintSubmit}>
              <div className="form-group">
                <label>Nombre completo*</label>
                <input 
                  type="text" 
                  required 
                  value={user ? user.name : ""}
                  readOnly={!!user}
                />
              </div>
              <div className="form-group">
                <label>Correo electrónico*</label>
                <input 
                  type="email" 
                  required 
                  value={user ? user.email : ""}
                  readOnly={!!user}
                />
              </div>
              <div className="form-group">
                <label>Tu queja o sugerencia*</label>
                <textarea 
                  required 
                  value={complaint}
                  onChange={(e) => setComplaint(e.target.value)}
                  rows="5"
                ></textarea>
              </div>
              <button type="submit" className="submit-complaint-btn">Enviar</button>
            </form>
          </div>
        </div>
      )}

      {/* Confirmación de queja enviada */}
      {complaintSubmitted && (
        <div className="complaint-confirmation">
          <div className="confirmation-content">
            <h2>¡Gracias por tu feedback!</h2>
            <p>Tu queja está siendo verificada por el equipo de Osuna Mobile Store</p>
            <p>Nos pondremos en contacto contigo pronto.</p>
          </div>
        </div>
      )}

      {/* Carrito de compras */}
      {showCart && (
        <div className="modern-cart">
          <div className="cart-header">
            <h2>Tu Carrito</h2>
            <button onClick={() => setShowCart(false)}>×</button>
          </div>
          
          <div className="cart-items">
            {cart.length > 0 ? (
              cart.map((item) => (
                <div key={`${item.name}-${item.selectedColor}`} className="cart-item">
                  <div className="item-info">
                    <img src={item.imgSrc} alt={item.name} />
                    <div>
                      <span className="item-name">{item.name}</span>
                      <span className="item-color">Color: {item.selectedColor}</span>
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.name, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.name, item.quantity + 1)}>+</button>
                      </div>
                    </div>
                  </div>
                  <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))
            ) : (
              <p className="empty-cart">Tu carrito está vacío</p>
            )}
          </div>

          {!user && cart.length > 0 && (
            <div className="auth-required-message">
              <p>Para continuar con tu compra, necesitas iniciar sesión o registrarte</p>
              <div className="auth-links">
                <button 
                  className="auth-link-btn primary"
                  onClick={() => {
                    setShowCart(false);
                    setShowLogin(true);
                  }}
                >
                  Iniciar sesión
                </button>
                <button 
                  className="auth-link-btn secondary"
                  onClick={() => {
                    setShowCart(false);
                    setShowRegister(true);
                  }}
                >
                  Registrarse
                </button>
              </div>
            </div>
          )}

          {cart.length > 0 && (
            <>
              <div className="cart-divider"></div>
              {discountApplied && (
                <div className="discount-applied">
                  <span>Descuento (10%):</span>
                  <span>-${(cartTotal * 0.1).toFixed(2)}</span>
                </div>
              )}
              <div className="cart-total">
                <span>Total:</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
              <div className="cart-divider"></div>
              <div className="discount-code-input">
                <input
                  type="text"
                  placeholder="Código de descuento"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button onClick={applyDiscount}>Aplicar</button>
              </div>
              <button 
                className="checkout-btn"
                onClick={() => {
                  if (!user) {
                    setShowCart(false);
                    setShowLogin(true);
                    alert("Por favor inicia sesión o regístrate para continuar con tu compra");
                  } else {
                    setShowCart(false);
                    setShowCheckout(true);
                  }
                }}
              >
                {user ? "Proceder al pago" : "Iniciar sesión para comprar"}
              </button>
            </>
          )}
        </div>
      )}

      {/* Formulario de pago profesional */}
      {showCheckout && (
        <div className="checkout-overlay">
          <div className="professional-checkout">
            <div className="checkout-header">
              <h2>Finalizar Compra</h2>
              <button onClick={() => setShowCheckout(false)}>×</button>
            </div>
            
            <form onSubmit={handleCheckout}>
              <div className="checkout-grid">
                {/* Columna de información */}
                <div className="checkout-info">
                  <h3>Método de Entrega</h3>
                  <div className="delivery-options">
                    <label className={deliveryMethod === 'recogida' ? 'active' : ''}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'recogida'}
                        onChange={() => setDeliveryMethod('recogida')}
                      />
                      <div className="option-content">
                        <span>Recogida en tienda</span>
                        <small>Recoge tu pedido en nuestra tienda física</small>
                      </div>
                    </label>
                    
                    <label className={deliveryMethod === 'envio' ? 'active' : ''}>
                      <input
                        type="radio"
                        name="delivery"
                        checked={deliveryMethod === 'envio'}
                        onChange={() => setDeliveryMethod('envio')}
                      />
                      <div className="option-content">
                        <span>Envío a domicilio</span>
                        <small>Recibe tu pedido en 2-3 días hábiles</small>
                      </div>
                    </label>
                  </div>

                  {deliveryMethod === 'recogida' && (
                    <div className="store-section">
                      <h3>Selecciona una sucursal</h3>
                      <select
                        value={selectedStore}
                        onChange={(e) => setSelectedStore(e.target.value)}
                        required
                      >
                        <option value="">Selecciona una sucursal</option>
                        {stores.map(store => (
                          <option key={store.id} value={store.id}>
                            {store.name}
                          </option>
                        ))}
                      </select>

                      {selectedStore && (
                        <div className="store-details">
                          <p><strong>Dirección:</strong> {stores.find(s => s.id === parseInt(selectedStore)).address}</p>
                          <p><strong>Teléfono:</strong> {stores.find(s => s.id === parseInt(selectedStore)).phone}</p>
                          <p><strong>Horario:</strong> {stores.find(s => s.id === parseInt(selectedStore)).hours}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {deliveryMethod === 'envio' && (
                    <div className="address-section">
                      <h3>Dirección de Envío</h3>
                      <div className="form-group">
                        <label>Calle y número*</label>
                        <input 
                          type="text" 
                          name="calle"
                          value={address.calle}
                          onChange={handleAddressChange}
                          required 
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Código Postal*</label>
                          <input 
                            type="text" 
                            name="codigoPostal"
                            value={address.codigoPostal}
                            onChange={handleAddressChange}
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>Ciudad*</label>
                          <input 
                            type="text" 
                            name="ciudad"
                            value={address.ciudad}
                            onChange={handleAddressChange}
                            required 
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Provincia*</label>
                        <input 
                          type="text" 
                          name="provincia"
                          value={address.provincia}
                          onChange={handleAddressChange}
                          required 
                        />
                      </div>
                      <div className="form-group">
                        <label>Teléfono de contacto*</label>
                        <input 
                          type="tel" 
                          name="telefono"
                          value={address.telefono}
                          onChange={handleAddressChange}
                          required 
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Columna de pago */}
                <div className="payment-info">
                  <h3>Información de Pago</h3>
                  <div className="form-group">
                    <label>Nombre completo*</label>
                    <input 
                      type="text" 
                      name="name" 
                      value={user ? user.name : ''}
                      readOnly={!!user}
                      required 
                    />
                  </div>
                  <div className="form-group">
                    <label>Correo electrónico*</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={user ? user.email : ''}
                      readOnly={!!user}
                      required 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label>Método de pago*</label>
                    <select 
                      name="paymentMethod" 
                      required 
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="">Seleccione un método</option>
                      <option value="tarjeta">Tarjeta de crédito/débito</option>
                      <option value="paypal">PayPal</option>
                    </select>
                  </div>

                  {paymentMethod === "tarjeta" && (
                    <div className="card-details">
                      <div className="form-group">
                        <label>Número de tarjeta* (16 dígitos)</label>
                        <input 
                          type="text" 
                          name="cardNumber" 
                          pattern="\d{16}"
                          title="Debe contener exactamente 16 dígitos"
                          required 
                        />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Fecha de expiración* (MMAA)</label>
                          <input 
                            type="text" 
                            name="expiryDate" 
                            placeholder="MMAA" 
                            pattern="\d{4}"
                            title="Debe contener 4 dígitos (MMAA)"
                            required 
                          />
                        </div>
                        <div className="form-group">
                          <label>CVV* (3 dígitos)</label>
                          <input 
                            type="text" 
                            name="cvv" 
                            pattern="\d{3}"
                            title="Debe contener 3 dígitos"
                            required 
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {discountApplied && (
                    <div className="discount-applied-checkout">
                      <p>Descuento aplicado: 10% (Código: CBTIS132)</p>
                      <p>Total con descuento: ${finalTotal.toFixed(2)}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="checkout-actions">
                <button 
                  type="button" 
                  className="back-button" 
                  onClick={() => {
                    setShowCheckout(false);
                    setShowCart(true);
                  }}
                >
                  Volver al carrito
                </button>
                <button type="submit" className="pay-button">
                  Confirmar y pagar ${finalTotal.toFixed(2)}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Confirmación de compra */}
      {purchaseData && !showOrderStatus && (
        <div className="purchase-confirmation">
          <div className="confirmation-content">
            <h2>¡Compra realizada con éxito!</h2>
            <div className="order-number">
              Número de pedido: <strong>{purchaseData.orderNumber}</strong>
            </div>
            <div className="confirmation-details">
              <h3>Detalles del pedido:</h3>
              <ul>
                {purchaseData.items.map((item, index) => (
                  <li key={index}>
                    {item.name} (Color: {item.selectedColor}) x{item.quantity} - ${(item.price * item.quantity).toFixed(2)}
                  </li>
                ))}
              </ul>
              {purchaseData.discountCode && (
                <p className="discount-info">
                  Descuento aplicado: {purchaseData.discountAmount} (Código: {purchaseData.discountCode})
                </p>
              )}
              <p className="total">Total: ${purchaseData.total.toFixed(2)}</p>
              <p className="date">Fecha: {purchaseData.date}</p>
              
              {purchaseData.deliveryMethod === "recogida" ? (
                <div className="delivery-info">
                  <h3>Recogida en tienda</h3>
                  <p><strong>Sucursal seleccionada:</strong> {purchaseData.store.name}</p>
                  <p><strong>Dirección:</strong> {purchaseData.store.address}</p>
                  <p><strong>Teléfono:</strong> {purchaseData.store.phone}</p>
                  <p><strong>Horario:</strong> {purchaseData.store.hours}</p>
                  <p className="note">Presenta tu identificación y este número de pedido al recoger.</p>
                </div>
              ) : (
                <div className="delivery-info">
                  <h3>Envío a domicilio</h3>
                  <p>Tu pedido será enviado a:</p>
                  <p className="shipping-address">
                    {purchaseData.address.calle}, {purchaseData.address.codigoPostal}<br />
                    {purchaseData.address.ciudad}, {purchaseData.address.provincia}
                  </p>
                  <p>Teléfono de contacto: {purchaseData.address.telefono}</p>
                  <p className="note">Recibirás un correo con el número de seguimiento.</p>
                </div>
              )}
            </div>
            <div className="confirmation-actions">
              <button 
                className="continue-shopping"
                onClick={() => setPurchaseData(null)}
              >
                Seguir comprando
              </button>
              <button 
                className="track-order-btn"
                onClick={() => setShowOrderStatus(true)}
              >
                Ver estado del pedido
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vista de seguimiento del pedido */}
      {showOrderStatus && purchaseData && (
        <div className="order-status-overlay">
          <div className="order-status-container">
            <button 
              className="close-status-btn" 
              onClick={() => setShowOrderStatus(false)}
            >
              ×
            </button>
            <h2>Seguimiento de tu pedido</h2>
            <div className="order-number-status">
              N° {purchaseData.orderNumber}
            </div>
            
            <div className="status-animation-container">
              <div className="status-progress-bar">
                <div 
                  className="progress-fill"
                  style={{
                    width: orderStatus === "Pago confirmado" ? "20%" :
                           orderStatus === "Preparando tu producto" ? "40%" :
                           orderStatus === "Empaquetando" ? "60%" :
                           orderStatus === "En camino" ? "80%" : "100%"
                  }}
                ></div>
              </div>
              
              <div className="status-steps">
                <div className={`status-step ${orderStatus === "Pago confirmado" ? "active" : ""}`}>
                  <div className="step-icon">✓</div>
                  <div className="step-info">
                    <div className="step-title">Pago confirmado</div>
                    <div className="step-time">Hoy, {new Date().toLocaleTimeString()}</div>
                  </div>
                </div>
                
                <div className={`status-step ${orderStatus === "Preparando tu producto" ? "active" : ""}`}>
                  <div className="step-icon">
                    {["Pago confirmado"].includes(orderStatus) ? "⌛" : "✓"}
                  </div>
                  <div className="step-info">
                    <div className="step-title">Preparando tu producto</div>
                    {orderStatus === "Preparando tu producto" && (
                      <div className="step-time">En progreso...</div>
                    )}
                  </div>
                </div>
                
                <div className={`status-step ${orderStatus === "Empaquetando" ? "active" : ""}`}>
                  <div className="step-icon">
                    {["Pago confirmado", "Preparando tu producto"].includes(orderStatus) ? "⌛" : "✓"}
                  </div>
                  <div className="step-info">
                    <div className="step-title">Empaquetando</div>
                    {orderStatus === "Empaquetando" && (
                      <div className="step-time">En progreso...</div>
                    )}
                  </div>
                </div>
                
                <div className={`status-step ${orderStatus === "En camino" ? "active" : ""}`}>
                  <div className="step-icon">
                    {["Pago confirmado", "Preparando tu producto", "Empaquetando"].includes(orderStatus) ? "⌛" : "✓"}
                  </div>
                  <div className="step-info">
                    <div className="step-title">En camino</div>
                    {orderStatus === "En camino" && (
                      <div className="step-time">En progreso...</div>
                    )}
                  </div>
                </div>
                
                <div className={`status-step ${orderStatus === "Entregado" ? "active" : ""}`}>
                  <div className="step-icon">
                    {orderStatus === "Entregado" ? "✓" : "⌛"}
                  </div>
                  <div className="step-info">
                    <div className="step-title">Entregado</div>
                    {orderStatus === "Entregado" && (
                      <div className="step-time">¡Pedido completado!</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="current-status">
              <div className="status-label">Estado actual:</div>
              <div className="status-value">{orderStatus}</div>
            </div>
            
            <button 
              className="back-to-confirmation"
              onClick={() => setShowOrderStatus(false)}
            >
              Volver a detalles de compra
            </button>
          </div>
        </div>
      )}

      {/* Modales de Autenticación */}
      {showLogin && (
        <div className="auth-modal">
          <div className="auth-content">
            <h2>Iniciar Sesión</h2>
            <button className="close-btn" onClick={() => setShowLogin(false)}>
              ×
            </button>
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  value={loginForm.name}
                  onChange={(e) => setLoginForm({...loginForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="auth-submit-btn">
                Ingresar
              </button>
            </form>
          </div>
        </div>
      )}

      {showRegister && (
        <div className="auth-modal">
          <div className="auth-content">
            <h2>Registrarse</h2>
            <button className="close-btn" onClick={() => setShowRegister(false)}>
              ×
            </button>
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Nombre completo</label>
                <input
                  type="text"
                  value={registerForm.name}
                  onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Correo electrónico</label>
                <input
                  type="email"
                  value={registerForm.email}
                  onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Teléfono</label>
                <input
                  type="tel"
                  value={registerForm.phone}
                  onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contraseña</label>
                <input
                  type="password"
                  value={registerForm.password}
                  onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                  required
                />
              </div>
              <button type="submit" className="auth-submit-btn">
                Registrarse
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;