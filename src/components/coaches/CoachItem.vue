<template>
  <li>
    <h3>{{ fullName }}</h3>
    <h4>${{ rate }}/hour</h4>
    <div>
      <BaseBadge
        v-for="area in areas"
        :key="area"
        :type="area"
        :title="area"
      ></BaseBadge>
    </div>
    <div class="actions">
      <BaseButton :link="true" mode="outline" :to="coachContactLink"
        >Contact</BaseButton
      >
      <BaseButton :link="true" :to="coachDetailsLink">View Details</BaseButton>
    </div>
  </li>
</template>

<script>
export default {
  props: ['id', 'firstName', 'lastName', 'areas', 'rate'],

  computed: {
    fullName() {
      return `${
        this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1)
      } ${this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1)}`;
    },

    coachContactLink() {
      //return `/coaches/${this.id}/contact`; // /coaches/c1/contact
      //return `/${this.id}/contact`;
      return `${this.$route.path}/${this.id}/contact`;
    },

    coachDetailsLink() {
      //return `/coaches/${this.id}`; // /coaches/c1
      //return `/${this.id}`;
      return `${this.$route.path}/${this.id}`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  border: 1px solid #424242;
  border-radius: 12px;
  padding: 1rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
