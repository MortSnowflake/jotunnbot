import { jotunnbot } from "./core";
import { localEn } from "./local/en";

//English localization
jotunnbot(process.env.jotunntoken!, localEn);
