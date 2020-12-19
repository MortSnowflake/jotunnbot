import { TextChannel, Client, Guild, Message } from "discord.js";
import "./discord-extensions";
import { Character, CharacterWizardStep } from "../character/character.model";
import { Local } from "../../local";
import { ClientUser, User } from "discord.js";
import { loyaltyPointsEmbed } from "../lore/lore.utils";
import { COLORS } from "./discord-colors";

export class Storage {
  private STORAGE_CHANNEL_NAME = "_storage__btvrbl_";
  private cache = ""; //TODO: create cache or cashe from msg cashe
  private guild: Guild;
  private storageChannel: TextChannel;

  public botUser: ClientUser;
  public local: Local;

  constructor(client: Client, local: Local) {
    this.local = local;
    this.guild = client.guilds.cache.array()[0];

    this.storageChannel = this.guild.getChannelByName(
      this.STORAGE_CHANNEL_NAME
    ) as TextChannel;

    this.botUser = client.user!;

    if (!this.storageChannel) {
      this.guild
        .createPrivateChannel(client.user!.id, this.STORAGE_CHANNEL_NAME, local)
        .then((c) => {
          this.storageChannel = c;
        });
    }
  }

  public renameUserNick(userId: string, name?: string) {
    if (!name) {
      name = this.guild.member(userId)?.user.username!;
    }
    this.guild.member(userId)?.setNickname(name);
  }

  public addPlayerRole(userId: string) {
    const playerRole = this.guild.roles.cache.find(
      (r) => r.color === COLORS.GREEN
    );
    this.guild.member(userId)?.roles.add(playerRole!);
  }

  public removePlayerRole(userId: string) {
    const playerRole = this.guild.roles.cache.find(
      (r) => r.color === COLORS.GREEN
    );
    this.guild.member(userId)?.roles.remove(playerRole!);
  }

  public createRole(userId: string, name: string, color: number) {
    this.guild.roles
      .create({ data: { name: name, color } })
      .then((r) => this.guild.member(userId)?.roles.add(r));
  }

  public clearRoles(user: User, color: number) {
    this.guild
      .member(user)
      ?.roles.cache.array()
      .filter((r) => r.color === color)
      .forEach((r) => this.guild.member(user)?.roles.remove(r));
  }

  public async getPlayer(userId: string) {
    let player: Player = (await this.getAllPlayersRaw())
      .map((m) => JSON.parse(m.content))
      .find((p) => p.userId === userId);

    if (!player) {
      const hlpChannel = await this.guild.createPrivateChannel(
        userId,
        this.local.discord.helperChannelName,
        this.local
      );

      const charChannel = await this.guild.createPrivateChannel(
        userId,
        this.local.discord.playerChannelName,
        this.local
      );

      const masterChannel = await this.guild.createPrivateChannel(
        userId,
        this.local.discord.masterChannelName,
        this.local
      );

      masterChannel
        .send(loyaltyPointsEmbed(this.local))
        .then((m) => m.pin())
        .then((m) =>
          m.channel.send(
            this.local.master.masterChnlDescription(
              this.guild.getChannelMasterInfo(this.local).toString()!
            )
          )
        );

      player = await this.createPlayer(
        new Player(userId, hlpChannel, charChannel, masterChannel)
      );
    } else {
      player.charChannel = this.guild.channels.cache.get(
        (player.charChannel as unknown) as string
      ) as TextChannel;

      player.helperChannel = this.guild.channels.cache.get(
        (player.helperChannel as unknown) as string
      ) as TextChannel;

      player.masterChannel = this.guild.channels.cache.get(
        (player.masterChannel as unknown) as string
      ) as TextChannel;
    }

    return player;
  }

  public createPlayer(player: Player) {
    const {
      helperChannel: helpChnl,
      charChannel: charChnl,
      masterChannel: masterChnl,
      ...item
    } = player;
    (item as any).helperChannel = helpChnl.id;
    (item as any).charChannel = charChnl?.id;
    (item as any).masterChannel = masterChnl?.id;

    return this.storageChannel.send(JSON.stringify(item)).then((m) => player);
  }

  public getEmoji(id: string) {
    return this.guild.emojis.cache.get(id)?.toString();
  }

  public async updatePlayer(player: Player) {
    const {
      helperChannel: helpChnl,
      charChannel: charChnl,
      masterChannel: masterChnl,
      ...item
    } = player;
    (item as any).helperChannel = helpChnl.id;
    (item as any).charChannel = charChnl?.id;
    (item as any).masterChannel = masterChnl?.id;
    (await this.getAllPlayersRaw())
      .find((m) => JSON.parse(m.content).userId === item.userId)
      ?.edit(JSON.stringify(item));
  }

  public async deleteChar(player: Player) {
    player.charChannel?.delete();
    player.charChannel = await this.guild.createPrivateChannel(
      player.userId,
      this.local.discord.playerChannelName,
      this.local
    );
    player.character = new Character();
    player.characterWizardStep = CharacterWizardStep.Name;
    this.updatePlayer(player);
    player.helperChannel.send(
      `<@${player.userId}>, ` +
        this.local.character.wizard.find(
          (w) => w.step === CharacterWizardStep.Name
        )?.message
    );
  }

  public async deletePlayer(player: Player) {
    player.charChannel?.delete();
    player.helperChannel?.delete();
    player.masterChannel?.delete();
    (await this.getAllPlayersRaw())
      .find((m) => JSON.parse(m.content).userId === player.userId)
      ?.delete();
  }

  public async updateCharEmbed(player: Player) {
    if (player.charChannel) {
      (await player.charChannel.messages.fetchPinned())
        .first()
        ?.editWithEmoji(this.local.character.listEmbed(player.character));
    }
  }

  public updatePlayerAndCharEmbed(player: Player) {
    this.updatePlayer(player);
    this.updateCharEmbed(player);
  }

  private getAllPlayersRaw(): Promise<Message[]> {
    return this.storageChannel.messages.fetch().then((v) => v.map((m) => m));
  }
}

//max message size = 2000
enum StorageFields {
  MetaData,
  AppSettings,
  PlayerDataLevel,
}

export class Player {
  character = new Character();
  characterWizardStep = CharacterWizardStep.Name;
  constructor(
    public userId: string,
    public helperChannel: TextChannel,
    public charChannel: TextChannel,
    public masterChannel: TextChannel
  ) {}
}

interface AppSettings {}

interface MetaData {}
