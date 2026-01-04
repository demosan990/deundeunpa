/* ===========================================
   정이든 마케팅 - Data Management
   localStorage 기반 동적 데이터 관리
   =========================================== */

// ===== 초기 샘플 데이터 =====

const DEFAULT_PORTFOLIOS = [
  {
    id: 1,
    title: '퍼스널 브랜딩 기반 온라인 강의 시스템 구축',
    category: 'lesson-coaching',
    categoryLabel: '레슨 및 코칭',
    client: '김민준 강사 (영어회화)',
    description: '영어회화 전문 강사를 위한 퍼스널 브랜딩 및 온라인 강의 시스템 구축. 수강생 관리부터 콘텐츠 배포, 자동화 마케팅까지 원스톱 솔루션 제공.',
    challenge: '수강생 증가에 따른 문의 응대 및 콘텐츠 관리 업무 과부하',
    solution: 'AI 챗봇 + 자동 이메일 시퀀스 + 콘텐츠 관리 시스템 구축',
    results: [
      { label: '수강생 증가', value: '150%' },
      { label: '업무 시간 절감', value: '80%' },
      { label: '재등록률', value: '67%' }
    ],
    testimonial: '비개발자인 저도 자동화 시스템을 직접 만들 수 있게 됐습니다.',
    image: 'assets/images/portfolio/lesson-coaching.jpg',
    featured: true,
    createdAt: '2025-09-15'
  },
  {
    id: 2,
    title: '예약-상담-후속 관리 CRM 구축',
    category: 'counselor',
    categoryLabel: '상담가',
    client: '이서연 상담사',
    description: '사주 상담 예약부터 상담 후 후속 관리까지 전 과정을 자동화. 고객별 상담 이력을 체계적으로 관리하고, 주기적인 운세 알림으로 재방문 유도.',
    challenge: '수기 예약 관리로 인한 일정 충돌 및 고객 이탈',
    solution: '온라인 예약 시스템 + 상담 CRM + 자동 리마인드 메시지',
    results: [
      { label: '재방문율 상승', value: '3배' },
      { label: '예약 노쇼 감소', value: '95%' },
      { label: '월 매출 증가', value: '180%' }
    ],
    testimonial: 'AI 자동화로 상담 예약부터 후속 관리까지 자동화되니, 본업에 집중할 수 있게 됐어요.',
    image: 'assets/images/portfolio/counselor.jpg',
    featured: true,
    createdAt: '2025-10-20'
  },
  {
    id: 3,
    title: '지역 특산물 온라인 판매 채널 구축',
    category: 'small-business',
    categoryLabel: '소상공인',
    client: '박승호 대표 (미더덕&오만둥이)',
    description: '경남 지역 특산물인 미더덕과 오만둥이를 전국에 판매할 수 있는 온라인 채널 구축. 스마트스토어, 쿠팡, 자사몰까지 통합 운영.',
    challenge: '오프라인 중심 판매로 인한 지역 한계',
    solution: '스마트스토어 + 쿠팡 입점 + SNS 마케팅 + 주문/배송 자동화',
    results: [
      { label: '월 매출 증가', value: '200%' },
      { label: '전국 고객 확보', value: '17개 시도' },
      { label: '재구매율', value: '45%' }
    ],
    testimonial: '지역 특산물을 전국에 판매하게 된 것은 정이든 마케팅 덕분입니다.',
    image: 'assets/images/portfolio/small-business.jpg',
    featured: true,
    createdAt: '2025-11-05'
  },
  {
    id: 4,
    title: 'B2B 영업 파이프라인 자동화',
    category: 'sales',
    categoryLabel: '영업직',
    client: '최영진 팀장',
    description: '리드 발굴부터 계약 체결까지 영업 파이프라인 전 과정을 자동화. 잠재고객 관리와 후속 연락을 체계화하여 성과 극대화.',
    challenge: 'Excel 기반 관리로 인한 리드 누락 및 후속 관리 실패',
    solution: 'CRM 도입 + 자동 이메일 시퀀스 + 영업 대시보드',
    results: [
      { label: '계약 성사율', value: '+45%' },
      { label: '리드 응답 시간', value: '1시간 이내' },
      { label: '분기 매출', value: '2.3배' }
    ],
    testimonial: '체계적인 파이프라인 관리로 놓치는 고객이 없어졌습니다.',
    image: 'assets/images/portfolio/sales.jpg',
    featured: false,
    createdAt: '2025-12-01'
  }
];

