.PHONY: help install build compile test test-watch lint lint-fix format clean run package uninstall

# Default target
help:
	@echo "🚀 Veda Ralph RLM - VS Code Extension"
	@echo ""
	@echo "📋 Available Commands:"
	@echo ""
	@echo "  make help              Show this help message"
	@echo "  make install           Install dependencies and setup project"
	@echo "  make build             Compile TypeScript to JavaScript"
	@echo "  make test              Run unit tests once"
	@echo "  make test-watch        Run unit tests in watch mode"
	@echo "  make lint              Check code quality with ESLint"
	@echo "  make lint-fix          Fix ESLint issues automatically"
	@echo "  make format            Format code with Prettier"
	@echo "  make clean             Remove build artifacts and node_modules"
	@echo "  make run               Launch extension in VS Code (F5 debugging)"
	@echo "  make package           Package extension as .vsix file"
	@echo "  make uninstall         Remove installed extension from VS Code"
	@echo ""
	@echo "🎯 Quick Start:"
	@echo "  1. make install"
	@echo "  2. make test"
	@echo "  3. make run"
	@echo ""

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	npm install
	@echo "✅ Dependencies installed"
	@echo ""
	@echo "🔧 Next steps:"
	@echo "  - Run 'make test' to verify installation"
	@echo "  - Run 'make run' to launch extension in VS Code"

# Compile TypeScript
build: compile

compile:
	@echo "🔨 Compiling TypeScript..."
	npm run compile
	@echo "✅ Compilation complete"

# Run tests
test:
	@echo "🧪 Running unit tests..."
	npm test
	@echo "✅ Tests complete"

# Watch mode for tests
test-watch:
	@echo "👀 Running tests in watch mode..."
	npm run test:watch

# Code quality checks
lint:
	@echo "🔍 Checking code quality..."
	npm run lint
	@echo "✅ ESLint check complete"

# Fix linting issues
lint-fix:
	@echo "🔧 Fixing ESLint issues..."
	npm run lint:fix
	@echo "✅ ESLint fixes applied"

# Format code
format:
	@echo "💅 Formatting code..."
	npm run format
	@echo "✅ Code formatting complete"

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf out/
	rm -rf dist/
	rm -rf coverage/
	rm -rf node_modules/
	rm -rf *.vsix
	@echo "✅ Cleanup complete"

# Run extension in debug mode
run:
	@echo "🚀 Launching extension in VS Code..."
	@echo "   Press F5 to start debugging"
	@echo "   Or run: code . && press F5"
	code .

# Package as .vsix
package:
	@echo "📦 Packaging extension as .vsix..."
	npm run compile
	vsce package
	@echo "✅ Package created"
	@ls -lh *.vsix || echo "Note: .vsix file generated in current directory"

# Uninstall extension
uninstall:
	@echo "🗑️  Uninstalling Ralph RLM extension..."
	code --uninstall-extension vedadev.veda-ralph-rlm 2>/dev/null || echo "Extension not currently installed"
	@echo "✅ Uninstall command sent"

# Development workflow
dev: clean install build test lint
	@echo ""
	@echo "✅ Development setup complete!"
	@echo "   Run 'make run' to launch in VS Code"

# CI/CD workflow
ci: install build test lint
	@echo ""
	@echo "✅ CI checks passed!"
