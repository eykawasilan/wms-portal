<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">
      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <h2 class="brand-text text-primary ml-1">Epost</h2>
        </b-link>

        <b-card-title class="mb-1"> Welcome to Epost </b-card-title>
        <b-card-text class="mb-2">
          Please sign-in to your account and start the adventure
        </b-card-text>

        <!-- form -->
        <ValidationObserver ref="form" #default="{ invalid }">
          <b-form class="auth-login-form mt-2" @submit.prevent>
            <!-- email -->
            <b-form-group label-for="email" label="Email">
              <ValidationProvider
                #default="{ errors }"
                name="Email"
                :rules="rules.email"
              >
                <b-form-input
                  id="email"
                  v-model="userEmail"
                  name="login-email"
                  :state="errors.length > 0 ? false : null"
                  placeholder="john@example.com"
                  autofocus
                />
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </b-form-group>

            <!-- password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="password">Password</label>
                <b-link :to="{ name: 'forgot-password' }">
                  <small>Forgot Password?</small>
                </b-link>
              </div>
              <ValidationProvider
                #default="{ errors }"
                name="Password"
                :rules="rules.password"
              >
                <b-input-group
                  class="input-group-merge"
                  :class="errors.length > 0 ? 'is-invalid' : null"
                >
                  <b-form-input
                    id="password"
                    v-model="password"
                    :type="passwordFieldType"
                    class="form-control-merge"
                    :state="errors.length > 0 ? false : null"
                    name="login-password"
                    placeholder="Password"
                  />

                  <b-input-group-append is-text>
                    <feather-icon
                      class="cursor-pointer"
                      :icon="passwordToggleIcon"
                      @click="togglePasswordVisibility"
                    />
                  </b-input-group-append>
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </ValidationProvider>
            </b-form-group>

            <!-- checkbox -->
            <b-form-group>
              <b-form-checkbox
                id="remember-me"
                v-model="status"
                name="checkbox-1"
              >
                Remember Me
              </b-form-checkbox>
            </b-form-group>

            <!-- submit button -->
            <b-button
              variant="primary"
              block
              type="button"
              :disabled="invalid"
              @click="onLogin"
            >
              <template v-if="!loading"> Sign In </template>
              <template v-else>
                <b-spinner label="Spinning" />
              </template>
            </b-button>
          </b-form>
        </ValidationObserver>
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>
import { togglePasswordVisibility } from "@core/mixins/ui/forms";

export default {
  mixins: [togglePasswordVisibility],
  data() {
    return {
      userEmail: "",
      password: "",
      status: "",
      rules: {
        email: {
          required: true,
          email: true,
        },
        password: {
          required: true,
        },
      },
      loading: false,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  methods: {
    async onLogin() {
      const isValid = await this.$refs.form.validate();
      if (!isValid) return;

      try {
        this.loading = true;
        await this.$store.dispatch("user/login", {
          email: this.userEmail,
          password: this.password,
        });
        this.$router.replace({
          name: "dashboard",
        });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
