<template>
  <div>
    <BaseDialog :show="!!error" title="An error occurred" @close="closeDialog"
      ><p>{{ error }}</p></BaseDialog
    >
    <BaseDialog :show="isLoading" fixed title="Authenticating...">
      <BaseSpinner />
    </BaseDialog>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control" :class="{ errors: !email.isValid }">
          <label for="email">E-Mail</label>
          <input
            type="email"
            id="email"
            v-model.trim="email.value"
            @blur="clearValidity('email')"
          />
          <p v-if="!email.isValid">Please enter your email address</p>
        </div>
        <div class="form-control" :class="{ errors: !password.isValid }">
          <label for="password">Password</label>
          <input
            type="password"
            id="password"
            v-model.trim="password.value"
            @blur="clearValidity('password')"
          />
          <p v-if="!password.isValid">
            Your password must not be less than 6 characters
          </p>
        </div>
        <p v-if="!formIsValid">Please fix the above errors and try again</p>
        <BaseButton type="submit">{{ submitButtonCaption }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchAuthMode">{{
          switchModeButtonCaption
        }}</BaseButton>
      </form>
    </BaseCard>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: {
        value: '',
        isValid: true,
      },

      password: {
        value: '',
        isValid: true,
      },

      formIsValid: true,

      mode: 'login',

      isLoading: false,

      error: null,
    };
  },

  methods: {
    formValidation() {
      this.formIsValid = true;

      if (this.email.value === '' || !this.email.value.includes('@')) {
        this.email.isValid = false;
        this.formIsValid = false;
      }
      if (!this.password.value || this.password.value.length < 6) {
        this.password.isValid = false;
        this.formIsValid = false;
      }
    },

    async submitForm() {
      this.formValidation();

      if (!this.formIsValid) {
        return;
      }

      this.isLoading = true;

      try {
        if (this.mode === 'login') {
          // dispatch login action
        } else {
          await this.$store.dispatch('signup', {
            email: this.email.value,
            password: this.password.value,
          });
        }
      } catch (error) {
        this.error = error.message || 'Faild to authenticate, try later';
      }

      this.isLoading = false;

      this.email.value = '';
      this.password.value = '';
    },

    clearValidity(input) {
      this[input].isValid = true;
    },

    switchAuthMode() {
      if (this.mode === 'login') {
        this.mode = 'signup';
      } else {
        this.mode = 'login';
      }
    },

    closeDialog() {
      this.error = null;
    },
  },

  computed: {
    submitButtonCaption() {
      if (this.mode === 'login') {
        return 'Login';
      } else {
        return 'Signup';
      }
    },

    switchModeButtonCaption() {
      if (this.mode === 'login') {
        return 'Signup instead';
      } else {
        return 'Login instead';
      }
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
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

.errors input {
  background-color: rgb(240, 195, 195);
}
</style>
