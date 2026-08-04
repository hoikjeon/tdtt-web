import {
  Camera,
  Code,
  Globe,
  MessageSquare,
  Newspaper,
  Plane,
  Search,
  Share2,
  Smartphone,
  Star,
  Target,
  Video,
  type LucideIcon,
} from "lucide-react";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: LucideIcon;
  color: string;
  size: "small" | "medium" | "large";
  isApp?: boolean;
}

export const services: ServiceItem[] = [
  {
    id: "db-ad",
    title: "DB 마케팅 광고",
    description: "최저가로 확보하는 유효 가망 고객 리스트",
    detail: "광고 매체별 데이터를 분석하여 가장 저렴한 비용으로 실제 내원 확률이 높은 고객을 발굴합니다.",
    icon: Target,
    color: "#f56565",
    size: "large",
  },
  {
    id: "monitoring-app",
    title: "프로그램 개발",
    description: "병원 실무 효율을 높이는 맞춤 도구 제작",
    detail: "마케팅 효율 측정기부터 예약 연동 툴까지 필요한 모든 솔루션을 직접 개발해 드립니다.",
    icon: Code,
    color: "#2d3748",
    size: "large",
    isApp: true,
  },
  {
    id: "youtube",
    title: "유튜브 촬영 & 편집",
    description: "전문 장비와 기획으로 완성되는 고품질 영상",
    detail: "단순히 대본만 쓰는 것이 아닙니다. 환자가 궁금해하는 질문과 원장님의 전문성을 연결하여, 신뢰도가 200% 상승하는 '전문가용 시나리오'를 구성합니다.",
    icon: Video,
    color: "#ff0000",
    size: "medium",
  },
  {
    id: "hospital-photo",
    title: "병원 원내 촬영 및 프로필 촬영",
    description: "신뢰감을 주는 의료진 프로필과 생동감 넘치는 원내 시설 촬영",
    detail: "매주 현장 출근 시 전문 장비를 활용하여 환자들에게 신뢰를 주는 고퀄리티 프로필 이미지와 병원의 생생한 현장감을 담아냅니다.",
    icon: Camera,
    color: "#6b46c1",
    size: "medium",
  },
  {
    id: "blog",
    title: "지역 타겟 블로그",
    description: "지역 환자의 발길을 이끄는 전략적 검색 최적화",
    detail: "원장님의 주력 진료 과목을 검색 결과 상단에 확실하게 노출시킵니다. 기계적인 단순 발행이 아닌, 지역 환자들에게 병원의 전문성이 가장 먼저 닿을 수 있도록 최적화된 브랜드 블로그를 운영합니다.",
    icon: MessageSquare,
    color: "#2db400",
    size: "small",
  },
  {
    id: "news",
    title: "뉴스 기사 배포",
    description: "신뢰도 높은 언론 보도를 통한 브랜드 권위 형성",
    detail: "주요 포털 매거진 및 기획 기사 송출을 통해 병원의 신뢰도와 브랜딩을 강화합니다.",
    icon: Newspaper,
    color: "#4a5568",
    size: "small",
  },
  {
    id: "web",
    title: "홈페이지 제작",
    description: "전환율에 최적화된 고속 로딩 웹사이트",
    detail: "단순한 디자인을 넘어 예약 시스템과 데이터 추적이 완벽하게 결합된 웹 환경을 구축합니다.",
    icon: Globe,
    color: "#38b2ac",
    size: "small",
  },
  {
    id: "sns",
    title: "SNS 광고/운영",
    description: "인스타그램/페이스북 맞춤형 타겟 전략",
    detail: "지역 타겟팅 and 관심사 분석을 통해 잠재 환자에게 가장 효과적으로 브랜드를 노출합니다.",
    icon: Share2,
    color: "#e1306c",
    size: "small",
  },
  {
    id: "review",
    title: "리뷰 관리 솔루션",
    description: "네이버 플레이스 리뷰 모니터링 및 답변 관리",
    detail: "방문자 리뷰와 환자 피드백을 실시간으로 확인하고 진정성 있는 답변으로 병원의 온라인 평판을 세심하게 관리합니다.",
    icon: Star,
    color: "#03C75A",
    size: "small",
  },
  {
    id: "program",
    title: "전용 모니터링 앱",
    description: "실시간 데이터 및 마케팅 현황 확인",
    detail: "직접 개발한 전용 앱을 통해 마케팅 성과와 환자 유입 현황을 언제 어디서나 투명하게 모니터링하세요.",
    icon: Smartphone,
    color: "#3385ff",
    size: "small",
  },
  {
    id: "ai-search",
    title: "AI 검색 최적화",
    description: "ChatGPT, 네이버 등 AI 검색 시대 필수 전략",
    detail: "단순 키워드 노출을 넘어 AI가 학습하고 추천하는 병원이 되도록 알고리즘 최적화를 선점합니다.",
    icon: Search,
    color: "#FF5733",
    size: "small",
  },
  {
    id: "drone",
    title: "드론 촬영",
    description: "전경 및 지역 조망 시각화",
    detail: "병원의 위치적 강점과 스케일을 보여주는 드론 4K 항공 촬영을 지원합니다.",
    icon: Plane,
    color: "#3182ce",
    size: "small",
  },
];
