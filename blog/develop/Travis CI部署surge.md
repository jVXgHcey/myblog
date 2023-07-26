---
slug: use-github-action-to-auto-deploy
title: 使用Travis CI自动化部署
date: 2023-07-26
authors: simon
tags: [github, git]
keywords: [github, git]
---

## 介绍

Travis CI 是一款免费自动化构建实现，特别适用于持续集成和持续交付的场景，它具备自动化完成许多不同任务的能力，例如构建、测试和部署等等。

## 实例

最近在用 surge.sh 部署个人博客，每次都要手动部署，很麻烦，于是就想搞个自动化部署，每次提交 gitbub 代码，就能自动部署

第一步：打开 [Travis CI](https://app.travis-ci.com/signin) 使用 gitbub 账号登陆 授权需要的项目。

参建[文档](https://surge.sh/help/integrating-with-travis-ci)

但官方文档给的.travis.yml 是不行滴，经我踩了一系列坑以后，node_js 使用 18 会报错，stable 也不行，没办法，改成 17 后设置可用，可能是用的是免费版的原因。

分支的话我的项目是 master，大家按自己的来。

第二部：在项目中创建.travis.yml 文件

```yml
language: node_js
node_js:
  - '17'

# Only trigger builds on the master branch
branches:
  only:
    - master

# Environment variables needed for Surge deployment
env:
  global:
    # Your Surge subdomain (e.g., your-project.surge.sh)
    - SURGE_SUBDOMAIN=futureworker.cc
    # Your Surge token (generate one using "surge token" command)
    - SURGE_TOKEN=ba177a227e2612b95a1621c430d2ea5e

# Cache node_modules to speed up builds
cache:
  yarn: true
  directories:
    - 'node_modules'

# Install dependencies
install:
  - yarn install

# Build your project (adjust this based on your build setup)
script:
  - yarn run build

# Deployment script to Surge
deploy:
  provider: surge
  project: ./build # Set this to the directory where your build artifacts are stored
  domain: $SURGE_SUBDOMAIN
  skip_cleanup: true
  on:
    branch: master
```

surge token 的查看方法

```javascript
在命令行输入 surge login
surge token
```
