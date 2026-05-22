import type { Server } from "http";

import config from "./config";
import { initDB } from "./db";
import app from "./app";

const main = async () => {
  await initDB();

  app.listen(config.port, () => {
    console.log(`Example app listening on port ${config.port}`);
  });
};

main().catch((err) => console.log(err));

process.on("unhandledRejection", () => {
  console.log(`unhandledRejection is detected, shutting down...`);
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`unhandledRejection is detected, shutting down...`);
  process.exit(1);
});
