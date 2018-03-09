<template>
  <div>
    <div class="modal fade"
          id="showUser"
          tabindex="-1"
          role="dialog"
          aria-labelledby="showUserModalLabel"
          aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="showUserModalLabel">
              {{ user.firstName }} {{ user.lastName}}
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Company</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">
                  {{ user.company }}
                </p>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Website</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">
                  {{ user.website }}
                </p>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Services</label>
              <div class="col-sm-9">
                <span class="badge badge-primary mr-1"
                        v-for="service in user.services"
                        :key="service">
                    {{ service }}
                  </span>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Timezone</label>
              <div class="col-sm-9">
                <p class="form-control-plaintext">
                  {{ user.timezone }}
                </p>
              </div>
            </div>
            <div class="form-group row">
              <label class="col-sm-3 col-form-label">Description</label>
              <div class="col-sm-9">
                <div class="form-control-plaintext"
                      v-html="getMarkdown(user.description)">
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">
              Close
            </button>
            <a :href="getLink(user)" class="btn btn-success" v-if="user.contact">
              Contact
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import marked from 'marked';

export default {
  props: ['user'],
  data() {
    return {
    };
  },
  mounted() {
  },
  created() {
  },
  ready() {
  },
  methods: {
    getLink(user) {
      if (user.contact && user.contact.includes('@')) {
        return `mailto:${user.contact}`;
      } else if (user.contact && !user.contact.includes('@')) {
        return user.contact;
      } return '#';
    },
    getMarkdown(text) {
      if (text) {
        return marked(text);
      } return '';
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
