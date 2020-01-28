Component to handle form object errors

### String error
```
<FormError title="Something happened" errors="lorem ipsum dolor sit amet consecteur" />
```

### Array error
```
const errors = ['Lorem ipsum dolor sit amet one', 'Consecteur lorem ipsum dolor sit amet'];

<FormError title="Something happened" :errors="errors"/>
```

### Object error

#### String as propriety values
```
const errors = {
  name: 'Lorem ipsum dolor sit amet one',
  password: 'Consecteur lorem ipsum dolor sit amet'
};

<FormError title="Something happened" :errors="errors"/>
```

#### Array as propriety values
```
const errors = {
  name: ['Lorem ipsum dolor sit amet one', 'Consecteur lorem ipsum dolor sit amet'],
  password: ['Lorem ipsum dolor sit amet one', 'Consecteur lorem ipsum dolor sit amet']
};

<FormError title="Something happened" :errors="errors"/>
```

#### Array as propriety values with keys black list
```
const errors = {
  name: ['Lorem ipsum dolor sit amet one', 'Consecteur lorem ipsum dolor sit amet'],
  password: ['Lorem ipsum dolor sit amet one', 'Consecteur lorem ipsum dolor sit amet'],
  base: ['Base error one', 'Base error two'],
  transaction: ['Transaction error here'],
};

<FormError 
  title="Something happened" 
  :errors="errors" 
  :black-list="['base', 'transaction']"
/>
```
