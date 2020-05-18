// `fs` at v0.50.0 breaks with `deno` at v1.0.0
import { exists } from "https://deno.land/std/fs/mod.ts";
import { join } from "https://deno.land/std@v0.50.0/path/mod.ts";

export default (dir: string): Promise<Boolean> =>
  exists(join(dir, "yarn.lock"));
