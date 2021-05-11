<template>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <b-row>
      <b-col
        lg="12"
        md="12"
        sm="12"
      >
        <b-card>
          <b-card-body>
            <b-form
              class="position-relative"
              @submit.prevent="onSubmit"
            >
              <b-form-group
                label="User Name"
                label-for="user-name"
                label-cols-lg="2"
              >
                <b-input-group>
                  <b-form-input
                    id="user-name"
                    :disabled="busy"
                    placeholder="Enter User Name"
                  />
                </b-input-group>
              </b-form-group>
              <b-form-group
                label="Email"
                label-for="email"
                label-cols-lg="2"
              >
                <b-input-group>
                  <b-form-input
                    id="email"
                    type="email"
                    :disabled="busy"
                    placeholder="Enter Email"
                  />
                </b-input-group>
              </b-form-group>
              <b-form-group
                label="Location"
                label-for="location"
                label-cols-lg="2"
              >
                <b-input-group>
                  <b-form-input
                    id="location"
                    type="location"
                    :disabled="busy"
                    placeholder="Enter Location"
                  />
                </b-input-group>
              </b-form-group>
              <b-form-group
                label="Start Date"
                label-for="start_date"
                label-cols-lg="2"
              >
                <b-input-group>
                  <b-form-input
                    id="start_date"
                    type="date"
                    :disabled="busy"
                    placeholder="DDMMYYYY"
                  />
                </b-input-group>
              </b-form-group>
              <b-form-group
                label="Phone Number"
                label-for="phone_no"
                label-cols-lg="2"
              >
                <b-input-group>
                  <b-form-input
                    id="phone_no"
                    type="number"
                    :disabled="busy"
                    placeholder="Enter Your Phone Number"
                  />
                </b-input-group>
              </b-form-group>
              <div class="d-flex justify-content-center">
                <b-button
                  ref="submit"
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  type="submit"
                  :disabled="busy"
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
                    <b-icon
                      icon="cloud-upload"
                      font-scale="4"
                    />
                    <div class="mb-3">
                      Processing...
                    </div>
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
                    <p><strong id="form-confirm-label">Are you sure?</strong></p>
                    <div class="d-flex">
                      <b-button
                        v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                        variant="outline-danger"
                        class="mr-3"
                        @click="onCancel"
                      >
                        Cancel
                      </b-button>
                      <b-button
                        v-ripple.400="'rgba(40, 199, 111, 0.15)'"
                        variant="outline-success"
                        @click="onOK"
                      >
                        OK
                      </b-button>
                    </div>
                  </div>
                </template>
              </b-overlay>
            </b-form>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BButton,
  BOverlay,
  BForm,
  BProgress,
  BIcon,
  BFormGroup,
  BInputGroup,
  BFormInput,
  BRow,
  BCol,
  BCard,
  BCardBody,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BOverlay,
    BForm,
    BProgress,
    BIcon,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BRow,
    BCol,
    BCard,
    BCardBody,
  },
  directives: {
    Ripple,
  },
  data: () => ({
    busy: false,
    processing: false,
    counter: 1,
    interval: null,
  }),
  beforeDestroy() {
    this.clearInterval()
  },
  methods: {
    clearInterval() {
      if (this.interval) {
        clearInterval(this.interval)
        this.interval = null
      }
    },
    onShown() {
      // Focus the dialog prompt
      this.$refs.dialog.focus()
    },
    onHidden() {
      // In this case, we return focus to the submit button
      // You may need to alter this based on your application requirements
      this.$refs.submit.focus()
    },
    onSubmit() {
      this.processing = false
      this.busy = true
    },
    onCancel() {
      this.busy = false
    },
    onOK() {
      this.counter = 1
      this.processing = true
      // Simulate an async request
      this.clearInterval()
      this.interval = setInterval(() => {
        if (this.counter < 20) {
          this.counter += 1
        } else {
          this.clearInterval()
          this.$nextTick(() => {
            // eslint-disable-next-line
            this.busy = this.processing = false
          })
        }
      }, 350)
    },
  },
}
</script>
