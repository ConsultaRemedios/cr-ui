It groups all columns and controls its horizontal and vertical alignments
```js
  const style = {
    textAlign: 'center',
    padding: '40px 0',
    background: '#D8E9EF',
    borderRadius: '3px'
  };

  <div>
    <GridRow>
      <GridCol>
        <div :style="style">Just add columns inside GridRow</div>
      </GridCol>

      <GridCol>
        <div :style="style">Just add columns inside GridRow</div>
      </GridCol>
    </GridRow>
  </div>
```

### Gutter
By default the value is 30px, which means 15px each side, but you can override
this value if you want. Just pass a new value as gutter props.
```js
  const style = {
    textAlign: 'center',
    padding: '40px 0',
    background: '#D8E9EF',
    borderRadius: '3px'
  };

  <div>
    <GridRow :gutter="10">
      <GridCol>
        <div :style="style">A column here</div>
      </GridCol>

      <GridCol>
        <div :style="style">A column here</div>
      </GridCol>

      <GridCol>
        <div :style="style">A column here</div>
      </GridCol>

      <GridCol>
        <div :style="style">A column here</div>
      </GridCol>
    </GridRow>
  </div>
```

### Align
Use this props to control vertical alignment.
As some props in GridCol, we can define one value for all breakpoints, or one
value for each breakpoint.

#### One value for all
```js
  const style = {
    textAlign: 'center',
    padding: '40px 0',
    background: '#D8E9EF',
    borderRadius: '3px'
  };

  <div>
    <p>Top</p>

    <GridRow>
      <GridCol>
        <div :style="style">
          Column
        </div>
      </GridCol>

      <GridCol>
        <div :style="style">
          Higher <br/>
          Column
        </div>
      </GridCol>

      <GridCol>
        <div :style="style">
          Higher <br/>
          Column <br/>
          Column
        </div>
      </GridCol>
    </GridRow>

    <p>Center</p>

    <GridRow align="middle">
      <GridCol>
        <div :style="style">
          Column
        </div>
      </GridCol>

      <GridCol>
        <div :style="style">
          Higher <br/>
          Column
        </div>
      </GridCol>

      <GridCol>
        <div :style="style">
          Higher <br/>
          Column <br/>
          Column
        </div>
      </GridCol>
    </GridRow>

    <p>Bottom</p>

    <GridRow align="bottom">
      <GridCol>
        <div :style="style">
          Column
        </div>
      </GridCol>

      <GridCol>
        <div :style="style">
          Higher <br/>
          Column
        </div>
      </GridCol>

      <GridCol>
        <div :style="style">
          Higher <br/>
          Column <br/>
          Column
        </div>
      </GridCol>
    </GridRow>
  </div>
```

#### One value for each breakpoint
Values are xs: 'bottom', md: 'middle', lg: 'top'. Resize the browser to see
the responsive behavior.
```js
  const style = {
    textAlign: 'center',
    padding: '40px 0',
    background: '#D8E9EF',
    borderRadius: '3px'
  };

  <div>
    <GridRow :align="{ xs: 'bottom', md: 'middle', lg: 'top' }">
      <GridCol>
        <div :style="style">
          Column
        </div>
      </GridCol>
      <GridCol>
        <div :style="style">
          Higher <br/>
          Column
        </div>
      </GridCol>

      <GridCol>
        <div :style="style">
          Higher <br/>
          Column <br/>
          Column
        </div>
      </GridCol>
    </GridRow>
  </div>
```

### Justify
Use this props to control horizontal alignment.
As some props in GridCol, we can define one value for all breakpoints, or one
value for each breakpoint.

#### One value for all
```js
  const style = {
    textAlign: 'center',
    padding: '40px 0',
    background: '#D8E9EF',
    borderRadius: '3px'
  };

  <div>
    <p>left</p>

    <GridRow>
      <GridCol :span="3">
        <div :style="style">
          Column
        </div>
      </GridCol>

      <GridCol :span="3">
        <div :style="style">
          Column
        </div>
      </GridCol>
    </GridRow>

    <p>center</p>

    <GridRow justify="center">
      <GridCol :span="3">
        <div :style="style">
          Column
        </div>
      </GridCol>

      <GridCol :span="3">
        <div :style="style">
          Column
        </div>
      </GridCol>
    </GridRow>

    <p>right</p>

    <GridRow justify="right">
      <GridCol :span="3">
        <div :style="style">
          Column
        </div>
      </GridCol>

      <GridCol :span="3">
        <div :style="style">
          Column
        </div>
      </GridCol>
    </GridRow>
  </div>
```

#### One value for each breakpoint
Values are xs: 'right', md: 'center', lg: 'left'. Resize the browser to see
the responsive behavior.
```js
  const style = {
    textAlign: 'center',
    padding: '40px 0',
    background: '#D8E9EF',
    borderRadius: '3px'
  };

  <div>
    <GridRow :justify="{ xs: 'right', md: 'center', lg: 'left' }">
      <GridCol :span="3">
        <div :style="style">
          Column
        </div>
      </GridCol>

      <GridCol :span="3">
        <div :style="style">
          Column
        </div>
      </GridCol>
    </GridRow>
  </div>
```
