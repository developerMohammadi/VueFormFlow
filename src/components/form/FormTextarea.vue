<script setup lang="ts">
interface Props {
  id: string;
  label: string;
  modelValue: string;
  required?: boolean;
  error?: string;
  placeholder?: string;
  rows?: number;
}

defineProps<Props>();
defineEmits<{
  'update:modelValue': [value: string]
}>();
</script>

<template>
  <div class="form-group">
    <label :for="id">{{ label }} <span v-if="required" class="required">*</span></label>
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :class="{'error-input': error}"
      :placeholder="placeholder"
      :rows="rows"
    ></textarea>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.form-group {
  margin-bottom: 15px;

  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-family: inherit;
    resize: vertical;

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
