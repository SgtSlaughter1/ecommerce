<template>
  <form @submit.prevent="handleSubmit" class="styled-form">
    <div class="form-fields">
      <div v-for="(field, index) in fields" :key="index" :class="['form-group', field.halfWidth ? 'half-width' : '']">
        <label :for="field.name" class="form-label">{{ field.label }}</label>
        <input v-if="field.type !== 'select'" 
          :type="field.type" 
          :name="field.name" 
          v-model="formData[field.name]"
          :placeholder="field.placeholder" 
          :required="field.required"
          class="form-input" 
        />
        <select v-else v-model="formData[field.name]" class="form-select">
          <option v-for="option in field.options" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <div class="form-actions">
      <button type="submit" class="btn btn-primary">{{ submitText }}</button>
    </div>
  </form>
</template>

<script>
export default {
  props: {
    fields: {
      type: Array,
      required: true,
    },
    submitText: {
      type: String,
      default: "Submit",
    },
  },
  data() {
    return {
      formData: {},
    };
  },
  watch: {
    fields: {
      immediate: true,
      handler(newFields) {
        this.formData = newFields.reduce((acc, field) => {
          acc[field.name] = field.default || "";
          return acc;
        }, {});
      },
    },
  },
  methods: {
    handleSubmit() {
      this.$emit("submit", this.formData);
    },
  },
};
</script>

<style scoped>
.styled-form {
  width: 100%;
}

.form-fields {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  grid-column: span 2;
}

.form-group.half-width {
  grid-column: span 1;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #495057;
}

.form-input,
.form-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

.form-input:focus,
.form-select:focus {
  outline: none;
  border-color: #28a745;
  box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.25);
}

.form-input::placeholder {
  color: #6c757d;
}

.form-actions {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
}

.btn {
  padding: 12px 24px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;
}

.btn-primary {
  background: #007bff;
  color: white;
}

.btn-primary:hover {
  background: #0056b3;
}

@media (max-width: 768px) {
  .form-fields {
    grid-template-columns: 1fr;
  }

  .form-group,
  .form-group.half-width {
    grid-column: span 1;
  }
}
</style>