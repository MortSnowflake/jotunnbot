const allyEn = [
  `.asset COMPANION | CAVE LION | 
Eager: When your cat chases down big game, you may Resupply with +edge (instead of +wits). If you do, take +1 supply or +1 momentum on a strong hit.  | 
Inescapable: When you Enter the Fray or Strike by sending your cat to attack, roll +edge. On a hit, take +2 momentum. | 
Protective: When you Make Camp, your cat is alert to trouble. If you or an ally choose to relax, take +1 spirit. If you focus, take +1 momentum. | 
Your cat takes down its prey. | 4 | Name`,

  `.asset COMPANION | HORSE | 
Swift: When you Face Danger +edge using your horse’s speed and grace, or when you Undertake a Journey, add +1.| 
Fearless: When you Enter the Fray or Secure an Advantage +heart by charging into combat, add +1 and take +1 momentum on a hit.| 
Mighty: When you Strike or Clash at close range while mounted, add +1 and inflict +1 harm on a hit.| 
You and your horse ride as one. | 5 | Name`,

  `.asset COMPANION | HAWK | 
Far-seeing: When you Undertake a Journey, or when you Resupply by hunting for small game, add +1.| 
Fierce: When you Secure an Advantage +edge using your hawk to harass and distract your foes, add +1 and take +1 momentum on a hit. | 
Vigilant: When you Face Danger +wits to detect an approaching threat, or when you Enter the Fray +wits against an ambush, add +2 | 
Your hawk can aid you while it is aloft. | 3 | Name`,

  `.asset COMPANION | GIANT SPIDER | 
Discreet: When you Secure an Advantage by sending your spider to scout a place, add +1 and take +1 momentum on a hit. | 
Soul-Piercing: You may Face Danger +shadow by sending your spider to secretly study someone. On a hit, the spider returns to reveal the target’s deepest fears through a reflection in its glassy eyes. Use this to Gather Information and reroll any dice. | 
Ensnaring: When your spider sets a trap, add +1 as you Enter the Fray +shadow. On a strong hit, also inflict 2 harm. | 
Your spider uncovers secrets. | 4 | Name`,

  `.asset COMPANION | HOUND | 
Sharp: When you Gather Information using your hound’s keen senses to track your quarry or investigate a scene, add +1 and take +1 momentum on a hit. | 
Ferocious: When you Strike or Clash alongside your hound and score a hit, inflict +1 harm or take +1 momentum. | 
Loyal: When you Endure Stress in the company of your hound, add +1| 
Your hound is your steadfast companion. | 4 | Name`,

  `.asset COMPANION | KINDRED | 
Skilled: When you make a move outside of combat aided by your companion’s expertise, add +1. | 
Shield-Kin: When you Clash or Battle alongside your companion, or when you Face Danger against an attack by standing together, add +1. | 
Bonded: Once you mark a bond with your companion, add +1 when you Face Desolation in their presence. | 
Your friend stands by you. | 4 | Name`,

  `.asset COMPANION | MAMMOTH | 
Lumbering: When your mammoth travels with you as you Undertake a Journey, you may add +2 but suffer -1 momentum (decide before rolling). | 
Beast of burden: When you make a move which requires you to roll +supply, you may instead roll +your mammoth’s health. | 
Overpowering: When you Strike or Clash by riding your mammoth against a pack of foes, add +1 and inflict +1 harm on a hit. | 
Your mammoth walks a resolute path. | 5 | Name`,

  `.asset COMPANION | OWL | 
Nocturnal: If you Resupply at night by sending your owl to hunt, take +2 momentum on a hit. When you Enter the Fray +wits against an ambush in darkness, add +1 and take +1 momentum on a hit. | 
Sage: When you leverage your owl’s secret knowledge to perform a ritual, add +1 or take +1 momentum on a hit (decide before rolling). | 
Embodying: When you Face Death, take your owl’s health as +momentum before you roll. | 
Your owl soars through the darkness. | 3 | Name`,

  `.asset COMPANION | RAVEN | 
Sly: When you Secure an Advantage or Face Danger +shadow using your raven to perform trickery (such as creating a distraction or stealing a small object) add +1 and take +1 momentum on a hit. | 
Knowing: When you Face Death,add +2 and take +1 momentum on a hit. | 
Diligent: When your raven carries messages for you, you may Secure an Advantage, Gather Information, or Compel from a distance. | 
Your raven heeds your call. | 2 | Name`,

  `.asset COMPANION | YOUNG WYVERN | 
Insatiable: When you Undertake a Journey and score a hit, you may suffer -1 supply in exchange for +2 momentum. | 
Indomitable: When you make the Companion Endure Harm move for your wyvern, add +2 and take +1 momentum on a hit. | 
Savage: When you Strike by commanding your wyvern to attack, roll +heart. Your wyvern inflicts 3 harm on a hit.| 
Your wyvern won’t devour you. For now. | 5 | Name`,
];

