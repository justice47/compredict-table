<script setup lang="ts">
  interface Props {
    isRed?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    isRed: false,
  });
</script>

<template>
  <button :class="[$style.button, { red: props.isRed }]">
    <slot />
  </button>
</template>

<style lang="scss" module>
  .button {
    background-color: #3E808F;
    cursor: pointer;
    padding: 8px 16px;
    border-radius: 12px;
    color: white;
    border: none;

    &:global(.red) {
      background-color: #b51f21;
    }
  }
</style>
