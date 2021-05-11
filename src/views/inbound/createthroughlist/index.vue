<template>
  <ValidationObserver ref="form">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <b-row class="match-height">
        <b-col lg="12" md="12" sm="12">
          <b-card>
            <b-card-header>
              <h2>Client Details</h2>
            </b-card-header>
            <b-row>
              <b-col md="4" sm="12">
                <b-form-group label="Inbound Date" label-for="inboundDate">
                  <ValidationProvider
                    #default="{ errors }"
                    name="Inbound date"
                    :rules="rules.inboundRequest.date"
                  >
                    <b-form-input
                      id="inboundDate"
                      v-model="model.inboundRequest.date"
                      type="date"
                      placeholder="DD/MM/YY"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
              <b-col md="4" sm="12">
                <b-form-group
                  label="Client Inbound Code"
                  label-for="inboundCode"
                >
                  <ValidationProvider
                    #default="{ errors }"
                    name="Client inbound code"
                    :rules="rules.inboundRequest.clientCode"
                  >
                    <b-form-input
                      id="inboundCode"
                      v-model="model.inboundRequest.clientCode"
                      placeholder="Enter Client Inbound Code"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
              <b-col md="4" sm="12">
                <b-form-group
                  label="Warehouse Location"
                  label-for="warehouseLocation"
                >
                  <ValidationProvider
                    #default="{ errors }"
                    name="Warehouse location"
                    :rules="rules.inboundRequest.warehouse"
                  >
                    <b-form-input
                      id="warehouseLocation"
                      v-model="model.inboundRequest.warehouse"
                      placeholder="Enter Warehouse Location"
                      :state="errors.length > 0 ? false : null"
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
      <b-row>
        <b-col lg="12" md="12" m="12">
          <b-card>
            <b-row>
              <b-col lg="4" md="4" sm="8" class="my-1">
                <b-form-group
                  label="Sort"
                  label-cols-sm="2"
                  label-align-sm="right"
                  label-size="default"
                  label-for="sortBySelect"
                  class="mb-0"
                >
                  <b-input-group size="default">
                    <b-form-select
                      id="sortBySelect"
                      v-model="sortBy"
                      :options="sortOptions"
                      class="w-50"
                    >
                      <template v-slot:first>
                        <option value="">-- none --</option>
                      </template>
                    </b-form-select>
                    <b-form-select
                      v-model="sortDesc"
                      size="default"
                      :disabled="!sortBy"
                      class="w-50"
                    >
                      <option :value="false">Asc</option>
                      <option :value="true">Desc</option>
                    </b-form-select>
                  </b-input-group>
                </b-form-group>
              </b-col>
              <b-col md="8" class="my-1" dir="">
                <b-form-group
                  label="Filter"
                  label-cols-sm="2"
                  label-align-sm="right"
                  label-size="default"
                  label-for="filterInput"
                  class="mb-0"
                >
                  <b-input-group size="sm">
                    <b-form-input
                      id="filterInput"
                      v-model="model.keyword"
                      type="search"
                      placeholder="Enter SKU to filter"
                      @keyup="onKeyUpKeyword"
                    />
                  </b-input-group>
                </b-form-group>
              </b-col>
            </b-row>
            <b-col cols="12">
              <b-table
                striped
                hover
                responsive
                :per-page="perPage"
                :current-page="currentPage"
                :items="items"
                :fields="fields"
              >
                <template #cell(amount)="data">
                  <b-form-group>
                    <ValidationProvider
                      #default="{ errors }"
                      name="Amount"
                      :vid="`${data.item.id}`"
                      :rules="rules.amount"
                    >
                      <b-form-input
                        v-model="data.item.amount"
                        placeholder="Enter Amount"
                        :state="errors.length > 0 ? false : null"
                      />
                      <small class="text-danger">{{ errors[0] }}</small>
                    </ValidationProvider>
                  </b-form-group>
                </template>
                <template #cell(status)="data">
                  <b-badge :variant="status[1][data.value]">
                    {{ status[0][data.value] }}
                  </b-badge>
                </template>
              </b-table>
            </b-col>
            <b-row class="match-height">
              <b-col lg="3" md="3" sm="3" class="mt-2">
                <b-form-group class="mb-0">
                  <label class="d-inline-block text-sm-left mr-50"
                    >Per page</label
                  >
                  <b-form-select
                    id="perPageSelect"
                    v-model="perPage"
                    size="default"
                    :options="pageOptions"
                    class="w-50"
                    @change="onChangePerPage"
                  />
                </b-form-group>
              </b-col>
              <b-col lg="6" md="6" sm="6" class="mt-2">
                <b-button variant="primary" @click="onCreateInboundRequest()"
                  >Create Inbound Request</b-button
                >
                <b-modal id="modal-scoped" centered>
                  <template>
                    <b-col class="text-center">
                      <h4>There is changes you haven't save.</h4>
                      <h4>Do you want to save it</h4>
                    </b-col>
                  </template>
                  <template #modal-footer="{ ok, cancel }">
                    <b-col md="4">
                      <b-button
                        size="default"
                        tag="router-link"
                        to="/inbound"
                        variant="secondary"
                        type="is-link"
                        class="w-100"
                      >
                        Do not Save and Exit
                      </b-button>
                    </b-col>
                    <b-col md="4">
                      <b-button
                        size="default"
                        variant="primary"
                        class="w-100"
                        @click="ok()"
                      >
                        Save and Exit
                      </b-button>
                    </b-col>
                    <b-col>
                      <b-button
                        size="default"
                        variant="secondary"
                        class="w-100"
                        @click="cancel()"
                      >
                        Stay on the page
                      </b-button>
                    </b-col>
                  </template>
                </b-modal>
              </b-col>
              <!-- modal vertical center -->
              <b-col lg="3" md="3" sm="3" class="mt-2">
                <b-pagination
                  v-model="currentPage"
                  :total-rows="totalRows"
                  :per-page="perPage"
                  align="right"
                  size="default"
                  class="my-50"
                  @change="onChangeCurrentPage"
                />
              </b-col>
            </b-row>
          </b-card>
        </b-col>
      </b-row>
    </div>
  </ValidationObserver>
