<template>
  <div class="col-md-4">
    <div class="card">
      <div class="card-header">
        Settings
      </div>
      <div class="list-group list-group-flush">
        <router-link
          to="/settings/profile"
          class="list-group-item list-group-item-action"
        >
          Profile
        </router-link>
        <router-link
          to="/settings/security"
          class="list-group-item list-group-item-action"
        >
          Security
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
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
  },
  computed: {
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>

</style>
