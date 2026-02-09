---
name: spring-ai-agent-utils
description: Integrates Spring AI Agent Utils into the project for core agentic tools and skills system.
---

# Spring AI Agent Utils Skill

This skill provides instructions for integrating and using the `spring-ai-agent-utils` library, which brings Claude Code-inspired tools and agent skills to Spring AI applications.

## Integration

### Gradle (Kotlin DSL)
Add the dependency to your `build.gradle.kts`:

```kotlin
dependencies {
    implementation("org.springaicommunity:spring-ai-agent-utils:0.4.2")
}
```

> [!NOTE]
> Requires Spring AI `2.0.0-M2` or later.

## Core Components

### 1. AgentEnvironment
Provides runtime context and git status to system prompts.

```java
.defaultSystem(p -> p.text(agentSystemPrompt)
    .param(AgentEnvironment.ENVIRONMENT_INFO_KEY, AgentEnvironment.info())
    .param(AgentEnvironment.GIT_STATUS_KEY, AgentEnvironment.gitStatus()))
```

### 2. Core Tools
Register core agent tools in your `ChatClient` configuration:

- `ShellTools`: Execute shell commands safely.
- `FileSystemTools`: Precise file operations.
- `GrepTool`: Code search with regex.
- `GlobTool`: File pattern matching.
- `SmartWebFetchTool`: AI-powered web summarization.
- `BraveWebSearchTool`: Web search using Brave Search API.

```java
.defaultTools(
    ShellTools.builder().build(),
    FileSystemTools.builder().build(),
    GrepTool.builder().build(),
    GlobTool.builder().build()
)
```

### 3. Agent Skills
Enable the skills system to use Markdown-defined knowledge modules.

```java
.defaultToolCallbacks(SkillsTool.builder()
    .addSkillsDirectory(".agent/skills")
    .build())
```

### 4. Sub-Agents (Task orchestration)
Use `TaskToolCallbackProvider` to delegate complex tasks to specialized agents.

```java
.defaultToolCallbacks(TaskToolCallbackProvider.builder()
    .chatClientBuilder("default", chatClientBuilder.clone())
    .subagentReferences(ClaudeSubagentReferences.fromRootDirectory(".agent/agents"))
    .skillsDirectories(".agent/skills")
    .build())
```

## Best Practices
- Use `AgentEnvironment` to keep the agent aware of its current environment.
- Break down complex logic into reusable **Skills** defined in `.agent/skills/`.
- Use `TaskTools` for high-level orchestration when multiple steps are required.
