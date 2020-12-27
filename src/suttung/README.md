`Suttung` compares each file in source locale (`en`) and target locale and produces `html` and `json` output containg lines which may be missing or outdated in target locale.
`Suttung` output folder contains three main things each of which could be useful for translators:

- HTML output
- JSON output
- `missing.txt`

Warning! `Suttung` is WIP-solution and currently can just point to files that should be checked. Produced output may be excessive and inaccurate. Meanwhile it makes easier to find the gaps in translation and would be improved in future 😄

## HTML output

`html` files are based on `git diff` between both source locale versions: one from current revision and one from revision when appropriate target files were changed. For example:
`src/local/ru/character.ts` was changed last time in [c216bf0ebd8109c7f676112b3b641ed171c3e162](https://github.com/MortSnowflake/jotunnbot/blob/c216bf0ebd8109c7f676112b3b641ed171c3e162/src/local/ru/character.ts)
but the appropriate English file
`src/local/en/character.ts` was changed later in [c8d934e5ebaeeeb7cb3ee68674c9ae63cd4f460e](https://github.com/MortSnowflake/jotunnbot/blob/c8d934e5ebaeeeb7cb3ee68674c9ae63cd4f460e/src/local/en/character.ts)

`Suttung` will generate diff for `src/local/en/character.ts` between `c216bf0ebd8109c7f676112b3b641ed171c3e162` and `c8d934e5ebaeeeb7cb3ee68674c9ae63cd4f460e` and place `html`-formatted output to separete files in `out/html` directory.

## JSON output

`json` files are based on comparision of `AST` literals between source and target locales. They are contains entries for each property in source locale file which seem to be untranslated in target locale. For example the following output shows that property `dice.payThePrice` in both locales have the same value. It means that value in target locale should be translated:

```
out\json\dice\dice.ts.json:
"dice.payThePrice": {
    "source": "\"Pay the Price\"",
    "target": "\"Pay the Price\""
  }
```

If string doesn't seem to be missing in target locale it will shown as `[UNTRANSLATED]`. It means that target locale should be populated with translation:

```
out\json\dice\dice.ts.json:
"dice.payThePrice": {
    "source": "\"Pay the Price\"",
    "target": "[UNTRANSLATED]"
  }
```

## `missing.txt`

If files are present only in source locale their paths will be placed to `missing.txt` in output folder. It means that target locale should be populated with appropriate file with translation. Also currently it can be the sign that source contains some unique files:

```
These files are present only in source locale:

delve\delve-en-add-later.ts
asset\en.ts
asset\assets.json
asset\assets-en.ts
delve\delve-en.ts
dice\rules.ts
dice\rules-en-cmt.ts
dice\moves.ts
dice\moves-en.ts
delve\en.ts
```
