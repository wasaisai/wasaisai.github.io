# 知识库深度文章设计

## 目标

把个人网站知识库从简短摘要升级为有原始材料、有问题意识、有机制解释和明确观点的文章集合。公开主题固定为：前端、健康、心理、关系、AI；彻底移除“长期问题”及编程、个人事实、个人 IP、商业、自媒体等旧主题入口。

本轮先发布原始材料充分的前端与 AI 文章。健康、心理、关系保留主题入口，只有拿到对应完整聊天记录后才补充文章，不根据标题索引或二手摘要扩写。

## 原始材料

### 前端

- `/Users/xianggua/ip-kb/conversations/React 核心机制解析.md`
- `/Users/xianggua/ip-kb/conversations/Vue框架原理.md`
- `/Users/xianggua/ip-kb/conversations/Vue React vs Web Components.md`
- `/Users/xianggua/ip-kb/conversations/Promise 异步机制解析.md`
- `/Users/xianggua/ip-kb/conversations/JS Bridge 原理解析.md`
- `/Users/xianggua/ip-kb/conversations/V8引擎懒解析策略.md`
- `/Users/xianggua/Library/Mobile Documents/com~apple~CloudDocs/work_docs` 中与小程序、构建、运行时和工程排障有关的完整文档

`Promise 异步机制解析 (1).md` 与无后缀版本内容相同，只使用一份，避免重复取材。

### AI

- `/Users/xianggua/Desktop/ai agent学习笔记.pages`，通过 Pages 只读导出的临时文本进行分析
- `/Users/xianggua/ip-kb/conversations/理解RAG与记忆模型.md`
- `/Users/xianggua/ip-kb/conversations/监督学习.md`
- `/Users/xianggua/Library/Mobile Documents/com~apple~CloudDocs/work_docs/chx-mini` 中的 Agent、Memory、HITL、状态管理、容错恢复、知识库和实验记录

### 健康、心理、关系

`visible-chatgpt-threads` 目前只有标题和元数据，不足以作为文章依据。对应完整对话导出前，这三个主题不发布推断性文章。

## 文章生产方法

每篇文章都按以下论证链组织，而不是复述单次回答：

1. 从用户在对话中真实提出的问题或误解开始。
2. 给出概念边界，区分容易混淆的层级。
3. 从底层机制逐层解释到上层行为。
4. 使用对话中的追问、反例或纠正展示推理过程。
5. 连接真实工程材料，说明机制如何影响设计选择。
6. 给出适用条件、限制和常见误区。
7. 收束为可迁移到其他问题的判断，而不是口号式结论。

### 长文验收标准

字数不是目标。每篇文章必须先明确 `核心问题`、`核心观点`、`认知变化` 和 `证据来源`，再按问题需要组织正文。文章至少包含问题背景、概念边界、现象到机制的推理、真实案例或代码/场景、作者判断、边界与反例、最终结论；每一层都必须增加新的信息，不得用同义句填充长度。若当前材料不足以形成完整文章，保留主题入口，不编造内容。

文章正文通常可达到 2500–4000 字，但只在论证确实需要时达到该长度；一篇 1000 字但论证完整的文章优于一篇注水的 4000 字文章。

文章不得按学习笔记原始顺序改写，不得堆砌术语，不得把资料中的事实、资料作者观点、推导结论和 AI 外部补充混为一谈。最终公开页面只输出文章正文，不输出生成说明、字数统计或自我评价。

文章不直接公开聊天原文、公司内部项目名、接口、业务数据、路径、人员信息或敏感实现。来源只用于内部校对；公开页面使用“聊天记录”“学习笔记”“工程实践”等概括性表述。

## 前端文章

1. **React 为什么不是模板渲染器：从组件、Fiber 到可中断调度**
   解释 JSX、元素树、Fiber、Lane、Scheduler、render 与 commit 的职责；重点澄清 MessageChannel 只是宿主调度手段，Lane 才表示优先级，commit 也不是一个独立排队的“宏任务”。
2. **Vue 2 到 Vue 3：响应式系统为什么从 defineProperty 走向 Proxy**
   从对象新增、删除、数组索引和依赖收集出发，解释 Proxy 带来的能力边界变化，再连接 Composition API、逻辑复用和 Tree-shaking。