const DEFAULT_SERVICES = [
  {
    id: 1,
    title: 'CRM 구축',
    icon: '🔧',
    shortDesc: '고객관리 자동화 시스템',
    description: '잠재고객 발굴부터 충성고객 관리까지, 비즈니스에 최적화된 CRM 시스템을 구축합니다. 반복적인 업무를 자동화하여 본업에 집중할 수 있는 환경을 만들어드립니다.',
    features: [
      '고객 데이터베이스 설계 및 구축',
      '자동 이메일/문자 시퀀스',
      '파이프라인 시각화 대시보드',
      '리포트 자동 생성'
    ],
    benefits: ['업무시간 70% 절감', '고객 이탈 방지', '재구매율 상승']
  },
  {
    id: 2,
    title: 'AI와 바이브코딩 교육',
    icon: '🎓',
    shortDesc: '비개발자를 위한 AI 활용 교육',
    description: '코딩을 몰라도 AI와 노코드 도구를 활용해 나만의 자동화 시스템을 만들 수 있습니다. 실습 중심의 교육으로 바로 현업에 적용 가능합니다.',
    features: [
      'ChatGPT 프롬프트 엔지니어링',
      '노코드/로우코드 도구 활용',
      '자동화 워크플로우 설계',
      '실전 프로젝트 제작'
    ],
    benefits: ['2주 만에 자동화 시스템 구축', '비개발자도 가능', '평생 활용 가능한 스킬']
  },
  {
    id: 3,
    title: '온라인 BM 컨설팅',
    icon: '💡',
    shortDesc: '비즈니스 모델 설계 및 최적화',
    description: '오프라인 중심의 비즈니스를 온라인으로 확장하거나, 기존 온라인 비즈니스를 최적화합니다. 수익 구조 설계부터 실행까지 함께합니다.',
    features: [
      '비즈니스 모델 진단',
      '온라인 확장 전략 수립',
      '수익 다각화 설계',
      '실행 로드맵 제공'
    ],
    benefits: ['신규 수익원 창출', '확장성 확보', '리스크 분산']
  },
  {
    id: 4,
    title: '온라인 마케팅 대행',
    icon: '📈',
    shortDesc: 'SNS/광고/콘텐츠 마케팅',
    description: '타겟 고객에게 효과적으로 도달하는 온라인 마케팅을 대행합니다. 콘텐츠 기획부터 광고 운영, 성과 분석까지 풀 서비스를 제공합니다.',
    features: [
      'SNS 채널 운영 (인스타그램, 유튜브 등)',
      '퍼포먼스 광고 (메타, 구글)',
      '콘텐츠 마케팅 전략',
      '데이터 기반 최적화'
    ],
    benefits: ['전문가 운영으로 효율 극대화', '데이터 기반 의사결정', '마케팅 비용 ROI 개선']
  }
];

const DEFAULT_TESTIMONIALS = [
  {
    id: 1,
    name: '김민준',
    role: 'AI 강사',
    content: 'AI 자동화로 상담 예약부터 후속 관리까지 자동화되니, 본업에 집중할 수 있게 됐어요. 수강생 관리가 정말 편해졌습니다.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    rating: 5
  },
  {
    id: 2,
    name: '이서연',
    role: '사주상담가',
    content: '바이브코딩 교육 덕분에 비개발자인 저도 CRM을 직접 만들 수 있게 됐습니다. 상담 이력 관리가 체계화되어 고객 만족도가 높아졌어요.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    rating: 5
  },
  {
    id: 3,
    name: '박승호',
    role: '미더덕&오만둥이 대표',
    content: '지역 특산물을 전국에 판매하게 된 것은 정이든 마케팅 덕분입니다. 온라인 채널 구축부터 마케팅까지 든든한 파트너입니다.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    rating: 5
  }
];

const DEFAULT_STATS = [
  { id: 1, value: 47, suffix: '+', label: '누적 고객사' },
  { id: 2, value: 156, suffix: '%', label: '평균 매출 성장률' },
  { id: 3, value: 4.9, suffix: '/5.0', label: '고객 만족도' },
  { id: 4, value: 89, suffix: '%', label: '재계약률' }
];

// ===== 데이터 관리 클래스 =====

class DataManager {
  constructor() {
    this.STORAGE_KEYS = {
      portfolios: 'jeid_portfolios',
      services: 'jeid_services',
      testimonials: 'jeid_testimonials',
      stats: 'jeid_stats',
      inquiries: 'jeid_inquiries',
      adminAuth: 'jeid_admin_auth'
    };

    this.initializeData();
  }

