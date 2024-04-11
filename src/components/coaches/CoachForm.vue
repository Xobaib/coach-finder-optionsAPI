<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !firstNameIsValid }">
      <label for="firstname">FirstName</label>
      <input type="text" id="firstname" v-model.trim="firstName" />
    </div>
    <div class="form-control" :class="{ invalid: !lastNameIsValid }">
      <label for="lastname">LastName</label>
      <input type="text" id="lastname" v-model.trim="lastName" />
    </div>
    <div class="form-control" :class="{ invalid: !descriptionIsValid }">
      <label for="description">Description</label>
      <textarea id="description" rows="5" v-model.trim="description"></textarea>
    </div>
    <div class="form-control" :class="{ invalid: !rateIsValid }">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="rate" />
    </div>
    <div class="form-control" :class="{ invalid: !areasIsValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" id="frontend" value="frontend" v-model="areas" />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" id="backend" value="backend" v-model="areas" />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" id="career" value="career" v-model="areas" />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <BaseButton :link="false" type="submit">Register</BaseButton>
  </form>
</template>

<script>
export default {
  emits: ['save-data'],

  data() {
    return {
      firstName: '',
      lastName: '',
      description: '',
      rate: null,
      areas: [],
      firstNameIsValid: true,
      lastNameIsValid: true,
      descriptionIsValid: true,
      rateIsValid: true,
      areasIsValid: true,
    };
  },

  methods: {
    submitForm() {
      if (this.firstName.length === 0) {
        this.firstNameIsValid = false;
        alert('Please enter your first name');
        return;
      } else if (this.lastName.length === 0) {
        this.lastNameIsValid = false;
        alert('Please enter your last name');
        return;
      } else if (this.description.length === 0) {
        this.descriptionIsValid = false;
        alert('Please describe your self');
        return;
      } else if (this.rate <= 0) {
        this.rateIsValid = false;
        alert('Please enter your hourly rate');
        return;
      } else if (this.areas.length === 0) {
        this.areasIsValid = false;
        alert('Please choose your area of expertise');
        return;
      }

      const formData = {
        first: this.firstName,
        last: this.lastName,
        desc: this.description,
        rate: this.rate,
        areas: this.areas,
      };

      //   console.log(formData);
      this.$emit('save-data', formData);
    },
  },
};
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
