<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

interface Props {
  id: string;
  label: string;
  modelValue: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  type?: string;
}

defineProps<Props>();
const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const updateValue = (event: Event) => {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
};
</script>

<template>
  <div class="form-group">
    <label :for="id">
      {{ label }}
      <span v-if="required" class="required">*</span>
    </label>
    <input
      :id="id"
      :type="type || 'text'"
      :value="modelValue"
      @input="updateValue"
      :class="{ 'error-input': error }"
      :placeholder="placeholder"
    />
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;

    .required {
      color: #e74c3c;
    }
  }

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;

    &.error-input {
      border-color: #e74c3c;
    }
  }

  .error-message {
    color: #e74c3c;
    font-size: 0.8rem;
    margin-top: 5px;
    display: block;
  }
}
</style>
