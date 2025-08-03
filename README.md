# flowcord.js  

**flowcord.js** is a next-generation Discord bot framework that combines the power of **discord.js** with an intuitive, flow-based approach. Designed for modern bot development, it offers both simplicity for beginners and advanced capabilities for experts.  

## 🚀 Key Features  

* ✅ **True top-to-bottom execution** - Write code that runs exactly as you see it  
* ⚙️ **Safe & stable** - No risky `eval` or unpredictable behavior  
* 🧠 **Smart logic flow** - Built-in conditions and control structures  
* 💾 **Flexible data** - Custom variables with JSON or MongoDB support  
* 🔌 **Extensible architecture** - Add functionality through plugins  

## 📦 Installation  
```bash
npm install @flowing/flowcord.js
```

## 🧪 Quick Start  
```js
const { FlowClient } = require("@flowing/flowcord.js");

const client = new FlowClient({
token: "SEU_TOKEN_DO_DISCORD",
prefix: "!",   
intents: ["Guilds","GuildMessages","MessageContent"],
events: ["onMessage"],
database: { 
        type: "flowcord.db",
        db: require("@flowing/flowcord.db"),
        dbType: "KeyValue",
        tables: ["main"],
        securityKey: "sua-chave-secreta-aqui-32-chars"
    }
});

client.command({
    name: "ping",
    code: `
        $sendMessage[Pong! 🏓;true]
        $wait[2s]
        $editMessage[Pong! 🚀 Latência: $pingms]
    `
});

client.loadCommands("./comandos");

client.login().catch(console.error);
```

## 🛠 Built-in Functions  
| Function       | Description                  |
|---------------|----------------------------|
| `$ping`       | Returns bot API latency    |
| `$userTag`    | Gets the user's tag        |
| `$wait[3s]`   | Pauses execution (3 sec)   |
| `$if/$else`   | Conditional logic          |

## 🧩 Custom Functions  
```js
client.functions.add({
  name: "$hello",
  execute: () => "Hello World!" 
});
```

## 📚 Documentation  
Coming soon at: [https://flowcord.js.org](https://flowcord.js.org)  

## 🤝 Contributing  
We welcome PRs! Feel free to open issues or suggest improvements.  

## 📄 License  
MIT  

---
Crafted with ❤️ by Souza and the open-source community.  
