/*
  Audits the generated normalized bank for:
  - Uniquely-longest-correct option giveaways
  - Ellipsis markers in options ("…" or "...")

  Usage:
    node tools/audit_wordpress_dev_bank_normalized.js
*/

const path = require("path");

const bankPath = path.resolve(__dirname, "..", "interview_guide", "wordpress_dev_bank_normalized.js");

global.window = {};
require(bankPath);

const bank = global.window.WORDPRESS_DEV_BANK;
if (!bank || !Array.isArray(bank.questions)) {
    console.error("Bank not loaded from", bankPath);
    process.exit(1);
}

let offenders = 0;
let ellipsisOptions = 0;
let threeDotsOptions = 0;

for (const q of bank.questions) {
    if (!q || !Array.isArray(q.options) || typeof q.a !== "number") continue;

    const options = q.options.map(String);
    for (const opt of options) {
        if (opt.includes("…")) ellipsisOptions++;
        if (opt.includes("...")) threeDotsOptions++;
    }

    const correctIndex = q.a;
    if (correctIndex < 0 || correctIndex >= options.length) continue;

    const lengths = options.map((o) => o.length);
    const correctLen = lengths[correctIndex];
    const maxLen = Math.max(...lengths);
    const maxCount = lengths.filter((x) => x === maxLen).length;

    if (maxCount === 1 && correctLen === maxLen) offenders++;
}

console.log("Questions:", bank.questions.length);
console.log("Uniquely-longest-correct offenders:", offenders);
console.log("Options containing Unicode ellipsis (…):", ellipsisOptions);
console.log("Options containing three dots (...):", threeDotsOptions);
