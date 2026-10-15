import fs from "node:fs";
import path from "node:path";
import {fileURLToPath} from "node:url";
import {locales,localeBase,localizeTestHtml} from "./test/localize.mjs";

export function generateTranslations(buildRoot = process.argv[2] || (fs.existsSync("dist/client/test/index.html") ? "dist/client" : "dist")) {
  for (const contact of [false,true]) {
    const suffix = contact ? "contact/" : "";
    const source = path.join(buildRoot,"test",suffix,"index.html");
    if (!fs.existsSync(source)) throw new Error("Missing test source: " + source);
    const html = fs.readFileSync(source,"utf8");
    for (const locale of locales) {
      const target = path.join(buildRoot,localeBase(locale),suffix,"index.html");
      fs.mkdirSync(path.dirname(target),{recursive:true});
      fs.writeFileSync(target,localizeTestHtml(html,locale,{contact}));
    }
  }
  console.log("Generated all 8 test pages using the shared localizer.");
}
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) generateTranslations();
