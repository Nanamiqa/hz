const baseStocks = [
  { symbol: "600519", name: "贵州茅台", market: "CN", sector: "消费", core: true },
  { symbol: "300750", name: "宁德时代", market: "CN", sector: "新能源", core: true },
  { symbol: "600036", name: "招商银行", market: "CN", sector: "金融", core: true },
  { symbol: "002594", name: "比亚迪", market: "CN", sector: "汽车", core: true },
  { symbol: "688981", name: "中芯国际", market: "CN", sector: "半导体", core: false },
  { symbol: "601318", name: "中国平安", market: "CN", sector: "金融", core: false },
  { symbol: "000333", name: "美的集团", market: "CN", sector: "家电", core: false },
  { symbol: "00700", name: "腾讯控股", market: "HK", sector: "互联网", core: true },
  { symbol: "09988", name: "阿里巴巴-W", market: "HK", sector: "互联网", core: true },
  { symbol: "03690", name: "美团-W", market: "HK", sector: "互联网", core: false },
  { symbol: "01211", name: "比亚迪股份", market: "HK", sector: "汽车", core: false },
  { symbol: "01810", name: "小米集团-W", market: "HK", sector: "硬件", core: false },
  { symbol: "AAPL", name: "Apple", market: "US", sector: "科技", core: true },
  { symbol: "MSFT", name: "Microsoft", market: "US", sector: "软件", core: true },
  { symbol: "NVDA", name: "NVIDIA", market: "US", sector: "半导体", core: true },
  { symbol: "BRK.B", name: "Berkshire Hathaway", market: "US", sector: "控股", core: true },
  { symbol: "COST", name: "Costco", market: "US", sector: "零售", core: false },
  { symbol: "V", name: "Visa", market: "US", sector: "支付", core: false },
  { symbol: "KO", name: "Coca-Cola", market: "US", sector: "消费", core: false },
  { symbol: "TSLA", name: "Tesla", market: "US", sector: "汽车", core: false },
  { symbol: "GOOGL", name: "Alphabet", market: "US", sector: "互联网", core: false },
  { symbol: "AMZN", name: "Amazon", market: "US", sector: "消费科技", core: false },
];

const marketNames = {
  CN: "A 股",
  HK: "港股",
  US: "美股",
};

const sectorProfiles = {
  消费: {
    valuation: 58,
    quality: 82,
    momentum: 48,
    risk: 35,
    catalyst: 45,
    circle: 78,
    business: 84,
    moat: 79,
    management: 70,
    cashflow: 83,
    predictability: 76,
    margin: 54,
    information: 86,
  },
  新能源: {
    valuation: 54,
    quality: 62,
    momentum: 63,
    risk: 68,
    catalyst: 72,
    circle: 56,
    business: 58,
    moat: 60,
    management: 62,
    cashflow: 50,
    predictability: 48,
    margin: 46,
    information: 72,
  },
  金融: {
    valuation: 72,
    quality: 70,
    momentum: 45,
    risk: 42,
    catalyst: 40,
    circle: 62,
    business: 69,
    moat: 64,
    management: 66,
    cashflow: 74,
    predictability: 61,
    margin: 68,
    information: 78,
  },
  汽车: {
    valuation: 52,
    quality: 58,
    momentum: 66,
    risk: 70,
    catalyst: 68,
    circle: 50,
    business: 55,
    moat: 52,
    management: 60,
    cashflow: 48,
    predictability: 44,
    margin: 45,
    information: 70,
  },
  半导体: {
    valuation: 46,
    quality: 61,
    momentum: 72,
    risk: 74,
    catalyst: 78,
    circle: 46,
    business: 59,
    moat: 63,
    management: 60,
    cashflow: 50,
    predictability: 42,
    margin: 38,
    information: 68,
  },
  家电: {
    valuation: 66,
    quality: 76,
    momentum: 52,
    risk: 44,
    catalyst: 42,
    circle: 72,
    business: 75,
    moat: 68,
    management: 69,
    cashflow: 78,
    predictability: 70,
    margin: 63,
    information: 80,
  },
  互联网: {
    valuation: 62,
    quality: 68,
    momentum: 61,
    risk: 58,
    catalyst: 64,
    circle: 58,
    business: 70,
    moat: 72,
    management: 61,
    cashflow: 70,
    predictability: 56,
    margin: 58,
    information: 84,
  },
  硬件: {
    valuation: 56,
    quality: 64,
    momentum: 57,
    risk: 55,
    catalyst: 62,
    circle: 55,
    business: 62,
    moat: 56,
    management: 62,
    cashflow: 59,
    predictability: 52,
    margin: 53,
    information: 76,
  },
  科技: {
    valuation: 50,
    quality: 80,
    momentum: 70,
    risk: 52,
    catalyst: 66,
    circle: 62,
    business: 81,
    moat: 82,
    management: 76,
    cashflow: 82,
    predictability: 66,
    margin: 48,
    information: 88,
  },
  软件: {
    valuation: 48,
    quality: 84,
    momentum: 66,
    risk: 45,
    catalyst: 61,
    circle: 66,
    business: 84,
    moat: 80,
    management: 78,
    cashflow: 86,
    predictability: 72,
    margin: 49,
    information: 88,
  },
  消费科技: {
    valuation: 55,
    quality: 74,
    momentum: 62,
    risk: 50,
    catalyst: 58,
    circle: 61,
    business: 76,
    moat: 70,
    management: 70,
    cashflow: 73,
    predictability: 62,
    margin: 56,
    information: 86,
  },
  控股: {
    valuation: 68,
    quality: 82,
    momentum: 50,
    risk: 32,
    catalyst: 38,
    circle: 74,
    business: 80,
    moat: 76,
    management: 85,
    cashflow: 84,
    predictability: 72,
    margin: 65,
    information: 86,
  },
  零售: {
    valuation: 50,
    quality: 82,
    momentum: 58,
    risk: 40,
    catalyst: 50,
    circle: 77,
    business: 84,
    moat: 75,
    management: 76,
    cashflow: 80,
    predictability: 74,
    margin: 47,
    information: 84,
  },
  支付: {
    valuation: 54,
    quality: 86,
    momentum: 60,
    risk: 38,
    catalyst: 55,
    circle: 67,
    business: 88,
    moat: 84,
    management: 76,
    cashflow: 88,
    predictability: 75,
    margin: 50,
    information: 86,
  },
  自定义: {
    valuation: 55,
    quality: 55,
    momentum: 55,
    risk: 55,
    catalyst: 50,
    circle: 50,
    business: 52,
    moat: 50,
    management: 52,
    cashflow: 52,
    predictability: 50,
    margin: 50,
    information: 45,
  },
};