const pathEn = [
  `.asset PATH | ALCHEMIST | 
!When you create an elixir, choose an effect: Deftness (edge), audacity (heart), vigor (iron), slyness (shadow), or clarity (wits). Then, suffer -1 supply and roll +wits. On a strong hit, you create a single dose. The character who consumes the elixir must Face Danger +iron and score a hit, after which they add +1 when making moves with the related stat until their health, spirit, or momentum fall below +1. On a weak hit, as above, but suffer an additional -1 supply to create it.| 
As above, and you may choose two effects for a single dose, or create two doses of the same effect. | 
When you prepare an elixir, add +1 and take +1 momentum on a hit.`,

  `.asset PATH | ANIMAL KIN | 
!When you make a move to pacify, calm, control, aid, or fend off an animal (or an animal or beast companion), add +1 and take +1 momentum on a hit.| 
You may add or upgrade an animal or beast companion asset for 1 fewer experience. Once you mark all their abilities, you may Forge a Bond with them and take an automatic strong hit. When you do, mark a bond twice and take 1 experience.| 
Once per fight, when you leverage your animal or beast companion to make a move, reroll any dice. On a hit, take +1 momentum.|`,

  `.asset PATH | BANNER-SWORN | 
!When you Swear an Iron Vow to serve your leader or faction on a mission, you may reroll any dice. When you Fulfill Your Vow and mark experience, take +1 experience.| 
When you Sojourn or Make Camp in the company of your banner-kin, add +1 and take +1 momentum on a hit.| 
When you Enter the Fray bearing your banner, add +1 and take +1 momentum on a hit. When you burn momentum while carrying your banner in combat, take +1 momentum after you reset.| 
Once you mark a bond with a leader or faction... ||Name`,

  `.asset PATH | BATTLE-SCARRED | 
You focus your energies: Reduce your edge or iron by 1 and add +2 to wits or heart, or +1 to each (to a maximum of +4).| 
You overcome your limitations: Reduce your maximum health by 1. Maimed no longer counts as a debility, and does not reduce your maximum momentum or reset value. When you Endure Stress +heart, take +1 momentum on a strong hit.| 
You have stared down death before: When you are at 0 health and Endure Harm, you may roll +wits or +heart (instead of +health or +iron). If you do, take +1 momentum on a hit.|
Once you become maimed...`,

  `.asset PATH | BLADE-BOUND | 
When you Enter the Fray or Draw the Circle while wielding your kin-blade, add +1 and take +1 momentum on a hit.| 
When you Gather Information by listening to the whispers of your kin-blade, add +1 and take +2 momentum on a hit. Then, Endure Stress (2 stress).| 
When you Strike with your kin-blade to inflict savage harm (decide before rolling), add +1 and inflict +2 harm on a hit. Then, Endure Stress (2 stress).|
Once you mark a bond with a kin-blade, a sentient weapon imbued with the spirit of your ancestor... || Name`,

  `.asset PATH | BONDED | 
!When you make a move which gives you an add for sharing a bond, add+1 more.| 
When you completely fill a box on your bonds progress track, envision what your relationships have taught you. Then, take 1 experience and +2 momentum.| 
When you make a move in a crucial moment and score a miss, you may cling to thoughts of your bond-kin for courage or encouragement. If you do, reroll any dice. On another miss, in addition to the outcome of the move, you must mark shaken or corrupted. If both debilities are already marked, *Face Desolation*.|`,

  `.asset PATH | DANCER | 
!When you *Secure an Advantage* +edge by dancing for an audience, add +1 and take +2 momentum on a hit. On a strong hit, also add +2 (one time only) if you make a move to interact with someone in the audience.| 
When you Face Danger +edge in a fight by nimbly avoiding your foe’s attacks, add +1 and take +1 momentum on a hit.| 
When you or an ally make a progress move and score a hit, you may perform a dance to commemorate the event. If you do, roll +edge. On a strong hit, you and each of your allies take +2 momentum and +1 spirit. On a weak hit, you take +1 momentum or +1 spirit, but your allies are unmoved.|`,

  `.asset PATH | DEVOTANT | 
!When you say your daily prayers, you may Secure an Advantage by asking your god to grant a blessing. If you do, roll +your god’s stat. On a hit, take +2 momentum.| 
When you Swear an Iron Vow to serve your god on a divine quest, you may roll +your god’s stat and reroll any dice. When you Fulfill Your Vow and mark experience, take +1 experience.| 
When you Sojourn by sharing the word of your god, you may roll +your god’s stat. If you do, take +1 momentum on a hit.|
|| God’s Name / Stat`,

  `.asset PATH | EMPOWERED | 
!When you Sojourn and score a weak hit or miss, you may claim the rights of hospitality warranted by your title or lineage. If you do, roll all dice again and add +1. On a miss, you are refused, and your presumption causes significant new trouble.| 
When you exert your title or lineage to Compel, add +1 and take +1 momentum on a hit.| 
When you forgo your title or lineage and Forge a Bond as an equal, or when you Swear an Iron Vow to serve someone of a lower station, add +1 and take +1 momentum or +1 spirit on a hit.|
|| Title/Lineage`,

  `.asset PATH | FORTUNE HUNTER | 
!When you Swear an Iron Vow to someone under the promise of payment, add +1 and give the quest a special mark. When you successfully Fulfill Your Vow to them, take +wealth equal to the rank of the quest. If you leverage wealth when making a move where resources are a factor, add +wealth and suffer -1 wealth.| 
When in a community or trading, you may suffer -1 wealth and take +2 supply.| 
When you Resupply by scavenging or looting, and score a strong hit with a match, you may envision finding an object of value. If you do, take +1 supply (instead of +2) and +1 wealth.|
|5`,

  `.asset PATH | HERBALIST | 
!When you attempt to Heal using herbal remedies, and you have at least +1 supply, choose one (decide before rolling).
• Add +2.
• On a hit, take or give an additional +1 health.| 
When you Heal a companion, ally, or other character, and score a hit, take +1 spirit or +1 momentum.| 
When you Make Camp and choose the option to partake, you can create a restorative meal. If you do, you and your companions take +1 health. Any allies who choose to partake also take +1 health, and do not suffer -supply.|`,
];

