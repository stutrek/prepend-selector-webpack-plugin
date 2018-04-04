# prepend-selector-webpack-plugin

This is a Webpack plugin for prepending a selector to all your CSS with `prepend-selector-webpack-plugin`. This allows prepending CSS classes with a string while also using CSS modules. If that's possilble with a built in solution when you find this, use that instead.

It turns this:
```css
li {
    color: blue;
}

.myClassName, .someoneElsesClassName {
    color: green;
}
```

into this:

```css
.myContainer li {
    color: blue;
}

.myContainer .myClassName, .myContainer .someoneElsesClassName {
    color: green;
}
```

## Usage

Add this to your plugins:

```javascript
var webpackPlugins = [
    new PrependSelectorPlugin({
        selector: '.mySelector '
    })
];
```

You can use all the (one) options that [postcss-prepend-selector](https://github.com/ledniy/postcss-prepend-selector) accepts.

## Why?

This is useful for creating a widget that will live on a website where you won't control the environment.

### Why not manually? Or with the PostCSS plugin that does this?

Doing this manually, or with said plugin, breaks the `compose` keyword in CSS Modules.
