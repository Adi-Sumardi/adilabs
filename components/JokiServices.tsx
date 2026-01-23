'use client';

import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import {
  FaMobileAlt,
  FaShoppingCart,
  FaUsersCog,
  FaChartLine,
  FaCreditCard,
  FaMapMarkerAlt,
  FaBell,
  FaCloudUploadAlt,
  FaChevronLeft,
  FaChevronRight,
  FaGlobe
} from 'react-icons/fa';

type Language = 'id' | 'en' | 'ar' | 'zh' | 'ja';

interface LanguageOption {
  code: Language;
  name: string;
  flag: string;
}

const languages: LanguageOption[] = [
  { code: 'id', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
];

const translations = {
  id: {
    badge: 'JASA PEMBUATAN APLIKASI',
    title: 'Joki Aplikasi',
    titleHighlight: 'Professional',
    subtitle: 'Solusi cepat & berkualitas untuk kebutuhan development aplikasi Anda',
    startingFrom: 'Mulai dari',
    perFeature: '/fitur',
    popular: 'POPULER',
    orderNow: 'Pesan Sekarang',
    customTitle: 'Butuh Fitur Custom?',
    customSubtitle: 'Konsultasikan kebutuhan aplikasi Anda, kami siap membantu!',
    chatWhatsApp: 'Chat WhatsApp',
    services: [
      {
        title: 'Autentikasi User',
        description: 'Login, Register, Lupa Password, OAuth Social Login',
        features: ['Login & Register', 'Reset Password', 'Google/Facebook Login', 'JWT Token'],
      },
      {
        title: 'Keranjang & Checkout',
        description: 'Sistem keranjang belanja lengkap dengan checkout',
        features: ['Add to Cart', 'Update Quantity', 'Checkout Flow', 'Order Summary'],
      },
      {
        title: 'Payment Gateway',
        description: 'Integrasi pembayaran Midtrans, Xendit, dll',
        features: ['Multi Payment', 'Auto Verification', 'Invoice Generate', 'Payment History'],
      },
      {
        title: 'Dashboard Admin',
        description: 'Panel admin dengan statistik dan manajemen data',
        features: ['Data Analytics', 'CRUD Operations', 'User Management', 'Report Export'],
      },
      {
        title: 'Integrasi Maps',
        description: 'Google Maps, tracking lokasi, geofencing',
        features: ['Location Picker', 'Route Direction', 'Nearby Search', 'Geolocation'],
      },
      {
        title: 'Push Notification',
        description: 'Notifikasi realtime via Firebase/OneSignal',
        features: ['FCM Integration', 'Scheduled Push', 'Topic Subscribe', 'In-App Notif'],
      },
      {
        title: 'Upload & Storage',
        description: 'Upload file, image compression, cloud storage',
        features: ['Multi Upload', 'Image Compress', 'Cloud Storage', 'File Management'],
      },
      {
        title: 'UI/UX Custom',
        description: 'Desain tampilan aplikasi sesuai kebutuhan',
        features: ['Responsive Design', 'Dark Mode', 'Animation', 'Custom Theme'],
      },
    ],
  },
  en: {
    badge: 'APP DEVELOPMENT SERVICE',
    title: 'App Development',
    titleHighlight: 'Professional',
    subtitle: 'Fast & quality solutions for your application development needs',
    startingFrom: 'Starting from',
    perFeature: '/feature',
    popular: 'POPULAR',
    orderNow: 'Order Now',
    customTitle: 'Need Custom Features?',
    customSubtitle: 'Consult your application needs, we are ready to help!',
    chatWhatsApp: 'Chat WhatsApp',
    services: [
      {
        title: 'User Authentication',
        description: 'Login, Register, Forgot Password, OAuth Social Login',
        features: ['Login & Register', 'Reset Password', 'Google/Facebook Login', 'JWT Token'],
      },
      {
        title: 'Cart & Checkout',
        description: 'Complete shopping cart system with checkout',
        features: ['Add to Cart', 'Update Quantity', 'Checkout Flow', 'Order Summary'],
      },
      {
        title: 'Payment Gateway',
        description: 'Payment integration with Stripe, PayPal, etc.',
        features: ['Multi Payment', 'Auto Verification', 'Invoice Generate', 'Payment History'],
      },
      {
        title: 'Admin Dashboard',
        description: 'Admin panel with statistics and data management',
        features: ['Data Analytics', 'CRUD Operations', 'User Management', 'Report Export'],
      },
      {
        title: 'Maps Integration',
        description: 'Google Maps, location tracking, geofencing',
        features: ['Location Picker', 'Route Direction', 'Nearby Search', 'Geolocation'],
      },
      {
        title: 'Push Notification',
        description: 'Realtime notifications via Firebase/OneSignal',
        features: ['FCM Integration', 'Scheduled Push', 'Topic Subscribe', 'In-App Notif'],
      },
      {
        title: 'Upload & Storage',
        description: 'File upload, image compression, cloud storage',
        features: ['Multi Upload', 'Image Compress', 'Cloud Storage', 'File Management'],
      },
      {
        title: 'Custom UI/UX',
        description: 'Application design according to your needs',
        features: ['Responsive Design', 'Dark Mode', 'Animation', 'Custom Theme'],
      },
    ],
  },
  ar: {
    badge: 'خدمة تطوير التطبيقات',
    title: 'تطوير التطبيقات',
    titleHighlight: 'الاحترافي',
    subtitle: 'حلول سريعة وعالية الجودة لاحتياجات تطوير تطبيقاتك',
    startingFrom: 'ابتداءً من',
    perFeature: '/ميزة',
    popular: 'شائع',
    orderNow: 'اطلب الآن',
    customTitle: 'هل تحتاج ميزات مخصصة؟',
    customSubtitle: 'استشر احتياجات تطبيقك، نحن جاهزون للمساعدة!',
    chatWhatsApp: 'واتساب',
    services: [
      {
        title: 'مصادقة المستخدم',
        description: 'تسجيل الدخول، التسجيل، نسيت كلمة المرور، OAuth',
        features: ['تسجيل الدخول', 'إعادة تعيين كلمة المرور', 'Google/Facebook', 'JWT Token'],
      },
      {
        title: 'السلة والدفع',
        description: 'نظام سلة التسوق الكامل مع الدفع',
        features: ['إضافة للسلة', 'تحديث الكمية', 'عملية الدفع', 'ملخص الطلب'],
      },
      {
        title: 'بوابة الدفع',
        description: 'تكامل الدفع مع Stripe و PayPal وغيرها',
        features: ['دفع متعدد', 'تحقق تلقائي', 'إنشاء فاتورة', 'سجل الدفع'],
      },
      {
        title: 'لوحة الإدارة',
        description: 'لوحة إدارة مع إحصائيات وإدارة البيانات',
        features: ['تحليل البيانات', 'عمليات CRUD', 'إدارة المستخدمين', 'تصدير التقارير'],
      },
      {
        title: 'تكامل الخرائط',
        description: 'خرائط جوجل، تتبع الموقع، السياج الجغرافي',
        features: ['اختيار الموقع', 'اتجاه الطريق', 'البحث القريب', 'تحديد الموقع'],
      },
      {
        title: 'إشعارات الدفع',
        description: 'إشعارات فورية عبر Firebase/OneSignal',
        features: ['تكامل FCM', 'دفع مجدول', 'اشتراك الموضوع', 'إشعار داخلي'],
      },
      {
        title: 'الرفع والتخزين',
        description: 'رفع الملفات، ضغط الصور، التخزين السحابي',
        features: ['رفع متعدد', 'ضغط الصور', 'تخزين سحابي', 'إدارة الملفات'],
      },
      {
        title: 'تصميم مخصص',
        description: 'تصميم التطبيق حسب احتياجاتك',
        features: ['تصميم متجاوب', 'الوضع الداكن', 'الرسوم المتحركة', 'سمة مخصصة'],
      },
    ],
  },
  zh: {
    badge: '应用开发服务',
    title: '应用开发',
    titleHighlight: '专业版',
    subtitle: '为您的应用开发需求提供快速优质的解决方案',
    startingFrom: '起价',
    perFeature: '/功能',
    popular: '热门',
    orderNow: '立即订购',
    customTitle: '需要定制功能？',
    customSubtitle: '咨询您的应用需求，我们随时为您服务！',
    chatWhatsApp: 'WhatsApp咨询',
    services: [
      {
        title: '用户认证',
        description: '登录、注册、忘记密码、OAuth社交登录',
        features: ['登录注册', '重置密码', 'Google/Facebook登录', 'JWT令牌'],
      },
      {
        title: '购物车结账',
        description: '完整的购物车系统与结账功能',
        features: ['添加购物车', '更新数量', '结账流程', '订单摘要'],
      },
      {
        title: '支付网关',
        description: '集成支付宝、微信支付等',
        features: ['多种支付', '自动验证', '发票生成', '支付记录'],
      },
      {
        title: '管理后台',
        description: '带有统计和数据管理的管理面板',
        features: ['数据分析', 'CRUD操作', '用户管理', '报告导出'],
      },
      {
        title: '地图集成',
        description: '谷歌地图、位置追踪、地理围栏',
        features: ['位置选择', '路线导航', '附近搜索', '地理定位'],
      },
      {
        title: '推送通知',
        description: '通过Firebase/OneSignal实时通知',
        features: ['FCM集成', '定时推送', '主题订阅', '应用内通知'],
      },
      {
        title: '上传存储',
        description: '文件上传、图片压缩、云存储',
        features: ['多文件上传', '图片压缩', '云存储', '文件管理'],
      },
      {
        title: '定制UI/UX',
        description: '根据您的需求设计应用界面',
        features: ['响应式设计', '深色模式', '动画效果', '自定义主题'],
      },
    ],
  },
  ja: {
    badge: 'アプリ開発サービス',
    title: 'アプリ開発',
    titleHighlight: 'プロフェッショナル',
    subtitle: 'アプリ開発ニーズに迅速で高品質なソリューションを提供',
    startingFrom: '価格',
    perFeature: '/機能',
    popular: '人気',
    orderNow: '今すぐ注文',
    customTitle: 'カスタム機能が必要ですか？',
    customSubtitle: 'アプリのニーズをご相談ください。お手伝いする準備ができています！',
    chatWhatsApp: 'WhatsAppで相談',
    services: [
      {
        title: 'ユーザー認証',
        description: 'ログイン、登録、パスワード忘れ、OAuthソーシャルログイン',
        features: ['ログイン・登録', 'パスワードリセット', 'Google/Facebookログイン', 'JWTトークン'],
      },
      {
        title: 'カート・チェックアウト',
        description: 'チェックアウト機能を備えた完全なショッピングカートシステム',
        features: ['カートに追加', '数量更新', 'チェックアウトフロー', '注文概要'],
      },
      {
        title: '決済ゲートウェイ',
        description: 'Stripe、PayPalなどとの決済統合',
        features: ['マルチ決済', '自動検証', '請求書生成', '決済履歴'],
      },
      {
        title: '管理ダッシュボード',
        description: '統計とデータ管理を備えた管理パネル',
        features: ['データ分析', 'CRUD操作', 'ユーザー管理', 'レポート出力'],
      },
      {
        title: 'マップ統合',
        description: 'Googleマップ、位置追跡、ジオフェンシング',
        features: ['位置選択', 'ルート案内', '近くの検索', 'ジオロケーション'],
      },
      {
        title: 'プッシュ通知',
        description: 'Firebase/OneSignalによるリアルタイム通知',
        features: ['FCM統合', 'スケジュールプッシュ', 'トピック購読', 'アプリ内通知'],
      },
      {
        title: 'アップロード・ストレージ',
        description: 'ファイルアップロード、画像圧縮、クラウドストレージ',
        features: ['マルチアップロード', '画像圧縮', 'クラウドストレージ', 'ファイル管理'],
      },
      {
        title: 'カスタムUI/UX',
        description: 'ニーズに合わせたアプリケーションデザイン',
        features: ['レスポンシブデザイン', 'ダークモード', 'アニメーション', 'カスタムテーマ'],
      },
    ],
  },
};

const serviceConfigs = [
  { icon: FaUsersCog, price: '2.5Jt', color: 'from-blue-500 to-blue-700' },
  { icon: FaShoppingCart, price: '3.5Jt', color: 'from-amber-500 to-orange-600', popular: true },
  { icon: FaCreditCard, price: '5Jt', color: 'from-green-500 to-emerald-600' },
  { icon: FaChartLine, price: '7.5Jt', color: 'from-purple-500 to-indigo-600', popular: true },
  { icon: FaMapMarkerAlt, price: '4Jt', color: 'from-red-500 to-rose-600' },
  { icon: FaBell, price: '2Jt', color: 'from-cyan-500 to-teal-600' },
  { icon: FaCloudUploadAlt, price: '2Jt', color: 'from-indigo-500 to-blue-600' },
  { icon: FaMobileAlt, price: '3Jt', color: 'from-pink-500 to-rose-600' },
];

export default function JokiServices() {
  const ref = useRef(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState<Language>('en');
  const [showLangMenu, setShowLangMenu] = useState(false);

  const t = translations[language];
  const isRTL = language === 'ar';

  const scroll = (direction: 'left' | 'right') => {
    if (sliderRef.current) {
      const cardWidth = 320;
      const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });

      const newIndex = direction === 'left'
        ? Math.max(0, currentIndex - 1)
        : Math.min(serviceConfigs.length - 1, currentIndex + 1);
      setCurrentIndex(newIndex);
    }
  };

  return (
    <section
      id="joki-services"
      className="py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
      ref={ref}
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Language Selector */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all duration-300"
            >
              <FaGlobe className="text-amber-400" />
              <span>{languages.find(l => l.code === language)?.flag}</span>
              <span className="text-sm">{languages.find(l => l.code === language)?.name}</span>
            </button>

            {showLangMenu && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 mt-2 py-2 w-48 bg-slate-800 rounded-xl shadow-xl border border-slate-700 z-50"
              >
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => {
                      setLanguage(lang.code);
                      setShowLangMenu(false);
                    }}
                    className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-slate-700 transition-colors ${
                      language === lang.code ? 'bg-slate-700 text-amber-400' : 'text-white'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span>{lang.name}</span>
                  </button>
                ))}
              </motion.div>
            )}
          </div>
        </div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-full text-amber-400 text-sm font-semibold mb-4">
            {t.badge}
          </span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 text-white">
            {t.title}
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent"> {t.titleHighlight}</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-2">
            {t.subtitle}
          </p>
          <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
            <span className="text-2xl sm:text-3xl font-bold text-white">{t.startingFrom}</span>
            <span className="text-3xl sm:text-5xl font-black bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              Rp 2.000.000
            </span>
            <span className="text-lg sm:text-xl text-slate-400">{t.perFeature}</span>
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full mt-6" />
        </motion.div>

        {/* Slider Navigation */}
        <div className={`flex gap-2 mb-6 ${isRTL ? 'justify-start' : 'justify-end'}`}>
          <button
            onClick={() => scroll('left')}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
            aria-label="Scroll left"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={() => scroll('right')}
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all duration-300 hover:scale-110"
            aria-label="Scroll right"
          >
            <FaChevronRight />
          </button>
        </div>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="flex gap-6 overflow-x-auto pt-4 pb-6 snap-x snap-mandatory scrollbar-hide"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {serviceConfigs.map((config, index) => {
            const service = t.services[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex-shrink-0 w-[300px] snap-start"
              >
                <div className={`relative h-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 border border-slate-700 hover:border-amber-500/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-amber-500/20 ${config.popular ? 'ring-2 ring-amber-500' : ''}`}>
                  {/* Popular Badge */}
                  {config.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="px-4 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full whitespace-nowrap">
                        {t.popular}
                      </span>
                    </div>
                  )}

                  {/* Icon */}
                  <div className={`w-14 h-14 bg-gradient-to-br ${config.color} rounded-xl flex items-center justify-center mb-4 transform hover:scale-110 transition-transform duration-300`}>
                    <config.icon className="text-white text-2xl" />
                  </div>

                  {/* Title & Price */}
                  <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                  <div className="flex items-baseline gap-1 mb-3">
                    <span className="text-sm text-slate-400">Rp</span>
                    <span className={`text-3xl font-black bg-gradient-to-r ${config.color} bg-clip-text text-transparent`}>
                      {config.price}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-slate-400 text-sm mb-4">{service.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-slate-300">
                        <span className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${config.color}`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <a
                    href="#contact"
                    className={`block w-full py-3 text-center rounded-xl font-semibold transition-all duration-300 ${
                      config.popular
                        ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:shadow-amber-500/50'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    }`}
                  >
                    {t.orderNow}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-6">
          {serviceConfigs.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (sliderRef.current) {
                  sliderRef.current.scrollTo({ left: index * 320, behavior: 'smooth' });
                  setCurrentIndex(index);
                }
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex ? 'w-8 bg-amber-500' : 'bg-slate-600 hover:bg-slate-500'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 p-8 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl border border-amber-500/20"
        >
          <h3 className="text-2xl font-bold text-white mb-2">{t.customTitle}</h3>
          <p className="text-slate-400 mb-6">
            {t.customSubtitle}
          </p>
          <a
            href="https://wa.me/6281234567890?text=Hello,%20I%20am%20interested%20in%20app%20development%20services"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-full hover:shadow-2xl hover:shadow-green-500/50 transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            {t.chatWhatsApp}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
