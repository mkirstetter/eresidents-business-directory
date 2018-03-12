<template>
  <div class="container">
    <div class="row">
      <settings-menu></settings-menu>
      <div class="col-md-9">
        <div class="card">
          <div class="card-header">
            General Informations
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
              {{ success.message ? success.message : 'Your profile has been updated' }}
            </div>
            <form v-on:submit.prevent="updateProfile">
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">First Name</label>
                <div class="col-sm-6">
                  <input v-model="form.fields.firstName"
                          type="text"
                          class="form-control"
                          placeholder="Enter first name">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Last Name</label>
                <div class="col-sm-6">
                  <input v-model="form.fields.lastName"
                          type="text"
                          class="form-control"
                          placeholder="Enter last name">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Company</label>
                <div class="col-sm-6">
                  <input v-model="form.fields.company"
                          type="text"
                          class="form-control"
                          placeholder="Enter company">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Website</label>
                <div class="col-sm-6">
                  <input v-model="form.fields.website"
                          type="text"
                          class="form-control"
                          placeholder="Enter website">
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Services</label>
                <div class="col-sm-6">
                  <!-- <input-tag class="form-control"
                              :tags.sync="form.fields.services">
                  </input-tag> -->
                  <multi-select v-model="form.fields.services"
                                :options="tags"
                                :multiple="true"
                                :taggable="true"
                                :close-on-select="false"
                                :hide-selected="true"
                                @tag="addTag">
                  </multi-select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Timezone</label>
                <div class="col-sm-6">
                  <select v-model="form.fields.timezone" name="type" class="form-control">
                    <option value="0" selected disabled>Select a timezone</option>
                    <option v-for="(timezone, index) in timezones"
                            :value="timezone"
                            :key="index">
                      {{ timezone }}
                    </option>
                  </select>
                </div>
              </div>
              <div class="form-group row">
                <label class="col-sm-3 col-form-label">Description</label>
                <div class="col-sm-6">
                  <markdown-editor v-model="form.fields.description"
                                    ref="markdownEditor"
                                    :configs="form.editorConfigs">
                  </markdown-editor>
                  <!-- <textarea v-model="form.fields.description"
                            class="form-control"
                            placeholder="Enter a short description"
                            rows="8"></textarea> -->
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-6 offset-md-3">
                  <div class="form-check">
                    <input class="form-check-input"
                            type="checkbox"
                            id="available"
                            v-model="form.fields.available">
                    <label class="form-check-label" for="available">
                      <span data-toggle="tooltip"
                            data-placement="top"
                            title="Tooltip on top"
                            id="availableTooltip">
                        Available for work
                      </span>
                    </label>
                    <small class="form-text text-muted">
                      By selecting this you will be browsable by other users.
                    </small>
                  </div>
                </div>
              </div>
              <div class="form-group row" v-if="form.fields.available">
                <label class="col-sm-3 col-form-label">Contact</label>
                <div class="col-sm-6">
                  <input v-model="form.fields.contact"
                          type="text"
                          class="form-control"
                          placeholder="Enter contact details">
                  <small class="form-text text-muted">
                    It could be an Email or a link to a contact form..
                    If a link, please insert full link (with http).
                  </small>
                </div>
              </div>
              <div class="form-group row">
                <div class="col-sm-6 offset-md-3">
                  <button type="submit"
                          class="btn btn-primary"
                          v-bind:class="{ 'btn-loading': form.busy }"
                          :disabled="form.busy">
                    Update Profile
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
import moment from 'moment-timezone';
// import InputTag from 'vue-input-tag';
import MultiSelect from 'vue-multiselect';
import MarkdownEditor from 'vue-simplemde/src/markdown-editor';
import { mapGetters } from 'vuex';
import SettingsMenu from './Menu';

export default {
  props: [],
  data() {
    return {
      form: {
        busy: false,
        fields: {
          firstName: '',
          lastName: '',
          contact: '',
          company: '',
          website: '',
          services: [],
          description: '',
          timezone: 0,
          available: false,
          valid: false,
          uid: '',
          createdAt: '',
        },
        profile: '',
        editorConfigs: {
          toolbar: ['bold', 'italic'],
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
    if (this.currentUserProfile) {
      this.form.fields.firstName = this.currentUserProfile.firstName;
      this.form.fields.lastName = this.currentUserProfile.lastName;
      this.form.fields.contact = this.currentUserProfile.contact;
      this.form.fields.company = this.currentUserProfile.company;
      this.form.fields.website = this.currentUserProfile.website;
      this.form.fields.services = this.currentUserProfile.services;
      this.form.fields.timezone = this.currentUserProfile.timezone;
      this.form.fields.description = this.currentUserProfile.description;
      this.form.fields.available = this.currentUserProfile.available;
      if (this.currentUserProfile.valid === true) {
        this.form.fields.valid = this.currentUserProfile.valid;
      }
      if (this.currentUserProfile['.value'] === null) {
        this.success.message = 'Please fill in your profile! Thanks :)';
      }
    }
  },
  created() {
  },
  ready() {
  },
  methods: {
    updateProfile() {
      this.form.busy = true;
      setTimeout(() => {
        this.form.fields.uid = this.currentUser.uid;
        if (this.currentUserProfile.createdAt) {
          this.form.fields.updatedAt = new Date().toString();
        } else {
          this.form.fields.createdAt = new Date().toString();
        }
        this.$store.dispatch('updateProfile', this.form.fields);
        this.form.busy = false;
        this.success.message = 'Your profile has been updated';
      }, 2000);
    },
    addTag(tag) {
      if (this.form.fields.services) {
        this.form.fields.services.push(tag);
      } else {
        const tags = [];
        tags.push(tag);
        this.form.fields.services = tags;
      }
    },
  },
  computed: {
    ...mapGetters([
      'users',
      'tags',
      'currentUser',
      'currentUserProfile',
    ]),
    timezones() {
      return moment.tz.names();
    },
  },
  watch: {
  },
  components: {
    SettingsMenu,
    MultiSelect,
    MarkdownEditor,
    // InputTag,
  },
};
</script>

<style lang="scss" scoped>

</style>
