import { config } from "https://deno.land/x/dotenv/mod.ts";
import { serve } from "https://deno.land/std@0.181.0/http/server.ts";

const conf = config()
const port = conf["PORT"];

const handler = (request: Request): Response => {
    const path = (new URL(request.url)).pathname.slice(1)
    return Response.redirect("obsidian://open?vault=obsidian&file=" + path)
};

console.log(`HTTP webserver running. Access it at: http://localhost:${port}/`);
await serve(handler, { port });
