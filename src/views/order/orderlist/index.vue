<template>
  <b-card>
    <b-row class="match-height">
      <b-col lg="12" md="12" sm="12" class="mt-3">
        <h2>List Order</h2>
      </b-col>
    </b-row>
    <b-row>
      <b-col md="4" sm="8" class="my-1">
        <b-form-group
          label="Sort"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="sortBySelect"
          class="mb-0"
        >
          <b-input-group size="sm">
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
              size="sm"
              :disabled="!sortBy"
              class="w-50"
            >
              <option :value="false">Asc</option>
              <option :value="true">Desc</option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="6" class="my-1">
        <b-form-group
          label="Filter"
          label-cols-sm="3"
          label-align-sm="right"
          label-size="sm"
          label-for="filterInput"
          class="mb-0"
        >
          <b-input-group size="sm">
            <b-form-input
              id="filterInput"
              v-model="filter"
              type="search"
              placeholder="Type to Search"
            />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">
                Clear
              </b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col cols="12">
        <b-table
          striped
          hover
          responsive
          :busy="loading"
          :per-page="perPage"
          :items="items"
          :fields="fields"
        >
          <template #table-busy>
            <div class="text-center my-2">
              <b-spinner class="align-middle mr-2" />
              <strong>Loading...</strong>
            </div>
          </template>
        </b-table>
      </b-col>
      <b-col md="2" sm="4" class="my-1">
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
      <b-col md="10" sm="8" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="right"
          size="lg"
          class="my-50"
          @change="onChangeCurrentPage"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 0,
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
        { key: "ship_date", label: "Shipment Date", sortable: true },
        { key: "status", label: "Status", sortable: true },
      ],
      items: [],
      keyword: undefined,
      loading: true,
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
      cusOrderNo: this.keyword,
    });
  },
  methods: {
    async getList({
      page,
      pageSize,
      orderId = undefined,
      clientId = undefined,
      cusOrderNo = undefined,
    }) {
      try {
        this.loading = true;

        const res = await this.$api.order.getList({
          page,
          pageSize,
          orderId,
          clientId,
          cusOrderNo,
        });

        this.items = res?.data?.records.map((item) => {
          const orderDate = moment(item.order_date);
          const shipDate = moment(item.ship_date);

          return {
            id: item.id,
            cus_order_no: item.cus_order_no,
            order_date: !orderDate.isValid()
              ? "-"
              : orderDate.format("YYYY-MM-DD hh:mm:ss a"),
            ship_date: !shipDate.isValid()
              ? "-"
              : shipDate.format("YYYY-MM-DD hh:mm:ss a"),
            status: this.labels.order.status[item.status],
          };
        });

        this.totalRows = res?.data?.totalCount;
      } finally {
        this.loading = false;
      }
    },
    onChangeCurrentPage(value) {
      this.getList({
        page: value,
        pageSize: this.perPage,
        orderId: this.keyword,
        clientId: this.keyword,
        cusOrderNo: this.keyword,
      });
    },
    onChangePerPage(value) {
      this.currentPage = 1;

      this.getList({
        page: this.currentPage,
        pageSize: value,
        orderId: this.keyword,
        clientId: this.keyword,
        cusOrderNo: this.keyword,
      });
    },
  },
};
</script>
