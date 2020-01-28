It is a basic column of a grid system.
This component must be a direct children of GridRow component

### Basic usage
If you don't pass any props, the row space will be divided equally
between all columns inside that row.

```js
  const style = {
    height: '100px',
    background: '#D8E9EF',
    marginBottom: '30px',
    borderRadius: '3px'
  };

  <div :style="{ marginBottom: '-30px' }">
    <GridRow>
      <GridCol>
        <div :style="style"></div>
      </GridCol>

      <GridCol>
        <div :style="style"></div>
      </GridCol>
    </GridRow>

    <GridRow>
      <GridCol>
        <div :style="style"></div>
      </GridCol>

      <GridCol>
        <div :style="style"></div>
      </GridCol>

      <GridCol>
        <div :style="style"></div>
      </GridCol>
    </GridRow>

    <GridRow>
      <GridCol>
        <div :style="style"></div>
      </GridCol>

      <GridCol>
        <div :style="style"></div>
      </GridCol>

      <GridCol>
        <div :style="style"></div>
      </GridCol>

      <GridCol>
        <div :style="style"></div>
      </GridCol>

      <GridCol>
        <div :style="style"></div>
      </GridCol>

      <GridCol>
        <div :style="style"></div>
      </GridCol>
    </GridRow>
  </div>
```
### Static Columns
If you will use the same behavior for all breakpoints, you can just pass
the number of columns as span propriety value
```js
  const style = {
    height: '100px',
    background: '#D8E9EF',
    marginBottom: '30px',
    borderRadius: '3px'
  };

  <div :style="{ marginBottom: '-30px' }">
    <GridRow>
      <GridCol :span=6>
        <div :style="style"></div>
      </GridCol>

      <GridCol :span=6>
        <div :style="style"></div>
      </GridCol>
    </GridRow>

    <GridRow>
      <GridCol :span=12>
        <div :style="style"></div>
      </GridCol>
    </GridRow>

    <GridRow>
      <GridCol :span=3>
        <div :style="style"></div>
      </GridCol>

      <GridCol :span=6>
        <div :style="style"></div>
      </GridCol>

      <GridCol :span=3>
        <div :style="style"></div>
      </GridCol>
    </GridRow>
  </div>
```
### Responsive: Columns by breakpoints
If you want to control the columns by breakpoint, pass the span prop value as
object where the keys are the name of the breakpoint size. We use mobile first,
so you must define min to max values. The key values are: `xs`, `sm`, `md` `lg`,
`xl`. To see the behavior on the example, resize the browser.
```js
  const style = {
    height: '100px',
    background: '#D8E9EF',
    marginBottom: '30px',
    borderRadius: '3px'
  };

  <div :style="{ marginBottom: '-30px' }">
    <GridRow>
      <GridCol :span="{ xs: 12, sm: 6, lg: 3 }">
        <div :style="style"></div>
      </GridCol>

      <GridCol :span="{ xs: 12, sm: 6, lg: 3 }">
        <div :style="style"></div>
      </GridCol>

      <GridCol :span="{ xs: 12, sm: 6, lg: 3 }">
        <div :style="style"></div>
      </GridCol>

      <GridCol :span="{ xs: 12, sm: 6, lg: 3 }">
        <div :style="style"></div>
      </GridCol>
    </GridRow>
  </div>
```

### Offset
It pushes the columns according to its value.
Offset works like span props since accept the same values.

```js
  const style = {
    height: '100px',
    background: '#D8E9EF',
    marginBottom: '30px',
    borderRadius: '3px'
  };

  <div>
    <p>Static value</p>

    <GridRow>
      <GridCol :offset="3" :span="6">
        <div :style="style"></div>
      </GridCol>
    </GridRow>

    <p>Responsive value</p>

    <GridRow>
      <GridCol :offset="{ xs: 1, md: 3 }" :span="{ xs: 10, md: 6 }">
        <div :style="style"></div>
      </GridCol>
    </GridRow>
  </div>
```

### Order
Sometimes we need to change the columns order according to the breakpoints.
You can do it using order prop. As all grid configs, it accepts a number
or an object with breakpoint name as keys and its respective order as value.

```js
  const style = {
    padding: '40px 0',
    textAlign: 'center',
    background: '#D8E9EF',
    marginBottom: '30px',
    borderRadius: '3px'
  };

  <div>
    <p>Static value</p>

    <GridRow>
      <GridCol :order="3">
        <div :style="style">1</div>
      </GridCol>

      <GridCol :order="1">
        <div :style="style">2</div>
      </GridCol>

      <GridCol :order="2">
        <div :style="style">3</div>
      </GridCol>
    </GridRow>

    <p>Responsive value</p>

    <GridRow>
      <GridCol :order="{ xs: 3, sm: 2, md: 1 }">
        <div :style="style">1</div>
      </GridCol>

      <GridCol :order="{ xs: 2, sm: 1, md: 3 }">
        <div :style="style">2</div>
      </GridCol>

      <GridCol :order="{ xs: 1, sm: 3, md: 2 }">
        <div :style="style">3</div>
      </GridCol>
    </GridRow>
  </div>
```
