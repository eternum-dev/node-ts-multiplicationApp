import { yarg } from "./configs/plugin/yargs.plugin";
import { ServerApp } from "./presentation/server-app";

// console.log(process.argv);

const main = async () => {
  const { b: base, l: limit, s: showTable, n:fileName, d:fileDestination } = yarg;

  ServerApp.run({ base, limit, showTable, fileName, fileDestination });
};


(async () => {
  await main();
})();
