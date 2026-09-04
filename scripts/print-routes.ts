/**
 * Phase 2 acceptance check: print every route the data layer generates, with
 * its launch priority and whether it is built at launch.
 *
 *   npm run routes
 *   npm run routes -- --pending
 */

import { allRoutes } from "../src/lib/routes";

const onlyPending = process.argv.includes("--pending");
const routes = allRoutes();
const shown = onlyPending ? routes.filter((r) => !r.built) : routes;

const pad = (s: string, n: number) => s.padEnd(n);
const width = Math.max(...shown.map((r) => r.path.length), 4);

console.log(`${pad("PATH", width)}  PRI  KIND           STATUS`);
console.log("-".repeat(width + 32));
for (const r of shown) {
  console.log(
    `${pad(r.path, width)}  ${r.priority}   ${pad(r.kind, 13)}  ${
      r.built ? "built" : "held for phase 2"
    }`
  );
}

const built = routes.filter((r) => r.built).length;
const byKind = routes.reduce<Record<string, number>>((acc, r) => {
  acc[r.kind] = (acc[r.kind] ?? 0) + 1;
  return acc;
}, {});

console.log("");
console.log(`${routes.length} routes in the data layer, ${built} built at launch, ${routes.length - built} held.`);
console.log(
  `P1 ${routes.filter((r) => r.priority === "P1").length} / P2 ${routes.filter((r) => r.priority === "P2").length}`
);
console.log(
  Object.entries(byKind)
    .map(([k, n]) => `${k}: ${n}`)
    .join(", ")
);
