const path = require('path');

const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  styleguideDir: '../public',
  sections: [{
    name: 'Components',
    components: '../src/components/**/[A-Z]*.vue'
  },{
    name: 'Validator',
    content: '../src/validator/validator.md'
  }, {
    name: 'Mixins',
    sections: [{
      name: 'Breakpointable',
      content: '../src/mixins/breakpointable.md'
    }, {
      name: 'Validator',
      content: '../src/mixins/validator/validator.md'
    }]
  }, {
    name: 'Directives',
    sections: [{
      name: 'Mask',
      content: '../src/directives/mask/mask.md'
    }]
  }],
  showUsage: true,
  require: [
    './src/style.css',
    './src/styles/colors.css',
    path.join(__dirname, 'styleguide/icons-mixin.js')
  ],
  webpackConfig: {
    module: {
      rules: [
        {
          test: /\.vue$/,
          exclude: /node_modules/,
          loader: 'vue-loader'
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          exclude: /node_modules/,
          use: [
            'style-loader',
            {
              loader: require.resolve('css-loader'),
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            'postcss-loader'
          ],
        },
        {
          test: /\.(svg|eot|otf|ttf|woff|woff2|png)$/i,
          exclude: ['/node_modules/', path.resolve(__dirname, '../src/icons/')],
          loader: 'file-loader',
          options: {
            esModule: false,
          },
        },
        {
          test: /\.icon\.svg$/,
          loader: 'svg-sprite-loader'
        },

        {
          test: /\.scss$/,
          use: [
            'vue-style-loader',
            'css-loader',
            'sass-loader'
          ]
        }
      ]
    },
    plugins: [
      new VueLoaderPlugin()
    ]
  }
};