const state = {
  market: "all",
  query: "",
  stocks: loadStocks(),
  selected: new Set(JSON.parse(localStorage.getItem("selectedSymbols") || "[]")),
  conservative: localStorage.getItem("riskMode") === "conservative",
  framework: localStorage.getItem("frameworkMode") || "hybrid",
  chartMode: "radar",
  modelReport: null,
  reportState: "loading",
};

const el = {
  stockSearch: document.querySelector("#stockSearch"),
  stockList: document.querySelector("#stockList"),
  marketSegment: document.querySelector('[aria-label="市场筛选"]'),
  frameworkSegment: document.querySelector('[aria-label="研究框架"]'),
  selectCore: document.querySelector("#selectCore"),
  selectValue: document.querySelector("#selectValue"),
  clearSelection: document.querySelector("#clearSelection"),
  customStockForm: document.querySelector("#customStockForm"),
  customSymbol: document.querySelector("#customSymbol"),
  customName: document.querySelector("#customName"),
  selectedCount: document.querySelector("#selectedCount"),
  berkshireScore: document.querySelector("#berkshireScore"),
  marginScore: document.querySelector("#marginScore"),
  avgMomentum: document.querySelector("#avgMomentum"),
  riskGate: document.querySelector("#riskGate"),
  portfolioBias: document.querySelector("#portfolioBias"),
  asOfLabel: document.querySelector("#asOfLabel"),
  riskToggle: document.querySelector("#riskToggle"),
  focusMetric: document.querySelector("#focusMetric"),
  analysisCanvas: document.querySelector("#analysisCanvas"),
  playbookList: document.querySelector("#playbookList"),
  analysisCards: document.querySelector("#analysisCards"),
  cardSummary: document.querySelector("#cardSummary"),
  exportJson: document.querySelector("#exportJson"),
  reportStatus: document.querySelector("#reportStatus"),
  checklistList: document.querySelector("#checklistList"),
  strategyTable: document.querySelector("#strategyTable"),
  dypScore: document.querySelector("#dypScore"),
  dypNote: document.querySelector("#dypNote"),
  buffettScore: document.querySelector("#buffettScore"),
  buffettNote: document.querySelector("#buffettNote"),
  mungerScore: document.querySelector("#mungerScore"),
  mungerNote: document.querySelector("#mungerNote"),
  liluScore: document.querySelector("#liluScore"),
  liluNote: document.querySelector("#liluNote"),
  stockRowTemplate: document.querySelector("#stockRowTemplate"),
  analysisCardTemplate: document.querySelector("#analysisCardTemplate"),
};

el.asOfLabel.textContent = `生成时间：${new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "medium",
  timeStyle: "short",
}).format(new Date())}`;

el.riskToggle.checked = state.conservative;
setActiveFramework();

el.stockSearch.addEventListener("input", (event) => {
  state.query = event.target.value.trim().toLowerCase();
  renderStockList();
});

el.marketSegment.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-market]");
  if (!button) return;
  state.market = button.dataset.market;
  document.querySelectorAll("[data-market]").forEach((item) => item.classList.remove("is-active"));
  button.classList.add("is-active");
  renderStockList();
});

el.frameworkSegment.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-framework]");
  if (!button) return;
  state.framework = button.dataset.framework;
  localStorage.setItem("frameworkMode", state.framework);
  setActiveFramework();
  renderAnalysis();
});

el.selectCore.addEventListener("click", () => {
  state.selected = new Set(state.stocks.filter((stock) => stock.core).map((stock) => stock.symbol));
  persistSelection();
  render();
});

el.selectValue.addEventListener("click", () => {
  const candidates = state.stocks
    .map((stock) => ({ stock, scores: scoreStock(stock) }))
    .filter(({ scores }) => scores.berkshire >= 66 && scores.margin >= 50 && scores.risk <= 62)
    .sort((a, b) => rankScore({ scores: b.scores }) - rankScore({ scores: a.scores }))
    .slice(0, 8)
    .map(({ stock }) => stock.symbol);

  state.selected = new Set(candidates);
  persistSelection();
  render();
});

el.clearSelection.addEventListener("click", () => {
  state.selected.clear();
  persistSelection();
  render();
});

el.customStockForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const symbol = normalizeSymbol(el.customSymbol.value);
  const name = el.customName.value.trim() || symbol;
  if (!symbol) return;

  const existing = state.stocks.find((stock) => stock.symbol === symbol);
  if (existing) {
    state.selected.add(existing.symbol);
  } else {
    state.stocks.push({
      symbol,
      name,
      market: inferMarket(symbol),
      sector: "自定义",
      core: false,
      custom: true,
    });
    persistCustomStocks();
    state.selected.add(symbol);
  }

  el.customStockForm.reset();
  persistSelection();
  render();
});

el.riskToggle.addEventListener("change", (event) => {
  state.conservative = event.target.checked;
  localStorage.setItem("riskMode", state.conservative ? "conservative" : "balanced");
  renderAnalysis();
});

