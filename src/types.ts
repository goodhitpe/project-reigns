export type MethodologyType = 'AGILE' | 'WATERFALL' | 'DEVOPS';

export interface Methodology {
  id: MethodologyType;
  name: string;
  description: string;
  // Starting resources adjustment: [Budget, ScheduleSlack, TeamMorale, Quality]
  startingModifiers: [number, number, number, number];
}

export type TargetType = 'MVP' | 'ENTERPRISE' | 'UNICORN';

export interface ProjectTarget {
  id: TargetType;
  name: string;
  description: string;
  victoryTurns: number;
  // Difficulty multiplier or offset
  startingModifiers: [number, number, number, number];
}

export interface ResourceStats {
  budget: number;        // 예산 (0 - 100)
  scheduleSlack: number; // 일정 여유 (0 - 100)
  teamMorale: number;    // 팀 사기 (0 - 100)
  quality: number;       // 제품 품질 (0 - 100)
}

export interface ChoiceEffects {
  budget: number;
  scheduleSlack: number;
  teamMorale: number;
  quality: number;
}

export interface Choice {
  text: string;
  effects: ChoiceEffects;
  logText: string;
}

export interface Card {
  id: string;
  character: string;
  role: string;
  avatar: string; // Emoji character
  dialogue: string;
  leftChoice: Choice;
  rightChoice: Choice;
  // Optional condition to filter cards
  requiredMethodology?: MethodologyType[];
}

export interface LogEntry {
  turn: number;
  cardTitle: string;
  character: string;
  choiceText: string;
  outcomeText: string;
}
