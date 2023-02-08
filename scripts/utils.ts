import { join } from "node:path";
import { fileURLToPath } from "node:url";

export const ROOT_DIR = join(fileURLToPath(import.meta.url), "..", "..");
export const LIB_DIR = join(ROOT_DIR, "lib");
