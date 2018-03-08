<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="card">
          <div class="card-header">
            Password Reset
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
            <div class="alert alert-success" v-if="success.message">
              <button type="button"
                      class="close"
                      @click="success.message = null">
                <span aria-hidden="true">&times;</span>
              </button>
              {{ success.message ? success.message : 'Oops, something went wrong.' }}
            </div>
            <form v-on:submit.prevent="resetPassword">
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
              <button class="btn btn-lg btn-primary btn-block"
                      type="submit"
                      v-bind:class="{ 'btn-loading': form.busy }"
                      :disabled="form.busy">
                Reset Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { firebaseApp } from '../../../firebaseConfig';

export default {
  props: [],
  data() {
    return {
      form: {
        busy: false,
        fields: {
          email: '',
        },
      },
      error: {
        message: null,
      },
      success: {
        message: null,
      },
    };
  },
  mounted() {
  },
  created() {
  },
  ready() {
  },
  methods: {
    resetPassword() {
      this.form.busy = true;
      const email = this.form.fields.email;

      firebaseApp.auth().sendPasswordResetEmail(email).then(() => {
        this.success.message = 'An email has been sent to you.';
        this.form.busy = false;
      }).catch((error) => {
        this.error.message = error.message;
        this.form.busy = false;
      });
    },
  },
  computed: {
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>

</style>
