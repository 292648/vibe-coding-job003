# 🧑‍🏫 講師手冊

> 這份文件只給講師看。內容包含說明段大綱、時間控制點、Demo 腳本、以及現場備援方案。

---

## 📋 活動前一週的準備

- [ ] 把 template repo 的網址寄給學員,附上 [環境準備清單](00-setup.md),請他們**前一天先裝好**
- [ ] 提醒學生 / 教師身分的學員申請 [GitHub Education](https://education.github.com/discount_requests/application)(審核要幾天)
- [ ] 自己**完整跑一次彩排**(見下方「彩排檢查表」)
- [ ] 確認場地網路能連 `github.com`、`api.githubcopilot.com`、`learn.microsoft.com`

## 📋 活動當天開場前

- [ ] 投影片 / 螢幕分享準備好
- [ ] 自己的示範 repo 開好,Chat 面板已登入且 **Agent 模式可用**
- [ ] `.vscode/mcp.json` 的 MCP server **先啟動過一次**(避免現場等 OAuth)
- [ ] 白板 / 便利貼:寫上 **template repo 網址** 和 **「卡住超過 5 分鐘就用 solutions/」**

---

## 🎤 演講一(13:10 – 13:40,30 分鐘)

| 時間 | 主題 | 重點 |
| :--- | :--- | :--- |
| 13:10 – 13:15 | **開場 + 成品 Demo** | 直接展示做完的 To-Do App,再展示 `/fix-issue` 自動開 PR 的畫面。**先給結果,再講原理** |
| 13:15 – 13:25 | **Agent Mode** | Ask / Edit / Agent 對照表。核心一句話:**你給的是目標,不是步驟** |
| 13:25 – 13:32 | **MCP** | 「AI 的 USB-C」。強調安全:只裝信任來源、授權對話框要看 |
| 13:32 – 13:38 | **Agentic Workflow** | 公式:**規矩 + 劇本 + 手腳**。強調「可版控、可 review、團隊共用」 |
| 13:38 – 13:40 | **環境檢查 + 建 repo** | 帶大家一起按 **Use this template**,順便抓出環境有問題的人 |

### 演講一的三個關鍵訊息

1. **Agent Mode 不是自動完成升級版** —— 它會自己開檔案、跑指令、看結果、自我修正
2. **MCP 讓 AI 走出這台電腦** —— 沒有 MCP,AI 只看得到你的檔案
3. **今天的重點是理解,不是把程式碼打完** —— 卡住就用解答檔,沒有人會落後

---

## ⌨️ 實作段時間控制(13:40 – 15:40,120 分鐘)

| 掛鐘時間 | 應該在哪 | 落後的話 |
| :--- | :--- | :--- |
| **13:55** | 大家 repo 建好、clone 好、issue 出現 | 環境有問題的人先兩人一組 |
| **14:25** | Step 1 完成(To-Do App 跑起來) | **這關最重要,寧可多花 5 分鐘** |
| **14:45** | Step 2 完成 | 落後就把「四種還原方法」改成只講師示範,學員只做方法一 |
| **15:15** | Step 3 完成(MCP 接上) | **這關也是重點**。GitHub MCP 接不上就只做 Microsoft Learn |
| **15:35** | Step 4 完成 | 落後就直接用 `solutions/step-4/` 複製,講師示範 `/fix-issue` 執行過程 |
| **15:40** | 測驗 + 收尾 | 測驗可以帶著念,或請學員回家自己做 |

### ⏰ 三個必須喊停的時間點

- **14:25** — 不管 Step 1 有沒有做完,**喊停,統一用 solutions 補齊**,然後往下走
- **15:15** — Step 3 一定要在這時結束,否則 Step 4 會做不完
- **15:35** — 強制收尾,留 5 分鐘做測驗與總結

---

## 🎬 Demo 腳本(講師示範用)

### Step 1 示範重點:讓大家「看見 agent 在做事」

貼上提示詞後,**不要講話,讓大家看 30 秒**。然後才說:

> 「注意看,它先列了一份工作清單,然後一個一個檔案建出來。
> 你剛剛沒有告訴它要建幾個檔案、每個檔案放什麼 —— 是它自己決定的。」

### Step 2 示範重點:讓大家「敢按下去」

刻意做壞的那一步,很多學員會不敢執行。要說:

> 「放心弄壞它,我們等一下會救回來。**這一關的重點就是讓你知道怎麼反悔。**」

Restore Checkpoint 一定要**投影出來讓大家看到按鈕在哪裡**。

### Step 3 示範重點:讓大家「看到工具被呼叫」

執行 Microsoft Learn 查詢時,把 Chat 裡的**工具呼叫區塊點開**:

> 「看到了嗎?它自己決定要用文件搜尋這個工具,自己組了查詢字串。
> 我沒有告訴它要查什麼關鍵字。」

### Step 4 示範重點:最後的「哇」

`/fix-issue` 執行完之後,**切到瀏覽器打開那個 PR**:

> 「我剛剛只打了一行指令。它讀了 GitHub 上的 issue、改了程式、開了分支、推上去、開了 PR。
> 而這整套流程,是一份**你可以 commit 進 repo、給整個團隊用**的 Markdown 檔案。」

---

## 🚨 現場常見狀況與處置

| 狀況 | 立即處置 |
| :--- | :--- |
| **有人 issue 沒出現** | Actions 頁籤手動 Run **Step 0**。詳見 [疑難排解](troubleshooting.md#issue-沒有自動出現) |
| **一堆人 push 被拒絕** | 全班喊:「執行 `git pull --rebase` 再 push」。這是最常見的 |
| **有人 Copilot 額度用完** | 請他改用 `solutions/`,並提醒可申請 GitHub Education |
| **現場網路很慢,agent 一直逾時** | 果斷改成**講師示範 + 全班用 solutions 推關**。不要讓大家乾等 |
| **GitHub MCP OAuth 大量失敗** | 只做 Microsoft Learn MCP。Step 4 用「把 issue 內容貼給 agent」的替代做法 |
| **有人卡在某一關** | Actions 手動 Run 對應的 Step workflow 強制跳關 |
| **有人改壞了救不回來** | `solutions/` 覆蓋,或兩分鐘重建一個 repo |

> 💡 **全場通用的一句話**:
> 「卡住超過 5 分鐘就用 solutions,先跟上,回家再研究。今天要帶走的是觀念,不是程式碼。」

---

## 💸 關於 Copilot 免費版的額度

- 免費版的 chat / agent 使用量**有月額度限制**(程式碼自動補完另計)
- 本教材已把全程 agent 回合壓在 **11 次以內**
- 提示詞刻意寫長寫完整,就是為了**一次到位、少來回**
- **每一關都有 `solutions/` 零額度通關路徑**,額度用完不影響完成度

👉 開場時就講清楚這件事,學員才不會在額度用完時慌張。

---

## ✅ 彩排檢查表(活動前務必跑一次)

- [ ] 用**另一個帳號**從 template 建立 public repo
- [ ] Actions 自動執行 **Step 0**,`Exercise:` issue 出現,README 被換成 Go to Exercise
- [ ] push `index.html` / `app.js` → Step 1 通過,Step 2 內容貼出
- [ ] push `CHANGELOG.md` → Step 2 通過,Step 3 內容貼出
- [ ] push `.vscode/mcp.json` → Step 3 通過,**三個 issue 被自動建立**,Step 4 內容貼出
- [ ] push `.github/copilot-instructions.md` + `.github/prompts/fix-issue.prompt.md` → x-review 貼出,issue 被關閉
- [ ] 任選一關測試**手動跳關**:Enable workflow → Run workflow → 確認能推進
- [ ] 用 Copilot **免費版**帳號實跑一次,記錄實際額度消耗
- [ ] Microsoft Learn MCP 能 Start 並列出工具
- [ ] GitHub MCP OAuth 流程能完成

---

## 🎤 演講二(15:50 – 16:20,30 分鐘)

_(主題待補 —— 先留空白)_

> ⏰ 提醒:實作段 15:40 一定要結束,15:40 – 15:50 是休息時間。
> 學員做完 Step 4 後 issue 會自動關閉,可以請他們趁休息前先把五題測驗做完。