el.focusMetric.addEventListener("change", (event) => {
  state.chartMode = event.target.value;
  drawChart();
});

el.exportJson.addEventListener("click", () => {
  const payload = buildPayload();
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `berkshire-signal-desk-${new Date().toISOString().slice(0, 10)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
});

window.addEventListener("resize", drawChart);

render();
loadModelReport();

async function loadModelReport() {
  try {
    const response = await fetch("./reports/latest.json", { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    state.modelReport = await response.json();
    if (state.modelReport?.source === "sample") {
      state.reportState = "sample";
    } else if (state.modelReport?.source === "fallback") {
      state.reportState = "generated-fallback";
    } else {
      state.reportState = "loaded";
    }
  } catch (error) {
    state.modelReport = null;
    state.reportState = "fallback";
  }

  updateReportStatus();
  renderAnalysis();
}

function updateReportStatus() {
  if (!el.reportStatus) return;
  if (state.reportState === "loaded") {
    const generatedAt = state.modelReport?.generatedAt ? formatReportTime(state.modelReport.generatedAt) : "未知时间";
    el.reportStatus.textContent = `模型报告：已加载 / ${generatedAt}`;
    return;
  }
  if (state.reportState === "sample") {
    el.reportStatus.textContent = "模型报告：示例数据";
    return;
  }
  if (state.reportState === "generated-fallback") {
    const generatedAt = state.modelReport?.generatedAt ? formatReportTime(state.modelReport.generatedAt) : "未知时间";
    el.reportStatus.textContent = `模型报告：fallback / ${generatedAt}`;
    return;
  }
  if (state.reportState === "fallback") {
    el.reportStatus.textContent = "模型报告：未加载，使用本地规则";
    return;
  }
  el.reportStatus.textContent = "模型报告：加载中";
}

function formatReportTime(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(date);
}

function setActiveFramework() {
  document.querySelectorAll("[data-framework]").forEach((item) => {
    item.classList.toggle("is-active", item.dataset.framework === state.framework);
  });
}

function loadStocks() {
  const customStocks = JSON.parse(localStorage.getItem("customStocks") || "[]");
  return [...baseStocks, ...customStocks];
}

function persistCustomStocks() {
  const customStocks = state.stocks.filter((stock) => stock.custom);
  localStorage.setItem("customStocks", JSON.stringify(customStocks));
}

function persistSelection() {
  localStorage.setItem("selectedSymbols", JSON.stringify([...state.selected]));
}

function normalizeSymbol(value) {
  return value.trim().replace(/\s+/g, "").toUpperCase();
}

function inferMarket(symbol) {
  if (/^\d{5}$/.test(symbol)) return "HK";
  if (/^\d{6}$/.test(symbol)) return "CN";
  return "US";
}

function render() {
  renderStockList();
  renderAnalysis();
}

function renderStockList() {
  const fragment = document.createDocumentFragment();
  const visibleStocks = state.stocks.filter((stock) => {
    const matchesMarket = state.market === "all" || stock.market === state.market;
    const haystack = `${stock.symbol} ${stock.name} ${stock.sector}`.toLowerCase();
    return matchesMarket && haystack.includes(state.query);
  });

  el.stockList.replaceChildren();

  visibleStocks.forEach((stock) => {
    const row = el.stockRowTemplate.content.cloneNode(true);
    const label = row.querySelector(".stock-row");
    const checkbox = row.querySelector("input");
    const title = row.querySelector("strong");
    const meta = row.querySelector("small");
    const chip = row.querySelector(".stock-chip");
    const scores = scoreStock(stock);

    checkbox.checked = state.selected.has(stock.symbol);
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        state.selected.add(stock.symbol);
      } else {
        state.selected.delete(stock.symbol);
      }
      persistSelection();
      renderAnalysis();
    });

    title.textContent = `${stock.symbol} · ${stock.name}`;
    meta.textContent = `${marketNames[stock.market]} / ${stock.sector} / 价值 ${scores.berkshire}`;
    chip.textContent = stock.core ? "核心" : marketNames[stock.market];
    label.dataset.symbol = stock.symbol;
    fragment.append(row);
  });

  if (visibleStocks.length === 0) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "没有匹配的股票";
    fragment.append(empty);
  }

  el.stockList.append(fragment);
}

function renderAnalysis() {
  const analyses = getSelectedAnalyses();
  renderMetrics(analyses);
  renderPlaybook(analyses);
  renderLens(analyses);
  renderChecklist(analyses);
  renderStrategy(analyses);
  renderCards(analyses);
  drawChart();
}

function getSelectedAnalyses() {
  return state.stocks
    .filter((stock) => state.selected.has(stock.symbol))
    .map((stock) => ({
      ...stock,
      scores: mergeModelScores(scoreStock(stock), findReportItem(stock.symbol)),
      model: findReportItem(stock.symbol),
    }));
}

function findReportItem(symbol) {
  const items = Array.isArray(state.modelReport?.selected) ? state.modelReport.selected : [];
  return items.find((item) => normalizeSymbol(item.symbol || "") === normalizeSymbol(symbol));
}

function mergeModelScores(localScores, reportItem) {
  const modelScores = reportItem?.modelScores || reportItem?.scores;
  if (!modelScores) return localScores;
  const merged = { ...localScores };
  Object.entries(modelScores).forEach(([key, value]) => {
    if (typeof value === "number" && Number.isFinite(value)) {
      merged[key] = clamp(value);
    }
  });
  merged.masters = {
    ...localScores.masters,
    ...(modelScores.masters || {}),
  };
  merged.berkshire = merged.berkshire ?? localScores.berkshire;
  merged.margin = merged.margin ?? localScores.margin;
  merged.risk = merged.risk ?? localScores.risk;
  merged.momentum = merged.momentum ?? localScores.momentum;
  return merged;
}

function scoreStock(stock) {
  const profile = sectorProfiles[stock.sector] || sectorProfiles["自定义"];
  const marketShift = stock.market === "US" ? 4 : stock.market === "HK" ? -1 : 0;
  const seed = hashString(stock.symbol + stock.name);
  const daily = {
    valuation: clamp(profile.valuation + seededOffset(seed, 1) + marketShift),
    quality: clamp(profile.quality + seededOffset(seed, 2)),
    momentum: clamp(profile.momentum + seededOffset(seed, 3) + (stock.core ? 3 : 0)),
    risk: clamp(profile.risk + seededOffset(seed, 4) - (stock.core ? 2 : 0)),
    catalyst: clamp(profile.catalyst + seededOffset(seed, 5)),
  };

  const circle = clamp(profile.circle + seededOffset(seed, 11) + (stock.core ? 2 : 0));
  const business = clamp(profile.business + seededOffset(seed, 12) + daily.quality * 0.08 - 4);
  const moat = clamp(profile.moat + seededOffset(seed, 13) + daily.quality * 0.06 - 3);
  const management = clamp(profile.management + seededOffset(seed, 14));
  const cashflow = clamp(profile.cashflow + seededOffset(seed, 15) + daily.valuation * 0.05 - 3);
  const predictability = clamp(profile.predictability + seededOffset(seed, 16) - daily.risk * 0.08 + 4);
  const margin = clamp(profile.margin + seededOffset(seed, 17) + (daily.valuation - 55) * 0.28 - Math.max(0, daily.momentum - 78) * 0.16);
  const information = clamp(profile.information + seededOffset(seed, 18) + (stock.custom ? -12 : 0));
  const discipline = clamp(100 - daily.risk * 0.48 + daily.valuation * 0.22 + predictability * 0.18 - Math.max(0, daily.momentum - 78) * 0.35);
  const inverseRisk = 100 - daily.risk;
  const berkshire = Math.round(
    circle * 0.1 +
      business * 0.18 +
      moat * 0.16 +
      management * 0.1 +
      cashflow * 0.14 +
      predictability * 0.12 +
      margin * 0.14 +
      discipline * 0.06,
  );

  const masters = {
    dyp: clamp(business * 0.34 + predictability * 0.22 + management * 0.14 + margin * 0.16 + discipline * 0.14),
    buffett: clamp(moat * 0.24 + business * 0.22 + management * 0.14 + cashflow * 0.18 + margin * 0.22),
    munger: clamp(discipline * 0.26 + business * 0.2 + inverseRisk * 0.18 + predictability * 0.2 + margin * 0.16),
    lilu: clamp(predictability * 0.24 + cashflow * 0.22 + circle * 0.14 + margin * 0.18 + inverseRisk * 0.14 + daily.catalyst * 0.08),
  };

  return {
    ...daily,
    circle,
    business,
    moat,
    management,
    cashflow,
    predictability,
    margin,
    information,
    discipline,
    inverseRisk,
    berkshire,
    masters,
  };
}

function hashString(value) {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash += (hash << 1) + (hash << 4) + (hash << 7) + (hash << 8) + (hash << 24);
  }
  return Math.abs(hash >>> 0);
}

function seededOffset(seed, salt) {
  const value = Math.sin(seed * (salt + 3)) * 10000;
  return Math.round((value - Math.floor(value)) * 24 - 12);
}

function clamp(value) {
  return Math.max(8, Math.min(96, Math.round(value)));
}

function average(items, selector) {
  if (!items.length) return 0;
  return Math.round(items.reduce((sum, item) => sum + selector(item), 0) / items.length);
}

function renderMetrics(analyses) {
  const avgBerkshire = average(analyses, (item) => item.scores.berkshire);
  const avgMargin = average(analyses, (item) => item.scores.margin);
  const avgMomentum = average(analyses, (item) => item.scores.momentum);
  const avgRisk = average(analyses, (item) => item.scores.risk);
  const score = average(analyses, (item) => rankScore(item));

  el.selectedCount.textContent = analyses.length;
  el.berkshireScore.textContent = analyses.length ? avgBerkshire : "--";
  el.marginScore.textContent = analyses.length ? avgMargin : "--";
  el.avgMomentum.textContent = analyses.length ? avgMomentum : "--";
  el.riskGate.textContent = analyses.length ? riskGateLabel(avgRisk, analyses) : "--";
  el.portfolioBias.textContent = analyses.length ? actionLabel(score) : "--";
  el.cardSummary.textContent = analyses.length ? `${analyses.length} 只股票 / ${frameworkName()}` : "未选择";
}

function riskGateLabel(avgRisk, analyses) {
  const highRiskCount = analyses.filter((item) => item.scores.risk >= 70).length;
  if (state.conservative && highRiskCount > 0) return "复核";
  if (avgRisk >= 68) return "高风险";
  if (avgRisk >= 56) return "观察";
  return "通过";
}

function actionLabel(score) {
  if (score >= 72) return "深入研究";
  if (score >= 60) return "观察池";
  if (score >= 48) return "补数据";
  return "先回避";
}

function frameworkName() {
  if (state.framework === "value") return "价值优先";
  if (state.framework === "signal") return "信号优先";
  return "综合框架";
}

function rankScore(item) {
  const { valuation, quality, momentum, risk, catalyst, berkshire, margin, discipline, information } = item.scores;
  const lowRisk = 100 - risk;

  if (state.framework === "value") {
    return Math.round(berkshire * 0.5 + margin * 0.18 + discipline * 0.16 + lowRisk * 0.1 + information * 0.06);
  }

  if (state.framework === "signal") {
    return Math.round(momentum * 0.32 + catalyst * 0.22 + quality * 0.18 + valuation * 0.14 + lowRisk * 0.1 + margin * 0.04);
  }

  return Math.round(berkshire * 0.38 + momentum * 0.18 + catalyst * 0.12 + margin * 0.14 + lowRisk * 0.1 + information * 0.08);
}

function renderPlaybook(analyses) {
  const items = buildPlaybook(analyses);
  el.playbookList.replaceChildren(
    ...items.map((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      return li;
    }),
  );
}

function buildPlaybook(analyses) {
  if (Array.isArray(state.modelReport?.playbook) && state.modelReport.playbook.length > 0) {
    return state.modelReport.playbook;
  }

  if (!analyses.length) {
    return [
      "选择股票后生成研究动作。",
      "先用 Checklist 排除看不懂、没边际、风险过高的标的。",
      "静态页面不包含实时行情，正式决策前核对最新价格、公告、财报和个人风险承受能力。",
    ];
  }

  const ranked = [...analyses].sort((a, b) => rankScore(b) - rankScore(a));
  const focus = ranked
    .slice(0, Math.min(3, ranked.length))
    .map((item) => item.symbol)
    .join("、");
  const lowMargin = analyses.filter((item) => item.scores.margin < 48);
  const highRisk = analyses.filter((item) => item.scores.risk >= 68);
  const strongBusiness = analyses.filter((item) => item.scores.business >= 76 && item.scores.moat >= 70);
  const signalOnly = analyses.filter((item) => item.scores.momentum >= 70 && item.scores.berkshire < 60);

  return [
    `优先研究：${focus}。先写一句话投资假设，再找能推翻它的证据。`,
    strongBusiness.length
      ? `好生意候选：${strongBusiness.map((item) => item.symbol).join("、")}。继续核对现金流、竞争优势和管理层长期记录。`
      : "好生意信号不集中。先把行业周期、盈利稳定性和真实护城河补清楚。",
    lowMargin.length
      ? `安全边际不足：${lowMargin.map((item) => item.symbol).join("、")}。价格不舒服时，研究可以继续，动作应该慢。`
      : "安全边际读数没有明显拖后腿，但仍需用最新估值和财报验证。",
    highRisk.length
      ? `风险闸门触发：${highRisk.map((item) => item.symbol).join("、")}。稳健模式下先做反向清单。`
      : "组合风险没有集中报警。继续检查单票事件风险和仓位相关性。",
    signalOnly.length
      ? `信号强但价值弱：${signalOnly.map((item) => item.symbol).join("、")}。适合观察，不适合用兴奋感替代研究。`
      : "短期信号和长期质量没有明显背离。",
  ];
}

function renderLens(analyses) {
  const lens = {
    dyp: average(analyses, (item) => item.scores.masters.dyp),
    buffett: average(analyses, (item) => item.scores.masters.buffett),
    munger: average(analyses, (item) => item.scores.masters.munger),
    lilu: average(analyses, (item) => item.scores.masters.lilu),
  };

  el.dypScore.textContent = analyses.length ? scoreToFive(lens.dyp) : "--";
  el.buffettScore.textContent = analyses.length ? scoreToFive(lens.buffett) : "--";
  el.mungerScore.textContent = analyses.length ? scoreToFive(lens.munger) : "--";
  el.liluScore.textContent = analyses.length ? scoreToFive(lens.lilu) : "--";

  el.dypNote.textContent = analyses.length ? lensNote("dyp", lens.dyp) : "选择股票后评估生意本质。";
  el.buffettNote.textContent = analyses.length ? lensNote("buffett", lens.buffett) : "选择股票后评估护城河和价格。";
  el.mungerNote.textContent = analyses.length ? lensNote("munger", lens.munger) : "选择股票后进行逆向排雷。";
  el.liluNote.textContent = analyses.length ? lensNote("lilu", lens.lilu) : "选择股票后评估长期确定性。";
}

function scoreToFive(score) {
  return `${(score / 20).toFixed(1)}/5`;
}

function lensNote(type, score) {
  const strong = score >= 72;
  const weak = score < 55;
  const notes = {
    dyp: strong ? "生意本质相对清楚，适合继续追问长期竞争格局。" : weak ? "先确认自己是否真的看懂这门生意。" : "需要补充商业模式和用户黏性证据。",
    buffett: strong ? "护城河和现金流读数较好，下一步看价格。" : weak ? "护城河或安全边际不足，谨慎扩大假设。" : "质量可研究，价格和持久性还要交叉验证。",
    munger: strong ? "反向风险较少，继续查找隐藏的坏消息。" : weak ? "逆向清单报警，先看会亏钱的路径。" : "风险不算极端，但需要更严格的证伪。",
    lilu: strong ? "长期确定性较好，适合拉长研究周期。" : weak ? "长期路径不够清晰，先补行业和财务数据。" : "确定性中等，观察基本面是否持续兑现。",
  };
  return notes[type];
}

function renderChecklist(analyses) {
  const checks = buildChecklist(analyses);
  el.checklistList.replaceChildren(
    ...checks.map((item) => {
      const row = document.createElement("div");
      row.className = `check-item ${item.status}`;

      const mark = document.createElement("span");
      mark.className = "check-mark";
      mark.textContent = item.status === "pass" ? "✓" : item.status === "warn" ? "!" : "×";

      const copy = document.createElement("div");
      copy.className = "check-copy";
      const title = document.createElement("strong");
      title.textContent = item.title;
      const detail = document.createElement("span");
      detail.textContent = item.detail;
      copy.append(title, detail);

      row.append(mark, copy);
      return row;
    }),
  );
}

function buildChecklist(analyses) {
  if (Array.isArray(state.modelReport?.checklist) && state.modelReport.checklist.length > 0) {
    return state.modelReport.checklist.map((item) => ({
      title: item.title || "模型检查项",
      detail: item.detail || item.description || "等待补充说明。",
      status: normalizeStatus(item.status),
    }));
  }

  if (!analyses.length) {
    return [
      { title: "能力圈", detail: "选股后检查是否看得懂。", status: "warn" },
      { title: "好生意", detail: "等待质量和现金流读数。", status: "warn" },
      { title: "安全边际", detail: "等待估值和价格容错。", status: "warn" },
    ];
  }

  const circle = average(analyses, (item) => item.scores.circle);
  const business = average(analyses, (item) => item.scores.business);
  const moat = average(analyses, (item) => item.scores.moat);
  const stewardship = average(analyses, (item) => Math.round((item.scores.management + item.scores.cashflow) / 2));
  const margin = average(analyses, (item) => item.scores.margin);
  const risk = average(analyses, (item) => item.scores.risk);

  return [
    {
      title: `能力圈 ${circle}`,
      detail: circle >= 65 ? "大部分标的相对可理解。" : circle >= 50 ? "有些生意需要补行业常识。" : "看不懂的部分偏多。",
      status: statusHigh(circle, 65, 50),
    },
    {
      title: `好生意 ${business}`,
      detail: business >= 70 ? "商业质量可继续深挖。" : business >= 56 ? "需要核对盈利稳定性。" : "生意质量读数偏弱。",
      status: statusHigh(business, 70, 56),
    },
    {
      title: `护城河 ${moat}`,
      detail: moat >= 68 ? "竞争优势较明显。" : moat >= 54 ? "护城河仍需证据。" : "容易被竞争削弱。",
      status: statusHigh(moat, 68, 54),
    },
    {
      title: `管理层/现金流 ${stewardship}`,
      detail: stewardship >= 70 ? "经营纪律读数较好。" : stewardship >= 55 ? "继续看资本配置和现金流。" : "经营质量需要谨慎复核。",
      status: statusHigh(stewardship, 70, 55),
    },
    {
      title: `安全边际 ${margin}`,
      detail: margin >= 62 ? "价格容错相对舒服。" : margin >= 48 ? "边际一般，等待更好证据或价格。" : "边际不足，先慢下来。",
      status: statusHigh(margin, 62, 48),
    },
    {
      title: `风险反检 ${risk}`,
      detail: risk <= 48 ? "平均风险较低。" : risk <= 64 ? "风险中等，需要逐票排雷。" : "风险读数偏高，先做反向清单。",
      status: statusLow(risk, 48, 64),
    },
  ];
}

function statusHigh(value, pass, warn) {
  if (value >= pass) return "pass";
  if (value >= warn) return "warn";
  return "fail";
}

function statusLow(value, pass, warn) {
  if (value <= pass) return "pass";
  if (value <= warn) return "warn";
  return "fail";
}

function normalizeStatus(value) {
  if (value === "pass" || value === "ok" || value === "通过") return "pass";
  if (value === "fail" || value === "bad" || value === "不通过") return "fail";
  return "warn";
}

function renderStrategy(analyses) {
  const rows = buildStrategyRows(analyses);
  el.strategyTable.replaceChildren(
    ...rows.map((item) => {
      const row = document.createElement("div");
      row.className = "strategy-row";

      const title = document.createElement("strong");
      title.textContent = item.title;
      const detail = document.createElement("span");
      detail.textContent = item.detail;
      const tag = document.createElement("em");
      tag.textContent = item.tag;

      row.append(title, detail, tag);
      return row;
    }),
  );
}

function buildStrategyRows(analyses) {
  if (Array.isArray(state.modelReport?.strategy) && state.modelReport.strategy.length > 0) {
    return state.modelReport.strategy.map((item) => ({
      title: item.title || "模型策略",
      detail: item.detail || item.description || "等待补充说明。",
      tag: item.tag || "模型",
    }));
  }

  if (!analyses.length) {
    return [
      { title: "价值候选", detail: "选择股票后生成候选名单。", tag: "等待" },
      { title: "信号观察", detail: "选择股票后检查短期趋势和催化。", tag: "等待" },
      { title: "风险复核", detail: "选择股票后生成反向清单。", tag: "等待" },
    ];
  }

  const ranked = [...analyses].sort((a, b) => rankScore(b) - rankScore(a));
  const valueNames = ranked
    .filter((item) => item.scores.berkshire >= 66 && item.scores.margin >= 50)
    .slice(0, 3)
    .map((item) => item.symbol);
  const signalNames = ranked
    .filter((item) => item.scores.momentum >= 65 || item.scores.catalyst >= 68)
    .slice(0, 3)
    .map((item) => item.symbol);
  const riskNames = ranked
    .filter((item) => item.scores.risk >= 65 || item.scores.margin < 45)
    .slice(0, 3)
    .map((item) => item.symbol);

  return [
    {
      title: "价值候选",
      detail: valueNames.length ? `${valueNames.join("、")} 先补估值、现金流和护城河证据。` : "暂未出现价值纪律比较完整的候选。",
      tag: valueNames.length ? "深挖" : "等待",
    },
    {
      title: "信号观察",
      detail: signalNames.length ? `${signalNames.join("、")} 有趋势或催化，可观察但仍要过 Checklist。` : "短期信号不集中，少做动作，多看证据。",
      tag: signalNames.length ? "观察" : "冷静",
    },
    {
      title: "风险复核",
      detail: riskNames.length ? `${riskNames.join("、")} 先写清楚可能亏钱的路径。` : "未发现集中风险项，但仍需逐票看公告和财报。",
      tag: riskNames.length ? "排雷" : "通过",
    },
  ];
}

function renderCards(analyses) {
  if (!analyses.length) {
    const empty = document.createElement("div");
    empty.className = "empty-state";
    empty.textContent = "从左侧选择股票";
    el.analysisCards.replaceChildren(empty);
    return;
  }

  const cards = [...analyses]
    .sort((a, b) => rankScore(b) - rankScore(a))
    .map((item) => {
      const card = el.analysisCardTemplate.content.cloneNode(true);
      card.querySelector("h4").textContent = `${item.symbol} · ${item.name}`;
      card.querySelector("p").textContent = `${marketNames[item.market]} / ${item.sector} / ${frameworkName()}`;
      card.querySelector(".card-title > span").textContent = item.model?.action || actionLabel(rankScore(item));
      card.querySelector('[data-score="berkshire"]').textContent = item.scores.berkshire;
      card.querySelector('[data-score="margin"]').textContent = item.scores.margin;
      card.querySelector('[data-score="momentum"]').textContent = item.scores.momentum;
      card.querySelector('[data-score="risk"]').textContent = item.scores.risk;

      const miniChecks = createMiniChecks(item).map((check) => {
        const chip = document.createElement("span");
        chip.className = check.status;
        chip.textContent = check.label;
        return chip;
      });
      card.querySelector(".mini-checks").replaceChildren(...miniChecks);

      const notes = createNotes(item).map((text) => {
        const li = document.createElement("li");
        li.textContent = text;
        return li;
      });
      card.querySelector(".notes").replaceChildren(...notes);
      return card;
    });

  el.analysisCards.replaceChildren(...cards);
}

function createMiniChecks(item) {
  return [
    { label: "能力圈", status: statusHigh(item.scores.circle, 65, 50) },
    { label: "好生意", status: statusHigh(item.scores.business, 70, 56) },
    { label: "安全边际", status: statusHigh(item.scores.margin, 62, 48) },
    { label: "反向风险", status: statusLow(item.scores.risk, 48, 64) },
  ];
}

function createNotes(item) {
  if (item.model) {
    const modelNotes = [];
    if (item.model.thesis) {
      modelNotes.push(`模型论点：${item.model.thesis}`);
    }
    if (Array.isArray(item.model.notes)) {
      modelNotes.push(...item.model.notes);
    }
    if (item.model.risks) {
      const risks = Array.isArray(item.model.risks) ? item.model.risks.join("；") : item.model.risks;
      modelNotes.push(`主要风险：${risks}`);
    }
    if (modelNotes.length > 0) return modelNotes.slice(0, 5);
  }

  const notes = [];
  const { valuation, quality, momentum, risk, catalyst, berkshire, margin, business, moat, cashflow, predictability, information } = item.scores;

  if (berkshire >= 72) notes.push("长期价值读数较强，下一步核对现金流和竞争优势是否真实。");
  if (berkshire < 55) notes.push("价值纪律读数偏弱，先确认这是不是自己能看懂的生意。");
  if (business >= 76 && moat >= 70) notes.push("好生意和护城河信号较好，适合做更深的基本面研究。");
  if (margin < 48) notes.push("安全边际不足，研究可以继续，动作需要更慢。");
  if (momentum >= 70 && margin < 55) notes.push("趋势强但价格容错一般，注意情绪驱动的误判。");
  if (risk >= 68) notes.push("风险闸门报警，先写反向清单，再看机会。");
  if (quality >= 72 && cashflow >= 70) notes.push("质量和现金流读数较好，继续核对近年财报韧性。");
  if (predictability < 48) notes.push("长期路径不够清晰，适合先补行业周期和盈利可预测性。");
  if (catalyst >= 68) notes.push("催化信号活跃，关注公告、财报、政策或产品节奏。");
  if (valuation >= 70) notes.push("估值读数较友好，但仍需用最新价格重新计算。");
  if (information < 52) notes.push("信息完整度偏低，自定义或资料不足的标的要额外核验。");

  if (notes.length < 3) notes.push("下一步核对最新财报、估值、行业景气度和资金面变化。");
  return notes.slice(0, 5);
}

function drawChart() {
  const analyses = getSelectedAnalyses();
  const canvas = el.analysisCanvas;
  const ctx = canvas.getContext("2d");
  const rect = canvas.getBoundingClientRect();
  const width = rect.width || 900;
  const height = rect.height || 420;
  const ratio = window.devicePixelRatio || 1;

  canvas.width = Math.max(640, Math.floor(width * ratio));
  canvas.height = Math.max(360, Math.floor(height * ratio));
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);

  if (!analyses.length) {
    drawEmptyChart(ctx, width, height);
    return;
  }

  if (state.chartMode === "trend") {
    drawTrend(ctx, width, height, analyses.slice(0, 6));
  } else if (state.chartMode === "masters") {
    drawMasters(ctx, width, height, analyses);
  } else {
    drawRadar(ctx, width, height, analyses);
  }
}

function drawEmptyChart(ctx, width, height) {
  ctx.fillStyle = "#61707f";
  ctx.font = "600 16px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("选择股票后显示图表", width / 2, height / 2);
}

function drawRadar(ctx, width, height, analyses) {
  const centerX = width / 2;
  const centerY = height / 2 + 12;
  const radius = Math.min(width, height) * 0.32;
  const labels = ["能力圈", "好生意", "护城河", "管理层", "边际", "低风险"];
  const values = [
    average(analyses, (item) => item.scores.circle),
    average(analyses, (item) => item.scores.business),
    average(analyses, (item) => item.scores.moat),
    average(analyses, (item) => item.scores.management),
    average(analyses, (item) => item.scores.margin),
    100 - average(analyses, (item) => item.scores.risk),
  ];

  ctx.strokeStyle = "#d0dae4";
  ctx.lineWidth = 1;
  for (let ring = 1; ring <= 4; ring += 1) {
    drawPolygon(ctx, centerX, centerY, (radius * ring) / 4, labels.length);
  }

  labels.forEach((label, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / labels.length;
    const endX = centerX + Math.cos(angle) * radius;
    const endY = centerY + Math.sin(angle) * radius;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
    ctx.fillStyle = "#314253";
    ctx.font = "700 13px system-ui, sans-serif";
    ctx.textAlign = Math.cos(angle) > 0.25 ? "left" : Math.cos(angle) < -0.25 ? "right" : "center";
    ctx.fillText(label, centerX + Math.cos(angle) * (radius + 30), centerY + Math.sin(angle) * (radius + 24));
  });

  ctx.beginPath();
  values.forEach((value, index) => {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / values.length;
    const pointRadius = (radius * value) / 100;
    const x = centerX + Math.cos(angle) * pointRadius;
    const y = centerY + Math.sin(angle) * pointRadius;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  });
  ctx.closePath();
  ctx.fillStyle = "rgba(180, 83, 9, 0.2)";
  ctx.strokeStyle = "#b45309";
  ctx.lineWidth = 3;
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = "#17202a";
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText(`价值纪律 ${average(analyses, (item) => item.scores.berkshire)}`, centerX, 34);
}

function drawPolygon(ctx, centerX, centerY, radius, points) {
  ctx.beginPath();
  for (let index = 0; index < points; index += 1) {
    const angle = -Math.PI / 2 + (index * Math.PI * 2) / points;
    const x = centerX + Math.cos(angle) * radius;
    const y = centerY + Math.sin(angle) * radius;
    if (index === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawMasters(ctx, width, height, analyses) {
  const bars = [
    { label: "段永平", value: average(analyses, (item) => item.scores.masters.dyp), color: "#0f766e" },
    { label: "巴菲特", value: average(analyses, (item) => item.scores.masters.buffett), color: "#b45309" },
    { label: "芒格", value: average(analyses, (item) => item.scores.masters.munger), color: "#2563eb" },
    { label: "李录", value: average(analyses, (item) => item.scores.masters.lilu), color: "#7c3aed" },
  ];
  const padding = { top: 42, right: 36, bottom: 42, left: 82 };
  const plotWidth = width - padding.left - padding.right;
  const gap = 18;
  const barHeight = Math.min(46, (height - padding.top - padding.bottom - gap * (bars.length - 1)) / bars.length);

  ctx.fillStyle = "#17202a";
  ctx.font = "700 18px system-ui, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("四师视角均值", width / 2, 28);

  bars.forEach((bar, index) => {
    const y = padding.top + index * (barHeight + gap);
    const barWidth = (plotWidth * bar.value) / 100;
    ctx.fillStyle = "#e8edf2";
    ctx.fillRect(padding.left, y, plotWidth, barHeight);
    ctx.fillStyle = bar.color;
    ctx.fillRect(padding.left, y, barWidth, barHeight);
    ctx.fillStyle = "#314253";
    ctx.font = "700 13px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(bar.label, padding.left - 10, y + barHeight / 2 + 5);
    ctx.textAlign = "left";
    ctx.fillText(`${bar.value}`, padding.left + barWidth + 8, y + barHeight / 2 + 5);
  });
}

function drawTrend(ctx, width, height, analyses) {
  const padding = { top: 34, right: 24, bottom: 42, left: 48 };
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;
  const colors = ["#0f766e", "#2563eb", "#b45309", "#9333ea", "#be123c", "#475569"];

  ctx.strokeStyle = "#d0dae4";
  ctx.lineWidth = 1;
  for (let line = 0; line <= 4; line += 1) {
    const y = padding.top + (plotHeight * line) / 4;
    ctx.beginPath();
    ctx.moveTo(padding.left, y);
    ctx.lineTo(width - padding.right, y);
    ctx.stroke();
  }

  analyses.forEach((item, stockIndex) => {
    const points = syntheticSeries(item);
    ctx.beginPath();
    points.forEach((point, index) => {
      const x = padding.left + (plotWidth * index) / (points.length - 1);
      const y = padding.top + plotHeight - ((point - 70) / 60) * plotHeight;
      if (index === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    ctx.strokeStyle = colors[stockIndex % colors.length];
    ctx.lineWidth = 3;
    ctx.stroke();

    const lastX = padding.left + plotWidth;
    const lastPoint = points[points.length - 1];
    const lastY = padding.top + plotHeight - ((lastPoint - 70) / 60) * plotHeight;
    ctx.fillStyle = colors[stockIndex % colors.length];
    ctx.font = "700 12px system-ui, sans-serif";
    ctx.textAlign = "right";
    ctx.fillText(item.symbol, lastX - 4, Math.max(padding.top + 12, Math.min(height - padding.bottom, lastY - 6)));
  });

  ctx.fillStyle = "#61707f";
  ctx.font = "600 12px system-ui, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("弱", padding.left, height - 14);
  ctx.textAlign = "right";
  ctx.fillText("强", width - padding.right, height - 14);
}

function syntheticSeries(item) {
  const seed = hashString(item.symbol);
  const base = 95 + seededOffset(seed, 6);
  const drift = (item.scores.momentum - item.scores.risk * 0.35 + item.scores.catalyst * 0.08) / 18;
  const points = [];

  for (let index = 0; index < 18; index += 1) {
    const wave = Math.sin(index * 0.9 + seed) * 6;
    const noise = seededOffset(seed + index, 7) * 0.45;
    points.push(Math.max(70, Math.min(130, base + drift * index + wave + noise)));
  }

  return points;
}

function buildPayload() {
  const analyses = getSelectedAnalyses();
  return {
    generatedAt: new Date().toISOString(),
    framework: state.framework,
    mode: state.conservative ? "conservative" : "balanced",
    notice: "静态页生成的研究参考，不包含实时行情，不构成投资建议。",
    checklist: buildChecklist(analyses),
    strategy: buildStrategyRows(analyses),
    selected: analyses.map((item) => ({
      symbol: item.symbol,
      name: item.name,
      market: item.market,
      sector: item.sector,
      scores: item.scores,
      action: actionLabel(rankScore(item)),
      notes: createNotes(item),
    })),
  };
}
