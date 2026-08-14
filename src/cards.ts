import { Card, Methodology, ProjectTarget } from './types';

export const METHODOLOGIES: Methodology[] = [
  {
    id: 'AGILE',
    name: '애자일 (Agile)',
    description: '유연한 스프린트와 소통 중시. 팀 사기와 품질 보정이 높으나, 일정이 더 타이트해질 수 있습니다. (시작: 사기 +10, 품질 +5, 일정 -5)',
    startingModifiers: [0, -5, 10, 5]
  },
  {
    id: 'WATERFALL',
    name: '폭포수 (Waterfall)',
    description: '철저한 계획과 단계별 문서화. 예산과 일정 통제에 유리하지만, 품질 변경 및 사기 저하 대응이 늦습니다. (시작: 예산 +10, 일정 +10, 사기 -10, 품질 -10)',
    startingModifiers: [10, 10, -10, -10]
  },
  {
    id: 'DEVOPS',
    name: '데브옵스 (DevOps / CI-CD)',
    description: '자동화와 지속적 통합 배포. 장기 품질과 일정에 큰 도움이 되지만, 초기에 큰 예산이 소요됩니다. (시작: 예산 -15, 일정 +5, 사기 +5, 품질 +15)',
    startingModifiers: [-15, 5, 5, 15]
  }
];

export const TARGETS: ProjectTarget[] = [
  {
    id: 'MVP',
    name: 'MVP 출시 (20턴 생존)',
    description: '최소한의 핵심 기능으로 빠르게 시장 검증을 마칩니다. 난이도가 평이하며 생존 목표가 비교적 짧습니다.',
    victoryTurns: 20,
    startingModifiers: [0, 5, 0, -5]
  },
  {
    id: 'ENTERPRISE',
    name: '엔터프라이즈 전환 (30턴 생존)',
    description: '까다로운 대기업 고객사 요구사항과 보안 표준을 맞춰야 합니다. 안정적인 품질과 일정 관리가 생명입니다.',
    victoryTurns: 30,
    startingModifiers: [-10, -5, -5, 10]
  },
  {
    id: 'UNICORN',
    name: '유니콘 스타트업 (40턴 생존)',
    description: '빠른 스케일업과 투자 유치, 끝없는 기능 확장을 요구받습니다. 모든 자원에 엄청난 압박이 가해집니다.',
    victoryTurns: 40,
    startingModifiers: [10, -15, -10, -5]
  }
];

