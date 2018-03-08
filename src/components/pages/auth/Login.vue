<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card">
          <div class="card-header">
            Login
          </div>
          <div class="card-body">
            <div class="alert alert-danger" v-if="error.message">
              <button type="button"
                      class="close"
                      @click="error.message = null">
                <span aria-hidden="true">&times;</span>
              </button>
              {{ error.message ? error.message : 'Oops, something went wrong.' }}
            </div>
            <form v-on:submit.prevent="login">
              <div class="form-group">
                <input v-model="form.fields.email"
                        class="form-control input-lg"
                        :class="{'is-invalid': errors.has('email') }"
                        placeholder="E-mail Address"
                        type="text"
                        name="email"
                        v-validate="'required|email'">
                <div v-show="errors.has('email')"
                      class="invalid-feedback">
                  {{ errors.first('email') }}
                </div>
              </div>
              <div class="form-group">
                <input v-model="form.fields.password"
                        class="form-control input-lg"
                        placeholder="Password"
                        name="password"
                        type="password">
              </div>
              <button class="btn btn-lg btn-primary btn-block"
                      type="submit"
                      v-bind:class="{ 'btn-loading': form.busy }"
                      :disabled="form.busy">
                Login
              </button>
            </form>
            <small>
              <router-link to="/reset-password"
                            class="float-right mt-3">
                Lost password?
              </router-link>
            </small>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { dbUsersRef, firebaseApp } from '../../../firebaseConfig';
import { store } from '../../../store/store';

firebaseApp.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('setUserRef', user);
    const profile = dbUsersRef.child(user.uid);
    store.dispatch('setUserProfileRef', profile);
    store.dispatch('setUsersRef', dbUsersRef);
  } else {
    store.dispatch('setUserRef', null);
  }
});

export default {
  props: [],
  data() {
    return {
      form: {
        busy: false,
        fields: {
          email: '',
          password: '',
        },
      },
      error: {
        message: null,
      },
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
    login() {
      this.form.busy = true;
      const email = this.form.fields.email;
      const password = this.form.fields.password;

      firebaseApp.auth().signInWithEmailAndPassword(email, password)
        .catch((error) => {
          this.error.message = error.message;
          this.form.busy = false;
        });
    },
  },
  computed: {
    ...mapGetters([
      'currentUser',
    ]),
  },
  watch: {
    currentUser() {
      if (this.currentUser) {
        this.$router.push('dashboard');
      }
    },
    // currentUserProfile() {
    //   if (this.currentUserProfile) {
    //     if (this.currentUserProfile['.value'] === null) {
    //       this.$router.push('/settings/profile');
    //     } else {
    //       this.$router.push('dashboard');
    //     }
    //   }
    // },
  },
};
</script>

<style lang="scss" scoped>

</style>
