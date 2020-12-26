import { MessageEmbed } from "discord.js";
import {
  CharacterWizardStep,
  Character as CharModel,
} from "../core/character/character.model";

export interface ICommand {
  title: string;
  description: string;
  helpText: string;
  aliases: string[];
  params?: any;
  type?: string;
  isHidden?: boolean;
}

export interface IMove {
  type: string;
  name: string;
  aliases: string[];
  fakeAliases?: string[];
  description: string;
  intro?: string;
  results: string[];
  attribute?: string;
  lowAttribute?: string[];
  highAttribute?: string[];
  withoutRoll?: boolean;
  argIsRequired?: boolean;
  findFromCode?: string;
  trainingStep?: CharacterWizardStep;
  trainingResult?: number;
  params?: any;
  customMove?: string;
}

export interface Commands {
  [id: string]: ICommand;
}

export interface SeparatedCommands {
  [key: string]: Commands;
}

export interface Attributes {
  edge: ICommand;
  heart: ICommand;
  iron: ICommand;
  shadow: ICommand;
  wits: ICommand;
}

export interface Status {
  spirit: ICommand;
  health: ICommand;
  supply: ICommand;
}

export interface Wizard {
  step: CharacterWizardStep;
  message: string;
}

export interface Character {
  attributes: Attributes;
  status: Status;
  forgetToMarkProgress: string;
  wizard: Wizard[];
  cantIncreaseHealth: string;
  cantIncreaseSpirit: string;
  cantIncreaseSupply: string;
  nowHasHealth: string;
  nowHasSpirit: string;
  nowHasSupply: string;
  nowHasMomentum: string;
  nowHasBond: string;
  allComands: string;
  useRule: string;
  userDeleteError: string;
  userAlreadyExistMsg: (char: CharModel) => string;
  firstSteps: (playerCnl: string, infoCnl: string) => string;
  listEmbed: (char: CharModel) => MessageEmbed;
}

export interface StringNumberDictionary {
  [id: string]: number;
}

export interface NumberStringDictionary {
  [id: number]: string;
}

export interface Asset {
  health: string;
  xpNotEnough: string;
  hpNotEnough: string;
  enter: string;
  forAsset: string;
  withoutAnswer: string;
  declineAsset: string;
  assetCancelationInformation: string;
  assetCancelation: string;
  assetParse: StringNumberDictionary;
  assetType: NumberStringDictionary;
  assetChanelName: NumberStringDictionary;
  assets: { [cnl: string]: Partial<Asset>[] };
  customAsset: string;
}

export interface Scene {
  coop: string;
  gm: string;
  me: string;
  no: string;
  yes: string;
  storyteller: string;
  doomPointsTracker: string;
  doomPointsDontForget: string;
  sceneRules: (phasesChnl: string, chronicChnl: string) => string;
  endOfSceneAdvice: (sceneName: string) => string;
  worldIsChanging: (wordChangeCnl: string) => string;
}

export interface Discord {
  chronicChannel: string;
  testChronicChannel: string;
  tableChannel: string;
  sceneCathegoryName: string;
  myCathegoryName: string;
  rulesCathegoryName: string;
  channelPrefix: string;
  playerChannelName: string;
  helperChannelName: string;
  channelsInfo: string;
  masterChannelName: string;
  worldIsChanging: string;
}

export interface ProgTracker {
  tracker: string;
  progress: string;
  abandonMsg: string;
  doneMsg: string;
  privateDoneMsg: string;
  suffix: NumberStringDictionary;
  rankParse: StringNumberDictionary;
  ranks: NumberStringDictionary;
}

export interface Table {
  title: string;
  aliases: string[];
  results: NumberStringDictionary;
  type?: string;
  headers?: string[];
  d?: string;
}

export interface Oracles {
  oracle: string;
  oraclelow: string;
  oracles: string;
  notFound: string;
  specify: string;
  ask: string;
  roll: string;
  vs: string;
  unsupported: string;
  send: string;
  forHelp: string;
  plotName: string;
  plotTypes: string[];
  locationName: string;
  locationTypes: string[];
  charName: string;
  charTypes: string[];
  tables: Table[];
}

export interface Delve {
  domainList: string;
  themeList: string;
  wrongDomain: string;
  wrongTheme: string;
  sceneRules: string;
  delveProgress: string;
  denizenCnlInstructions: string;
  denizenCnlPref: string;
  rollCnlPref: string;
  nonDenizenCnlErr: string;
  edge: string;
  shadow: string;
  wits: string;
  revealDangerOptions: string;
  deepInDelveOptions: string;
  oportunityOptions: string;
  toThemeAndDomain: (theme: string, domain: string) => string;
  fromThemeAndDomain: (args: string) => string[];
}

export interface Master {
  loyaltyPointsGrantErr: string;
  loyaltyPointsGrantSucces: string;
  loyaltyPointsTitle: string;
  loyaltyPointsCurrent: string;
  loyaltyPointsAll: string;
  loyaltySpendError: string;
  loyaltySpendSucces: string;
  masterChnlDescription: string;
}

export interface Help {
  aliases: string;
  playerRoleError: string;
  playerRoleErrorAgain: string;
  commands: string;
  upAliases: string;
}

export interface Dice {
  actionResults: string[];
  twist: string;
  critOne: string;
  critSix: string;
  or: string;
  luckDesc: string;
  momentDesc: string;
  spendLuck: string;
  spendMomentum: string;
  missToWeak: string;
  weakToStrong: string;
  payThePrice: string;
}

export interface Local {
  commands: Commands;
  separatedCommands: SeparatedCommands;
  character: Character;
  asset: Asset;
  scene: Scene;
  discord: Discord;
  progTracker: ProgTracker;
  oracles: Oracles;
  delve: Delve;
  master: Master;
  moves: IMove[];
  rules: { channel: string; messages: string[] }[];
  adventureMoves: IMove[];
  battleMoves: IMove[];
  relationMoves: IMove[];
  aftermathMoves: IMove[];
  fateMoves: IMove[];
  delveMoves: IMove[];
  help: Help;
  dice: Dice;
}
