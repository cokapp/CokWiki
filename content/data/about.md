---
layout: page
title: 关于
comments: true
date: 2014-06-23 11:20
intro: 一些关于本站的介绍
tags: 标签 傲视 全能型 选项
---

龟碎
>IT WAS the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way- in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.


```java
for (int i=0;i<10;i++){
  new Thread(new Runnable() {
      @Override
      public void run() {
          Thread.currentThread().interrupt();
          for(int j = 0;j<20;j++){
              try {
                  System.out.println("i = " + t.getAndIn());
                  Thread.sleep(100);
              } catch (Exception e) {
                  System.out.println("e = " + e);
              }
          }
      }
  }).start();
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="utf-8" />
 <title>I can haz embedded CSS and JS</title>
 <style>
 	@media print {
   p { color: red !important; }
 	}
 </style>
</head>
<body>
 <h1>I can haz embedded CSS and JS</h1>
 <script>
 if (true) {
 	console.log('foo');
 }
 </script>

</body>
</html>
```


只挑最靠谱的介绍。时间过得真快，Markdown已经生态链极其成熟。

## 国人贡献：knitr

[knitr]：yihui开发，享有世界级声誉的开源软件，动态报表成为现实。使得R Markdown成为统计学、数据挖掘领域的通用格式。

教程：

* [Markdown写作浅谈]

## 国人贡献：Mou

[Mou]：还需要介绍吗？Mac下同样享有世界级声誉的软件。作者呢？出来打个招呼吧:D

## 格式扩展：Pandoc Markdown

我最喜欢的格式扩展，也是日常使用最多的格式。它适合写长文档、科技论文与图书，支持脚注、参考文献与LaTeX等大量扩展。由于[Pandoc]的强大，更支持数十种文档格式无错互转。

教程：

* [Markdown写作进阶：Pandoc入门浅谈]
* [Pandoc’s Markdown 語法中文翻譯]

## 格式扩展：R Markdown

R社区通用的格式，数据挖掘、统计报表、可重复研究，借助于R Markdown+Knitr，从此成为现实。

教程：

* [Customizing Markdown Rendering]
* [RStuido Markdown]

## 格式扩展：kMarkdown

[kMarkdown]：时尚敏捷在线出版商[Leanpub]支持的格式，扩展后，写书用户体验好。

教程：

* [Markdown: The Easiest Way To Format Your Text For E-Publishing]

## 格式扩展：GitHub Flavored Markdown

[GitHub Flavored Markdown]：Github扩展的格式，支持Todo列表很酷写法，适用于日常开发使用格式。

教程：

* [GitHub Flavored Markdown]

## 维基：gollum

[gollum]：基于Git的维基管理

教程：

* [基于Git的维基管理：gollum]

## 在线编辑器：Markx

实例：[Pandoc Markdown]

## 开发包

* [Pyandoc]：Python知名库requests作者Kenneth Reitz写的Python Pandoc库。
* [docverter]：桥接Pandoc等之后的一个http开源服务器，提供简洁的curl类似方式转换文档。
* [PageDown]：Stack Overflow开发的Markdown 编辑器


[Knitr]: http://yihui.name/knitr/
[Markdown写作浅谈]:http://www.yangzhiping.com/tech/r-markdown-knitr.html 
[Mou]:http://mouapp.com/
[Markdown写作进阶：Pandoc入门浅谈]:http://www.yangzhiping.com/tech/pandoc.html 
[Pandoc’s Markdown 語法中文翻譯]:http://pages.tzengyuxio.me/pandoc/
[Pandoc Markdown]:http://johnmacfarlane.net/pandoc/README.html#pandocs-markdown
[Customizing Markdown Rendering]:http://www.rstudio.com/ide/docs/authoring/markdown_custom_rendering
[RStuido Markdown]:http://www.rstudio.com/ide/docs/authoring/using_markdown_equations
[kMarkdown]:https://github.com/gettalong/kramdown
[leanpub]:https://leanpub.com/manifesto
[Markdown: The Easiest Way To Format Your Text For E-Publishing]:https://leanpub.com/help/manual#markdown-the-easiest-way-to-format-your-text-for-e-publishing
[GitHub Flavored Markdown]:https://help.github.com/articles/github-flavored-markdown
[gollum]:https://github.com/gollum/gollum
[基于Git的维基管理：gollum]:http://www.yangzhiping.com/tech/gollum.html
[Pyandoc]:https://github.com/kennethreitz/pyandoc
[docverter]: http://docverter.com/
[PageDown]: http://code.google.com/p/pagedown/
[Pandoc]: http://johnmacfarlane.net/pandoc
[Pandoc Markdown]:http://pandoc.herokuapp.com