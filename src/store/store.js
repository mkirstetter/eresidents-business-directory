import Vue from 'vue';
import Vuex from 'vuex';
import { db, firebaseApp } from '../firebaseConfig';

// eslint-disable-next-line
import { firebaseMutations, firebaseAction } from 'vuexfire';

Vue.use(Vuex);

// eslint-disable-next-line
export const store = new Vuex.Store({
  state: {
    currentUser: null,
    currentUserProfile: null,
    users: [],
    tags: [],
  },
  getters: {
    currentUser: state => state.currentUser,
    currentUserProfile: state => state.currentUserProfile,
    users: state => state.users,
    tags: state => state.tags,
  },
  mutations: {
    ...firebaseMutations,
    userStatus(state, user) {
      if (user) {
        state.currentUser = user;
      } else {
        state.currentUser = null;
      }
    },
    tagsStatus(state, users) {
      const tags = [];
      if (users) {
        users.forEach((user) => {
          if (user.services) {
            user.services.forEach((service) => {
              if (!tags.includes(service)) {
                tags.push(service);
              }
            });
          }
        });
        if (tags) {
          state.tags = tags;
        } else {
          state.tags = null;
        }
      }
    },
  },
  actions: {
    setTagsRef({ commit }, users) {
      commit('tagsStatus', users);
    },
    setUserRef({ commit }, user) {
      commit('userStatus', user);
    },
    setUserProfileRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
      bindFirebaseRef('currentUserProfile', ref);
    }),
    setUsersRef: firebaseAction(({ bindFirebaseRef }, { ref }) => {
      bindFirebaseRef('users', ref);
    }),
    updateProfile: (commit, user) => {
      firebaseApp.auth().currentUser.updateProfile({
        displayName: `${user.firstName} ${user.lastName}`,
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
      });
      db.ref(`users/${user.uid}`).set({
        firstName: user.firstName ? user.firstName : null,
        lastName: user.lastName ? user.lastName : null,
        contact: user.contact ? user.contact : null,
        company: user.company ? user.company : null,
        website: user.website ? user.website : null,
        services: user.services ? user.services : null,
        timezone: user.timezone ? user.timezone : null,
        description: user.description ? user.description : null,
        available: user.available ? user.available : false,
        valid: user.valid ? user.valid : false,
        createdAt: user.createdAt,
      });
    },
  },
});
