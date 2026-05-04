# Veda-Ralph-RLM: VS Code Extension with Recursive Language Model

**Status**: ✅ Feasibility Analysis Complete | 🚀 Ready for Development  
**Latest Update**: 2026-05-04  
**Project Lead**: [待指定]

---

## 🎯 项目简述

将 **RLM (Recursive Language Model)** 前沿算法与 **VS Code 原生生态** 深度融合，实现一个内置于 VS Code 的自主 AI 编码助手。通过递归状态机模式，使 AI 具备"自主探索代码库、执行验证、自我纠正"的能力。

### 核心价值

| 维度 | 价值 |
|:---|:---|
| **AI 编码深度** | 从单次对话 → 多轮递归探索，支持复杂 Bug 修复和代码重构 |
| **企业适配** | 直接使用 GitHub Copilot Enterprise（已验证），无需代理配置 |
| **成本优化** | 使用免费 LLM，通过递归迭代实现高阶模型的推理质量 |
| **用户体验** | 原生 VS Code 集成，告别 CLI 工具割裂感 |

---

## 📚 文档导航

### 快速入门
- **[README.md](README.md)** 👈 You are here - 5分钟项目概览
- **[开发进度表](PROGRESS.md)** - 📊 实时任务追踪（开发者每天查看）
- **[项目规划](docs/INIT.md)** - 项目目标、技术栈、系统架构、功能清单
- **[技术可行性](docs/FEASIBILITY.md)** - 风险评估、模块分析、工作量调整、实施建议
- **[项目决策](docs/PROJECT_DECISIONS.md)** - 关键决策、依赖确认、待办事项、风险追踪