3. **Vue、React 和 Web Components：它们解决的不是同一层问题**
   比较浏览器标准、框架运行时、状态与更新模型、组件隔离、构建依赖和生态，给出选择条件。
4. **JS Bridge 的本质不是函数注入，而是跨运行时消息协议**
   解释 WebView 初始化、脚本注入、postMessage、callback ID、Promise 封装、iOS/Android 通道差异、单一入口和权限边界。
5. **Promise 链为什么会变成一串微任务：从同步执行到事件循环**
   以原对话中的随机 Promise 链为线索，区分 executor 同步执行、状态确定、reaction 入队、Promise 吸收、错误传播、宏任务和微任务。
6. **JavaScript 代码不是一次性被 V8 全部编译：懒解析如何服务启动性能**
   解释 token、AST、预解析、完整解析、执行上下文、Ignition 与 JIT 的阶段关系，并讨论代码加载和首屏性能。

## AI 文章

1. **生成式 AI 到底在生成什么：从 token 到概率分布**
2. **神经网络为什么要做得更深：函数分解、Layer 与 Transformer**
3. **模型的架构和参数不是一回事：从 Transformer 到训练**
4. **监督学习是生成式 AI 的底层入口：从标签、损失到泛化**
5. **AI Agent 并不是一种新模型：它是 LLM 加上行动循环**
6. **Agent 的记忆不是把聊天记录全部塞进上下文**
7. **RAG 是 Agent 的外部记忆：从检索资料到检索经验**
8. **Reflection 为什么可能让 Agent 变聪明，也可能制造幻觉**
9. **工具调用的本质：LLM 输出调用意图，系统负责真正执行**
10. **工具太多时，Agent 也需要工具检索**
11. **Agent 能不能自己造工具：从一次性代码到可复用能力**
12. **Agent 的计划为什么必须允许被打断：从 Plan 到 Replan**

AI 文章按“基础模型 → Agent → 记忆 → 工具 → 规划与工程化”递进。最后一篇结合 `work_docs/chx-mini` 中的工作流中断、状态持久化、HITL、容错恢复和 Harness Engineering，把模型能力落到可运行系统。

## 数据结构

`data/knowledge-public.json` 保留 `profile`、`topics` 和 `featured` 作为页面所需数据：

- `topics` 只包含 `frontend`、`health`、`psychology`、`relationship`、`ai`。
- 每个主题包含 `id`、`name`、`intro` 和排序字段。
- `featured` 中每篇文章包含 `id`、`title`、`category`、`topic`、`summary` 和 `article`。
- `article` 包含 `lede` 与有序 `sections`；section 支持 `title`、`paragraphs`、`bullets`。
- 页面不公开本地绝对路径或原始聊天链接。

旧的 `links`、`timeline` 等关系图数据如果页面不再消费则移除，避免继续维护失真的旧主题关系。

## 页面行为

`knowledge/index.html` 延续现有二级页视觉语言，不重新设计整体布局：

- 主题栏始终展示五个主题，包括暂时没有文章的主题。
- 主题项展示名称、文章数，并在选中后显示该主题简介。
- 左侧第二段只展示当前主题文章。
- 空主题显示温和说明，不自动跳回其他主题。
- 文章通过 `?topic=` 与 `?item=` 定位；无效文章 ID 回退到当前主题第一篇。
- 空主题不渲染伪文章，正文区域展示明确的“等待完整原始材料”状态。
- 保持移动端横向主题滚动、键盘焦点和现有半透明选中态。

## 验收标准

- JSON 可被标准解析器解析。
- 公开主题恰好为五个，且不存在“长期问题”等旧主题名称或旧 topic ID。
- 每篇前端/AI 文章至少包含完整的问题定义、机制解释、误区或边界、工程判断和结论。
- 文章之间不重复大段解释；共同概念通过引用式衔接而非复制。
- 页面可展示无文章主题、主题简介、文章列表和长文正文。
- URL 直达、主题切换、文章切换、数据加载失败和移动端布局均通过验证。
- 不泄露公司内部信息、隐私信息、本地路径或原始聊天链接。
- 实施只修改 `data/knowledge-public.json` 与 `knowledge/index.html`；设计说明作为本轮过程文档单独提交。
