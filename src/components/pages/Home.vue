<template>
  <div>
    <div class="container jumbotron">
      <h1 class="display-4">Welcome!</h1>
      <p class="lead">
        This site is a simple attempt to exchange
        business services between Estonian eResidents companies.
      </p>
      <hr class="my-4">
      <p>
        Interested? Just register and fill in your profile,
        you'll be listed and will be able to browse others.
      </p>
      <p class="lead">
        <router-link to="/register" class="btn btn-outline-primary btn-lg">
          Register Now
        </router-link>
      </p>
    </div>
    <!-- <div class="container">
      <section class="my-5 py-5" id="program">
        <div class="row d-flex align-items-center">
          <div class="col-md-6">
            <div class="align-middle">
              <h2>Lorem ipsum dolor sit amet</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deleniti asperiores nulla inventore cum, eum sapiente nihil
                repudiandae! Rem ipsum provident laborum iusto in
                quidem facere optio est, non quod id?
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <img src="http://placehold.it/1000x1000" alt="Section Image" class="img-fluid">
          </div>
        </div>
      </section>
      <section class="my-5 py-5" id="program">
        <div class="row d-flex align-items-center">
          <div class="col-md-6">
            <img src="http://placehold.it/1000x1000" alt="Section Image" class="img-fluid">
          </div>
          <div class="col-md-6">
            <div class="align-middle">
              <h2>Lorem ipsum dolor sit amet</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Deleniti asperiores nulla inventore cum, eum sapiente nihil
                repudiandae! Rem ipsum provident laborum iusto in quidem
                facere optio est, non quod id?
              </p>
            </div>
          </div>
        </div>
      </section>
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  props: [],
  data() {
    return {
    };
  },
  mounted() {
    if (this.currentUser) {
      this.$router.push('/dashboard');
    }
  },
  created() {
  },
  ready() {
  },
  methods: {
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
  watch: {
    currentUser() {
      if (this.currentUser) {
        this.$router.push('/dashboard');
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.jumbotron {
  background-color: #fff;
}
</style>
