<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card">
          <div class="card-header">
            Register
          </div>
          <div class="card-body">
             <div class="alert alert-danger" v-if="error.message">
              <button
                type="button"
                class="close"
                @click="error.message = null"
              >
                <span aria-hidden="true">&times;</span>
              </button>
              {{ error.message ? error.message : 'Oops, something went wrong.' }}
            </div>
            <form v-on:submit.prevent="register">
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
                        :class="{'is-invalid': errors.has('password') }"
                        placeholder="Password"
                        type="password"
                        name="password"
                        v-validate="'required'">
                <div v-show="errors.has('password')"
                      class="invalid-feedback">
                  {{ errors.first('password') }}
                </div>
              </div>
              <div class="form-group">
                <input v-model="form.fields.passwordConfirmation"
                        class="form-control input-lg"
                        :class="{'is-invalid': errors.has('password') }"
                        placeholder="Password Confirmation"
                        type="password"
                        name="password"
                        v-validate="'confirmed:password'">
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input
                    v-model="form.fields.termsAccepted"
                    class="form-check-input"
                    :class="{'is-invalid': errors.has('terms') }"
                    type="checkbox"
                    name="terms"
                    v-validate="'required'"
                    required>
                  <label class="form-check-label" for="invalidCheck">
                    I agree to the <router-link to="/terms">terms and conditions</router-link>
                  </label>
                  <div v-show="errors.has('terms')"
                      class="invalid-feedback">
                    {{ errors.first('terms') }}
                  </div>
                </div>
              </div>
              <button
                class="btn btn-lg btn-primary btn-block"
                type="submit"
                v-bind:class="{ 'btn-loading': form.busy }"
                :disabled="form.busy"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { firebaseApp } from '../../../firebaseConfig';

export default {
  props: [],
  data() {
    return {
      form: {
        busy: false,
        fields: {
          email: '',
          password: '',
          passwordConfirmation: '',
          termsAccepted: false,
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
    register() {
      this.form.busy = true;
      if (this.form.fields.password !== this.form.fields.passwordConfirmation) {
        this.error.message = 'Passwords do not match.';
        this.form.busy = false;
      } else if (!this.form.fields.termsAccepted) {
        this.error.message = 'You must accept our terms and conditions.';
        this.form.busy = false;
      } else {
        firebaseApp.auth()
          .createUserWithEmailAndPassword(this.form.fields.email, this.form.fields.password)
          .then(() => {
            // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
            // const msg = {
            //   to: 'manu@redefyne.co',
            //   from: 'app@redefyne.co',
            //   subject: 'An eResident just registered',
            //   text: 'Just a test...',
            // };
            // sgMail.send(msg);
          }).catch((error) => {
            this.error.message = error.message;
            this.form.busy = false;
          });
      }
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
  },
};
</script>

<style lang="scss" scoped>

</style>
