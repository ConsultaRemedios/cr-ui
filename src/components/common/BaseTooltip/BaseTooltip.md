```vue
const tooltip = {
  top: false,
  bottom: false,
  left: false,
  right: false,
  dark: false
};

<div>
  <BaseButton @click="tooltip.top = !tooltip.top">
    Tooltip Top

    <BaseTooltip :show="tooltip.top" width="150px">
      Tooltip Example
    </BaseTooltip>
  </BaseButton>

  <BaseButton @click="tooltip.bottom = !tooltip.bottom">
    Tooltip Bottom

    <BaseTooltip :show="tooltip.bottom" position="bottom">
      Tooltip Example
    </BaseTooltip>
  </BaseButton>

  <BaseButton @click="tooltip.left = !tooltip.left">
    Tooltip Left

    <BaseTooltip :show="tooltip.left" position="left">
      Tooltip Example
    </BaseTooltip>
  </BaseButton>

  <BaseButton @click="tooltip.right = !tooltip.right">
    Tooltip Right

    <BaseTooltip :show="tooltip.right" position="right">
      Tooltip Example
    </BaseTooltip>
  </BaseButton>

  <BaseButton @click="tooltip.dark = !tooltip.dark">
    Tooltip Dark

    <BaseTooltip :show="tooltip.dark" position="bottom" theme="dark">
      Tooltip Example
    </BaseTooltip>
  </BaseButton>
</div>
```
