# Consulta Remédios UI Library
cr-ui is a collection of reusable user interface components built with vuejs and es6.

### How to use cr-ui on other projets
Different from other libraries, we do not provide UMD built files to be consumable by other projects. In order to use cr-ui library, you will need to config webpack properly to compile the cr-ui files. See the loaders you'll need bellow:

#### Common Loaders
```js
module.rules = [
  {
    test: /\.vue$/,
    loader: 'vue-loader'
  },
  {
    test: /\.js$/,
    loader: 'babel-loader'
  },
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader', 'postcss-loader']
  },
  {
    test: /\.(eot|otf|ttf|woff|woff2)$/i,
    loader: 'file-loader'
  },
]
```

#### Svg Loaders (for Icons)
Usually, files with .svg extensions are loaded by `file-loader`. That's fine, but for loading icons
using **svg sprite** approach, we need to configure another loader called `svg-sprite-loader`. So
in order to make it works, it's necessary to **exclude cr-ui-icons path** from svg default loader,
and add the specific loader **svg-sprite-loader** for files whose ends with **.icon.svg**

```js
module.rules = [
  {
    test: /\.svg$/,
    exclude: ['/node_modules/cr-ui/src/icons'], // do not use this loader on that path
    loader: 'file-loader'
  },
  {
    test: /\.icon\.svg$/,
    loader: 'svg-sprite-loader' // That's the right loader for cr-ui-icons
  }
]
```

After config webpack properly, just add the dependency on the project:
```bash
yarn add cr-ui
```

Import the global style on the main script
```js
import 'cr-ui/src/style.css'
```

And import the components where you want to use them
```js
import { BaseButton, BaseInput } from 'cr-ui';
```

### Global Dependencies
* node
* yarn

### How to Install and run locally
```
git clone https://github.com/ConsultaRemedios/cr-ui.git
yarn
yarn styleguide
```



### Running tests
```
yarn test
```
