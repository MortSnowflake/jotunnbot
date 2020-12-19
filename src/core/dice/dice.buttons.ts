import { User } from "discord.js";
import { Storage, Player } from "../discord/storage";
import { PartialUser } from "discord.js";
import { IReaction } from "..";
import { spendLoyaltyPoint } from "../lore/lore.utils";
import { burnMomentum, count } from "../character/character.manager";
import { moves } from "../../local/en/dice/moves-en";
import { MessageEmbed } from "discord.js";
import { Local } from "../../local";

export const diceHandlers: {
  [id: string]: (
    reaction: IReaction,
    storage: Storage,
    user: User | PartialUser
  ) => void;
} = {
  luck: (r, s, u) => {
    burn(r, s, u, s.local.dice.spendLuck, (player, local) =>
      spendLoyaltyPoint(player, local)
    );
  },
  moment: (r, s, u) => {
    burn(r, s, u, s.local.dice.spendMomentum, (player) => {
      burnMomentum(
        player.character.momentum,
        count(player.character.debilities)
      );
      s.updatePlayerAndCharEmbed(player);
    });
  },
};

async function burn(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser,
  answer: string,
  f: (p: Player, local: Local) => any
) {
  const { local } = storage;
  const player = await storage.getPlayer(user.id);
  f(player, local);
  const content = reaction.message.embeds.length
    ? reaction.message.embeds[0].description
    : reaction.message.content;

  // send miss improve
  const res = content?.includes("Miss")
    ? local.dice.missToWeak
    : local.dice.weakToStrong;

  await reaction.message.channel.sendWithEmoji(`${answer} ${res}`);

  // resend result if it possible
  if (
    reaction.message.embeds.length &&
    reaction.message.embeds[0].footer?.text
  ) {
    const move = moves.find(
      (m) => m.name === reaction.message.embeds[0].footer?.text
    );
    const result = content?.includes("Miss")
      ? move?.results[1]
      : move?.results[2];
    reaction.message.channel.sendWithEmoji(
      new MessageEmbed().setDescription(result)
    );
  }
}