</template>

<script>
import { TYPE } from "vue-toastification";

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
      fields: [
        {
          key: "id",
          label: "Id",
        },
        { key: "sku_id", label: "SKU No", sortable: true },
        { key: "product_name", label: "Product Name", sortable: true },
        "description",
        "category",
        "amount",
      ],
      items: [],
      model: {
        inboundRequest: {
          date: null,
          clientCode: null,
          warehouse: null,
        },
        keyword: undefined,
      },
      loading: {
        list: true,
      },
      rules: {
        amount: {
          required: true,
          numeric: true,
          min_value: 1,
        },
        inboundRequest: {
          date: {
            required: true,
          },
          clientCode: {
            required: true,
          },
          warehouse: {
            required: true,
          },
        },
      },
      timeout: {
        search: null,
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => ({ text: f.label, value: f.key }));
    },
  },
  beforeMount() {
    this.getList({
      page: this.currentPage,
      pageSize: this.perPage,
      skuId: this.model.keyword,
    });
  },
  beforeDestroy() {
    if (this.timeout.search != null) clearTimeout(this.timeout.search);
  },
  methods: {
    async getList({ page, pageSize, skuName = undefined }) {
      try {
        this.loading.list = true;

        const res = await this.$api.inventory.sku.getList({
          page,
          pageSize,
          skuName,
        });

        this.items = res?.data?.records.map((item) => ({
          id: item.id,
          sku_id: item.sku_code,
          product_name: item.sku_name,
          description: item.desc,
          category: item.category,
          amount: "",
        }));

        this.totalRows = res?.data?.totalCount;
      } finally {
        this.loading.list = false;
      }
    },
    onChangeCurrentPage(value) {
      this.getList({
        page: value,
        pageSize: this.perPage,
        skuId: this.model.keyword,
      });
    },
    onChangePerPage(value) {
      this.currentPage = 1

      this.getList({
        page: this.currentPage,
        pageSize: value,
        skuId: this.model.keyword,
      });
    },
    async onCreateInboundRequest() {
      const isValid = await this.$refs.form.validate();
      if (!isValid) return;

      const createResponse = await this.$api.inbound.createRequest({
        clientId: this.$store.state.inbound.clientID,
        clientIbNo: this.model.clientCode,
        toWarehouseId: this.model.warehouse,
        inboundDate: this.model.date,
      });

      const inboundID = createResponse?.data?.inboundRequest?.id;
      if (!inboundID) throw new Error("Inbound Request ID not found");

      await this.$api.inbound.createBulkItemRequest({
        requestId: inboundID,
        bulkData: this.items.map((item) => ({
          skuId: item.id,
          qty: item.amount,
        })),
      });

      this.$toast("Inbound Request Created", {
        type: TYPE.SUCCESS,
        timeout: 3000,
      });

      this.$store.commit("inbound/clientID", null);

      this.$router.replace({
        name: "inbound",
      });
    },
    onKeyUpKeyword(event) {
      const regex = new RegExp(/^Key[A-Z]{1}|Digit\d{1}|Minus$/);
      if (!regex.test(event.code)) return;
      if (this.timeout.search != null) clearTimeout(this.timeout.search);

      this.timeout.search = setTimeout(() => {
        this.getList({
          page: this.currentPage,
          pageSize: this.perPage,
          skuId: this.model.keyword,
        });
        this.timeout.search = null;
      }, 500);
    },
  },
};
</script>
