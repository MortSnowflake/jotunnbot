import { User } from "discord.js";
import { Storage, Player } from "../discord/storage";
import { reset, sub, add } from "../tracker/tracker.manager";
import { burnMomentum, count } from "./character.manager";
import { PartialUser } from "discord.js";
import { IReaction } from "..";

export const charListHandlers: {
  [id: string]: (
    reaction: IReaction,
    storage: Storage,
    user: User | PartialUser
  ) => void;
} = {
  health: (r, s, u) => {
    changeChar(r, s, u, (player) => reset(player.character.status.health));
  },
  healthadd: (r, s, u) => {
    changeChar(r, s, u, (player) => add(player.character.status.health));
  },
  healthsub: (r, s, u) => {
    changeChar(r, s, u, (player) => sub(player.character.status.health));
  },

  spirit: (r, s, u) => {
    changeChar(r, s, u, (player) => reset(player.character.status.spirit));
  },
  spiritadd: (r, s, u) => {
    changeChar(r, s, u, (player) => add(player.character.status.spirit));
  },
  spiritsub: (r, s, u) => {
    changeChar(r, s, u, (player) => sub(player.character.status.spirit));
  },

  supply: (r, s, u) => {
    changeChar(r, s, u, (player) => reset(player.character.status.supply));
  },
  supplyadd: (r, s, u) => {
    changeChar(r, s, u, (player) => add(player.character.status.supply));
  },
  supplysub: (r, s, u) => {
    changeChar(r, s, u, (player) => sub(player.character.status.supply));
  },

  moment: (r, s, u) => {
    changeChar(r, s, u, (player) =>
      burnMomentum(
        player.character.momentum,
        count(player.character.debilities)
      )
    );
  },
  momentadd: (r, s, u) => {
    changeChar(r, s, u, (player) => add(player.character.momentum));
  },
  momentsub: (r, s, u) => {
    changeChar(r, s, u, (player) => sub(player.character.momentum));
  },
};

async function changeChar(
  reaction: IReaction,
  storage: Storage,
  user: User | PartialUser,
  f: (p: Player) => any
) {
  //const player = await storage.getPlayer(user.id);
  //f(player);
  //storage.updatePlayer(player);
  //reaction.message.editWithEmoji(local.character.listEmbed(player.character));
  reaction.message.reactions.removeAll();
}
