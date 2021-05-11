<template>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <b-row>
      <b-col lg="12" md="12" sm="12">
        <b-card>
          <b-card-body>
            <ValidationObserver ref="form" #default="{ invalid }">
              <b-form class="position-relative" @submit.prevent>
                <ValidationProvider
                  #default="{ errors }"
                  name="Name"
                  :rules="rules.name"
                >
                  <b-form-group label="Name" label-for="name" label-cols-lg="2">
                    <b-input-group>
                      <b-form-input
                        id="name"
                        v-model="model.name"
                        :disabled="busy"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter Name"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  #default="{ errors }"
                  name="Password"
                  :rules="rules.password"
                >
                  <b-form-group
                    label="Password"
                    label-for="password"
                    label-cols-lg="2"
                  >
                    <b-input-group>
                      <b-form-input
                        id="password"
                        v-model="model.password"
                        :type="passwordFieldType"
                        :disabled="busy"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter password"
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
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  #default="{ errors }"
                  name="Email"
                  :rules="rules.email"
                >
                  <b-form-group
                    label="Email"
                    label-for="email"
                    label-cols-lg="2"
                  >
                    <b-input-group>
                      <b-form-input
                        id="email"
                        v-model="model.email"
                        :disabled="busy"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter Email"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  #default="{ errors }"
                  name="Name"
                  :rules="rules.startDate"
                >
                  <b-form-group
                    label="Start Date"
                    label-for="start_date"
                    label-cols-lg="2"
                  >
                    <b-input-group>
                      <b-form-input
                        id="start_date"
                        v-model="model.startDate"
                        :disabled="busy"
                        type="date"
                        :state="errors.length > 0 ? false : null"
                        placeholder="DDMMYYYY"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </ValidationProvider>
                <ValidationProvider
                  #default="{ errors }"
                  name="Phone number"
                  :rules="rules.phone"
                >
                  <b-form-group
                    label="Phone Number"
                    label-for="phone_no"
                    label-cols-lg="2"
                  >
                    <b-input-group>
                      <b-form-input
                        id="phone_no"
                        v-model="model.phone"
                        type="number"
                        :disabled="busy"
                        :state="errors.length > 0 ? false : null"
                        placeholder="Enter Your Phone Number"
                      />
                    </b-input-group>
                    <small class="text-danger">{{ errors[0] }}</small>
                  </b-form-group>
                </ValidationProvider>
                <div class="d-flex justify-content-center">
                  <b-button
                    ref="submit"
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    :disabled="invalid"
                    @click="validate()"
                  >
                    Submit
                  </b-button>
                </div>
                <b-overlay
                  :show="busy"
                  no-wrap
                  @shown="onShown"
                  @hidden="onHidden"
                >
                  <template v-slot:overlay>
                    <div
                      v-if="processing"
                      class="text-center p-4 bg-primary text-light rounded"
                    >
                      <b-icon icon="cloud-upload" font-scale="4" />
                      <div class="mb-3">Processing...</div>
                      <b-progress
                        min="1"
                        max="20"
                        :value="counter"
                        variant="success"
                        height="3px"
                        class="mx-n4 rounded-0"
                      />
                    </div>
                    <div
                      v-else
                      ref="dialog"
                      tabindex="-1"
                      role="dialog"
                      aria-modal="false"
                      aria-labelledby="form-confirm-label"
                      class="text-center p-3"
                    >
                      <p>
                        <strong id="form-confirm-label">Are you sure?</strong>
                      </p>
                      <div class="d-flex">
                        <b-button
                          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                          tag="router-link"
                          to="/user/clientuser"
                          variant="outline-danger"
                          class="mr-3"
                          @click="onCancel"
                        >
                          Cancel
                        </b-button>
                        <b-button
                          v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                          type="button"
                          variant="outline-success"
                          @click="onSubmit()"
                        >
                          OK
                        </b-button>
                      </div>
                    </div>
                  </template>
                </b-overlay>
              </b-form>
            </ValidationObserver>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Ripple from "vue-ripple-directive";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";

export default {
  directives: {
    Ripple,
  },
  mixins: [togglePasswordVisibility],
  data: () => ({
    busy: false,
    processing: false,
    counter: 1,
    interval: null,
    rules: {
      email: {
        required: true,
        email: true,
      },
      phone: {
        required: true,
      },
      startDate: {
        required: true,
      },
      password: {
        required: true,
      },
      name: {
        required: true,
      },
    },
    model: {
      email: "",
      phone: "",
      startDate: null,
      password: "",
      name: "",
    },
  }),
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
  },
  beforeDestroy() {
    this.clearInterval();
  },
  methods: {
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
    },
    onShown() {
      // Focus the dialog prompt
      this.$refs.dialog.focus();
    },
    onHidden() {
      // In this case, we return focus to the submit button
      // You may need to alter this based on your application requirements
      this.$refs.submit.focus();
    },
    async validate() {
      const isValid = await this.$refs.form.validate();
      if (!isValid) return;
      this.processing = false;
      this.busy = true;
    },
    onCancel() {
      this.busy = false;
    },
    async onSubmit() {
      try {
        await this.$api.client.addUser({
          companyId: this.$store.getters["user/companyId"],
          name: this.model.name,
          email: this.model.email,
          password: this.model.password,
          location: this.model.location,
          phoneCode: this.model.phoneCode,
          phoneNo: this.model.phone,
          startDate: this.model.startDate,
        });

        this.$router.replace({
          name: "clientuser",
        });
      } catch (error) {
        this.busy = false;
      }
    },
  },
};
</script>
