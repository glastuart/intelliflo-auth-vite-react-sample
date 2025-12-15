import dotenv from "dotenv";
import Fastify from 'fastify';
import proxy from "@fastify/http-proxy";
import cors from "@fastify/cors";
import fastifyStatic from "@fastify/static";
import path from 'node:path';
import { fileURLToPath } from 'node:url';

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const __frontEndDirectory = path.join(__dirname, "..", "public");

const PORT = Number(process.env.PORT || 6001);
const IFLO_URL = process.env.IFLO_URL;
const IFLO_KEY = process.env.IFLO_KEY;

// Make sure we have the Intelliflo keys.
if (!IFLO_URL || !IFLO_KEY) {
    throw new Error("Missing Intelliflo API configuration.");
}

// Configure fastify server
const fastify = Fastify({
    logger: true
});

// Configure CORS so we can allow the localhost:3000 react app connect
// NOTE: this is just a development app - do not allow everything through in a production app!
fastify.register(cors, {
    methods: ['GET', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: "*"
});

// Create a proxy to the intelliflo API
fastify.register(proxy, {
    upstream: IFLO_URL,
    prefix: "/api/iflo",
    rewritePrefix: "",
    http2: false,
    preHandler: async (request, reply) => {
        request.headers["accept"] = "application/json";
        request.headers["content-type"] = "application/json";
        request.headers["x-api-key"] = IFLO_KEY;
        delete request.headers["x-forwarded-host"];
    }
});

// TODO: configure a connection to an internal api (C# net core? Stores some additional data not in Intelliflo?)
fastify.get('/api/hello', (request, reply) => {
    reply.send({ hello: 'world' });
});

// Serve up the client front-end, which is a vite React SPA application we will build and compile in the docker build
fastify.register(fastifyStatic, {
    root: __frontEndDirectory,
    prefix: "/",
    decorateReply: false
});

// SPA fallback - basically any non-/api route should return the SPA/Client Front-end
fastify.setNotFoundHandler((request, reply) => {
    if (request.url.startsWith("/api/")) {
        reply.code(404).send({ error: "Unknown API route" });
        return;
    }
    reply.type("text/html").sendFile("index.html", __frontEndDirectory);
});

fastify.listen({ port: PORT, host: "0.0.0.0" }, (err, address) => {
    if (err) {
        fastify.log.error(err),
        process.exit();
    }
});