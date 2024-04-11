<template>
  <BaseCard>
    <section>
      <h2>Register as acoach now!</h2>
      <CoachForm />
    </section>
  </BaseCard>
</template>

<script>
import CoachForm from '../../components/coaches/CoachForm.vue';

export default {
  components: {
    CoachForm,
  },
};
</script>