### 详细参考
- **[文档地图和快速导航](docs/NAVIGATION.md)** - 帮助您快速找到所需信息（按角色、问题类型）
- **[系统架构](docs/INIT.md#4-系统架构)** - 详细的模块划分和交互
- **[核心风险点](docs/FEASIBILITY.md#核心风险点)** - 关键技术风险和缓解方案

---

## 🏗️ 系统架构

```
┌─────────────────────────────────────────────────────────────┐
│                    VS Code Chat UI                          │
│              (ChatParticipant Native UI)                     │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│           Chat Handler & Extension Host                      │
│        (Extension Context Management)                        │
└─────────────────────────┬───────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────┐
│         RLM Recursive Engine (Core Loop)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │ 1. Parse Model Response (Custom Tags)               │   │
│  │ 2. Execute Scripts in Sandbox                       │   │
│  │ 3. Collect Stdout/Stderr                            │   │
│  │ 4. Feed Back to Context                             │   │
│  │ 5. Recursively Call Model (Depth <= 50)            │   │
│  └──────────────────────────────────────────────────────┘   │
└────┬──────────────────────┬──────────────────────┬───────────┘
     │                      │                      │
     ▼                      ▼                      ▼
┌──────────────┐   ┌──────────────┐   ┌──────────────────┐
│ Model Router │   │Script Runner │   │ Prompt Manager   │
└──────┬───────┘   └──────┬───────┘   └────────┬─────────┘
       │                  │                     │
   ┌───┴────┐         ┌───┴───┐            ┌───┴────┐
   │ GitHub │         │Child  │            │.github │
   │Copilot │         │Process│            │Config  │
   │Enter.  │         │Sandbox│            │Loader  │
   └─────────┘        └───────┘            └────────┘
   
   ┌──────────┐
   │  Ollama  │ (Fallback if Copilot unavailable)
   └──────────┘
```

### 核心模块

| 模块 | 职责 | 技术栈 |
|:---|:---|:---|
| **Chat Handler** | VS Code Chat UI 集成 | `ChatParticipant` API |
| **RLM Engine** | 递归状态机核心 | xstate, TypeScript |
| **Model Router** | 模型驱动切换 | vscode.lm, Ollama API |
| **Script Runner** | 脚本执行和隔离 | execa, Child Process |
| **Prompt Manager** | Prompt 合成和动态注入 | cosmiconfig, File I/O |

---

## ⚙️ 技术栈

| 层级 | 选型 | 理由 |
|:---|:---|:---|
| **语言** | TypeScript 5.x | 类型安全，VS Code 官方语言 |
| **框架** | VS Code Extension API | 官方支持，ChatParticipant GA |
| **状态机** | xstate | 清晰的状态转移，测试友好 |
| **进程隔离** | execa | 跨平台、资源限制、超时支持 |
| **测试** | Vitest | 轻型化、快速迭代 |
| **代码质量** | Prettier + ESLint | 一致的代码风格 |
| **包管理** | npm | 生态完整 |

---

## 📊 项目指标

### 工作量预估
- **总预估**: 15-17 人天（约 3.5 周）
- **MVP 目标**: Week 3-4 交付端到端可用版本
- **包含内容**: 框架、RLM 引擎、脚本执行、配置加载、UI 展示
- **不包含**: 多语言、高级 UI、性能优化（v1.1+）

### 关键风险（已评估）
| 风险 | 状态 | 缓解措施 |
|:---|:---:|:---|
| vscode.lm 企业可用性 | ✅ 已验证 | GitHub Copilot Enterprise 已在企业可用 |
| 参考代码获取 | ✅ 已获取 | opencode-ralph-rlm 源码可用，许可证待确认 |
| 递归状态机复杂度 | ⏳ 中等 | 使用 xstate 库，编写详细测试 |
| 脚本执行安全性 | ⏳ 中等 | 白名单 + 子进程隔离 + 资源限制 |

---

## 🚀 实施路线

### Milestone 1: 原型验证 (Week 1, 2-3 天)
```
✓ VS Code Extension 基础框架搭建
✓ ChatParticipant 处理器实现
✓ vscode.lm 集成验证
✓ 能执行简单的 /ralph hello 命令
```

### Milestone 2: 基本循环 (Week 2-3, 5-6 天)
```
✓ RLM 递归状态机实现（3-5 轮）
✓ 脚本执行引擎完成
✓ 脚本隔离和安全检查
✓ 单元测试覆盖 >70%
```

### Milestone 3: 可用 MVP (Week 4-5, 6-8 天)
```
✓ 完整的配置加载和 Prompt 合成
✓ 流式 UI 展示递归进度
✓ 端到端测试（真实编码任务）
✓ 文档和部署指南完成
```

---

## 📋 关键决策

### 1. 参考代码和许可证
- ✅ **源码地址**: https://github.com/XmeetXeditzz/opencode-ralph-rlm
- ⏳ **许可证**: 待确认（需检查 LICENSE 文件）
- 📝 **处理方式**: 源代码中添加引用注释，创建 ATTRIBUTION.md

### 2. 模型驱动
- 🥇 **优先**: GitHub Copilot Enterprise via vscode.lm API
- 🥈 **备选**: Ollama 本地模型（当 Copilot 不可用时）
- 💰 **成本**: 完全免费（使用免费 LLM）

### 3. 递归策略
- **深度限制**: 50 轮（可配置，防止资源耗尽）
- **上下文管理**: Sliding Window（保留最近 3000 行）
- **超时控制**: 脚本执行 60 秒，模型推理无硬限

### 4. 脚本安全
- **允许的语言**: bash, python, node
- **隔离方式**: 子进程 + 资源限制 + 白名单过滤
- **审计**: 所有执行记录有日志

> 详细决策见 [PROJECT_DECISIONS.md](docs/PROJECT_DECISIONS.md)

---

## 📖 使用说明

### 对于项目负责人/技术主管
1. 阅读本 README 了解全景
2. 复查 [FEASIBILITY.md 整体评估](docs/FEASIBILITY.md#整体评估) 确认风险可控
3. 确认 [PROJECT_DECISIONS.md 中的关键决策](docs/PROJECT_DECISIONS.md#关键决策)
4. 根据 Milestone 规划，安排团队资源

### 对于开发工程师
1. 按优先级完成 [PROJECT_DECISIONS.md 立即行动](docs/PROJECT_DECISIONS.md#立即行动-this-week)
2. 参考 [INIT.md 系统架构](docs/INIT.md#4-系统架构) 理解模块划分
3. 根据 [FEASIBILITY.md 建议](docs/FEASIBILITY.md#建议与下一步) 逐步实施
4. 在 [PROJECT_DECISIONS.md](docs/PROJECT_DECISIONS.md) 中记录进度

### 对于技术审查/QA
1. 检查 [FEASIBILITY.md 风险评估](docs/FEASIBILITY.md#核心风险点)
2. 验证 [MODULE_CHECKLIST](#module-checklist) 中的测试项
3. 确认 [PROJECT_DECISIONS.md 依赖](docs/PROJECT_DECISIONS.md#技术依赖确认) 已满足

---

## ✅ Module Checklist

| 模块 | 预估(d) | 完成度 | 风险 | 负责人 |
|:---|:---:|:---:|:---|:---|
| **Framework + vscode.lm** | 2 | 0% | 🟢 低 | TBD |
| **RLM State Machine** | 4-5 | 0% | 🟡 中 | TBD |
| **Script Runner** | 2.5-3 | 0% | 🟡 中 | TBD |
| **Config Loader** | 2 | 0% | 🟢 低 | TBD |
| **UI/UX** | 3 | 0% | 🟢 低 | TBD |
| **Testing** | 2 | 0% | 🟡 中 | TBD |
| **Docs** | 1 | 0% | 🟢 低 | TBD |

---

## 🔗 相关资源

### 官方文档
- [VS Code Extension Samples](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)
- [VS Code Proposed APIs](https://code.visualstudio.com/api)
- [xstate Documentation](https://xstate.js.org/)

### 参考项目
- [opencode-ralph-rlm](https://github.com/XmeetXeditzz/opencode-ralph-rlm) - RLM 核心参考
- [Cline](https://github.com/cline/cline) - Claude 自主代理参考
- [Aider](https://github.com/paul-gauthier/aider) - AI 编码工具参考

### 内部文档
- 🟦 [项目规划](docs/INIT.md) - 详细的初始规划和架构设计
- 🟩 [技术可行性](docs/FEASIBILITY.md) - 深度风险分析和建议
- 🟨 [项目决策](docs/PROJECT_DECISIONS.md) - 决策记录和执行追踪

---

## 💬 常见问题

**Q: 为什么要用 RLM 而不是直接调用 Copilot Chat？**  
A: Copilot Chat 是单轮对话，RLM 通过递归提升 AI 的自主性。AI 可以生成脚本验证假设、观察结果、自我纠正，这对复杂问题（大规模重构、多文件 Bug 修复）效果显著更好。

**Q: 可以支持无限递归吗？**  
A: v1.0 限制 50 轮防止资源耗尽，但因为是免费模型，v1.1+ 可以调整或移除限制。

**Q: 脚本执行的安全隔离真的足够吗？**  
A: v1.0 是基础级（白名单 + 子进程隔离），v1.1+ 可以考虑 Docker/虚拟机化方案。

**Q: 可以离线使用吗？**  
A: 可以用 Ollama 本地模型，但需要提前下载模型文件（通常 5-15GB）。

更多 FAQ 见 [FEASIBILITY.md - 常见问题](docs/FEASIBILITY.md#常见问题-faq)

---

## 📝 版本历史

| 版本 | 日期 | 内容 |
|:---|:---|:---|
| 0.2 | 2026-05-04 | 创建 README，整理文档结构以提高逻辑性 |
| 0.1 | 2026-05-04 | 完成初步的可行性分析和决策记录 |

---

## 🤝 贡献指南

详见各文档中的具体指引：
- 提交代码前检查 [FEASIBILITY.md - 脚本执行安全](docs/FEASIBILITY.md#3-🟡-中风险脚本解析与执行的稳定性和安全性)
- 记录决策到 [PROJECT_DECISIONS.md](docs/PROJECT_DECISIONS.md#沟通与评审)
- 更新进度在 [Project Checklist](#module-checklist)

---

**Last Updated**: 2026-05-04 15:05:00  
**Maintained by**: [项目团队]  
**Questions?** 参考相关文档或提出 Issue
