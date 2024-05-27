import fs from "fs";
import { yarg } from "./configs/plugin/yargs.plugin";

let ouputMessage = "";

const { b: base, l: limit, s: showTable } = yarg;


const header = `
==============================
      Tabla del ${base}
==============================\n
`;

for (let i = 1; i < limit; i++) {
  ouputMessage += `${base} X ${i} = ${base * i}\n`;
}

ouputMessage = header + ouputMessage;

if (showTable) {
  console.log(ouputMessage);
}

const ouputPath = `outputs`;

fs.mkdirSync(ouputPath, { recursive: true });
fs.writeFileSync(`${ouputPath}/tabla-${base}.txt`, ouputMessage);

console.log("File system create");
