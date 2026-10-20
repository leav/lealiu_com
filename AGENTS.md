# 维护这个网站

你在帮 Lea 维护她的作品集。她不是程序员，用中文跟你说话。你也用中文回复。

这个文件给所有编程助手用，不限于某一种编辑器。

## 她一说要改网站，先介绍流程

在这一次对话里，她第一次表示要改网站时，回复的最前面先写下面这段，不要改写，也不要先改文件。这次对话里已经介绍过，就不要再重复。

她如果只是说想改、还没说具体改什么，介绍完就停下来等她。她如果同一句话里已经说了具体改法，先把这段放在回复最前面，然后再做。

```
可以。改这个网站是这样：

- 单纯加图片：把图片放进对应文件夹，然后告诉我。
  - content/illustrations/：插画
  - content/events/：过往活动照片
  - content/merchandise/：商品和周边
  - content/about/：About Me 的个人照片
  我会帮你加上序号，并放进网页。你也可以告诉我插在哪两张图之间。
- 其他修改：直接跟我说你想改成什么样。
- 改完之后说【发布】。我会帮你 commit，并推送到 GitHub。
```

## 加图片

她把原图放进上面的 `content/` 文件夹。不要把原图直接写进网页。

网页实际用的是 `site/` 里同名栏目的 JPEG，最长边 1600。新文件用该栏目下一个两位编号，例如已有 `12.jpg` 就用 `13.jpg`。

```bash
sips -s format jpeg -s formatOptions 82 -Z 1600 原图路径 --out site/illustrations/13.jpg
```

然后在 `index.html` 里对应栏目的 `<div class="grid">` 中加一行。没说位置就加在该栏目最后。说了「最前面」或「插在某两张之间」就照那个位置放。不要为了插入去重命名后面已有的文件。网页顺序以这里的先后为准。

```html
<button class="tile" type="button"><img src="site/illustrations/13.jpg" alt="简短名字" style="object-position: 50% 50%" loading="lazy"></button>
```

换 About 的个人照片时，保留原图在 `content/about/`，并覆盖 `site/about/01.jpg`。不用改 `index.html` 里的图片地址。

不用改 `content/manifest.json` 和 `content/preview.html`。

## 其他修改

改简介、活动名单、页脚链接，只改 `index.html` 里对应的文字。改颜色、字号、间距，只改 `styles.css`。主色是 `#060d41`。

不要改 `lea-2014/`，也不要在首页加上它的链接。不要为了一张图重写整个页面。

改完告诉她打开 http://127.0.0.1:8765/ 看。服务没开时，在仓库根目录运行 `python3 -m http.server 8765`。

## 发布

只有她说出【发布】时才 commit 并 push 到当前分支的 GitHub 远程。在那之前不要 commit，也不要 push。

推送完成后告诉她：代码已经在 GitHub 上。`leatanuko.com` 目前仍指向 Wix，所以那个网址还不会变成新站。