  // 초기 데이터 설정
  initializeData() {
    if (!this.getData('portfolios')) {
      this.setData('portfolios', DEFAULT_PORTFOLIOS);
    }
    if (!this.getData('services')) {
      this.setData('services', DEFAULT_SERVICES);
    }
    if (!this.getData('testimonials')) {
      this.setData('testimonials', DEFAULT_TESTIMONIALS);
    }
    if (!this.getData('stats')) {
      this.setData('stats', DEFAULT_STATS);
    }
    if (!this.getData('inquiries')) {
      this.setData('inquiries', []);
    }
  }

  // 데이터 조회
  getData(key) {
    try {
      const data = localStorage.getItem(this.STORAGE_KEYS[key]);
      return data ? JSON.parse(data) : null;
    } catch (e) {
      console.error('Data read error:', e);
      return null;
    }
  }

  // 데이터 저장
  setData(key, data) {
    try {
      localStorage.setItem(this.STORAGE_KEYS[key], JSON.stringify(data));
      return true;
    } catch (e) {
      console.error('Data save error:', e);
      return false;
    }
  }

  // ===== 포트폴리오 관리 =====

  getPortfolios() {
    return this.getData('portfolios') || [];
  }

  getPortfolioById(id) {
    const portfolios = this.getPortfolios();
    return portfolios.find(p => p.id === id);
  }

  getPortfoliosByCategory(category) {
    const portfolios = this.getPortfolios();
    if (category === 'all') return portfolios;
    return portfolios.filter(p => p.category === category);
  }

  getFeaturedPortfolios() {
    const portfolios = this.getPortfolios();
    return portfolios.filter(p => p.featured);
  }

  addPortfolio(portfolio) {
    const portfolios = this.getPortfolios();
    const newId = portfolios.length > 0 ? Math.max(...portfolios.map(p => p.id)) + 1 : 1;
    const newPortfolio = {
      ...portfolio,
      id: newId,
      createdAt: new Date().toISOString().split('T')[0]
    };
    portfolios.unshift(newPortfolio);
    this.setData('portfolios', portfolios);
    return newPortfolio;
  }

  updatePortfolio(id, updates) {
    const portfolios = this.getPortfolios();
    const index = portfolios.findIndex(p => p.id === id);
    if (index !== -1) {
      portfolios[index] = { ...portfolios[index], ...updates };
      this.setData('portfolios', portfolios);
      return portfolios[index];
    }
    return null;
  }

  deletePortfolio(id) {
    const portfolios = this.getPortfolios();
    const filtered = portfolios.filter(p => p.id !== id);
    this.setData('portfolios', filtered);
    return true;
  }

  // ===== 서비스 관리 =====

  getServices() {
    return this.getData('services') || [];
  }

  getServiceById(id) {
    const services = this.getServices();
    return services.find(s => s.id === id);
  }

  // ===== 후기 관리 =====

  getTestimonials() {
    return this.getData('testimonials') || [];
  }

  // ===== 통계 관리 =====

  getStats() {
    return this.getData('stats') || [];
  }

  // ===== 문의 관리 =====

  getInquiries() {
    return this.getData('inquiries') || [];
  }

  addInquiry(inquiry) {
    const inquiries = this.getInquiries();
    const newInquiry = {
      ...inquiry,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: 'pending'
    };
    inquiries.unshift(newInquiry);
    this.setData('inquiries', inquiries);
    return newInquiry;
  }

  // ===== 관리자 인증 =====

  // 간단한 비밀번호 인증 (실제 프로덕션에서는 서버 기반 인증 필요)
  ADMIN_PASSWORD = 'jeid2025';

  login(password) {
    if (password === this.ADMIN_PASSWORD) {
      sessionStorage.setItem(this.STORAGE_KEYS.adminAuth, 'true');
      return true;
    }
    return false;
  }

  logout() {
    sessionStorage.removeItem(this.STORAGE_KEYS.adminAuth);
  }

  isAuthenticated() {
    return sessionStorage.getItem(this.STORAGE_KEYS.adminAuth) === 'true';
  }

  // ===== 데이터 초기화 (개발용) =====

  resetToDefaults() {
    this.setData('portfolios', DEFAULT_PORTFOLIOS);
    this.setData('services', DEFAULT_SERVICES);
    this.setData('testimonials', DEFAULT_TESTIMONIALS);
    this.setData('stats', DEFAULT_STATS);
    this.setData('inquiries', []);
  }
}

// 전역 인스턴스 생성
const dataManager = new DataManager();

// ES6 모듈 환경이 아닌 경우를 위해 window에도 할당
if (typeof window !== 'undefined') {
  window.dataManager = dataManager;
}
