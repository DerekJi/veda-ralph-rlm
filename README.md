# Ralph RLM：VS Code AI 编码助手

**What is Ralph RLM?** 一个集成在 VS Code 侧边栏的 AI 编码助手。使用递归语言模型（RLM）算法，自主执行代码、观察结果、迭代优化，帮你快速解决复杂的编码问题。

**Status**: ✅ 功能完整 | 🚀 即装即用

---

## ✨ 核心特点

| 特点 | 说明 |
|:---|:---|
| 🔄 **递归探索** | AI 不止回答一次，而是自主执行、观察、优化（通常 3-5 轮解决） |
| 💬 **独立面板** | 侧边栏专属面板，清晰展示每一步过程 |
| 👁️ **脚本预览** | 执行前预览，你可以批准或拒绝 |
| 🔒 **完全可控** | 所有操作本地执行，可配置深度和权限 |

---

## 🚀 快速开始

### 1. 安装
在 VS Code Extension Marketplace 搜索 **"Ralph RLM"** 并点击安装

### 2. 打开面板
左侧活动栏点击 **Ralph 图标** 打开侧边栏面板

### 3. 提问
在输入框输入你的问题，按 Enter：

```
这个 TypeScript 类型错误怎么修？
```

Ralph 会自动生成诊断脚本 → 执行 → 分析结果 → 提出解决方案

---

## ❓ 常见问题

**Q: 需要 GitHub Copilot 吗？**  
A: 优先使用 GitHub Copilot Enterprise。如果不可用，自动降级到本地 Ollama 模型。

**Q: 会执行什么命令？**  
A: 默认只读操作（查看文件、跑测试、编译）。修改操作需要你手动确认。支持 bash、python、node 脚本。

**Q: 隐私安全如何？**  
A: 代码只发送给你配置的 AI 模型。脚本执行完全本地，不上传云端。所有操作有日志。

---

## 🔗 反馈

- **报告 Bug**: [GitHub Issues](https://github.com/DerekJi/veda-ralph-rlm/issues)
- **功能建议**: [GitHub Discussions](https://github.com/DerekJi/veda-ralph-rlm/discussions)
- **开发文档**: [README.developer.md](README.developer.md)
