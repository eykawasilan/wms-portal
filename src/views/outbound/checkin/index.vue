<template>
  <b-row class="match-height">
    <b-col lg="12" md="12" sm="12">
      <b-card>
        <b-card-header>
          <b-row>
            <b-col lg="12" md="12" sm="12">
              <h2>Check In</h2>
            </b-col>
          </b-row>
        </b-card-header>

        <b-row class="match-height mb-3 mt-2">
          <b-col lg="6" md="6" sm="6">
            <ValidationObserver ref="form" #default="{ invalid }">
              <b-card-text>Please Enter Order Code</b-card-text>
              <b-form @submit.prevent>
                <b-row>
                  <b-col lg="9" md="9" class="ml-auto" style="float: right">
                    <ValidationProvider
                      #default="{ errors }"
                      name="Order Code"
                      :rules="rules.orderCode"
                    >
                      <b-form-group class="w-100">
                        <b-input-group class="w-100">
                          <b-form-input
                            id="orderCode"
                            v-model="model.orderCode"
                            class="w-100"
                            :state="errors.length > 0 ? false : null"
                            placeholder="Enter Order Code"
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
                      :disabled="invalid || loading.submit"
                      @click="onSubmit()"
                    >
                      Submit
                    </b-button>
                  </b-col>
                </b-row>
              </b-form>
            </ValidationObserver>
          </b-col>
        </b-row>

        <hr />
        <b-row>
          <b-col cols="12" class="mt-3">
            <b-table
              striped
              hover
              responsive
              :per-page="perPage"
              :items="items"
              :fields="fields"
            />
          </b-col>
        </b-row>
        <b-row class="match-height">
          <b-col lg="6" md="6" sm="6">
            <b-form-group class="mb-0">
              <label class="d-inline-block text-sm-left mr-50">Per page</label>
              <b-form-select
                id="perPageSelect"
                v-model="perPage"
                size="lg"
                :options="pageOptions"
                class="w-50"
                @change="onChangePerPage"
              />
            </b-form-group>
          </b-col>
          <b-col lg="6" md="6" sm="6">
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="right"
              size="lg"
              @change="onChangeCurrentPage"
            />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import moment from "moment";

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
        { key: "cus_order_no", label: "Customer Order No.", sortable: true },
        { key: "order_date", label: "Order Date", sortable: true },
        { key: "tracking_number", label: "Tracking Number", sortable: true },
        { key: "pl_logistic", label: "3pl Logistic", sortable: true },
        { key: "status", label: "Status", sortable: true },
      ],
      items: [],
      selected: null,
      options: null,
      loading: {
        submit: false,
      },
      rules: {
        orderCode: {
          required: true,
        },
      },
      model: {
        orderCode: "",
      },
    };
  },
  beforeMount() {
    this.getList({ page: this.currentPage, pageSize: this.perPage });
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    async getList({ page, pageSize }) {
      try {
        this.loading = true;

        const { data } = await this.$api.order.outbound.getList({
          page,
          pageSize,
        });

        if (typeof data === "object") {
          const { records, totalCount } = data;

          this.items = records.map((item) => {
            const orderDate = moment(item.order_date);

            return {
              id: item.id,
              cus_order_no: item.cus_order_no || "-",
              order_date: orderDate.isValid()
                ? orderDate.format("YYYY-MM-DD hh:mm:ss a")
                : "-",
              tracking_number: item.tracking_code || "-",
              pl_logistic: item.logistic_partner || "-",
              status: this.labels.order.status[item.status] || "-",
            };
          });

          this.totalRows = totalCount;
        }
      } finally {
        this.loading = false;
      }
    },
    onChangeCurrentPage(value) {
      this.getList({
        page: value,
        pageSize: this.perPage,
      });
    },
    onChangePerPage(value) {
      this.currentPage = 1;

      this.getList({
        page: this.currentPage,
        pageSize: value,
      });
    },
    async onSubmit() {
      try {
        const isValid = await this.$refs.form.validate();
        if (!isValid) return;
        this.busy = true;

        await this.$api.order.outbound.checkIn({
          orderCode: this.model.orderCode,
        });

        this.$toast.success(`${this.model.orderCode} check in success`);
        this.getList({ page: 1, pageSize: this.perPage });
      } finally {
        this.busy = false;
        this.model.orderCode = "";
      }
    },
  },
};
</script>
