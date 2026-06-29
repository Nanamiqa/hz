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

## 重要边界

GitHub Pages 只能托管静态文件，不能安全运行 Python 分析服务，也不能把模型 API Key、搜索 API Key 或券商/行情 Key 放到前端。

因此这个页面是一个本地研究面板：评分由浏览器本地生成，不包含实时行情，不构成投资建议。

后续升级路线：

1. 用 GitHub Actions 定时运行 Python 分析。
2. 把结果保存为 `reports/latest.json`。
3. 让本页面读取静态 JSON，显示真实报告。
4. API Key 只放在 GitHub Secrets，不进入浏览器。
