import { useState } from 'react';
import {
  DollarSign,
  Clock,
  Smile,
  ShieldAlert,
  RefreshCw,
  Layers,
  Target,
  ChevronLeft,
  ChevronRight,
  Award,
  History,
  Info
} from 'lucide-react';
import { METHODOLOGIES, TARGETS, CARDS } from './cards';
import { Card, Methodology, ProjectTarget, ResourceStats, LogEntry, Choice } from './types';

export default function App() {
  // Game screens: 'START' | 'PLAYING' | 'GAMEOVER' | 'VICTORY'
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAMEOVER' | 'VICTORY'>('START');

  // Selected setup config
  const [selectedMethodology, setSelectedMethodology] = useState<Methodology>(METHODOLOGIES[0]);
  const [selectedTarget, setSelectedTarget] = useState<ProjectTarget>(TARGETS[0]);

  // Player stats (0 - 100)
  const [resources, setResources] = useState<ResourceStats>({
    budget: 50,
    scheduleSlack: 50,
    teamMorale: 50,
    quality: 50
  });

  // Gameplay tracking
  const [turn, setTurn] = useState<number>(1);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [cardPool, setCardPool] = useState<Card[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [hoveredChoice, setHoveredChoice] = useState<'LEFT' | 'RIGHT' | null>(null);

  // Failure cause / victory details
  const [endReason, setEndReason] = useState<string>('');
  const [lastLogEntry, setLastLogEntry] = useState<string>('');

  // Initializing or restarting the game
  const startGame = () => {
    // 1. Calculate starting resources
    const baseStats = 50;
    const mModifiers = selectedMethodology.startingModifiers;
    const tModifiers = selectedTarget.startingModifiers;

    const initialStats: ResourceStats = {
      budget: Math.min(100, Math.max(0, baseStats + mModifiers[0] + tModifiers[0])),
      scheduleSlack: Math.min(100, Math.max(0, baseStats + mModifiers[1] + tModifiers[1])),
      teamMorale: Math.min(100, Math.max(0, baseStats + mModifiers[2] + tModifiers[2])),
      quality: Math.min(100, Math.max(0, baseStats + mModifiers[3] + tModifiers[3]))
    };

    setResources(initialStats);
    setTurn(1);
    setLog([]);
    setHoveredChoice(null);
    setEndReason('');
    setLastLogEntry('');

    // Filter cards if they have specific methodology requirements, though most are open
    const initialPool = [...CARDS];
    setCardPool(initialPool);

    // Pick first card
    const randomIndex = Math.floor(Math.random() * initialPool.length);
    setCurrentCard(initialPool[randomIndex]);

    setGameState('PLAYING');
  };

  // Process selected choice
  const makeChoice = (choice: Choice) => {
    if (!currentCard) return;

    // Apply effects
    const nextStats = {
      budget: Math.min(100, Math.max(0, resources.budget + choice.effects.budget)),
      scheduleSlack: Math.min(100, Math.max(0, resources.scheduleSlack + choice.effects.scheduleSlack)),
      teamMorale: Math.min(100, Math.max(0, resources.teamMorale + choice.effects.teamMorale)),
      quality: Math.min(100, Math.max(0, resources.quality + choice.effects.quality))
    };

    // Update log
    const outcomeDesc = Object.entries(choice.effects)
      .filter(([_, value]) => value !== 0)
      .map(([key, value]) => {
        const sign = value > 0 ? '+' : '';
        const nameMap: { [key: string]: string } = {
          budget: '예산',
          scheduleSlack: '일정 여유',
          teamMorale: '팀 사기',
          quality: '품질'
        };
        return `${nameMap[key]} ${sign}${value}%`;
      })
      .join(', ');

    const newLogEntry: LogEntry = {
      turn,
      cardTitle: `${currentCard.role} - ${currentCard.character}`,
      character: currentCard.character,
      choiceText: choice.text,
      outcomeText: choice.logText + (outcomeDesc ? ` (${outcomeDesc})` : '')
    };

    setLog(prev => [newLogEntry, ...prev]);
    setResources(nextStats);
    setHoveredChoice(null);

    // Check game over or victory
    let gameOver = false;
    let gameOverMessage = '';

    if (nextStats.budget <= 0) {
      gameOver = true;
      gameOverMessage = '프로젝트 자금이 완전히 파산했습니다. 추가 서버 리소스 결제가 불가능하여 서비스가 강제 종료되었습니다. 💸';
    } else if (nextStats.budget >= 100) {
      gameOver = true;
      gameOverMessage = '회사가 너무 비대해져서 관료주의 지옥에 빠졌습니다! 무의미한 회의만 반복하다가 출시를 전면 포기합니다. 🏢';
    } else if (nextStats.scheduleSlack <= 0) {
      gameOver = true;
      gameOverMessage = '마일스톤 납기 기한을 초과했습니다. 원청 및 투자사에서 지연 배상금을 청구하여 프로젝트 계약이 파기되었습니다. ⏰';
    } else if (nextStats.scheduleSlack >= 100) {
      gameOver = true;
      gameOverMessage = '출시를 너무 미뤄서 시장 타이밍을 완전히 놓쳤습니다. 경쟁사에서 더 진보한 AI 솔루션을 무료로 배포했습니다. ⏳';
    } else if (nextStats.teamMorale <= 0) {
      gameOver = true;
      gameOverMessage = '개발팀 전원이 번아웃되어 단체 사직서를 제출했습니다! 사내에 빈 의자와 슬랙 경고 알림만 뎅그렁 남아 있습니다. 🤯';
    } else if (nextStats.teamMorale >= 100) {
      gameOver = true;
      gameOverMessage = '팀 사기가 도를 넘어서 매일이 하하호호 맥주 파티와 놀자판이 되었습니다. 아무도 코딩을 하지 않아 제품 개발이 영구 정지되었습니다. 🍻';
    } else if (nextStats.quality <= 0) {
      gameOver = true;
      gameOverMessage = '누더기 코드 부채가 임계점을 돌파해 앱 전체가 접속 마비 상태에 처했습니다. 유저들의 평점이 1.1점으로 폭락했습니다. 🐞';
    } else if (nextStats.quality >= 100) {
      gameOver = true;
      gameOverMessage = '골드 플레이팅(과한 오버스펙)의 극치입니다. 사소한 아이콘 그림자 픽셀 품질을 무한 리팩토링하다 결국 예산과 일정이 메말랐습니다. 💎';
    }

    if (gameOver) {
      setEndReason(gameOverMessage);
      setLastLogEntry(choice.logText);
      setGameState('GAMEOVER');
      return;
    }

    // Check Victory
    if (turn >= selectedTarget.victoryTurns) {
      setGameState('VICTORY');
      setLastLogEntry(choice.logText);
      return;
    }

    // Next turn
    setTurn(prev => prev + 1);

    // Pick next card, making sure it doesn't match the immediate previous card if possible
    let remainingPool = cardPool.filter(c => c.id !== currentCard.id);
    if (remainingPool.length === 0) {
      remainingPool = [...CARDS];
    }
    setCardPool(remainingPool);

    const nextRandomIndex = Math.floor(Math.random() * remainingPool.length);
    setCurrentCard(remainingPool[nextRandomIndex]);
  };

  // Helper to check if a specific resource will change (returns '.' or '•' or similar visual clue)
  const getResourceInfluence = (resource: keyof ResourceStats) => {
    if (!currentCard || !hoveredChoice) return false;
    const choice = hoveredChoice === 'LEFT' ? currentCard.leftChoice : currentCard.rightChoice;
    return choice.effects[resource] !== 0;
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-gray-950 flex flex-col shadow-2xl relative border-x border-gray-800">

      {/* Header */}
      <header className="p-4 bg-gray-900 border-b border-gray-800 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <span className="text-xl">👑</span>
          <div>
            <h1 className="font-extrabold text-sm tracking-wider text-teal-400">PROJECT REIGNS</h1>
            <p className="text-xs text-gray-400">IT 프로젝트 시뮬레이터</p>
          </div>
        </div>
        {gameState === 'PLAYING' && (
          <div className="bg-teal-950/40 border border-teal-800/60 px-3 py-1 rounded-full flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-xs font-bold text-teal-300">TURN {turn} / {selectedTarget.victoryTurns}</span>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 flex flex-col justify-between overflow-y-auto">

        {/* SCREEN 1: START SCREEN */}
        {gameState === 'START' && (
          <div className="flex-1 flex flex-col justify-center py-6">
            <div className="text-center mb-8 animate-float">
              <span className="text-6xl block mb-3">💻</span>
              <h2 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-indigo-400">
                IT 프로젝트 수호자
              </h2>
              <p className="text-xs text-gray-400 mt-1 max-w-xs mx-auto">
                Reigns 스타일의 스토리형 시뮬레이터. 균형 잡힌 관리력으로 프로젝트를 성공적인 배포까지 이끄세요!
              </p>
            </div>

            {/* 1. Methodology Selection */}
            <div className="space-y-3 mb-6">
              <label className="text-xs font-bold uppercase tracking-wider text-teal-400 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> 1. 개발 방법론 선택
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {METHODOLOGIES.map((methodology) => (
                  <button
                    key={methodology.id}
                    data-testid={`methodology-${methodology.id}`}
                    onClick={() => setSelectedMethodology(methodology)}
                    className={`p-3 text-left rounded-xl border text-sm transition-all duration-200 ${
                      selectedMethodology.id === methodology.id
                        ? 'bg-teal-950/50 border-teal-400 text-teal-200 shadow-md shadow-teal-950'
                        : 'bg-gray-900/60 border-gray-800 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      {methodology.name}
                      {selectedMethodology.id === methodology.id && <span className="text-xs text-teal-400">● 선택됨</span>}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {methodology.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Target Selection */}
            <div className="space-y-3 mb-8">
              <label className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                <Target className="w-3.5 h-3.5" /> 2. 프로젝트 목표 설정
              </label>
              <div className="grid grid-cols-1 gap-2.5">
                {TARGETS.map((target) => (
                  <button
                    key={target.id}
                    data-testid={`target-${target.id}`}
                    onClick={() => setSelectedTarget(target)}
                    className={`p-3 text-left rounded-xl border text-sm transition-all duration-200 ${
                      selectedTarget.id === target.id
                        ? 'bg-indigo-950/50 border-indigo-400 text-indigo-200 shadow-md shadow-indigo-950'
                        : 'bg-gray-900/60 border-gray-800 text-gray-300 hover:border-gray-700'
                    }`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      {target.name}
                      {selectedTarget.id === target.id && <span className="text-xs text-indigo-400">● 선택됨</span>}
                    </div>
                    <div className="text-xs text-gray-400 mt-1 leading-relaxed">
                      {target.description}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Start Button */}
            <button
              data-testid="start-game-btn"
              onClick={startGame}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-black font-extrabold text-sm tracking-wider uppercase rounded-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-lg shadow-teal-950/50"
            >
              <span>🚀</span> 프로젝트 시뮬레이션 시작
            </button>
          </div>
        )}

        {/* SCREEN 2: GAMEPLAY LOOP */}
        {gameState === 'PLAYING' && currentCard && (
          <div className="flex-1 flex flex-col justify-between py-2 gap-4">

            {/* Resource Indicator Bars */}
            <div className="grid grid-cols-4 gap-2 bg-gray-900/80 p-3 rounded-xl border border-gray-800 backdrop-blur-sm shadow-inner">

              {/* Budget */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1 relative">
                  <DollarSign className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] font-bold text-emerald-400">예산</span>
                  {getResourceInfluence('budget') && (
                    <span className="absolute -top-1.5 -right-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
                  )}
                </div>
                <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300 rounded-full"
                    style={{ width: `${resources.budget}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 font-mono font-bold">{resources.budget}%</span>
              </div>

              {/* Schedule Slack */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1 relative">
                  <Clock className="w-4 h-4 text-sky-400" />
                  <span className="text-[10px] font-bold text-sky-400">일정</span>
                  {getResourceInfluence('scheduleSlack') && (
                    <span className="absolute -top-1.5 -right-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
                  )}
                </div>
                <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
                  <div
                    className="h-full bg-sky-500 transition-all duration-300 rounded-full"
                    style={{ width: `${resources.scheduleSlack}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 font-mono font-bold">{resources.scheduleSlack}%</span>
              </div>

              {/* Team Morale */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1 relative">
                  <Smile className="w-4 h-4 text-amber-400" />
                  <span className="text-[10px] font-bold text-amber-400">사기</span>
                  {getResourceInfluence('teamMorale') && (
                    <span className="absolute -top-1.5 -right-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
                  )}
                </div>
                <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
                  <div
                    className="h-full bg-amber-500 transition-all duration-300 rounded-full"
                    style={{ width: `${resources.teamMorale}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 font-mono font-bold">{resources.teamMorale}%</span>
              </div>

              {/* Quality */}
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-1 mb-1 relative">
                  <ShieldAlert className="w-4 h-4 text-fuchsia-400" />
                  <span className="text-[10px] font-bold text-fuchsia-400">품질</span>
                  {getResourceInfluence('quality') && (
                    <span className="absolute -top-1.5 -right-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 animate-ping"></span>
                  )}
                </div>
                <div className="w-full h-2 bg-gray-950 rounded-full overflow-hidden border border-gray-800">
                  <div
                    className="h-full bg-fuchsia-500 transition-all duration-300 rounded-full"
                    style={{ width: `${resources.quality}%` }}
                  ></div>
                </div>
                <span className="text-[10px] text-gray-400 mt-1 font-mono font-bold">{resources.quality}%</span>
              </div>

            </div>

            {/* Active Card Card */}
            <div className="flex-1 flex flex-col justify-center items-center py-4 relative">
              <div className="w-full max-w-xs bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col items-center justify-between min-h-[300px] shadow-2xl relative overflow-hidden">

                {/* Decorative Tech Grid */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-30 pointer-events-none"></div>

                {/* Card Character Role Badge */}
                <div className="z-10 bg-teal-950/60 border border-teal-800/80 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-teal-400 uppercase tracking-widest">
                  {currentCard.role}
                </div>

                {/* Character Avatar/Emoji */}
                <div className="z-10 w-20 h-20 rounded-full bg-gray-800 border-2 border-teal-500/30 flex items-center justify-center text-4xl shadow-lg mt-3 mb-2 animate-float">
                  {currentCard.avatar}
                </div>

                {/* Character Name */}
                <div className="z-10 text-center">
                  <h3 className="font-bold text-sm text-gray-100">{currentCard.character}</h3>
                </div>

                {/* Character Dialogue */}
                <div className="z-10 mt-3 text-center flex-1 flex items-center justify-center">
                  <p className="text-xs text-gray-200 leading-relaxed font-medium bg-gray-950/50 p-2.5 rounded-xl border border-gray-800/50">
                    {currentCard.dialogue}
                  </p>
                </div>

                {/* Quick Hint Tooltip on Choice Hover */}
                {hoveredChoice && (
                  <div className="absolute bottom-2 left-2 right-2 bg-teal-900/90 text-teal-100 border border-teal-700 text-[10px] py-1 px-2 rounded text-center z-20 font-bold backdrop-blur-sm animate-pulse">
                    ⚠️ {hoveredChoice === 'LEFT' ? '왼쪽 선택지' : '오른쪽 선택지'}에 따라 상단 게이지가 변동됩니다!
                  </div>
                )}

              </div>
            </div>

            {/* Interactive Reigns-style Choices */}
            <div className="space-y-2.5">

              {/* Left Option Button */}
              <button
                data-testid="choice-left-btn"
                onMouseEnter={() => setHoveredChoice('LEFT')}
                onMouseLeave={() => setHoveredChoice(null)}
                onFocus={() => setHoveredChoice('LEFT')}
                onBlur={() => setHoveredChoice(null)}
                onClick={() => makeChoice(currentCard.leftChoice)}
                className="w-full p-3.5 bg-gray-900/80 hover:bg-teal-950/40 focus:bg-teal-950/40 border border-gray-800 hover:border-teal-400 focus:border-teal-400 focus-visible:ring-2 focus-visible:ring-teal-400 outline-none text-left rounded-xl transition-all duration-150 flex items-start gap-2.5 shadow hover:shadow-teal-950"
              >
                <div className="w-5 h-5 rounded-full bg-teal-950 border border-teal-700/60 flex items-center justify-center text-[10px] text-teal-400 font-bold shrink-0 mt-0.5">
                  <ChevronLeft className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[11px] font-black tracking-wide text-teal-400 uppercase">왼쪽 선택</div>
                  <div className="text-xs font-semibold text-gray-200 mt-0.5">{currentCard.leftChoice.text}</div>
                </div>
              </button>

              {/* Right Option Button */}
              <button
                data-testid="choice-right-btn"
                onMouseEnter={() => setHoveredChoice('RIGHT')}
                onMouseLeave={() => setHoveredChoice(null)}
                onFocus={() => setHoveredChoice('RIGHT')}
                onBlur={() => setHoveredChoice(null)}
                onClick={() => makeChoice(currentCard.rightChoice)}
                className="w-full p-3.5 bg-gray-900/80 hover:bg-indigo-950/40 focus:bg-indigo-950/40 border border-gray-800 hover:border-indigo-400 focus:border-indigo-400 focus-visible:ring-2 focus-visible:ring-indigo-400 outline-none text-right rounded-xl transition-all duration-150 flex items-start justify-end gap-2.5 shadow hover:shadow-indigo-950"
              >
                <div className="order-2 w-5 h-5 rounded-full bg-indigo-950 border border-indigo-700/60 flex items-center justify-center text-[10px] text-indigo-400 font-bold shrink-0 mt-0.5">
                  <ChevronRight className="w-3.5 h-3.5" />
                </div>
                <div className="order-1">
                  <div className="text-[11px] font-black tracking-wide text-indigo-400 uppercase">오른쪽 선택</div>
                  <div className="text-xs font-semibold text-gray-200 mt-0.5">{currentCard.rightChoice.text}</div>
                </div>
              </button>

            </div>

            {/* Micro Methodology/Target Info Badge */}
            <div className="flex justify-between items-center bg-gray-900/40 px-3 py-2 rounded-lg text-[10px] text-gray-400 border border-gray-900">
              <span className="flex items-center gap-1 font-medium"><Layers className="w-3 h-3 text-teal-400" /> {selectedMethodology.name}</span>
              <span className="flex items-center gap-1 font-medium"><Target className="w-3 h-3 text-indigo-400" /> {selectedTarget.name}</span>
            </div>

          </div>
        )}

        {/* SCREEN 3: GAME OVER */}
        {gameState === 'GAMEOVER' && (
          <div className="flex-1 flex flex-col justify-center py-6 text-center">
            <span className="text-6xl block mb-4 animate-shake">💥</span>
            <h2 className="text-2xl font-black text-rose-500 mb-1">프로젝트 좌초 (Game Over)</h2>
            <p className="text-xs text-rose-400 font-bold uppercase tracking-widest mb-6">최종 생존: {turn}턴</p>

            <div className="bg-rose-950/20 border border-rose-900/60 p-4 rounded-2xl mb-6 text-left">
              <h3 className="text-xs font-bold text-rose-300 flex items-center gap-1 mb-2">
                <Info className="w-3.5 h-3.5" /> 실패 원인 분석
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                {endReason}
              </p>
              {lastLogEntry && (
                <p className="text-[11px] text-gray-400 mt-3 italic border-t border-rose-900/40 pt-2">
                  마지막 선택 결과: "{lastLogEntry}"
                </p>
              )}
            </div>

            {/* Quick Stats Summary */}
            <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl text-left mb-8 space-y-2.5">
              <h3 className="text-xs font-bold text-gray-300 tracking-wider">최종 프로젝트 파라미터</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">예산:</span>
                  <span className="font-bold text-emerald-400">{resources.budget}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">일정 여유:</span>
                  <span className="font-bold text-sky-400">{resources.scheduleSlack}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">팀 사기:</span>
                  <span className="font-bold text-amber-400">{resources.teamMorale}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">제품 품질:</span>
                  <span className="font-bold text-fuchsia-400">{resources.quality}%</span>
                </div>
              </div>
            </div>

            <button
              data-testid="restart-game-btn"
              onClick={() => setGameState('START')}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-black font-extrabold text-sm tracking-wider uppercase rounded-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> 다시 도전하기
            </button>
          </div>
        )}

        {/* SCREEN 4: VICTORY */}
        {gameState === 'VICTORY' && (
          <div className="flex-1 flex flex-col justify-center py-6 text-center">
            <span className="text-6xl block mb-4 animate-float">🎉</span>
            <h2 className="text-2xl font-black text-emerald-400 mb-1">프로젝트 성공 배포!</h2>
            <p className="text-xs text-emerald-400/80 font-bold uppercase tracking-widest mb-6">
              목표 달성: {selectedTarget.victoryTurns}턴 완수 ({selectedMethodology.name})
            </p>

            <div className="bg-emerald-950/20 border border-emerald-900/60 p-4 rounded-2xl mb-6 text-left">
              <h3 className="text-xs font-bold text-emerald-300 flex items-center gap-1 mb-2">
                <Award className="w-3.5 h-3.5" /> 회고록 및 축전
              </h3>
              <p className="text-xs text-gray-200 leading-relaxed">
                축하합니다! 당신은 탁월한 경영 및 코디네이션 능력으로 {selectedTarget.name}의 모든 역경을 극복하고 프로덕션에 완벽하게 빌드를 태웠습니다.
                팀원들이 주말에 피자를 뜯으며 릴리즈 성배를 즐기고 있습니다.
              </p>
              {lastLogEntry && (
                <p className="text-[11px] text-gray-400 mt-3 italic border-t border-emerald-900/40 pt-2">
                  마지막 이정표: "{lastLogEntry}"
                </p>
              )}
            </div>

            {/* Quick Stats Summary */}
            <div className="bg-gray-900/50 border border-gray-800 p-4 rounded-xl text-left mb-8 space-y-2.5">
              <h3 className="text-xs font-bold text-gray-300 tracking-wider">성공적인 프로젝트 결산 수치</h3>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">최종 예산:</span>
                  <span className="font-bold text-emerald-400">{resources.budget}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">최종 일정:</span>
                  <span className="font-bold text-sky-400">{resources.scheduleSlack}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">최종 사기:</span>
                  <span className="font-bold text-amber-400">{resources.teamMorale}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">최종 품질:</span>
                  <span className="font-bold text-fuchsia-400">{resources.quality}%</span>
                </div>
              </div>
            </div>

            <button
              data-testid="restart-game-btn"
              onClick={() => setGameState('START')}
              className="w-full py-4 bg-gradient-to-r from-teal-500 to-indigo-500 text-black font-extrabold text-sm tracking-wider uppercase rounded-xl hover:opacity-95 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> 새 프로젝트 설계하기
            </button>
          </div>
        )}

      </main>

      {/* History Log Panel (only visible when playing or after finishing) */}
      {log.length > 0 && (
        <section className="bg-gray-900/80 border-t border-gray-800 max-h-[140px] overflow-y-auto p-3">
          <h3 className="text-[10px] font-black uppercase tracking-wider text-gray-400 flex items-center gap-1 mb-2">
            <History className="w-3 h-3" /> 최근 의사결정 히스토리 (최신순)
          </h3>
          <div className="space-y-2">
            {log.slice(0, 5).map((entry, idx) => (
              <div key={idx} className="text-[10px] border-l-2 border-teal-500/40 pl-2 leading-relaxed">
                <div className="flex justify-between text-gray-400">
                  <span className="font-bold text-teal-400">Turn {entry.turn} • {entry.character}</span>
                  <span className="text-[9px] bg-gray-950 px-1.5 py-0.2 rounded text-gray-400">선택: {entry.choiceText}</span>
                </div>
                <p className="text-gray-300 mt-0.5">{entry.outcomeText}</p>
              </div>
            ))}
          </div>
        </section>
      )}

    </div>
  );
}
