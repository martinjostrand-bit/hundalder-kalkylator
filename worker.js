// Worker-entrypoint. Hanterar /api/stats och serverar i övrigt
// de statiska filerna (index.html, style.css, script.js) via
// ASSETS-bindningen. Se wrangler.jsonc.

const AGE_BUCKET_IDS = ["0-1", "1-3", "3-6", "6-9", "9-12", "12+"];
const SIZES = ["small", "medium", "large", "giant"];
const STATS_KEY = "calc-stats";

function emptyStats() {
  const ageBuckets = {};
  AGE_BUCKET_IDS.forEach((id) => { ageBuckets[id] = 0; });
  const sizes = {};
  SIZES.forEach((size) => { sizes[size] = 0; });
  return { ageBuckets, sizes };
}

function bucketForAge(age) {
  if (age < 1) return "0-1";
  if (age < 3) return "1-3";
  if (age < 6) return "3-6";
  if (age < 9) return "6-9";
  if (age < 12) return "9-12";
  return "12+";
}

async function readStats(kv) {
  const stats = emptyStats();
  const raw = await kv.get(STATS_KEY);
  if (!raw) return stats;

  try {
    const parsed = JSON.parse(raw);
    AGE_BUCKET_IDS.forEach((id) => {
      if (typeof parsed.ageBuckets?.[id] === "number") {
        stats.ageBuckets[id] = parsed.ageBuckets[id];
      }
    });
    SIZES.forEach((size) => {
      if (typeof parsed.sizes?.[size] === "number") {
        stats.sizes[size] = parsed.sizes[size];
      }
    });
  } catch {
    // Skadad data i KV - fortsätt med tomma räknare istället för att krascha.
  }

  return stats;
}

async function handleStats(request, env) {
  if (request.method === "GET") {
    const stats = await readStats(env.STATS_KV);
    return Response.json(stats);
  }

  if (request.method === "POST") {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400 });
    }

    const age = Number(body.age);
    const size = body.size;

    if (!Number.isFinite(age) || age < 0 || !SIZES.includes(size)) {
      return new Response("Invalid payload", { status: 400 });
    }

    const stats = await readStats(env.STATS_KV);
    stats.ageBuckets[bucketForAge(age)] += 1;
    stats.sizes[size] += 1;

    await env.STATS_KV.put(STATS_KEY, JSON.stringify(stats));

    return Response.json(stats);
  }

  return new Response("Method not allowed", { status: 405 });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/stats") {
      return handleStats(request, env);
    }

    return env.ASSETS.fetch(request);
  },
};
