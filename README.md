
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)

# Introduction
This is a cli tool for Zqs project.
More info about [zqs-core](https://github.com/ToolsZhang/zqs-core)
To see the project structure here [zqs-base](https://github.com/ToolsZhang/zqs-base)

# Installation
```
npm i -g zqserver-cli
```

# Usage

> Help
```
zqs --help -h
```

> Initialize project
```
zqs --new  -n
```

## Restful API

> Add a restful API endpoint
```
zqs --api-add  -a
```

## Plugins

> Add a plugin
```
zqs --plugin-add -ap
```

> Remove a plugin
```
zqs --plugin-remove -rp
```

## Test and deploy

> Run local server
```
npm run serve
```

> Build project
```
npm run build
```

> Deploy project
```
npm run deploy
```