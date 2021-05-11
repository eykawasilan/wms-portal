<template>
  <div class="navbar-container d-flex content align-items-center">
    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->

    <b-navbar-nav class="nav align-items-center ml-auto">
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ $store.getters["user/name"] }}
            </p>
            <span class="user-status">{{ role || "-" }}</span>
          </div>
          <b-avatar
            size="40"
            variant="light-primary"
            icon="user"
            class="badge-minimal"
            badge-variant="success"
          />
        </template>

        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout()"
        >
          <feather-icon size="16" icon="LogOutIcon" class="mr-50" />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import { USER_ROLE } from "@/enum/user";

export default {
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  computed: {
    role() {
      // this will be moved to a js file for mapping
      const roles = {
        [USER_ROLE.EPOST_USER]: "Epost User",
        [USER_ROLE.WAREHOUSE_ADMIN]: "Warehouse Admin",
        [USER_ROLE.WAREHOUSE_USER]: "Warehouse User",
        [USER_ROLE.CLIENT]: "Client",
      };

      return roles[this.$store.getters["user/role"]];
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("user/logout");
      this.$router.replace({
        name: "auth-login",
      });
    },
  },
};
</script>
