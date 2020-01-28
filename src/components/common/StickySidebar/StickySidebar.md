### Basic Usage
A component to make sidebars sticky on viewport. It sticks on top of the viewport based on the
scroll position. When the limit is reached, the element is fixed on the bottom of its parent
element.

Configurations by breakpoints are not available for now. it only sticks on **viewport width >= 768**

#### Example

```js
  const style = {
    height: '1000px',
    background: '#D8E9EF',
    borderRadius: '3px'
  };

  <GridRow>
    <GridCol :span="8">
      <div :style="style">
      </div>
    </GridCol>

    <GridCol :span="4">
      <StickySidebar :offset="15">
        <div :style="{ width: '100%', background: '#CCC', padding: '20px', borderRadius: '3px' }">
          <h2>Element to stick</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur at massa ut ex
            pretium ut ultricies velit. Ut commodo vehicula risus, quis vehicula metus tincidunt eget.
            Duis quis volutpat dolor, sit amet fringilla elit. Etiam non vestibulum dui. Pellentesque
          </p>
        </div>
      </StickySidebar>
    </GridCol>
  </GridRow>
```
