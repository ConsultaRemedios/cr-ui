**BaseIcon component** is responsible for rendering cr-ui icons. It uses the
[svg sprite concept](https://fvsch.com/code/svg-icons/) where you define, right after the body tag,
the svg icons with their respective ids (without rendering them) and import them where you want to
(now rendering it).

So, for rendering an icon using the `BaseIcon` component, all you need to do is passing
the reference (id) of the icon you defined previously as the id propriety.
The code would be something like:

#### HTML
```html
<body>
  <svg style="position: absolute; width: 0; height: 0">
    <symbol viewBox="0 0 24 24" id="favorite.icon">
      <path d="M16.4730679,3 C18.034356..."></path>
    </symbol>
  </svg>
  ...
</body>
```

#### JS
```js static
<BaseIcon id="'favorite.icon'">
```

## Using webpack and svg-sprite-loader
Building svg sprites manually is not a good choice. We suggest to use
[svg-sprite-loader](https://github.com/kisenka/svg-sprite-loader) on the projects which helps to
build and get the references of the icons.

Using `webpack` and `svg-sprite-loader`, the same example above,
could be written with just two lines of code - desconsidering the svg file.

```js static
import favorite from 'cr-ui/src/icons/favorite.icon.svg';
<BaseIcon :id="favorite.id">

```

## List of availables icons

```js
<div>
  <div v-for="icon in allIcons" :style="{ display: 'inline-block', padding: '15px 0', width: '33%' }">
    <BaseIcon :id="icon.id"/>
    <span>src/icons/{{icon.id}}.svg</span>
  </div>
</div>
```
