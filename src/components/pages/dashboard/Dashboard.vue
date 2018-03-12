<template>
  <div class="container">
    <div class="row">
      <div class="col-md-3 mb-4">
        <div class="card">
          <div class="card-header">
            Filter by Services
          </div>
          <div class="card-body">
            <multi-select v-model="search.users.tags"
                          :options="tags"
                          :multiple="true"
                          :close-on-select="false"
                          :hide-selected="true">
            </multi-select>
          </div>
          <!-- <div class="card-body">
            <input type="text"
                    class="form-control"
                    v-model="search.users.text"
                    placeholder="Search Users">
          </div> -->
          <!-- <span class="badge badge-primary mr-1"
                v-for="tag in tags"
                :key="tag">
            {{ tag }}
          </span> -->
        </div>
      </div>
      <div class="col-md-9">
        <div class="card">
          <div class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="card-header">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Company</th>
                  <th scope="col">Services</th>
                  <th scope="col">Website</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="user in filteredUsers" :key="user.uid">
                  <td>{{ user.firstName }} {{ user.lastName.charAt(0) }}.</td>
                  <td>{{ user.company }}</td>
                  <td class="services">
                    <a href="#" class="badge badge-primary mr-1"
                          v-for="service in user.services"
                          :key="service"
                          @click="addSearchTag(service)">
                      {{ service }}
                    </a>
                  </td>
                  <td>
                    <a :href="`${user.website}?ref=erbd.redefyne.co`"
                        target="_blank">
                      {{ user.website }}
                    </a>
                  </td>
                  <td>
                    <button class="btn btn-outline-primary"
                            data-toggle="modal"
                            data-target="#showUser"
                            @click="showUser = user">
                      <i class="fa fa-eye"></i>
                    </button>
                  </td>
                </tr>
                <tr v-if="!filteredUsers.length">
                  <td colspan="5" class="text-center">Sorry, no results!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <show-user :user="showUser"></show-user>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import MultiSelect from 'vue-multiselect';
import ShowUser from './showUser';

export default {
  props: [],
  data() {
    return {
      search: {
        users: {
          text: '',
          tags: [],
        },
      },
      showUser: {},
    };
  },
  mounted() {
  },
  created() {
  },
  ready() {
  },
  methods: {
    searchUsers(users) {
      const activeUsers = this._.filter(users, { available: true });
      // this._.filter(users, { services: [{ name: 'Medium', present: true }] });
      const searchTags = this.search.users.tags;
      const searchResult = [];
      // if search tags entered
      if (searchTags.length > 0) {
        // Loop on each search tag
        searchTags.forEach((tag) => {
          // For each search tag we loop on each user
          activeUsers.forEach((user) => {
            // We get user services
            const userTags = user.services;
            // If search tag is in user tag
            if (userTags && userTags.includes(tag)) {
              // We add user in result if not already there
              if (!searchResult.includes(user)) {
                searchResult.push(user);
              }
            }
          });
        });
        return searchResult;
      }
      return activeUsers;
    },
    addSearchTag(tag) {
      const searchTags = this.search.users.tags;
      if (!searchTags.includes(tag)) {
        searchTags.push(tag);
      }
    },
  },
  computed: {
    ...mapGetters([
      'users',
      'tags',
      'currentUserProfile',
    ]),
    filteredUsers() {
      return this.searchUsers(this.users);
    },
  },
  watch: {
    currentUserProfile() {
      if (!this.currentUserProfile['.value'] && !this.currentUserProfile.firstName) {
        this.$router.push('/settings/profile');
      }
    },
  },
  components: {
    MultiSelect,
    ShowUser,
  },
};
</script>

<style lang="scss" scoped>
.table {
  margin-bottom: 0;
  .services {
    width: 100px;
  }
}
</style>
