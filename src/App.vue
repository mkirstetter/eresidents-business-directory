<template>
  <div id="app">
    <ers-header></ers-header>
    <router-view/>
    <ers-footer></ers-footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import ErsHeader from './components/Header';
import ErsFooter from './components/Footer';
import { store } from './store/store';
// import { dbUsersRef } from './firebaseConfig';

export default {
  name: 'App',
  components: {
    ErsHeader,
    ErsFooter,
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'currentUser',
      'users',
    ]),
  },
  watch: {
    // If we have the users, we get the tags list in vuex store
    users() {
      if (this.users) {
        store.dispatch('setTagsRef', this.users);
      }
    },
  },
};
</script>

<style lang="scss">
@import '../node_modules/bootstrap/scss/bootstrap.scss';
@import '../node_modules/font-awesome/css/font-awesome.css';
@import '../node_modules/vue-multiselect/dist/vue-multiselect.min.css';
@import '../node_modules/simplemde/dist/simplemde.min.css';

.btn-loading {
  position: relative;
  pointer-events: none;
  color: transparent !important;

  &:after {
    animation: spinAround 500ms infinite linear;
    border: 2px solid $white;
    border-radius: 50%;
    border-right-color: transparent;
    border-top-color: transparent;
    content: "";
    display: block;
    height: 1em;
    width: 1em;
    position: absolute;
    left: calc(50% - (1em / 2));
    top: calc(50% - (1em / 2));
  }
}

@keyframes spinAround {
  from { transform: rotate(0deg); }
  to { transform: rotate(359deg); }
}

@media (min-width: 768px) {
  .form-group.row > .col-form-label {
    text-align: right;
  }
}
</style>
