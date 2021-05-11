<template>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <b-row>
      <b-col lg="12" md="12" sm="12">
        <b-card>
          <b-card-body>
            <ValidationObserver ref="form" #default="{ invalid }">
              <b-form class="position-relative" @submit.prevent>
                <b-row>
                  <b-col md="6">
                    <h3>Create SKUs</h3>
                  </b-col>
                  <b-col md="3">
                    <label class="mr-1">Expire Date</label>
                    <b-form-checkbox v-model="model.expiry" switch inline />
                  </b-col>
                  <b-col md="3">
                    <label class="mr-1">Serial Number</label>
                    <b-form-checkbox v-model="model.serialCode" switch inline />
                  </b-col>
                </b-row>
                <b-row class="mt-5">
                  <b-col lg="3" md="3" sm="12">
                    <ValidationProvider
                      #default="{ errors }"
                      name="Manufacturing Barcode"
                      :rules="rules.barcode"
                    >
                      <b-form-group
                        label="Manufacturing Barcode"
                        label-for="barcode"
                      >
                        <b-input-group>
                          <b-form-input
                            id="manufacturing_barcode"
                            v-model="model.barcode"
                            :disabled="busy"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Manufacturing Barcode"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col lg="3" md="3" sm="12">
                    <ValidationProvider
                      #default="{ errors }"
                      name="Pallet UPM"
                      :rules="rules.palletUPM"
                    >
                      <b-form-group label="Pallet UPM" label-for="pallet_upm">
                        <b-input-group>
                          <b-form-input
                            id="pallet_upm"
                            v-model="model.palletUPM"
                            type="number"
                            :disabled="busy"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Pallet UPM"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col lg="3" md="3" sm="12">
                    <ValidationProvider
                      #default="{ errors }"
                      name="Item Name"
                      :rules="rules.itemName"
                    >
                      <b-form-group label="Item Name" label-for="item_name">
                        <b-input-group>
                          <b-form-input
                            id="item_name"
                            v-model="model.itemName"
                            :disabled="busy"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Item Name"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col lg="3" md="3" sm="12">
                    <ValidationProvider
                      #default="{ errors }"
                      name="Carton"
                      :rules="rules.carton"
                    >
                      <b-form-group label="Carton" label-for="carton">
                        <b-input-group>
                          <b-form-input
                            id="carton"
                            v-model="model.carton"
                            type="text"
                            :disabled="busy"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter carton"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col lg="3" md="3" sm="12">
                    <ValidationProvider
                      #default="{ errors }"
                      name="Item Description"
                      :rules="rules.itemDesc"
                    >
                      <b-form-group
                        label="Item Description"
                        label-for="item_description"
                      >
                        <b-input-group>
                          <b-form-input
                            id="item_description"
                            v-model="model.itemDesc"
                            :disabled="busy"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Item Description"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col lg="3" md="3" sm="12">
                    <ValidationProvider
                      #default="{ errors }"
                      name="Boxes UPM"
                      :rules="rules.boxesUPM"
                    >
                      <b-form-group label="Boxes UPM" label-for="boxes_upm">
                        <b-input-group>
                          <b-form-input
                            id="boxes_upm"
                            v-model="model.boxesUPM"
                            type="number"
                            :disabled="busy"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Item Description"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                  <b-col lg="3" md="3" sm="12">
                    <ValidationProvider
                      #default="{ errors }"
                      name="Category Name"
                      :rules="rules.category"
                    >
                      <b-form-group
                        label="Category Name"
                        label-for="category_name"
                      >
                        <b-input-group>
                          <b-form-input
                            id="category_name"
                            v-model="model.category"
                            :disabled="busy"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Category Name"
                          />
                        </b-input-group>
                        <small class="text-danger">{{ errors[0] }}</small>
                      </b-form-group>
                    </ValidationProvider>
                  </b-col>
                </b-row>
                <div class="d-flex justify-content-center mt-5">
                  <b-button
                    ref="submit"
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    :disabled="invalid"
                    @click="validate()"
                  >
                    Confirm
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
                          to="/user/warehouseuser"
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
      barcode: {
        required: true,
      },
      palletUPM: {
        required: true,
        numeric: true,
      },
      itemName: {
        required: true,
      },
      carton: {
        required: true,
        numeric: true,
      },
      itemDesc: {
        required: true,
      },
      boxesUPM: {
        required: true,
        numeric: true,
      },
      category: {
        required: true,
      },
    },
    model: {
      barcode: "",
      boxesUPM: "",
      carton: "",
      category: "",
      expiry: false,
      itemDesc: "",
      itemName: "",
      palletUPM: "",
      serialCode: false,
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
    async onSubmit() {
      try {
        await this.$api.inventory.sku.create({
          barcode: this.model.barcode,
          boxesUPM: this.model.boxesUPM,
          carton: this.model.carton,
          category: this.model.category,
          clientId: this.$store.state.sku.clientID,
          expiry: !this.model.expiry ? 0 : 1,
          itemDesc: this.model.itemDesc,
          itemName: this.model.itemName,
          palletUPM: this.model.palletUPM,
          serial_code: !this.model.serialCode ? 0 : 1,
        });

        this.$router.replace({
          name: "singleskudetail",
        });
      } catch (error) {
        this.busy = false;
      }
    },
  },
};
</script>
