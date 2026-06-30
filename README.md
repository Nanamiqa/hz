# Berkshire Signal Desk

这是一个 GitHub Pages 可直接运行的静态股票研究台，融合了两个项目的思路：

- `ZhuLinsen/daily_stock_analysis`：股票选择、组合面板、技术/风险/催化信号、JSON 输出。
- `xbtlin/ai-berkshire`：价值投资纪律、四位投资者视角、质量筛选、Checklist 和组合管理。

页面可以直接在浏览器运行，不需要构建步骤，不需要后端服务。

## 功能

- A 股、港股、美股筛选
- 核心样本和价值候选一键选择
- 自定义股票添加
- 综合、价值、信号三种研究框架
- 伯克希尔分、安全边际、技术动量、风险闸门
- 价值雷达、四师视角、信号趋势图
- 买前 Checklist
- 策略分层和单股研究卡
- 优先读取 `reports/latest.json` 大模型报告
- JSON 导出

## 本地打开

直接打开 `index.html` 即可。

也可以启动一个静态服务器：

```bash
python3 -m http.server 8080
```

然后访问：

```text
http://127.0.0.1:8080
```

## 部署到 GitHub Pages

1. 把 `index.html`、`styles.css`、`app.js`、`.nojekyll` 推到你的 GitHub 仓库。
2. 打开仓库 `Settings`。
3. 进入 `Pages`。
4. `Build and deployment` 选择 `Deploy from a branch`。
5. 分支选择 `main`，目录选择 `/root`。
6. 保存后等待 GitHub 生成 Pages 地址。

## 大模型报告

页面会优先读取：

```text
reports/latest.json
```

如果该文件存在，页面会用其中的模型论点、分数、Checklist、策略和单股 notes。读取失败时，页面会自动退回浏览器本地规则评分。

本地生成报告：

```bash
OPENAI_API_KEY=你的key node scripts/generate-report.mjs
```

指定股票：

```bash
STOCK_LIST=BRK.B,AAPL,MSFT,00700,600519 OPENAI_API_KEY=你的key node scripts/generate-report.mjs
```

如果没有 `OPENAI_API_KEY`，脚本会生成 fallback 报告，用来验证页面通道。

## GitHub Actions

仓库包含 `.github/workflows/generate-report.yml`，支持手动运行和工作日定时运行。

需要在 GitHub 仓库里配置：

- `Settings -> Secrets and variables -> Actions -> Secrets`
- 添加 `OPENAI_API_KEY`
- 可选添加 `OPENAI_BASE_URL`
- 可选在 `Variables` 添加 `OPENAI_MODEL` 和 `STOCK_LIST`

Actions 会生成并提交 `reports/latest.json`，GitHub Pages 会读取这个静态 JSON。

## 本地 skill 仓库

本地可以把外部 skill 仓库放在：

```text
vendor/
```

当前建议结构：

```text
vendor/daily_stock_analysis/
vendor/ai-berkshire/
```

`vendor/` 已加入 `.gitignore`，只作为本机对话和脚本参考，不推送到 GitHub Pages 仓库。

你可以在 Codex 对话里说：

```text
参考 vendor/daily_stock_analysis/SKILL.md 和 vendor/ai-berkshire/codex-skills/investment-research/SKILL.md，分析我的观察池并更新 reports/latest.json
```

## 重要边界

GitHub Pages 只能托管静态文件，不能安全运行 Python 分析服务，也不能把模型 API Key、搜索 API Key 或券商/行情 Key 放到前端。

因此大模型调用应发生在本地、Codex 对话、GitHub Actions 或后端代理里；浏览器只读取生成后的静态 JSON。

后续升级路线：

1. 用 GitHub Actions 定时运行 Python 分析。
2. 把结果保存为 `reports/latest.json`。
3. 让本页面读取静态 JSON，显示真实报告。
4. API Key 只放在 GitHub Secrets，不进入浏览器。
