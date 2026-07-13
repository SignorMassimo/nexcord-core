# Nexcord Core

> The starter recipe for **Nexcord** — a decorator-based Discord.js framework with built-in dependency injection, typed events, and JSX components.

## Install

```bash
xnex install nexcord-core
```

The Nex CLI reads the recipe manifest, installs the required packages, and sets up the project structure for you.

**Requires:** [Bun](https://bun.sh)

## What you get

```files
src/
├── common/actions/
│   └── HelloButton.action.ts
├── components/
│   └── components.tsx
├── configs/
│   └── app.config.ts
├── events/
│   └── Init.events.ts
├── services/
│   ├── Logger.service.ts
│   └── Test.service.ts
└── index.ts
```

Plus `.env.example`, `package.json`, and `tsconfig.json` in your project root, already configured for Bun + TypeScript.

## Quick start

1. Copy `.env.example` to `.env` and add your bot token:

```env
TOKEN=your-discord-bot-token
```

2. Start the bot:

```bash
bun run bot        # start
bun run bot:dev    # start with hot reload
```

3. Send `hello` in any channel the bot can see — it replies with a button. Click it for a little surprise.

## How it works

### Bootstrap — `src/index.ts`

`NexCord.run` starts the client and resolves whatever you list in `inject`, passing the instances into `factory` once they're ready.

```ts
NexCord.run(process.env.TOKEN!, {
    factory: (loggerService: LoggerService, configService: ConfigService) => {
        loggerService.log(configService.get('initMessage'))
    },
    inject: [LoggerService, ConfigService]
})
```

### Services — `src/services/`

Any class marked `@Service()` becomes injectable.

```ts
@Service()
export class TestService {
    test() {
        return '[TEST SERVICE] -'
    }
}
```

Services can depend on other services through the constructor — Nexcord resolves the graph for you:

```ts
@Service()
export class LoggerService {
    constructor(private readonly testService: TestService) { }
    log(...args: any[]) {
        console.log(this.testService.test(), ...args)
    }
}
```

### Config — `src/configs/`

`registerConfigWait` registers a config value that depends on the client being ready. Nexcord waits for it before resolving.

```ts
registerConfigWait('initMessage', () => `${NexCord.client.user?.username} active`)
```

### Events — `src/events/`

Group Discord.js event handlers in a class with `@Listener()`, then bind each one with `@On(...)`. Handler arguments are typed automatically via `DcEvents<'eventName'>`.

```ts
@Listener()
class InitEvents {
    @On('messageCreate')
    async hello(...[message]: DcEvents<'messageCreate'>) {
        if (message.content != 'hello') return
        message.reply({
            content: 'hello!',
            components: [HelloButton({ userId: message.author.id })]
        })
    }
}
```

### Components — `src/components/`

Build message components with JSX instead of chaining discord.js builders by hand.

```tsx
export const HelloButton = ({ userId }: { userId: string }) => (
    <row>
        <button id={userId} label='Hello!' action={[HelloButtonAction]} />
    </row>
)
```

### Actions — `src/common/actions/`

Actions handle component interactions — buttons, menus, and the like. Same `@Listener()` decorator as events, but with a single `execute` method.

```ts
@Listener()
export class HelloButtonAction {
    execute(i: ButtonInteraction) {
        i.reply({ content: 'Hello XD', flags: 'Ephemeral' })
    }
}
```
