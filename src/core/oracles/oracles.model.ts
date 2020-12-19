export class CustomOracle {
  public items: string[];
  public isSentences: boolean = false;
  constructor(public name: string, public itemsStr: string) {
    if (itemsStr.includes(";")) {
      this.items = itemsStr.split(";").map((m) => m.trim());
      this.isSentences = true;
    } else if (itemsStr.includes("\n")) {
      this.items = itemsStr.split("\n").map((m) => m.trim());
      this.isSentences = true;
    } else {
      this.items = itemsStr.split(" ");
    }
  }
}
