<script setup lang="ts">
interface Option {
  value: string;
  label: string;
}

interface Props {
  label: string;
  modelValue: string;
  required?: boolean;
  error?: string;
  options: Option[];
}

const props = withDefaults(defineProps<Props>(), {
  required: false,
  error: '',
  modelValue: ''
});

defineEmits<{
  'update:modelValue': [value: string]
}>();
</script>

<template>
  <div class="form-group">
    <label>{{ label }} <span v-if="required" class="required">*</span></label>
    <div class="radio-group">
      <div v-for="option in options" :key="option.value" class="radio-item">
        <input
          type="radio"
          :id="option.value"
          :value="option.value"
          :checked="modelValue === option.value"
          @change="$emit('update:modelValue', option.value)"
        >
        <label :for="option.value">{{ option.label }}</label>
      </div>
    </div>
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<style lang="scss" scoped>
.radio-group {
  display: flex;
  gap: 15px;
  padding: 8px 0;
  margin-top: 2px;

  .radio-item {
    display: flex;
    align-items: center;

    input[type="radio"] {
      width: auto;
      margin-left: 5px;
    }

    label {
      margin: 0;
      font-weight: normal;
    }
  }
}

.error-message {
  color: #e74c3c;
  font-size: 0.8rem;
  margin-top: 5px;
  display: block;
}
</style>
