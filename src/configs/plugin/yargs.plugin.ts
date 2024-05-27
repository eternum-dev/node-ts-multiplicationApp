import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";



export const yarg = yargs(process.argv)
  .option("b", {
    alias: "base",
    type: "number",
    demandOption: true,
    describe: "Multiuplication table",
  })
  .option("l", {
    alias: "limit",
    type: "number",
    default: 10,
    describe: "Multiuplication table limit",
  })
  .option("s", {
    alias: "show",
    type: "boolean",
    default: false,
    describe: "Show multiuplication table ",
  })
  .option("n", {
    alias: "name",
    type: "string",
    default: 'table',
    describe: "File name",
  })
  .option("d", {
    alias: "destination",
    type: "string",
    default: './outputs',
    describe: "File destination",
  })
  .check((argv, options) => {
    const { b } = argv;

    if(b < 0) throw 'el argumento debe ser mayor a 0';

    return true;
  })
  .parseSync();
