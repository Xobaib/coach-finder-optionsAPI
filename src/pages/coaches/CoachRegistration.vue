<template>
  <BaseCard>
    <section>
      <h2>Register as acoach now!</h2>
      <CoachForm @save-data="saveData" />
    </section>
  </BaseCard>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },

  methods: {
    saveData(formData) {
      this.$store.dispatch('coaches/addNewCoach', formData);
      //   this.$router.push('/coaches');
      this.$router.replace('/coaches');
    },
  },
};
</script>
