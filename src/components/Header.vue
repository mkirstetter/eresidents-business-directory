<template>
  <header class="container mb-5">
    <nav class="navbar navbar-expand-lg navbar-light">
      <router-link to="/" class="navbar-brand">eResidents Business Directory</router-link>
      <button class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNavDropdown"
              aria-controls="navbarNavDropdown"
              aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavDropdown">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" v-if="currentUser">
            <router-link to="/dashboard"
                          class="nav-link d-lg-none"
                          data-toggle="collapse"
                          data-target=".navbar-collapse">
              Dashboard
            </router-link>
            <router-link to="/dashboard"
                          class="nav-link d-none d-lg-block">
              Dashboard
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav" v-if="currentUser">
          <!-- <router-link
            to="/admin/jobs/create"
            class="btn btn-outline-primary mr-4"
          >
            Post a Gig
          </router-link> -->
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false">
              {{ currentUser.displayName ? currentUser.displayName : currentUser.email }}
            </a>
            <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
              <router-link to="/settings/profile"
                            class="dropdown-item d-lg-none"
                            data-toggle="collapse"
                            data-target=".navbar-collapse">
                Settings
              </router-link>
              <router-link to="/settings/profile"
                            class="dropdown-item d-none d-lg-block">
                Settings
              </router-link>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item"
                  href="#"
                  @click="logout"
                  data-toggle="collapse"
                  data-target=".navbar-collapse">
                Logout
              </a>
            </div>
          </li>
        </ul>
        <ul class="navbar-nav" v-else>
          <!-- <router-link
            to="/admin/jobs/create"
            class="btn btn-outline-primary mr-4"
          >
            Post a Gig
          </router-link> -->
          <li class="nav-item">
            <router-link to="/login" class="nav-link">Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">Register</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import { firebaseApp } from '../firebaseConfig';

export default {
  props: [],
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
    logout() {
      firebaseApp.auth().signOut().then(() => {
        this.$router.push('/');
      }).catch(error => error);
    },
  },
  computed: {
    currentUser() {
      return this.$store.getters.currentUser;
    },
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>

</style>
