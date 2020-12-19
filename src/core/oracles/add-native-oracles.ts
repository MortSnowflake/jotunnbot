import { Message, TextChannel, MessageEmbed } from "discord.js";
import { Local } from "../../local";
import { COLORS } from "../discord/discord-colors";

export function addPlotNativeOracle(message: Message, local: Local) {
  for (let index = 0; index < local.oracles.plotTypes.length; index++) {
    const element = local.oracles.plotTypes[index];

    addNativeOracle(message, element, local.oracles.plotName, local);
  }
}

export function addPlacesNativeOracle(message: Message, local: Local) {
  for (let index = 0; index < local.oracles.locationTypes.length; index++) {
    const element = local.oracles.locationTypes[index];

    addNativeOracle(message, element, local.oracles.locationName, local);
  }
}

export function addCharsNativeOracle(message: Message, local: Local) {
  for (let index = 0; index < local.oracles.charTypes.length; index++) {
    const element = local.oracles.charTypes[index];

    addNativeOracle(message, element, local.oracles.charName, local);
  }
}

export function addNativeOracle(
  message: Message,
  name: string,
  chnlName: string,
  local: Local
) {
  const channel = message.guild?.getChannelByName(chnlName) as TextChannel;

  channel
    .send(
      new MessageEmbed()
        .setColor(COLORS.GREEN)
        .setTitle(name)
        .setFooter(local.oracles.oracle)
    )
    .then((m) => m.reactEmoji("rolloracle"));
}
