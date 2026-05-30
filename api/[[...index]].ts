import { createRequestHandler } from "@tanstack/start/server";
import { getRouterManifest } from "@tanstack/start/router-manifest";

const handler = createRequestHandler({
  getRouterManifest,
});

export default handler;
