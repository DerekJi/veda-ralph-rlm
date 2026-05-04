# 文档地图和快速导航

**目的**: 帮助新成员快速找到所需信息  
**更新**: 2026-05-04

**快速返回主页**: [← 回到 README.md](../README.md)

---

## 📚 文档全景

```
Veda-Ralph-RLM/
├── README.md ✅ (主入口，5分钟入门)
│
├── PROGRESS.md ✅ (开发进度表，实时更新)
│
├── docs/
│   ├── INIT.md ✅ (项目规划、架构、功能)
│   ├── FEASIBILITY.md ✅ (技术分析、风险评估)
│   ├── PROJECT_DECISIONS.md ✅ (决策记录、执行计划)
│   │
│   ├── RLM_STATE_MACHINE.md ⏳ (状态机设计细节)
│   ├── SCRIPT_SANDBOX_DESIGN.md ⏳ (脚本执行安全策略)
│   ├── ATTRIBUTION.md ⏳ (开源引用和许可证)
│   │
│   └── NAVIGATION.md ✅ (文档导航地图，本文档)
│
├── src/ (项目源代码，待创建)
│   ├── extension.ts (入口)
│   ├── rlm/ (RLM 递归引擎)
│   ├── providers/ (模型驱动)
│   ├── runner/ (脚本执行)
│   └── ui/ (Chat UI 处理)
│
├── __tests__/ (测试代码，待创建)
└── package.json (待创建)
```

✅ = 已完成 | ⏳ = 待创建

---

## 🎯 按角色快速导航

### 项目负责人 / 技术主管
**目标**: 了解项目全景和风险，做出资源分配决策

