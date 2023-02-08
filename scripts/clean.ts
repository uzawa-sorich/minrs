import { rmSync } from "node:fs";
import { LIB_DIR } from "./utils.js";

rmSync(LIB_DIR, { force: true, recursive: true });