const battleSkillEn = [
  `.asset COMBAT TALENT | ARCHER | 
!When you Secure an Advantage by taking a moment to aim, choose your approach and add +1.
• Trust your instincts: Roll +wits, and take +2 momentum on a strong hit. 
• Line up your shot: Roll +edge, and take +1 momentum on a hit.| 
Once per fight, when you Strike or Clash, you may take extra shots and suffer -1 supply (decide before rolling). When you do, reroll any dice. On a hit, inflict +2 harm and take +1 momentum. | 
When you Resupply by hunting, add +1 and take +1 momentum on a hit. | 
If you wield a bow...`,

  `.asset COMBAT TALENT | BERSERKER | 
  !When you Secure an Advantage or Compel by embodying your wild nature, add +1 and take +1 momentum on a hit.| 
  When you Strike or Clash by unleashing your rage (decide before rolling), inflict +1 harm on a hit. Then, choose one.
  • Push yourself: Endure Harm (1 harm).
  • Lose yourself: Endure Stress (1 stress).| 
  When you Endure Harm in a fight, and your health is above 0, you may let the pain inflame your wildness (decide before rolling). If you then score a strong hit and choose to embrace the pain, take +momentum equal to your remaining health. A weak hit counts as a miss.| 
 If you are clad only in animal pelts…`,

  `.asset COMBAT TALENT | BRAWLER | 
  !When you Secure an Advantage +iron by engaging in close-quarters brawling (such as punching, tripping, or grappling), add +1. If you score a hit, you may also inflict 1 harm.| 
  When you use an unarmed attack or simple weapon to Strike with deadly intent, add +2 and inflict 2 harm on a hit (instead of 1). On a weak hit or miss, suffer -1 momentum (in addition to any other outcome of the move).| 
  When you Face Danger or Clash against a brawling attack, add +1 and take +1 momentum on a hit.| 
  If you are unarmed or fighting with a non-deadly weapon...`,

  `.asset COMBAT TALENT | CUTTHROAT | 
  !When you are in position to Strike at an unsuspecting foe, choose one (before rolling).
  • Add +2 and take +1 momentumon a hit.
  • Inflict +2 harm on a hit.| 
  When you Compel someone at the point of your blade, or when you rely on your blade to Face Danger, add +1.| 
  Once per fight, when you Secure an Advantage +shadow by performing a feint or misdirection, reroll any dice and take +1 momentum on a hit.| 
  If you wield a dagger or knife...`,

  `.asset COMBAT TALENT | DUELIST | 
  !When you Strike or Clash, you may add +2. If you do (decide before rolling), inflict +1 harm on a strong hit and count a weak hit as a miss.| 
  Once per fight, when you Secure an Advantage +edge by making a bold display of your combat prowess, you may reroll any dice.| 
  When you Draw the Circle, choose one (before rolling).
  • Add +2.
  • Take +2 momentum on a hit.| 
  If you wield a bladed weapon in each hand...`,

  `.asset COMBAT TALENT | FLETCHER | 
  !When you Secure an Advantage by crafting arrows of fine quality, add +1. Then, take +1 supply or +1 momentum on a hit.| 
  When you Resupply by recovering or gathering arrows after a battle, add +2.| 
  When you craft a single arrow designated for a specific foe, envision the process and materials, and roll +wits. On a strong hit, take both. On a weak hit, choose one.
  • Seeker: When a shooter uses the arrow to Strike or Clash against this foe, reroll any dice (one time only).
  • Ravager: When a shooter uses the arrow to inflict harm against this foe, inflict +1d6 harm (one time only).`,

  `.asset COMBAT TALENT | IRONCLAD | 
  !When you equip or adjust your armor, choose one.
  • Lightly armored: When you Endure Harm in a fight, add +1 and take +1 momentum on a hit.
  • Geared for war: Mark encumbered (send \`.encumbered\`). When you Endure Harm in a fight, add +2 and take +1 momentum on a hit.| 
  When you Clash while you are geared for war, add +1.| 
  When you Compel in a situation where strength of arms is a factor, add +2.| 
  If you wear armor...`,

  `.asset COMBAT TALENT | LONG-ARM | 
  !In your hands, a humble staff is a deadly weapon (2 harm). When you instead use it as a simple weapon (1 harm), you may Strike or Clash +edge (instead of iron). If you do, add +1 and take +1 momentum on a hit.| 
  When you Secure an Advantage +edge using your staff to disarm, trip, shove, or stun your foe, add +1 and take +1 momentum on a hit.| 
  When you Undertake a Journey and score a strong hit, or if you accompany an ally who scores a strong hit on that move, your staff provides support and comfort in your travels; take +1 momentum.| 
  If you wield a staff...`,

  `.asset COMBAT TALENT | SHIELD-BEARER | 
  !When you Face Danger using your shield as cover, add +1. When you Clash in close quarters, take +1 momentum on a strong hit.| 
  When you paint your shield with a meaningful symbol, envision what you create. Then, if you Endure Stress as you face off against a fearsome foe, add +1 and take +1 momentum on a hit.| 
  When forced to Endure Harm in a fight, you may instead sacrifice your shield and ignore all harm. If you do, the shield is destroyed. Once per fight, you also take initiative when you sacrifice your shield to avoid harm.| 
  If you wield a shield...`,

  `.asset COMBAT TALENT | SKIRMISHER | 
  !When you Face Danger by holding a foe at bay using your spear’s reach, roll +iron or +edge. If you score a hit, you may...
  • Iron: Strike (if you have initiative) or Clash now, and add +1.
  • Edge: Take +1 momentum.| 
  When you Strike in close combat, you may attempt to drive your spear home (decide before rolling). If you do, add +1 and inflict +2 harm on a hit. If you score a hit and the fight continues, Face Danger +iron to recover your spear.| 
  When you Secure an Advantage by bracing your spear against a charging foe, add +1 and take +1 momentum on a hit.| 
  If you wield a spear...`,
];

