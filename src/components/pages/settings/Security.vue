<template>
  <div class="container">
    <div class="row">
      <settings-menu></settings-menu>
      <div class="col-md-9">
        <div class="card">
          <div class="card-header">
            Security
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
            <form v-on:submit.prevent="updatePassword">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Current Password</label>
                <div class="col-sm-6">
                  <input v-model="form.fields.currentPassword"
                          type="password"
                          class="form-control"
                          placeholder="Enter current password">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Password</label>
                <div class="col-sm-6">
                  <input v-model="form.fields.newPassword"
                          class="form-control"
                          :class="{'is-invalid': errors.has('password') }"
                          type="password"
                          name="password"
                          placeholder="Enter new password"
                          v-validate="'required'">
                  <div v-show="errors.has('password')"
                      class="invalid-feedback">
                    {{ errors.first('password') }}
                  </div>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Confirm Password</label>
                <div class="col-sm-6">
                  <input v-model="form.fields.newPasswordConfirmation"
                          type="password"
                          class="form-control"
                          :class="{'is-invalid': errors.has('password') }"
                          placeholder="Confirm new password"
                          name="password"
                          v-validate="'confirmed:password'">
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-6 offset-md-3">
                  <button type="submit"
                          class="btn btn-primary"
                          v-bind:class="{ 'btn-loading': form.busy }"
                          :disabled="form.busy">
                    Update Password
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsMenu from './Menu';
import { firebaseApp } from '../../../firebaseConfig';

export default {
  props: [],
  data() {
    return {
      form: {
        busy: false,
        fields: {
          currentPassword: null,
          newPassword: null,
          newPasswordConfirmation: null,
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
    updatePassword() {
      this.form.busy = true;
      if (this.form.fields.newPassword !== this.form.fields.newPasswordConfirmation) {
        this.error.message = 'Passwords do not match.';
        this.form.busy = false;
      } else if (!this.form.fields.newPassword || !this.form.fields.currentPassword) {
        this.error.message = 'Fields can not be blank.';
        this.form.busy = false;
      } else {
        firebaseApp.auth().currentUser.updatePassword(this.form.fields.newPassword).then(() => {
          this.success.message = 'Your password has been updated.';
          this.form.busy = false;
          this.form.fields.currentPassword = null;
          this.form.fields.newPassword = null;
          this.form.fields.newPasswordConfirmation = null;
        }).catch((error) => {
          this.error.message = error.message;
          this.form.busy = false;
        });
      }
    },
  },
  computed: {
  },
  watch: {
  },
  components: {
    SettingsMenu,
  },
};
</script>

<style lang="scss" scoped>

</style>