export const CARDS: Card[] = [
  {
    id: 'card_01',
    character: '김개발 시니어',
    role: '리드 개발자',
    avatar: '👨‍💻',
    dialogue: '"테스트 코드를 작성할 시간이 부족해요. 이번 스프린트에서는 단위 테스트를 건너뛸까요?"',
    leftChoice: {
      text: "건너뛰고 릴리즈하자",
      effects: { budget: 5, scheduleSlack: 15, teamMorale: 10, quality: -20 },
      logText: "일정을 맞추기 위해 테스트 코드를 건너뛰기로 타협했습니다."
    },
    rightChoice: {
      text: "품질이 우선이다, 작성해라",
      effects: { budget: -5, scheduleSlack: -15, teamMorale: -10, quality: 20 },
      logText: "스프린트 일정이 밀리더라도 튼튼한 품질을 위해 단위 테스트를 사수했습니다."
    }
  },
  {
    id: 'card_02',
    character: '박기획 파트장',
    role: 'PM',
    avatar: '👩‍💼',
    dialogue: '"경쟁사에서 신기능을 출시했어요! 우리도 주말을 반납하고 긴급 추가 스펙을 개발해야 합니다."',
    leftChoice: {
      text: "주말 출근 승인!",
      effects: { budget: -10, scheduleSlack: 10, teamMorale: -25, quality: 5 },
      logText: "스펙 경쟁을 위해 팀원들을 야근과 주말 출근으로 내몰았습니다."
    },
    rightChoice: {
      text: "일정 준수가 먼저다. 거절",
      effects: { budget: 5, scheduleSlack: -5, teamMorale: 15, quality: -10 },
      logText: "팀의 번아웃을 막기 위해 무리한 무임 스펙 확장을 차단했습니다."
    }
  },
  {
    id: 'card_03',
    character: '최영업 상무',
    role: '영업본부장',
    avatar: '🤵',
    dialogue: '"고객사 요구사항인데, 다음 달까지 커스텀 연동 기능을 넣어주면 추가 계약금을 받기로 했습니다."',
    leftChoice: {
      text: "수용하고 예산 챙기자",
      effects: { budget: 25, scheduleSlack: -20, teamMorale: -15, quality: -10 },
      logText: "풍족한 예산을 확보했지만 커스텀 개발로 일정 부담과 코드 스파게티화가 깊어졌습니다."
    },
    rightChoice: {
      text: "기존 로드맵을 사수하자",
      effects: { budget: -15, scheduleSlack: 10, teamMorale: 10, quality: 5 },
      logText: "눈앞의 영업 이익보다 제품의 아키텍처와 로드맵 일관성을 사수했습니다."
    }
  },
  {
    id: 'card_04',
    character: '이인프 팀장',
    role: '데브옵스 엔지니어',
    avatar: '🚀',
    dialogue: '"클라우드 서버 비용이 너무 많이 나와요. 인프라 모니터링 주기를 늘리고 사양을 낮출까요?"',
    leftChoice: {
      text: "서버 비용을 아끼자",
      effects: { budget: 20, scheduleSlack: 0, teamMorale: -5, quality: -15 },
      logText: "클라우드 스펙을 낮췄으나, 서버 순간 트래픽 폭주 대처 능력이 약화되었습니다."
    },
    rightChoice: {
      text: "성능과 안정성이 우선",
      effects: { budget: -20, scheduleSlack: 5, teamMorale: 5, quality: 15 },
      logText: "비용 부담은 늘었지만 고가용성 인프라와 강력한 모니터링 환경을 지켰습니다."
    }
  },
  {
    id: 'card_05',
    character: '이디자 대리',
    role: 'UI/UX 디자이너',
    avatar: '🎨',
    dialogue: '"새로운 로고와 다크 모드 인터페이스를 전면 적용하면 앱 세련미가 엄청 올라갈 것 같아요!"',
    leftChoice: {
      text: "와우! 당장 적용해!",
      effects: { budget: -10, scheduleSlack: -15, teamMorale: 10, quality: 15 },
      logText: "다크모드 출시로 유저 반응과 품질 체감은 극상이나, 프론트 마크업 수정으로 일정이 날아갔습니다."
    },
    rightChoice: {
      text: "시간 낭비야, 나중에 하자",
      effects: { budget: 5, scheduleSlack: 10, teamMorale: -10, quality: -5 },
      logText: "디자인 리뉴얼 제안을 반려하여 디자인 팀원들의 사기가 저하되었습니다."
    }
  },
  {
    id: 'card_06',
    character: '김대표 대표',
    role: 'CEO',
    avatar: '🦁',
    dialogue: '"대규모 시드 투자가 유치되었네! 일부를 우리 개발팀 복지 증진과 장비 교체에 써도 좋아!"',
    leftChoice: {
      text: "장비와 모션데스크 지원!",
      effects: { budget: -20, scheduleSlack: 0, teamMorale: 25, quality: 5 },
      logText: "맥북 프로 최신형과 모션데스크 보급으로 개발팀 전원의 전투력이 상승했습니다!"
    },
    rightChoice: {
      text: "전부 마케팅 예산으로!",
      effects: { budget: 15, scheduleSlack: -5, teamMorale: -15, quality: -5 },
      logText: "복지 대신 광고에 예산을 쏟자, 개발팀은 허무함과 차가운 현실을 느꼈습니다."
    }
  },
  {
    id: 'card_07',
    character: '정품질 대리',
    role: 'QA 담당자',
    avatar: '🔍',
    dialogue: '"수동 테스트에서 결함이 너무 많이 나와요. 자동화 테스트 도구를 전면 도입해 주세요!"',
    leftChoice: {
      text: "자동화 라이센스 결제!",
      effects: { budget: -15, scheduleSlack: -10, teamMorale: 10, quality: 20 },
      logText: "QA 자동화 도입으로 결함 조기 발견율과 코드 품질이 훌륭하게 강화되었습니다."
    },
    rightChoice: {
      text: "손으로 한 땀 한 땀 검수해라",
      effects: { budget: 10, scheduleSlack: 5, teamMorale: -15, quality: -15 },
      logText: "수동 노가다 QA를 강요하자 QA팀 사기가 급락하고 휴먼 에러 결함이 증가했습니다."
    }
  },
  {
    id: 'card_08',
    character: '한보안 팀장',
    role: '정보보안 최고책임자',
    avatar: '🛡️',
    dialogue: '"오픈소스 라이브러리 중 심각한 보안 취약점 버전이 감지되었습니다. 즉시 긴급 패치 작업이 필요합니다!"',
    leftChoice: {
      text: "배포 올스톱하고 패치!",
      effects: { budget: -5, scheduleSlack: -20, teamMorale: -10, quality: 25 },
      logText: "기능 개발 일정을 전면 연기하고 패키지 보안 업그레이드를 완수했습니다."
    },
    rightChoice: {
      text: "그냥 릴리즈하고 나중에 고쳐",
      effects: { budget: 10, scheduleSlack: 15, teamMorale: 10, quality: -35 },
      logText: "보안 취약점을 알면서도 릴리즈를 강행했습니다. 품질과 신뢰성에 치명타를 입었습니다."
    }
  },
  {
    id: 'card_09',
    character: '신입 사원',
    role: '프론트엔드 주니어',
    avatar: '👶',
    dialogue: '"프로덕션 데이터베이스 비밀번호를 깃허브 퍼블릭 레포에 실수로 푸시해 버렸어요... 어떡하죠?"',
    leftChoice: {
      text: "즉시 API Key 파기 및 재생성!",
      effects: { budget: -10, scheduleSlack: -15, teamMorale: -15, quality: 20 },
      logText: "밤샘 보안 수습을 하며 인프라 보안 설정을 재점검하고 사태를 간신히 막았습니다."
    },
    rightChoice: {
      text: "조용히 묻어두고 넘어가자",
      effects: { budget: 15, scheduleSlack: 5, teamMorale: 5, quality: -45 },
      logText: "비밀번호 유출을 은폐했습니다! 머지않아 해커 공격을 받아 시스템 품질이 붕괴 상태에 이릅니다."
    }
  },
  {
    id: 'card_10',
    character: '김개발 시니어',
    role: '리드 개발자',
    avatar: '👨‍💻',
    dialogue: '"우리 레거시 코드가 한계입니다. 기술 부채 해결을 위해 2주간 전체 리팩토링 주간을 가져야 해요."',
    leftChoice: {
      text: "리팩토링 승인! 뼈대부터 고쳐라",
      effects: { budget: -5, scheduleSlack: -25, teamMorale: 15, quality: 30 },
      logText: "기능 개발은 멈췄지만 코드의 유연성과 유지보수 품질이 비약적으로 증가했습니다."
    },
    rightChoice: {
      text: "돌아가잖아? 신규 피처나 짜라",
      effects: { budget: 15, scheduleSlack: 15, teamMorale: -20, quality: -20 },
      logText: "레거시 수정을 거부당한 시니어들은 한숨을 쉬며 누더기 코드를 한 층 더 얹었습니다."
    }
  },
  {
    id: 'card_11',
    character: '이인프 팀장',
    role: '인프라 리드',
    avatar: '🚀',
    dialogue: '"서버리스 아키텍처로 완전 마이그레이션합시다! 트래픽에 맞춰 비용을 극적으로 아낄 수 있어요!"',
    leftChoice: {
      text: "마이그레이션 추진!",
      effects: { budget: -20, scheduleSlack: -15, teamMorale: -5, quality: 25 },
      logText: "서버리스 도입을 위해 삽질을 고되게 한 덕에 최종 아키텍처 품질과 비용 구조가 좋아졌습니다."
    },
    rightChoice: {
      text: "늘 쓰던 가상 서버(VM)가 편하다",
      effects: { budget: 10, scheduleSlack: 10, teamMorale: 10, quality: -10 },
      logText: "기존 인프라를 유지하여 개발 일정 변동은 없으나, 효율적인 개선 기회를 잃었습니다."
    }
  },
  {
    id: 'card_12',
    character: '최영업 상무',
    role: '영업본부장',
    avatar: '🤵',
    dialogue: '"정부 산하 기관 입찰 조건에 폭포수 방식 산출물 문서 500장이 필수래요. 우리 애자일이지만 작성할까요?"',
    leftChoice: {
      text: "돈이 된다면 문서 500장쯤이야",
      effects: { budget: 35, scheduleSlack: -25, teamMorale: -30, quality: -10 },
      logText: "엄청난 수주 자금을 받았으나, 쓸데없는 문서 노동으로 개발팀 사기가 완전히 파탄 났습니다."
    },
    rightChoice: {
      text: "불필요한 서류 작업은 거부한다",
      effects: { budget: -25, scheduleSlack: 15, teamMorale: 15, quality: 10 },
      logText: "큰 계약 기회를 놓쳤지만 불필요한 형식 주의 문서를 과감히 생략하고 실제 개발에 집중했습니다."
    }
  },
  {
    id: 'card_13',
    character: '박기획 파트장',
    role: 'PM',
    avatar: '👩‍💼',
    dialogue: '"기능 명세에 합의가 안 됐지만, 일정을 위해 일단 개발팀부터 라인 오브 코드(LOC)를 쓰게 할까요?"',
    leftChoice: {
      text: "개발부터 손대고 생각하자",
      effects: { budget: -10, scheduleSlack: 15, teamMorale: -15, quality: -25 },
      logText: "구현 방향성 없이 코딩을 시작하여, 결국 개발을 대거 갈아엎고 누더기 퀄리티가 되었습니다."
    },
    rightChoice: {
      text: "명세를 칼같이 명확화하고 착수!",
      effects: { budget: 5, scheduleSlack: -15, teamMorale: 10, quality: 25 },
      logText: "설계 합의 과정이 지루했지만 중복 작업 없이 매끄럽고 견고한 개발에 성공했습니다."
    }
  },
  {
    id: 'card_14',
    character: '인사팀 파트장',
    role: '인사/HR',
    avatar: '🧑‍🤝‍🧑',
    dialogue: '"사내 해커톤을 열고 맛있는 피자와 상금을 지원해 준다면, 전사적인 엔지니어링 붐이 일어날 겁니다!"',
    leftChoice: {
      text: "해커톤 개최! 피자 무제한 쏜다",
      effects: { budget: -15, scheduleSlack: -5, teamMorale: 30, quality: 10 },
      logText: "해커톤을 통해 개발팀 사기가 대폭 상승하고, 위트 있는 프로토타입 아이디어가 여럿 건져졌습니다."
    },
    rightChoice: {
      text: "코딩이나 해라, 예산 아껴",
      effects: { budget: 10, scheduleSlack: 5, teamMorale: -15, quality: -5 },
      logText: "학습 분위기를 차단하고 기계적 작업만을 요구하여 개발 조직 문화가 굳어갔습니다."
    }
  },
  {
    id: 'card_15',
    character: '김개발 시니어',
    role: '리드 개발자',
    avatar: '👨‍💻',
    dialogue: '"최신 인공지능 코파일럿 자동완성 플러그인을 사내에 결제해 주십시오. 생산성이 2배 상승합니다!"',
    leftChoice: {
      text: "모든 개발자 라이센스 구독!",
      effects: { budget: -15, scheduleSlack: 20, teamMorale: 15, quality: 5 },
      logText: "AI 어시스턴트 도입으로 보일러플레이트 코드 작성 시간이 혁신적으로 단축되었습니다!"
    },
    rightChoice: {
      text: "인간 뇌세포를 활용해라. 거절",
      effects: { budget: 10, scheduleSlack: -15, teamMorale: -10, quality: -5 },
      logText: "타사 대비 개발 보조 툴 활용이 늦어져 단순 반복 코딩 일정 소모가 유지되었습니다."
    }
  },
  {
    id: 'card_16',
    character: '정품질 대리',
    role: 'QA 담당자',
    avatar: '🔍',
    dialogue: '"이대로 배포하면 앱 스토어 심사 리젝트 가능성이 80%입니다. 당장 주말 긴급 수정 스프린트를 진행합시다!"',
    leftChoice: {
      text: "긴급 배포 연기 및 밤샘 수정",
      effects: { budget: -10, scheduleSlack: -15, teamMorale: -25, quality: 30 },
      logText: "피와 땀으로 심사 리젝트는 면했으나 팀원들의 눈 밑 다크서클이 극에 달했습니다."
    },
    rightChoice: {
      text: "그냥 내라! 리젝트 먹으면 그때 고쳐",
      effects: { budget: 15, scheduleSlack: 15, teamMorale: 5, quality: -25 },
      logText: "역시나 스토어 리젝트를 당해 제품 이미지가 깎이고 핫픽스 부채가 무겁게 쌓였습니다."
    }
  },
  {
    id: 'card_17',
    character: '김대표 대표',
    role: 'CEO',
    avatar: '🦁',
    dialogue: '"이번 글로벌 컨퍼런스에 참여하게. 참가비와 호텔 비용은 전액 법인카드로 결제해 줄게!"',
    leftChoice: {
      text: "감사합니다! 다녀오겠습니다",
      effects: { budget: -20, scheduleSlack: -10, teamMorale: 25, quality: 5 },
      logText: "해외 우수 개발팀의 최신 트렌드를 전수받아 큰 기술적 영감과 리프레시를 얻었습니다."
    },
    rightChoice: {
      text: "회사에서 코딩이나 하는 게 최고",
      effects: { budget: 15, scheduleSlack: 10, teamMorale: -15, quality: -5 },
      logText: "컨퍼런스 참가가 취소되어 닭장 속의 닭마냥 키보드만 계속 치게 되었습니다."
    }
  },
  {
    id: 'card_18',
    character: '이인프 팀장',
    role: '인프라 리드',
    avatar: '🚀',
    dialogue: '"우리 쿠버네티스(Kubernetes) 클러스터 버전 업그레이드가 긴급합니다. 안 하면 보안 중단될 수도 있어요."',
    leftChoice: {
      text: "주말에 클러스터 작업 진행!",
      effects: { budget: -5, scheduleSlack: -10, teamMorale: -20, quality: 25 },
      logText: "주말 인프라 정기 점검을 통해 무중단 클러스터 최신 패치를 완벽히 유지해냈습니다."
    },
    rightChoice: {
      text: "잘 돌아가는데 손대지 마라",
      effects: { budget: 10, scheduleSlack: 15, teamMorale: 10, quality: -30 },
      logText: "업그레이드를 미룬 결과, 예기치 못한 도커 데몬 충돌로 프로덕션 장비에 붉은 불이 켜졌습니다."
    }
  },
  {
    id: 'card_19',
    character: '이디자 대리',
    role: 'UI/UX 디자이너',
    avatar: '🎨',
    dialogue: '"디자인 컴포넌트가 제각각이에요. 3개월 동안 모든 개발자와 피그마로 공용 디자인 시스템을 만듭시다."',
    leftChoice: {
      text: "장기 효율을 위해 고!",
      effects: { budget: -15, scheduleSlack: -25, teamMorale: 5, quality: 30 },
      logText: "초기 일정이 크게 낭비되는 듯했으나 향후 프론트 코딩 속도와 품질 일관성이 엄청나게 수직 상승했습니다."
    },
    rightChoice: {
      text: "눈앞의 컴포넌트 복붙으로 버텨",
      effects: { budget: 10, scheduleSlack: 15, teamMorale: -10, quality: -15 },
      logText: "화면마다 디테일, 여백, 컬러가 모두 제멋대로인 엉망진창 UI 누더기 제품이 탄생 중입니다."
    }
  },
  {
    id: 'card_20',
    character: '박기획 파트장',
    role: 'PM',
    avatar: '👩‍💼',
    dialogue: '"일정이 지나치게 타이트하네요. 이번 스크럼 스탠드업 미팅과 회고를 폐지하고 바로 작업에 들어가시죠."',
    leftChoice: {
      text: "회의 줄이자! 미팅 전부 폐지",
      effects: { budget: 5, scheduleSlack: 15, teamMorale: -15, quality: -15 },
      logText: "소통 회의가 단절되자 팀원들이 서로 엉뚱한 기능을 개발하여 병합 시 대참사가 났습니다."
    },
    rightChoice: {
      text: "싱크와 회고가 애자일의 핵심",
      effects: { budget: -5, scheduleSlack: -10, teamMorale: 15, quality: 15 },
      logText: "회의 시간이 늘어났지만 소통 싱크가 완벽히 맞아 협업 병목이 말끔히 해소되었습니다."
    }
  },
  {
    id: 'card_21',
    character: '최영업 상무',
    role: '영업본부장',
    avatar: '🤵',
    dialogue: '"투자사 데모데이가 다음 주입니다! 실시간 연동 기능이 준비 안 되었으니 가짜 데이터 모크업(Mock)으로 때워요!"',
    leftChoice: {
      text: "모크업 화면으로 눈속임하자",
      effects: { budget: 30, scheduleSlack: 10, teamMorale: -10, quality: -20 },
      logText: "데모는 성공적으로 끝내 추가 예산을 받았지만, 실제 개발 부채는 전혀 갚지 못하고 뒤로 미뤄졌습니다."
    },
    rightChoice: {
      text: "정직하게 준비된 만큼만 데모",
      effects: { budget: -20, scheduleSlack: -10, teamMorale: 15, quality: 15 },
      logText: "조금 초라한 데모로 투자 금액은 아쉬웠지만 엔지니어들은 진솔한 퀄리티 향상에만 몰입했습니다."
    }
  },
  {
    id: 'card_22',
    character: '인사팀 파트장',
    role: 'HR 매니저',
    avatar: '🧑‍🤝‍🧑',
    dialogue: '"헤드헌터를 통해 해외의 초특급 개발자 제프리를 스카웃할 기회입니다! 단, 연봉이 기존 개발자 3배 수준입니다."',
    leftChoice: {
      text: "제프리를 모셔오자! 연봉 3배!",
      effects: { budget: -35, scheduleSlack: 15, teamMorale: -15, quality: 30 },
      logText: "에이스 개발자 한 명이 프로젝트 뼈대를 견고히 고쳤지만 내부 팀원들 간의 급여 격차 박탈감이 커졌습니다."
    },
    rightChoice: {
      text: "내부 인재 육성이 우선",
      effects: { budget: 15, scheduleSlack: -15, teamMorale: 15, quality: -10 },
      logText: "고액 연봉 외부 수혈을 거절하고, 주니어들의 스터디와 내부 협업에 집중했습니다."
    }
  },
  {
    id: 'card_23',
    character: '신입 사원',
    role: '서버 주니어',
    avatar: '👶',
    dialogue: '"실수로 프로덕션 캐시 서버 포트를 공용으로 열어두어 비트코인 채굴 악성코드에 감염된 듯합니다..."',
    leftChoice: {
      text: "당장 포트 닫고 클라우드 인스턴스 파기",
      effects: { budget: -15, scheduleSlack: -15, teamMorale: -15, quality: 15 },
      logText: "긴급 차단 및 재설치로 해킹 공격 수습에 매달려 일정이 한참 후퇴했습니다."
    },
    rightChoice: {
      text: "채굴기 몰래 끄고 기록만 지워",
      effects: { budget: 5, scheduleSlack: 5, teamMorale: 5, quality: -45 },
      logText: "눈가리고 아웅 식으로 대처하다, 인프라가 좀 먹혀 시스템 전체가 마비되는 전산 품질 재앙이 옵니다."
    }
  },
  {
    id: 'card_24',
    character: '한보안 팀장',
    role: '보안 최고책임자',
    avatar: '🛡️',
    dialogue: '"모든 임직원 PC에 강력한 보안 추적 및 인터넷 사이트 제한 소프트웨어를 강제로 설치해야 합니다."',
    leftChoice: {
      text: "보안이 국력이다. 설치해!",
      effects: { budget: -10, scheduleSlack: -5, teamMorale: -35, quality: 15 },
      logText: "개발 망에서 StackOverflow와 깃허브 접근이 수시로 차단되자 엔지니어들의 사기와 분노가 우주를 뚫었습니다."
    },
    rightChoice: {
      text: "자율성에 맡기고 피싱 교육만 진행",
      effects: { budget: 5, scheduleSlack: 10, teamMorale: 20, quality: -15 },
      logText: "인터넷 검열이 없어 쾌적하게 코딩하지만 가끔 랜섬웨어 메일에 낚이는 아슬아슬한 상태가 지속됩니다."
    }
  },
  {
    id: 'card_25',
    character: '김개발 시니어',
    role: '리드 개발자',
    avatar: '👨‍💻',
    dialogue: '"깃 레포지토리 커밋 히스토리가 엉망입니다. 코드 포맷터 Prettier와 린트 룰을 엄격하게 적용할까요?"',
    leftChoice: {
      text: "타협 없는 린트 빌드 블락 활성화",
      effects: { budget: -5, scheduleSlack: -10, teamMorale: -10, quality: 25 },
      logText: "코드 포맷팅이 칼같이 맞아 품질 가독성은 훌륭하지만 세미콜론 하나로 빌드가 깨져 주니어들은 고통받습니다."
    },
    rightChoice: {
      text: "자유롭게 코딩하자. 규칙 완화",
      effects: { budget: 10, scheduleSlack: 10, teamMorale: 10, quality: -20 },
      logText: "빌드가 펑펑 통과되어 가뿐하나, 탭과 스페이스가 혼용된 지옥의 일관성 없는 코드가 쌓입니다."
    }
  },
  {
    id: 'card_26',
    character: '박기획 파트장',
    role: 'PM',
    avatar: '👩‍💼',
    dialogue: '"고객사 요구 스펙이 모호하네요. 회의실에 영업, 기획, 개발팀을 다 가둬놓고 끝장 토론을 벌일까요?"',
    leftChoice: {
      text: "끝장 3일 끝장 토론 고!",
      effects: { budget: -10, scheduleSlack: -15, teamMorale: -15, quality: 25 },
      logText: "3일간의 목이 터지는 토론 끝에 완벽한 스펙 정의를 마련했으나 모두가 탈진했습니다."
    },
    rightChoice: {
      text: "대충 짐작대로 만들고 나중에 대응",
      effects: { budget: 15, scheduleSlack: 15, teamMorale: 10, quality: -25 },
      logText: "쓸데없는 회의가 줄어 편했으나 기획과 코딩 결과물이 완전히 어긋나며 심각한 백로그가 생깁니다."
    }
  },
  {
    id: 'card_27',
    character: '김대표 대표',
    role: 'CEO',
    avatar: '🦁',
    dialogue: '"기존 모놀리식 백엔드를 마이크로서비스 아키텍처(MSA)로 완전히 쪼갭시다! 그게 글로벌 테크 트렌드라네!"',
    leftChoice: {
      text: "MSA 트렌드를 따르겠습니다!",
      effects: { budget: -30, scheduleSlack: -25, teamMorale: -15, quality: 30 },
      logText: "엄청난 비용과 인력을 들여 MSA 전환에 간신히 안착했습니다. 품질과 확장이 우수해졌지만 자금은 바닥입니다."
    },
    rightChoice: {
      text: "우리 규모엔 과한 오버스펙입니다",
      effects: { budget: 15, scheduleSlack: 15, teamMorale: 10, quality: -5 },
      logText: "심플하고 단단한 싱글 서버를 지켜 리소스 낭비를 막고 가성비를 극대화했습니다."
    }
  },
  {
    id: 'card_28',
    character: '이인프 팀장',
    role: '데브옵스 리드',
    avatar: '🚀',
    dialogue: '"빌드 및 배포가 전부 수동입니다. 수동 배포 한 번에 1시간이 걸리는데, 전면적인 CI/CD 배포 자동화를 세팅할까요?"',
    leftChoice: {
      text: "배포 파이프라인 자동화 세팅!",
      effects: { budget: -15, scheduleSlack: -10, teamMorale: 15, quality: 25 },
      logText: "이제 클릭 한 번으로 5분 만에 배포가 완료되는 쾌적한 인프라가 되어 생산성이 급증했습니다."
    },
    rightChoice: {
      text: "그냥 수동으로 FTP 업로드해",
      effects: { budget: 10, scheduleSlack: -15, teamMorale: -20, quality: -15 },
      logText: "매번 배포할 때마다 손이 벌벌 떨리는 휴먼 에러 서버 중단 사고를 안고 갑니다."
    }
  },
  {
    id: 'card_29',
    character: '최영업 상무',
    role: '영업본부장',
    avatar: '🤵',
    dialogue: '"내부 백오피스 관리자 대시보드가 너무 허름하네요. 고객사 미팅용으로 아주 럭셔리하게 새로 개발해 주세요."',
    leftChoice: {
      text: "화려하고 품격있게 디자인 개편",
      effects: { budget: -15, scheduleSlack: -15, teamMorale: -10, quality: 15 },
      logText: "보여주기식 백오피스 리뉴얼로 미팅 점수는 땄지만 핵심 기능 개발 속도가 눈에 띄게 더뎌졌습니다."
    },
    rightChoice: {
      text: "관리 도구는 기능만 하면 됨. 보류",
      effects: { budget: 10, scheduleSlack: 10, teamMorale: 10, quality: -5 },
      logText: "다소 못생긴 부트스트랩 기본 대시보드지만, 낭비 없이 제품 본질 개발에 에너지를 보존했습니다."
    }
  },
  {
    id: 'card_30',
    character: '인사팀 파트장',
    role: 'HR 매니저',
    avatar: '🧑‍🤝‍🧑',
    dialogue: '"개발 생산성에 최고인 주 4일제 시범 도입을 건의합니다! 팀원들이 영혼을 바칠 기세입니다!"',
    leftChoice: {
      text: "오! 대세는 4일제! 도입합시다",
      effects: { budget: -10, scheduleSlack: -20, teamMorale: 45, quality: 10 },
      logText: "팀원들의 피로도가 사라지고 엄청난 사기가 충천했으나, 주당 절대 가용 일수가 줄어 일정 압박은 심해졌습니다."
    },
    rightChoice: {
      text: "996 근무제가 최고야! 반려",
      effects: { budget: 10, scheduleSlack: 15, teamMorale: -35, quality: -15 },
      logText: "타이트한 타임라인은 사수했으나, 팀원들은 대놓고 다른 공고를 스크롤하며 이직을 결심합니다."
    }
  },
  {
    id: 'card_31',
    character: '정품질 대리',
    role: 'QA 담당자',
    avatar: '🔍',
    dialogue: '"외부 전문 화이트해커 집단에 모의 침투 침투 테스트(Penetration Test)를 의뢰해 보안 결함을 찾아낼까요?"',
    leftChoice: {
      text: "화이트해커팀에 용역 의뢰",
      effects: { budget: -20, scheduleSlack: -5, teamMorale: -5, quality: 30 },
      logText: "미처 인지하지 못했던 무서운 취약점들을 무더기로 색출하여 서비스 안정성을 한 차원 끌어올렸습니다."
    },
    rightChoice: {
      text: "설마 털리겠어? 돈 아끼자",
      effects: { budget: 15, scheduleSlack: 10, teamMorale: 5, quality: -25 },
      logText: "용역 비용은 세이브했으나 보안 위험의 지뢰밭을 걸어가는 불안한 아키텍처가 방치되었습니다."
    }
  },
  {
    id: 'card_32',
    character: '박기획 파트장',
    role: 'PM',
    avatar: '👩‍💼',
    dialogue: '"어쩌죠? 기획 착오로 데이터 설계 스키마가 잘못되었습니다. 대대적인 DB 마이그레이션이 필요합니다."',
    leftChoice: {
      text: "모든 업무 올스톱하고 DB 정상화!",
      effects: { budget: -10, scheduleSlack: -25, teamMorale: -15, quality: 30 },
      logText: "고난도의 마이그레이션을 안전하게 수행하여 비정규화 데이터를 깔끔하게 클렌징했습니다."
    },
    rightChoice: {
      text: "더러워도 JOIN과 예외 코드로 땜빵해",
      effects: { budget: 15, scheduleSlack: 15, teamMorale: -5, quality: -35 },
      logText: "코드 상에 무수한 예외 구문과 if-else 땜빵 코드가 넘쳐나며, 유지보수 퀄리티가 박살 났습니다."
    }
  },
  {
    id: 'card_33',
    character: '김개발 시니어',
    role: '리드 개발자',
    avatar: '👨‍💻',
    dialogue: '"신규 주니어 개발자가 머지 리퀘스트 템플릿을 안 지키고 수시로 main 브랜치에 다이렉트 푸시를 합니다!"',
    leftChoice: {
      text: "main 브랜치에 락(Lock)을 걸고 승인 필수화!",
      effects: { budget: -5, scheduleSlack: -10, teamMorale: 10, quality: 20 },
      logText: "브랜치 보호 규칙 적용으로 안정적인 릴리즈 품질 관리가 정착되었습니다."
    },
    rightChoice: {
      text: "자율성에 맡기자, 잔소리하지 마",
      effects: { budget: 10, scheduleSlack: 10, teamMorale: -10, quality: -20 },
      logText: "주니어의 깨진 코드 빌드가 그대로 main에 반영되어 프로덕션이 가끔 터집니다."
    }
  },
  {
    id: 'card_34',
    character: '이인프 팀장',
    role: '데브옵스 리드',
    avatar: '🚀',
    dialogue: '"오픈스택 프라이빗 클라우드를 사내 전산실에 직접 하드웨어로 구축합시다! 퍼블릭 클라우드 비용을 아낄 수 있어요!"',
    leftChoice: {
      text: "전산실 하드웨어 구매 승인!",
      effects: { budget: -40, scheduleSlack: -20, teamMorale: -15, quality: 20 },
      logText: "막대한 초기 장비 자금 소요와 인프라 팀의 엄청난 조립 중노동 끝에 전산 망을 확보했습니다."
    },
    rightChoice: {
      text: "편하게 AWS / GCP 임대해 쓰자",
      effects: { budget: 15, scheduleSlack: 15, teamMorale: 15, quality: -5 },
      logText: "장비 관리 걱정 없이 클라우드 크레딧 카드로 결제하며 쾌적하고 민첩하게 대처하고 있습니다."
    }
  },
  {
    id: 'card_35',
    character: '최영업 상무',
    role: '영업본부장',
    avatar: '🤵',
    dialogue: '"갑을 관계인 원청 대기업에서 자사 규격 프레임워크를 억지로 사용해서 재개발하라는 압박이 들어옵니다!"',
    leftChoice: {
      text: "을의 설움... 비위를 맞추자",
      effects: { budget: 20, scheduleSlack: -30, teamMorale: -25, quality: -15 },
      logText: "억지로 구식 기성 프레임워크를 이식하며 개발팀은 분노의 눈물을 흘리고 품질은 괴상해졌습니다."
    },
    rightChoice: {
      text: "부당한 요구에 기술 타당성 보고서로 반박!",
      effects: { budget: -15, scheduleSlack: 15, teamMorale: 15, quality: 15 },
      logText: "당당한 논리 공격으로 불합리한 오버헤드를 철회시키고 우리의 현대적 아키텍처를 안전하게 수호했습니다!"
    }
  },
  {
    id: 'card_36',
    character: '인사팀 파트장',
    role: 'HR 매니저',
    avatar: '🧑‍🤝‍🧑',
    dialogue: '"대세인 원격 100% 전면 재택근무 제도를 신설합시다. 인재 채용 시 엄청난 메리트가 됩니다!"',
    leftChoice: {
      text: "모두 집에서 일해라! 원격 근무!",
      effects: { budget: 5, scheduleSlack: -15, teamMorale: 30, quality: -5 },
      logText: "출퇴근이 없어져 극상의 사기를 누리나, 원격 화상 통화 조율 병목으로 마일스톤 일정이 딜레이됩니다."
    },
    rightChoice: {
      text: "매일 아침 9시 전원 본사 정렬!",
      effects: { budget: -10, scheduleSlack: 15, teamMorale: -30, quality: 10 },
      logText: "칼 같은 대면 협업으로 일정을 단축하고 기획 피드백은 빨라졌으나, 지옥철 통근으로 사기는 바닥입니다."
    }
  },
  {
    id: 'card_37',
    character: '정품질 대리',
    role: 'QA 담당자',
    avatar: '🔍',
    dialogue: '"배포 전 스테이징 서버에 실시간 유저 1만 명 동시 접속 부하 테스트(Load Test) 시나리오를 돌릴까요?"',
    leftChoice: {
      text: "서버 터질 때까지 임계 테스트 고!",
      effects: { budget: -10, scheduleSlack: -10, teamMorale: -5, quality: 25 },
      logText: "대형 부하 유발 테스트를 통해 병목 쿼리와 메모리 누수를 아주 정확히 잡아냈습니다!"
    },
    rightChoice: {
      text: "부하 오기 전에 인프라 자동 스케일아웃 되겠지",
      effects: { budget: 5, scheduleSlack: 5, teamMorale: 5, quality: -20 },
      logText: "실제 오픈날 DB 락 병목이 터져 유저들이 에러 메세지를 보며 대거 이탈하는 쓴맛을 보았습니다."
    }
  },
  {
    id: 'card_38',
    character: '이디자 대리',
    role: 'UI/UX 디자이너',
    avatar: '🎨',
    dialogue: '"반응형 웹 지원을 포기하고 우선 데스크톱 뷰만 밀고 나가면 릴리즈 일정을 대폭 단축할 수 있어요!"',
    leftChoice: {
      text: "맞아, 모바일 뷰는 나중에!",
      effects: { budget: 10, scheduleSlack: 20, teamMorale: 10, quality: -20 },
      logText: "빠르게 데스크톱 릴리즈는 마쳤지만, 모바일 스마트폰 유저 유입 품질이 최악이라는 혹평을 듣습니다."
    },
    rightChoice: {
      text: "현대는 모바일 퍼스트 시대다. 동시 개발!",
      effects: { budget: -10, scheduleSlack: -20, teamMorale: -10, quality: 20 },
      logText: "일정 소모가 컸지만 모바일/태블릿까지 한 몸처럼 부드럽게 작동하는 고품격 UI를 얻었습니다."
    }
  },
  {
    id: 'card_39',
    character: '김개발 시니어',
    role: '리드 개발자',
    avatar: '👨‍💻',
    dialogue: '"오픈소스 라이브러리 중에 라이센스가 모호한 것들이 보여요. 상업용 법적 철퇴를 피하려면 라이센스 감사를 수행해야 합니다."',
    leftChoice: {
      text: "법적 리스크는 치명적이야. 전수 감사!",
      effects: { budget: -15, scheduleSlack: -15, teamMorale: -10, quality: 25 },
      logText: "골치 아픈 카피레프트 라이센스를 모두 걷어내고 안전한 MIT/Apache 라이센스로만 정화했습니다."
    },
    rightChoice: {
      text: "설마 공룡 기업이 우리 소송하겠냐",
      effects: { budget: 10, scheduleSlack: 10, teamMorale: 10, quality: -25 },
      logText: "불안 불안하게 개발을 넘겼지만 불완전한 법적 리스크를 고스란히 안게 되어 장기 신뢰성이 손상되었습니다."
    }
  },
  {
    id: 'card_40',
    character: '박기획 파트장',
    role: 'PM',
    avatar: '👩‍💼',
    dialogue: '"기획서 피드백을 스프레드시트 댓글, 슬랙, 노션, 이메일로 다 흩어져서 주시네요. JIRA와 Confluence로 통합해 주십시오."',
    leftChoice: {
      text: "아틀라시안 풀 패키지 라이센스 결제!",
      effects: { budget: -20, scheduleSlack: -5, teamMorale: 15, quality: 15 },
      logText: "비싼 라이센스비를 쓰게 되었지만 백로그와 기획서 추적이 완벽히 한곳에서 정돈되었습니다."
    },
    rightChoice: {
      text: "구글 시트면 충분하다, 아껴라",
      effects: { budget: 15, scheduleSlack: 5, teamMorale: -15, quality: -15 },
      logText: "구글 시트 행 열이 어긋나며 히스토리를 잃어버리는 혼돈의 카오스 협업이 계속되었습니다."
    }
  }
];
