<template>
  <button class="circle-button">
    <span class="material-icons">
      <slot></slot>
    </span>
  </button>
</template>

<script>
export default {
  name: 'CircleButton'
}
</script>

<style scoped>
.circle-button {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  background-color: #ffffff;
  color: #333333;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.material-icons {
  font-size: 24px;
  line-height: 1;
}

.circle-button:hover {
  background-color: #f0f0f0;
  box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.circle-button:active {
  background-color: #e0e0e0;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transform: translateY(1px);
}
</style> 