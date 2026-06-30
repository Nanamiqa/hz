import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, "..");
const outputPath = resolve(rootDir, "reports/latest.json");

const defaultStocks = [
  { symbol: "BRK.B", name: "Berkshire Hathaway", market: "US", sector: "控股" },
  { symbol: "AAPL", name: "Apple", market: "US", sector: "科技" },
  { symbol: "MSFT", name: "Microsoft", market: "US", sector: "软件" },
  { symbol: "00700", name: "腾讯控股", market: "HK", sector: "互联网" },
  { symbol: "600519", name: "贵州茅台", market: "CN", sector: "消费" },
];

const stocks = parseStocks(process.env.STOCK_LIST) || defaultStocks;
const model = process.env.OPENAI_MODEL || "gpt-4.1-mini";
const apiKey = process.env.OPENAI_API_KEY;
const baseUrl = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");

const skillContext = await buildSkillContext();
const prompt = buildPrompt(stocks, skillContext);

const report = apiKey ? await generateWithModel(prompt) : buildFallbackReport(stocks);
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(report, null, 2)}\n`, "utf8");
console.log(`Wrote ${outputPath}`);

function parseStocks(value) {
  if (!value?.trim()) return null;
  return value
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean)
    .map((symbol) => ({
      symbol,
      name: symbol,
      market: inferMarket(symbol),
      sector: "待识别",
    }));
}

function inferMarket(symbol) {
  if (/^\d{5}$/.test(symbol)) return "HK";
  if (/^\d{6}$/.test(symbol)) return "CN";
  return "US";
}

async function buildSkillContext() {
  const files = [
    "vendor/daily_stock_analysis/SKILL.md",
    "vendor/ai-berkshire/codex-skills/investment-research/SKILL.md",
    "vendor/ai-berkshire/codex-skills/investment-checklist/SKILL.md",
    "vendor/ai-berkshire/codex-skills/quality-screen/SKILL.md",
    "vendor/ai-berkshire/codex-skills/portfolio-review/SKILL.md",
    "vendor/ai-berkshire/codex-skills/news-pulse/SKILL.md",
  ];

  const chunks = [];
  for (const file of files) {
    const text = await readOptional(resolve(rootDir, file));
    if (text) {
      chunks.push(`## ${file}\n${text.slice(0, 5000)}`);
    }
  }
  return chunks.join("\n\n");
}

async function readOptional(path) {
  try {
    return await readFile(path, "utf8");
  } catch {
    return "";
  }
}

function buildPrompt(stockList, context) {
  return `
你是一个谨慎的投资研究助手。请融合两类框架：
1. daily_stock_analysis: 技术面、风险、催化、新闻脉冲、组合观察。
2. AI Berkshire: 巴菲特、芒格、段永平、李录视角；能力圈、好生意、护城河、管理层、现金流、安全边际、反向风险。

重要要求：
- 只生成研究参考，不给确定性投资建议。
- 明确风险和需要补充的数据。
- 输出必须是严格 JSON，不能有 Markdown 包裹。
- 分数为 0-100，risk 越高表示风险越高。
- selected 中每只股票必须包含 symbol、name、market、sector、action、thesis、modelScores、masterViews、notes、risks。

可参考的本地 skill 摘要：
${context || "未找到本地 skill 文件，使用内置框架。"}

待分析股票：
${JSON.stringify(stockList, null, 2)}

JSON 结构：
{
  "version": "1",
  "source": "llm",
  "generatedAt": "ISO timestamp",
  "model": "${model}",
  "notice": "研究参考，不构成投资建议。",
  "summary": { "title": "...", "stance": "...", "brief": "..." },
  "playbook": ["..."],
  "checklist": [{ "title": "...", "status": "pass|warn|fail", "detail": "..." }],
  "strategy": [{ "title": "...", "detail": "...", "tag": "..." }],
  "selected": [
    {
      "symbol": "...",
      "name": "...",
      "market": "US|CN|HK",
      "sector": "...",
      "action": "...",
      "thesis": "...",
      "modelScores": {
        "berkshire": 0,
        "margin": 0,
        "momentum": 0,
        "risk": 0,
        "business": 0,
        "moat": 0,
        "cashflow": 0,
        "predictability": 0
      },
      "masterViews": {
        "dyp": "...",
        "buffett": "...",
        "munger": "...",
        "lilu": "..."
      },
      "notes": ["..."],
      "risks": ["..."]
    }
  ]
}
`;
}

async function generateWithModel(promptText) {
  const response = await fetch(`${baseUrl}/chat/completions`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      messages: [
        {
          role: "system",
          content: "你输出严格 JSON。不要输出 Markdown。不要夸大确定性。不要构成投资建议。",
        },
        { role: "user", content: promptText },
      ],
      response_format: { type: "json_object" },
      temperature: 0.2,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Model request failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Model response did not include choices[0].message.content");
  }

  const parsed = JSON.parse(content);
  return normalizeReport(parsed, "llm");
}

function buildFallbackReport(stockList) {
  const selected = stockList.map((stock) => ({
    symbol: stock.symbol,
    name: stock.name,
    market: stock.market,
    sector: stock.sector,
    action: "待模型分析",
    thesis: "未配置 OPENAI_API_KEY，当前为脚本 fallback 报告。",
    modelScores: {
      berkshire: 55,
      margin: 50,
      momentum: 50,
      risk: 55,
      business: 55,
      moat: 50,
      cashflow: 55,
      predictability: 50,
    },
    masterViews: {
      dyp: "先确认自己是否看懂这门生意。",
      buffett: "等待护城河、现金流和价格数据。",
      munger: "先列出可能亏钱的路径。",
      lilu: "等待长期确定性的证据。",
    },
    notes: ["这是 fallback 报告。配置 OPENAI_API_KEY 后会生成真实模型分析。"],
    risks: ["缺少实时行情、财报和新闻数据。"],
  }));

  return normalizeReport(
    {
      version: "1",
      source: "fallback",
      generatedAt: new Date().toISOString(),
      model: "none",
      notice: "未配置模型 Key，当前为 fallback 报告，不构成投资建议。",
      summary: {
        title: "Fallback 报告",
        stance: "等待模型运行",
        brief: "脚本已可运行。配置 OPENAI_API_KEY 后会调用大模型生成 reports/latest.json。",
      },
      playbook: [
        "配置 OPENAI_API_KEY 后重新运行脚本。",
        "正式研究前补充最新价格、财报、公告和行业数据。",
      ],
      checklist: [
        { title: "模型调用", status: "warn", detail: "未配置 OPENAI_API_KEY。" },
        { title: "数据完整度", status: "warn", detail: "当前未接入实时行情和财务数据。" },
      ],
      strategy: [{ title: "下一步", detail: "配置 GitHub Secrets 或本地环境变量。", tag: "配置" }],
      selected,
    },
    "fallback",
  );
}

function normalizeReport(report, source) {
  return {
    version: "1",
    source: report.source || source,
    generatedAt: report.generatedAt || new Date().toISOString(),
    model: report.model || model,
    notice: report.notice || "研究参考，不构成投资建议。",
    summary: report.summary || {
      title: "模型报告",
      stance: "待复核",
      brief: "模型报告已生成。",
    },
    playbook: Array.isArray(report.playbook) ? report.playbook : [],
    checklist: Array.isArray(report.checklist) ? report.checklist : [],
    strategy: Array.isArray(report.strategy) ? report.strategy : [],
    selected: Array.isArray(report.selected) ? report.selected : [],
  };
}
