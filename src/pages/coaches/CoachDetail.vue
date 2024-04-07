<template>
  <section>
    <BaseCard>
      <h2>{{ fullName }}</h2>
      <h3>${{ rate }}/hour</h3>
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <header>
        <h2>Intrested? Reach out now!</h2>
        <BaseButton :link="true" :to="contactLink">Contact</BaseButton>
      </header>
      <RouterView />
    </BaseCard>
  </section>
  <section>
    <BaseCard>
      <BaseBadge v-for="area in areas" :key="area" :title="area" :type="area" />
      <p>{{ description }}</p>
    </BaseCard>
  </section>
</template>

<script>
export default {
  props: ['id'],

  data() {
    return {
      selectedCoach: null,
    };
  },

  beforeMount() {
    const coaches = this.$store.getters['coaches/coaches'];
    this.selectedCoach = coaches.find((coach) => coach.id === this.id);
  },

  computed: {
    fullName() {
      return this.selectedCoach.firstName + ' ' + this.selectedCoach.lastName;
    },

    rate() {
      return this.selectedCoach.hourlyRate;
    },

    areas() {
      return this.selectedCoach.areas;
    },

    description() {
      return this.selectedCoach.description;
    },

    contactLink() {
      return `${this.$route.path}/contact`;
    },
  },
};
</script>
