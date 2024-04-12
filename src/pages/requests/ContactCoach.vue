<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ errors: !email.isValid }">
      <label for="email">Your E-Mail</label>
      <input
        type="email"
        id="email"
        v-model.trim="email.value"
        @blur="clearValidity('email')"
      />
    </div>
    <p v-if="!email.isValid">Please enter a valid E-Mail address.</p>
    <div class="form-control" :class="{ errors: !message.isValid }">
      <label for="message">Message</label>
      <textarea
        id="message"
        rows="5"
        v-model.trim="message.value"
        @blur="clearValidity('message')"
      ></textarea>
    </div>
    <p v-if="!message.isValid">
      Please write a proper message for the coach you want.
    </p>
    <div class="actions">
      <BaseButton type="submit">Send Message</BaseButton>
    </div>
    <p v-if="!formIsValid">Please Fix The Above Errors And Submit Again</p>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: {
        value: '',
        isValid: true,
      },
      message: {
        value: '',
        isValid: true,
      },
      formIsValid: true,
    };
  },

  methods: {
    clearValidity(input) {
      this[input].isValid = true;
    },

    submitForm() {
      this.formIsValid = true;

      if (this.email.value === '' || !this.email.value.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (this.message.value === '') {
        (this.message.isValid = false), (this.formIsValid = false);
      }
      if (!this.formIsValid) {
        return;
      }

      console.log(this.email.value);
      console.log(this.message.value);

      this.email.value = '';
      this.message.value = '';
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.errors input,
.errors textarea {
  background-color: rgb(255, 216, 216);
}

.actions {
  text-align: center;
}
</style>
