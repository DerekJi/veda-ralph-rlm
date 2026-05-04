# 项目决策与信息记录

**最后更新**: 2026-05-04 15:10:00  
**决策者**: 项目负责人  
**应用范围**: Veda-Ralph-RLM VS Code Extension

**相关文档**: 
- 📄 [README.md](../README.md) - 项目概览和快速导航
- 📄 [INIT.md](INIT.md) - 项目规划、架构、功能
- 📄 [FEASIBILITY.md](FEASIBILITY.md) - 技术可行性和风险分析

---

## 文档内容指引

本文档重点关注**项目决策、执行计划和风险追踪**。其他信息请参考：

| 需求 | 文档 | 章节 |
|:---|:---|:---|
| **项目全景** | README.md | 项目简述、系统架构 |
| **项目规划** | INIT.md | 项目目标、技术栈、功能清单 |
| **技术分析** | FEASIBILITY.md | 风险评估、模块可行性 |
| **关键决策** | 本文档 | 下面的"关键决策"部分 |
| **执行计划** | 本文档 | "立即行动"和"待办事项"部分 |
| **风险追踪** | 本文档 | "风险追踪"部分 |

---

## 关键决策

### 0. UI 架构：独立侧边栏面板而非 ChatParticipant

**决策**: 使用 WebView 实现独立的侧边栏面板，而非混入 VS Code ChatParticipant

**理由**:
- ✅ **完整可见**: 用户能看到递归的每一步（提问 → 生成脚本 → 执行 → 结果）
- ✅ **独立控制**: 不受 Copilot Chat 界面限制，完整的配置和日志面板
- ✅ **脚本预览**: 执行前可预览和修改 AI 生成的脚本
- ✅ **递归进度**: 实时展示当前第几轮、预计多少轮完成
- ✅ **用户体验**: 清晰的任务进度和可操作性

**UI 层次结构**:
```
Ralph Container (Activity Bar Icon)
└── Ralph Sidebar Panel (WebView)
    ├── Chat Input Zone (底部)
    ├── Messages Zone (中间)
    │   ├── User Message
    │   ├── AI Thinking (转圈动画)
    │   ├── Script Preview (待批准)
    │   └── Execution Result
    ├── Recursion Progress (顶部)
    │   └── Current Round X / Max Y
    ├── Configuration Tab
    └── Logs Tab
```

**实现方案**:
- 使用 `vscode.window.createWebviewPanel()` 或 `vscode.WebviewPanel`
- 前端框架: React / Vue / 原生 HTML（待选）
- 消息通信: `webview.postMessage()` + `window.addEventListener('message')`

---

### 2. 开源参考库选择

**决策**: 使用 opencode-ralph-rlm 作为 RLM 状态机的参考实现

**信息源**:
- **项目地址**: https://github.com/XmeetXeditzz/opencode-ralph-rlm
- **获取方式**: 开源代码库，可直接克隆和参考

**许可证处理** (待确认):
- [ ] 检查 `LICENSE` 文件确认具体协议类型
- [ ] 如无正式许可证，联系作者确认使用权
- [ ] 根据许可证类型，在 `ATTRIBUTION.md` 中标注引用

**引用范围**:
- ✓ RLM 状态机的核心设计和实现逻辑
- ✓ System Prompt 模板和组织方式
- ✓ 脚本解析和执行的基本思路
- ✓ 测试用例和验收标准

**预期收益**:
- 节省 1-2 天的架构设计时间
- 降低状态机实现的风险
- 获得已验证的 Best Practices

---

### 3. 模型驱动选择

**决策**: 优先使用 GitHub Copilot Enterprise via `vscode.lm` API

**状态**: ✅ 已验证
- 用户确认：GitHub Copilot Enterprise 已在企业环境部署并可用
- 不需要在原型阶段进行企业网络穿透的排查验证
- 这消除了项目的单点风险

**备选方案**: Ollama 本地模型
- 状态: 保留为 Fallback 方案
- 场景: 当 Copilot Enterprise 不可用时启用
- 实现优先级: v1.1+

**技术栈**:
```typescript
// 模型提供者抽象
interface IModelProvider {
  selectModel(): Promise<LanguageModel>;
}

// 优先级顺序
const providers = [
  new VsCodeLMProvider(),      // 优先使用
  new OllamaProvider(),        // Fallback
];
```

---

### 4. 开发语言与框架

**决策**: TypeScript + VS Code Extension API

| 选项 | 决策 | 理由 |
|:---|:---|:---|
| 语言 | **TypeScript 稳定版** | 类型安全，VS Code 官方使用 |
| 框架 | **VS Code Extension API** | 官方支持，ChatParticipant 已 GA |
| 测试 | **Vitest (轻型化)** | 快速迭代，无需 Jest 复杂配置 |
| 代码风格 | **Prettier + ESLint** | 一致的代码格式 |
| 包管理 | **npm (参考 opencode-ralph-rlm 用 bun)** | 生态完整，易于依赖管理 |

---

### 4. 递归深度与 Token 管理

**决策**: 无硬性递归深度限制，仅限制内存占用

**理由**:
- 用户已确认：使用免费 LLM，Token 全免费
- 无成本约束 → 可支持任意深度的递归
- 但需防止资源耗尽（内存、CPU）