const ritualEn = [
  `.asset RITUAL | INVOKE | 
!When you consume the mystical essence of your surroundings, roll +wits. On a strong hit, add the value of your action die to your essence track (max 6). You may then *Secure an Advantage* or *Face Danger* +essence to create minor mystical effects or illusions. If you do, suffer -1 essence and take +1 momentum on a hit. On a weak hit, as above, but capturing these energies is harrowing; Endure Stress (2 stress).| 
You may *Compel* +essence (and suffer -1 essence) through a show of power.| 
When you perform this ritual, add +1 and take +1 essence on a hit.||6`,

  `.asset RITUAL | KEEN | 
!When you hold a weapon and sing a keen for those it has killed, roll +heart. On a strong hit, the wielder inflicts +1 harm when they Strike or Clash. If they roll a 1 on their action die when making a move to inflict harm, the magic is spent. On a weak hit, as above, but the voices of those who were slain join in your song; Endure Stress (2 stress).| 
As above, and the wielder may also (one time only) add +1 and take +2 momentum on a hit when they Draw the Circle, Enter the Fray, or Battle.| 
When you perform this ritual, add +1 and take +1 momentum on a hit.|`,

  `.asset RITUAL | LEECH | 
!When you mark your hands or weapon with an intricate blood rune, roll +iron. On a strong hit, the rune thirsts for fresh blood. One time only, when you make a move to inflict harm, reroll any dice and inflict +2 harm on a hit. Then, for each point of harm inflicted, take +1 and allocate it as +health or +momentum. On a weak hit, as above, but this asset counts as a debility until the rune’s thirst is quenched.| 
As above, and you may also touch an ally or companion and let them take any remaining points as +health or +momentum.| 
When you perform this ritual, add +1 and take +1 momentum on a hit.|`,

  `.asset RITUAL | LIGHTBEARER | 
!When you focus on a source of light and capture its essence, roll +wits. On a strong hit, set your light track to +6. On a weak hit, make it +3. Then, when you make a move to overcome or navigate darkness, you may add +2 and suffer -1 light.| 
You may use your light to Strike or Clash against a dark-dwelling foe. Choose the amount of light to unleash, and roll +light (instead of +iron or +edge). Suffer -light equal to that amount. On a hit, your harm is 1+your unleashed light.| 
When you perform this ritual, add +1 and take +1 momentum on a hit.||6`,

  `.asset RITUAL | SCRY | 
!When you look into flames to study a remote person or location, roll +shadow. You or someone with you must have knowledge of the target. On a strong hit, you may Gather Information through observation using +shadow or +wits. On a weak hit, as above, but the flames are hungry; choose one to sacrifice.
• Your blood: Endure Harm (2 harm).
• Something precious: Endure Stress(2 stress).
• Provisions: Suffer -2 supply.| 
As above, and you may instead study a past event.| 
When you perform this ritual, add +1 and take +1 momentum on a hit.|`,

  `.asset RITUAL | SHADOW-WALK | 
!When you cloak yourself with the gossamer veil of the shadow realms, roll +shadow. On a strong hit, take +1 momentum. Then, reroll any dice (one time only) when you make a move by ambushing, hiding, or sneaking. On a weak hit, as above, but the shadows try to lead you astray. You must first Face Danger to find your way.| 
As above, and you may also travel along the hidden paths of the shadow realms to Undertake a Journey using +shadow (instead of +wits). If you do, Endure Stress (1 stress) and mark progress twice on a strong hit.| 
When you perform this ritual, add +1 and take +1 momentum on a hit.|`,

  `.asset RITUAL | SWAY | 
!When you speak a person’s name three times to the wind, roll +wits. On a strong hit, the wind whispers of this person’s need. Envision what you hear (Ask the Oracle if unsure). If you use this information or fulfill this need when you Compel them, you may reroll any dice (one time only). On a weak hit, as above, but this person’s need creates a troubling dilemma or complication; Endure Stress (1 stress).| 
As above, and if you score a strong hit when you Compel, you may also reroll any dice (one time only) when you Gather Information from this person.| 
When you perform this ritual, add +1 and take +1 momentum on a hit.|`,

  `.asset RITUAL | TALISMAN | 
!When you fashion a charm, envision it and name the specific person or creature it protects against. Then roll +wits. On a strong hit, when the wearer opposes the target through a move, add +2. If a 1 is rolled on the action die while making a move using the charm, the magic is spent. On a weak hit, as above, but the wearer adds +1 when making a move (instead of +2).| 
As above, and you may instead fashion a charm which aids the wearer against all supernatural threats, such as mystic rituals or horrors.| 
When you perform this ritual, add +1 and take +1 momentum on a hit.|`,

  `.asset RITUAL | TETHER | 
!When you commune with the spirits of a place, roll +heart. If you share a bond with someone there, add +1. On a strong hit, you are tethered. When you Undertake a Journey to return, you may roll +spirit or +heart (instead of +wits), and take +1 momentum on a hit. When you Reach Your Destination, take +2 momentum on a strong hit. The tether is lost if you perform this ritual elsewhere, or when you Face Desolation. On a weak hit, as above, but the spirits reveal a disturbing aspect of the place; Endure Stress (2 stress).| 
As above, and you may also reroll any dice when you Sojourn in the tethered place.| 
When you perform this ritual, add +1 and take +1 momentum on a hit.|`,

  `.asset RITUAL | TOTEM | 
!When you hold a totem of your animal or beast companion and focus on it, roll +heart. On a strong hit, you are bound together. Add +1 and take +1 momentum on a hit when you use a companion ability. If you roll a 1 on your action die when using a companion ability, the magic is spent. On a weak hit, as above, but creating this connection is unsettling; Endure Stress (1 stress).| 
As above, and you may also perceive the world through your companion’s senses while you make moves aided by them (even when you are apart).| 
When you perform this ritual, add +1 and take +1 momentum on a hit.|`,

  `.asset RITUAL | VISAGE | 
!When you paint yourself in blood and ash, roll +wits. On a strong hit, you may add +2 and take +1 momentum on a hit when you Secure an Advantage or Compel using fear or intimidation. If you roll a 1 on your action die when making a move aided by your visage, the magic is spent. On a weak hit, as above, but the blood must be your own; Endure Harm (2 harm).| 
As above, and you may also add +1 when you Strike, Clash, or Battle.| 
When you perform this ritual, add +1 and take +1 momentum on a hit.|`,

  `.asset RITUAL | WARD | 
!When you walk a wide circle, sprinkling the ground with salt, roll +wits. On a strong hit, choose two. On a weak hit, chose one.
• When a foe first crosses the boundary, take +1 momentum.
• When you first inflict harm against a foe within the boundary, inflict +1 harm.
• Your ward is ‘likely’ (Ask the Oracle) to trap a foe within the boundary.| 
As above, and improve the effect of your ward (+2 momentum, +2 harm, and ‘almost certain’).| 
When you perform this ritual, add +1 and take +1 momentum on a hit.|`,
];