| 步骤 | 时间 | 内容 |
|:---|:---:|:---|
| 1 | 5 分钟 | 阅读 [README.md - 项目简述](../README.md#-项目简述) |
| 2 | 10 分钟 | 阅读 [README.md - 关键指标](../README.md#-项目指标) |
| 3 | 20 分钟 | 复查 [FEASIBILITY.md - 整体评估](FEASIBILITY.md#整体评估) |
| 4 | 15 分钟 | 确认 [PROJECT_DECISIONS.md - 关键决策](PROJECT_DECISIONS.md#关键决策) |
| 5 | 10 分钟 | 查看 [PROJECT_DECISIONS.md - 工作量预估](PROJECT_DECISIONS.md#6-工作量预估与里程碑) |

**关键问题**:
- ✓ 技术是否可行？→ [FEASIBILITY.md - 整体评估](FEASIBILITY.md#整体评估)
- ✓ 工作量是多少？→ [PROJECT_DECISIONS.md](PROJECT_DECISIONS.md#6-工作量预估与里程碑)
- ✓ 关键风险是什么？→ [FEASIBILITY.md - 核心风险点](FEASIBILITY.md#核心风险点)
- ✓ Milestone 怎么规划？→ [README.md - 实施路线](../README.md#-实施路线)

---

### 开发工程师
**目标**: 理解技术方案，按计划执行开发任务

| 步骤 | 时间 | 内容 |
|:---|:---:|:---|
| 1 | 5 分钟 | 打开 [PROGRESS.md](../PROGRESS.md) 看本周任务 |
| 2 | 10 分钟 | 阅读 [README.md](../README.md) 全文获得全景 |
| 3 | 20 分钟 | 理解 [INIT.md - 系统架构](INIT.md#4-系统架构) |
| 4 | 20 分钟 | 查看 [FEASIBILITY.md - 模块可行性](FEASIBILITY.md#模块可行性详析) |
| 5 | 30 分钟 | 遵循 [PROJECT_DECISIONS.md - 立即行动](PROJECT_DECISIONS.md#立即行动-this-week) |
| 6 | 持续 | **每天更新** [PROGRESS.md](../PROGRESS.md) 的进度表 |

**关键文档**:
- 今周任务: **[PROGRESS.md](../PROGRESS.md)** ← 每天看这个
- 架构理解: [INIT.md - 系统架构](INIT.md#4-系统架构)
- 模块分工: [INIT.md - Agent 功能列表](INIT.md#5-agent-功能列表)
- 风险理解: [FEASIBILITY.md - 核心风险点](FEASIBILITY.md#核心风险点)
- 执行步骤: [PROJECT_DECISIONS.md - 立即行动](PROJECT_DECISIONS.md#立即行动-this-week)
- 进度追踪: [PROGRESS.md - 快速参考](../PROGRESS.md#-快速参考)

**每天同步**:
- 早上: 查看 [PROGRESS.md](../PROGRESS.md) 确认今天的 P0 任务
- 中午: 更新完成度（✅ / 🚀 / ⏳）
- 晚上: Git commit 并在 PROGRESS.md 中标记完成状态

---

### 技术审查 / QA
**目标**: 验证技术设计和实现质量

| 步骤 | 时间 | 内容 |
|:---|:---:|:---|
| 1 | 20 分钟 | 复查 [FEASIBILITY.md - 风险评估](FEASIBILITY.md#核心风险点) |
| 2 | 20 分钟 | 理解 [FEASIBILITY.md - 模块可行性](FEASIBILITY.md#模块可行性详析) |
| 3 | 15 分钟 | 验证 [PROJECT_DECISIONS.md - 依赖确认](PROJECT_DECISIONS.md#技术依赖确认) |
| 4 | 持续 | 参照 [FEASIBILITY.md - 安全策略](FEASIBILITY.md#3-🟡-中风险脚本解析与执行的稳定性和安全性) 验收代码 |

**检查清单**:
- [ ] RLM 状态机是否使用 xstate 库管理状态转移？
- [ ] 脚本执行是否有超时限制（60 秒）？
- [ ] 脚本是否通过白名单检查（仅 bash, python, node）？
- [ ] 上下文是否有 Sliding Window 防止内存爆炸？
- [ ] 错误是否都有正确的处理和恢复机制？

---

## 📖 各文档的重点

| 文档 | 重点 | 适合角色 |
|:---|:---|:---|
| **README.md** | 项目概览、快速导航、架构图 | 所有人 |
| **INIT.md** | 项目目标、规划、架构、功能 | 所有人（重点是工程师） |
| **FEASIBILITY.md** | 风险评估、技术分析、模块可行性 | 主管、工程师、QA |
| **PROJECT_DECISIONS.md** | 决策记录、执行计划、风险追踪 | 工程师、主管 |
| **RLM_STATE_MACHINE.md** (待创建) | 状态机设计、xstate 配置 | 工程师、QA |
| **SCRIPT_SANDBOX_DESIGN.md** (待创建) | 脚本安全策略、隔离机制 | 工程师、QA、安全 |
| **ATTRIBUTION.md** (待创建) | 开源引用、许可证声明 | 所有人（必读） |

---

## 💡 常见问题的文档位置

| 问题 | 文档位置 |
|:---|:---|
| **我今周要干什么？** | **[PROGRESS.md](../PROGRESS.md)** ← 开始这里 |
| **今天应该做什么任务？** | **[PROGRESS.md - 本周任务分解](../PROGRESS.md)** |
| **进度怎么更新？** | **[PROGRESS.md - 每日检查清单](../PROGRESS.md#-每日检查清单)** |
| **卡住了怎么办？** | **[PROGRESS.md - 卡住了怎么办](../PROGRESS.md#-卡住了怎么办)** |
| 项目的目标和价值是什么？ | [README.md - 项目简述](../README.md#-项目简述) |
| 系统架构是怎样的？ | [README.md - 系统架构](../README.md#-系统架构) 或 [INIT.md - 系统架构](INIT.md#4-系统架构) |
| 技术栈是什么？ | [README.md - 技术栈](../README.md#-技术栈) 或 [INIT.md - 技术栈](INIT.md#2-技术栈) |
| 功能清单是什么？ | [INIT.md - Agent 功能列表](INIT.md#5-agent-功能列表) |
| 工作量是多少？ | [PROJECT_DECISIONS.md - 工作量预估](PROJECT_DECISIONS.md#6-工作量预估与里程碑) 或 [PROGRESS.md - 整体进度](../PROGRESS.md#-整体进度) |
| 关键风险是什么？ | [FEASIBILITY.md - 核心风险点](FEASIBILITY.md#核心风险点) 或 [PROGRESS.md - 风险监控](../PROGRESS.md#-风险监控) |
| 怎么开始开发？ | [PROJECT_DECISIONS.md - 立即行动](PROJECT_DECISIONS.md#立即行动-this-week) |
| 各模块的难度如何？ | [FEASIBILITY.md - 模块可行性详析](FEASIBILITY.md#模块可行性详析) |
| 递归深度有限制吗？ | [PROJECT_DECISIONS.md - 递归深度与 Token 管理](PROJECT_DECISIONS.md#4-递归深度与-token-管理) |
| 脚本执行安全吗？ | [FEASIBILITY.md - 脚本执行安全性](FEASIBILITY.md#3-🟡-中风险脚本解析与执行的稳定性和安全性) |
| 是否支持离线使用？ | [FEASIBILITY.md - FAQ Q4](FEASIBILITY.md#q4-ollama-本地模型作为备选方案性能如何) |
| 许可证问题？ | [FEASIBILITY.md - FAQ Q2](FEASIBILITY.md#q2-关于-opencode-ralph-rlm-的许可证问题) |

---

## 🔄 文档维护流程

### 何时更新文档

| 事件 | 文档 | 更新人 |
|:---|:---|:---|
| 新的关键决策 | PROJECT_DECISIONS.md | 项目负责人 |
| 风险状态变化 | PROJECT_DECISIONS.md (风险追踪) | 工程师 |
| 发现新风险 | FEASIBILITY.md 或 PROJECT_DECISIONS.md | 工程师、主管 |
| 工作量调整 | PROJECT_DECISIONS.md | 项目负责人 |
| 任务完成 | PROJECT_DECISIONS.md (待办事项) | 工程师 |
| 里程碑完成 | ROADMAP.md (待创建) | 项目负责人 |
| 技术设计确定 | RLM_STATE_MACHINE.md 或 SCRIPT_SANDBOX_DESIGN.md | 工程师 |

### 文档同步规则

- **每日**: 在 PROJECT_DECISIONS.md 中更新任务完成情况
- **每周一**: 项目主管审查进度和更新工作量预估
- **每周五**: 团队同步，更新下周计划
- **Monthly**: 审查整体进度，更新 ROADMAP.md（完成后）

---

## 🚀 新成员入职清单

Week 1:
- [ ] 阅读 README.md（15 分钟）
- [ ] 阅读 INIT.md 和 FEASIBILITY.md（45 分钟）
- [ ] 理解系统架构（30 分钟）
- [ ] 运行开发环境设置（1 小时）

Week 2:
- [ ] 完成 PROJECT_DECISIONS.md 中的"立即行动"清单
- [ ] 创建开发分支并提交第一个 PR
- [ ] 参加技术评审（Week 1 晚期）

---

## 📞 获取帮助

| 问题类型 | 查找位置 |
|:---|:---|
| 不清楚某个概念 | [INIT.md](INIT.md) 或 [README.md](../README.md) |
| 不知道如何开始 | [PROJECT_DECISIONS.md - 立即行动](PROJECT_DECISIONS.md#立即行动-this-week) |
| 遇到技术难题 | [FEASIBILITY.md - 该模块的分析](FEASIBILITY.md#模块可行性详析) |
| 对风险不了解 | [FEASIBILITY.md - 核心风险点](FEASIBILITY.md#核心风险点) |
| 想了解进度 | [PROJECT_DECISIONS.md - 待办事项](PROJECT_DECISIONS.md#待办事项) 或 ROADMAP.md |
| 需要代码参考 | [FEASIBILITY.md - 技术选型](FEASIBILITY.md#附录技术选型建议) |

---

**版本**: v1.0  
**最后更新**: 2026-05-04  
**维护者**: 项目团队

如有问题或建议，请更新相应的文档或提出 Issue。