**实现策略**:
```typescript
// v1.0 保守上限（可配置）
const CONFIG = {
  MAX_RECURSION_ROUNDS: 50,       // 单个任务最多 50 轮
  MAX_CONTEXT_LINES: 5000,         // 上下文超过 5000 行则滑动
  CONTEXT_WINDOW_SIZE: 3000,       // 保留最近 3000 行
  SCRIPT_TIMEOUT_MS: 60000,        // 单次脚本执行超时 60 秒
  SCRIPT_OUTPUT_MAX_SIZE: 10 * 1024 * 1024, // 输出不超过 10MB
};
```

**后续调整**:
- v1.1 可基于实际使用数据调整参数
- 支持用户自定义配置

---

### 5. 脚本执行安全策略

**决策**: 白名单 + 隔离执行 + 资源限制

**允许的语言**:
- ✓ Bash / Shell
- ✓ Python
- ✓ Node.js

**禁止的操作**:
- ✗ 直接系统调用（`system()`, `exec()` 等）
- ✗ 危险命令（`rm -rf /`, `dd`, `format` 等）
- ✗ 网络配置修改
- ✗ 权限提升（`sudo`, `RunAs` 等）

**隔离机制**:
1. 子进程独立运行（不继承父进程权限）
2. 超时控制（60 秒）
3. 内存限制（通过 maxBuffer）
4. 工作区限制（只能操作当前项目文件）

---

### 6. 工作量预估与里程碑

**最终预估**: 15-17 人天（约 3.5 周）

| 里程碑 | 工时 | 交付物 |
|:---|:---:|:---|
| **Milestone 1**: 原型验证 | 2-3d | Extension 框架 + 源码分析 |
| **Milestone 2**: 基本循环 | 5-6d | RLM 状态机 + 脚本执行 |
| **Milestone 3**: 可用 MVP | 6-8d | 完整端到端流程 + 配置加载 |

**关键改善**（相比初始预估 18-21 人天）:
1. vscode.lm 已验证（节省 2-3 天）
2. 参考代码已获取（节省 1 天）
3. 递归无限制（节省 1-2 天）
4. 轻型化测试（节省 1-2 天）

---

## 技术依赖确认

| 依赖 | 版本 | 状态 | 备注 |
|:---|:---|:---|:---|
| VS Code API | 1.85+ | ✅ 确认 | Extension Host 已支持 ChatParticipant |
| GitHub Copilot Enterprise | 已部署 | ✅ 已验证 | 企业环境内可用 |
| opencode-ralph-rlm | main 分支 | ⏳ 待获取 | 需要克隆和许可证检查 |
| Node.js | 18+ | ✅ 假定 | 标准 VS Code 环保要求 |
| TypeScript | 5.x | ✅ 确认 | 稳定版本 |
| Vitest | 1.x | ✅ 选定 | 轻型化测试框架 |

---

## 待办事项

### 立即行动 (This Week)

- [ ] **许可证检查**: 克隆 opencode-ralph-rlm，查看 LICENSE 文件
- [ ] **源码分析**: 理解 RLM 状态机核心实现
- [ ] **环境搭建**: 初始化 VS Code Extension 项目
- [ ] **决策文档**: 创建 ATTRIBUTION.md 和许可证引用模板

### 第一周目标

- [ ] POC 框架搭建完成
- [ ] VS Code ChatParticipant 基础代码完成
- [ ] RLM 状态机初始实现（2-3 轮循环）

### 第二周目标

- [ ] 脚本执行引擎完成
- [ ] 配置加载机制完成
- [ ] 单元测试覆盖 (>70%)

### 第三周目标

- [ ] UI 流式展示完成
- [ ] 集成测试通过
- [ ] MVP 文档完成

---

## 风险追踪

| 风险 | 概率 | 影响 | 缓解措施 | 状态 |
|:---|:---:|:---:|:---|:---|
| 许可证限制 | 低 | 高 | 提前确认，必要时改写关键模块 | 🔴 未确认 |
| 状态机复杂度 | 中 | 中 | 使用 xstate 库，编写详细测试 | 🟡 进行中 |
| 脚本隔离漏洞 | 低 | 高 | 严格的白名单 + 子进程隔离 | 🟡 设计中 |
| 内存泄漏 | 低 | 中 | Sliding Window 机制 + 监控 | 🟢 已规划 |

---

## 沟通与评审

- **项目负责人**: [待指定]
- **技术评审**: Week 1 晚期 (Milestone 0 完成后)
- **进度同步**: 每周二 10:00
- **文档更新**: 每周五

---

## 附录

### 相关文档

- [README.md](../README.md) - 项目概览和快速导航
- [INIT.md](INIT.md) - 项目规划、架构、功能
- [FEASIBILITY.md](FEASIBILITY.md) - 技术可行性和风险分析
- RLM_STATE_MACHINE.md (待创建) - 状态机详细设计
- SCRIPT_SANDBOX_DESIGN.md (待创建) - 脚本执行安全设计
- ATTRIBUTION.md (待创建) - 开源引用和许可证声明

### 参考资源

- [VS Code Extension Samples](https://github.com/microsoft/vscode-extension-samples/tree/main/chat-sample)
- [opencode-ralph-rlm GitHub](https://github.com/XmeetXeditzz/opencode-ralph-rlm)
- [xstate Documentation](https://xstate.js.org/)
- [execa - Process Execution](https://github.com/sindresorhus/execa)

---

**维护说明**: 本文档应在每个重大决策或信息更新时同步修改，以保持项目信息的一致性和可追溯性。
