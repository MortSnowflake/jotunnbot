import { AssetEnum } from "../../../core/asset/asset.model";
import { ICommand } from "../../../local";
import { Asset } from "../..";
import assets from "./assets.json";

const assetParse: { [id: string]: AssetEnum } = {
  ["COMPANION"]: AssetEnum.Ally,
  ["COMBAT TALENT"]: AssetEnum.BattleSkill,
  ["PATH"]: AssetEnum.Path,
  ["RITUAL"]: AssetEnum.Ritual,
  ["OTHER"]: AssetEnum.Other,
};

const assetType = {
  [AssetEnum.Ally]: "COMPANION",
  [AssetEnum.BattleSkill]: "COMBAT TALENT",
  [AssetEnum.Path]: "PATH",
  [AssetEnum.Ritual]: "RITUAL",
  [AssetEnum.Other]: "OTHER",
};

const assetChanelName = {
  [AssetEnum.Ally]: "companion",
  [AssetEnum.BattleSkill]: "combat-talent",
  [AssetEnum.Path]: "path",
  [AssetEnum.Ritual]: "ritual",
  [AssetEnum.Other]: "other",
};

export const assetCommands: {
  [id: string]: ICommand;
} = {
  addAsset: {
    title: "Add new asset",
    description: "",
    helpText: `
.asset <path> | <name> | <skill 1> | <skill 2> | <skill 3> | [description] | [Max. health] | [input field name]

, where <...> is a required field and [...] is an optional field. Optional fields can be omitted, but if, for example, you need to specify the name of the input field but you do not need health and description, then the parameters should be left blank
like this. asset <path>; <name>; <skill 1>; <skill 2>; <skill 3> ;;; [input field name]

You can use the symbol; instead of |, but sometimes the symbol appears in the descriptions of assets; it should be replaced with. or, in the description, so that the bot would understand you correctly.

Example:
.asset Ally | HAWK | Vigilant: when Traveling add +1. | Ardent: +1 momentum | Vigilant: add +2. | Your hawk can help. | 3 | Name |
`,
    aliases: ["asset", "as"],
  },
};

export const asset: Asset = {
  health: "Health",
  xpNotEnough: "Character doesn't have enough experience",
  hpNotEnough: "Can't upgrade",
  enter: "enter",
  forAsset: "for the asset",
  withoutAnswer: "I didn't get an answer... beep beep...",
  declineAsset: "would you like to abandon the asset? (yes/no)",
  assetCancelationInformation:
    "Only 3 experience points will be returned for the asset. To reject the asset send: yes. Otherwise, any other message.",
  assetCancelation:
    "abandoned the skills of the asset. You gained 3 experience point. Think of a complication or conflict connected with the abandoned asset.",
  assetParse,
  assetType,
  assetChanelName,
  assets: assets as { [cnl: string]: Partial<Asset>[] },
  customAsset: `
To add a new booklet send the command .asset
\`\`\`
.asset <type> | <name> | <skill 1> | <skill 2> | <skill 3> | [description] | [Max. health] | [name of the input field] 
\`\`\`
, where <...> is a required field, and [...] is an optional field. Optional fields can be omitted, but if, for example, you need to specify the name of the input field but you do not need health and description, then the parameters should be left blank like this 
\`\`\`
.asset <type>; <name>; <skill 1>; <skill 2>; <skill 3> ;;; [input field name] 
\`\`\`
You can use the symbol; instead of |, but sometimes the symbol appears in the descriptions of booklets; it should be replaced with. or, in the description, so that the bot would understand you correctly.
    
Example:
\`\`\`
.asset COMPANION | HAWK | Vigilant: when Traveling add +1 | Ardent: +1 Trump. | Alert: add +2. | Your hawk can help. | 3 | Name | 
\`\`\`
  `,
};
