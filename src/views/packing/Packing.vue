<template>
  <b-row class="match-height">
    <b-col lg="12" md="12" sm="12">
      <b-card>
        <b-card-header>
          <b-row>
            <b-col lg="8" md="8" sm="8">
              <h2>Packing List</h2>
            </b-col>
            <b-col lg="4" md="4" sm="4" class="ml-auto">
              <b-button
                tag="router-link"
                to="/packing/packinghistory"
                variant="primary"
                type="is-link"
              >
                History
              </b-button>
            </b-col>
          </b-row>
        </b-card-header>
        <template v-if="options == null"> Loading Clients... </template>
        <template v-else>
          <b-row class="match-height mb-3 mt-2">
            <b-col lg="3" md="3" sm="3">
              <b-card-text>Select Client Name</b-card-text>
              <b-form-select v-model="selected" :options="options" />
            </b-col>
            <b-col lg="7" md="7" sm="7" class="ml-auto">
              <ValidationObserver ref="form" #default="{ invalid }">
                <b-card-text>Please Key-In Tray Code</b-card-text>
                <b-form @submit.prevent>
                  <b-row>
                    <b-col lg="9" md="9" class="ml-auto" style="float: right">
                      <ValidationProvider
                        #default="{ errors }"
                        name="Tray Code"
                        :rules="rules.trayname"
                      >
                        <b-form-group class="w-100">
                          <b-input-group class="w-100">
                            <b-form-input
                              id="trayname"
                              v-model="model.trayname"
                              class="w-100"
                              :disabled="busy"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Enter Tray Code"
                            />
                          </b-input-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                    <b-col lg="3" md="3" sm="3" class="ml-auto w-100">
                      <b-button
                        ref="submit"
                        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                        class="w-100"
                        type="submit"
                        :disabled="invalid"
                        @click="onSubmitTrayCode()"
                      >
                        Submit
                      </b-button>
                    </b-col>
                  </b-row>
                </b-form>
              </ValidationObserver>
            </b-col>
          </b-row>

          <template v-if="loading.trayCode">Loading Order...</template>
          <template v-if="loaded.trayCode">
            <hr />
            <b-row>
              <b-col lg="3" class="mt-2">
                <b-form-group label="Tray Code" label-for="readOnlyInput">
                  <b-form-input v-model="model.trayname" value=" " readonly />
                </b-form-group>
              </b-col>
              <b-col lg="2" class="mt-2">
                <b-form-group label="Pick By" label-for="readOnlyInput">
                  <b-form-input value=" " readonly />
                </b-form-group>
              </b-col>
              <b-col cols="12" class="mt-3">
                <b-table
                  striped
                  hover
                  responsive
                  :items="items"
                  :fields="fields"
                >
                  <template #cell(order_item)="data">
                    {{ data.item.skuName }}
                    <br />
                    <small style="opacity: 0.8">{{ data.item.skuCode }}</small>
                  </template>
                </b-table>
              </b-col>
            </b-row>
            <b-col lg="6" md="6" sm="6" class="ml-auto mr-auto">
              <b-row class="mt-5">
                <b-col lg="6" md="6" sm="6">
                  <b-button v-b-modal.modal-dark variant="danger" block>
                    Dispute
                  </b-button>
                </b-col>
                <b-modal
                  ref="disputeModal"
                  id="modal-dark"
                  modal-class="modal-dark"
                  centered
                  size="sm"
                  title="Dispute Reason"
                >
                  <b-form-group label="Please Choose One Reason">
                    <b-form-radio-group
                      v-model="model.disputeReason"
                      :options="disputeReasons"
                      name="dispute-reason"
                      stacked
                    />
                    <b-form-textarea
                      v-model="model.remarks"
                      id="textarea-rows"
                      placeholder="Comment"
                      rows="8"
                      class="mt-2"
                    />
                  </b-form-group>

                  <template #modal-footer>
                    <b-btn
                      :disabled="loading.dispute"
                      @click="onSubmitDispute()"
                      >Submit</b-btn
                    >
                  </template>
                </b-modal>
                <b-col lg="6" md="6" sm="6">
                  <b-button
                    tag="router-link"
                    :to="`/packing/packingprint/${model.trayname}/${orderId}`"
                    variant="primary"
                    type="is-link"
                    block
                    :disabled="invalid"
                  >
                    Complete
                  </b-button>
                </b-col>
              </b-row>
            </b-col>
          </template>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
      fields: [
        {
          key: "id",
          label: "Id",
        },
        { key: "order_item", label: "Order Item", sortable: true },
        "quantity",
      ],
      items: [],
      selected: null,
      options: null,
      disputeReasons: [
        { text: "Item Damaged", value: "Item Damaged" },
        { text: "Wrong Item", value: "Wrong Item" },
        { text: "Wrong Quantity", value: "Wrong Quantity" },
      ],
      rules: {
        trayname: {
          required: true,
        },
      },
      model: {
        disputeReason: "Item Damaged",
        trayname: "",
        remarks: "",
      },
      loading: {
        dispute: false,
        trayCode: false,
      },
      loaded: {
        trayCode: false,
      },
      order: {},
      orderId: null,
    };
  },
  async beforeMount() {
    const res = await this.$api.client.getUserList({ page: 1, pageSize: 100 });
    this.options = res?.data?.records.map((item) => ({
      text: item.name,
      value: item.id,
    }));
    this.selected = this.options[0]?.value;
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    async getOrderByTrayCode() {
      const { data } = await this.$api.order.getOrderByTrayCode({
        trayCode: this.model.trayname,
      });

      if (typeof data === "object") {
        const { orderData } = data;

        this.orderId = orderData?.id;
        this.items = orderData?.order_item.map((item) => ({
          id: item.id,
          order_item: item.sku?.sku_code,
          skuCode: item.sku?.sku_code,
          skuName: item.sku?.sku_name,
          quantity: item.qty,
        }));
      }
    },
    async onSubmitDispute() {
      try {
        this.loading.dispute = true;
        await this.$api.order.createDispute({
          orderId: this.orderId,
          type: 2,
          reason: this.model.disputeReason,
          remarks: this.model.remarks,
        });
        this.$toast.success("Create dispute success");
        this.$refs.disputeModal.hide();
      } catch (error) {
        this.loading.dispute = false;
      }
    },
    async onSubmitTrayCode() {
      try {
        this.loading.trayCode = true;
        await this.getOrderByTrayCode();
        this.loaded.trayCode = true;
      } catch (error) {
        this.loaded.trayCode = false;
      } finally {
        this.loading.trayCode = false;
      }
    },
  },
};
</script>
