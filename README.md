# learnVite

记录学习 Vite 构建工具的过程

# index.html

Vite 默认会把项目根目录下的 index.html 作为入口文件。访问 http://localhost:3000 的时候，Vite 的 Dev Server 会自动返回这个 HTML 文件的内容。

我们注意`index.html`文件中声明了 `type="module"`的 `script` 标签:

```html
<script type="module" src="/src/main.tsx"></script>
```

src 属性 指向了/src/main.tsx 文件，也就是相当于请求了 `http://localhost:3000/src/main.tsx`这个资源
