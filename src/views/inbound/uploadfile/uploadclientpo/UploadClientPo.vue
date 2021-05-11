<template>
  <b-card title="">
    <b-card-text>Select Client Name</b-card-text>
    <b-row>
      <b-col
        xl="8"
        md="8"
        sm="12"
      >
        <b-col
          md="12"
          class="mt-3"
        >
          <b-row>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <b-form-select
                v-model="selected"
                :options="options"
              />
            </div>
            <div class="col-lg-6">
              <b-button
                tag="router-link"
                to="/inbound/uploadfile"
                variant="primary"
                type="is-link"
                block
                :disabled="invalid"
              >
                P0-094745854 Uploaded
              </b-button>
            </div>
          </b-row>
        </b-col>
      </b-col>
      <b-col
        xl="4"
        md="4"
        sm="12"
        align="right"
      >
        <b-col md="12">
          <b-card-text><strong>PRG-SJD-10293767495</strong></b-card-text>
          <b-card-text>Inbound Request Number</b-card-text>
        </b-col>
        <b-col
          md="12"
          class="mt-4"
        >
          <b-card-text><strong>PRG-SJD-10293767495</strong></b-card-text>
          <b-card-text>Inbound Request Number</b-card-text>
        </b-col>
      </b-col>
    </b-row>
    <ValidationObserver ref="form" #default="{ invalid }">
      <b-form class="position-relative" @submit.prevent>
        <b-row>
          <b-col
            lg="12"
            md="12"
            sm="12"
            class="mb-5"
            style="font-weight:700"
          >
            Fill in before proceed
          </b-col>
          <b-col lg="6" md="6" sm="12">
            <ValidationProvider
              #default="{ errors }"
              name="Client PO Number"
              :rules="rules.poNumber"
            >
              <b-form-group
                label="Client PO Number"
                label-for="po_number"
              >
                <b-input-group>
                  <b-form-input
                    id="po_number"
                    v-model="model.poNumber"
                    :disabled="busy"
                    :state="errors.length > 0 ? false : null"
                    placeholder="Enter Client PO Number"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <b-col lg="6" md="6" sm="12">
            <ValidationProvider
              #default="{ errors }"
              name="Inbound Date"
              :rules="rules.inboundDate"
            >
              <b-form-group
                label="Inbound Date"
                label-for="inbound_date"
              >
                <b-input-group>
                  <b-form-input
                    id="inbound_date"
                    v-model="model.inboundDate"
                    :disabled="busy"
                    type="date"
                    :state="errors.length > 0 ? false : null"
                    placeholder="DDMMYYYY"
                  />
                </b-input-group>
                <small class="text-danger">{{ errors[0] }}</small>
              </b-form-group>
            </ValidationProvider>
          </b-col>
          <!-- submit and reset -->
          <div class="d-flex justify-content-center mt-5">
            <b-col lg="12" md="12" sm="12">
              <b-button
                ref="submit"
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                to="/inbound/uploadfile/statusupload"
                type="submit"
                variant="primary"
                class=""
                :disabled="invalid"
                @click="validate()"
              >
                Confirm
              </b-button>
            </b-col>
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
                    variant="outline-danger"
                    class="mr-3"
                    @click="onCancel"
                  >
                    Cancel
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                    tag="router-link"
                    to="/sku/singlesku/singleskudetail"
                    type="button"
                    variant="outline-success"
                  >
                    OK
                  </b-button>
                </div>
              </div>
            </template>
          </b-overlay>
        </b-row>
      </b-form>
    </ValidationObserver>
  </b-card>
</template>

<script>
import Ripple from "vue-ripple-directive";

export default {
  directives: {
    Ripple,
  },
  data: () => ({
    busy: false,
    processing: false,
    counter: 1,
    interval: null,
    rules: {
      poNumber: {
        required: true,
      },
      inboundDate: {
        required: true,
      },
    },
    model: {
      poNumber: "",
      inboundDate: null,
    },
  }),
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
  },
};
</script>
<style>

</style>
