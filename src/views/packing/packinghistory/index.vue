<template>
  <b-card>
    <b-row class="match-height">
      <b-col lg="12" md="12" sm="12" class="mt-3">
        <h2>Packing History</h2>
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
              v-model="keyword"
              type="search"
              placeholder="Type to Search"
              @keyup="onKeyUpKeyword"
            />
            <b-input-group-append>
              <b-button :disabled="!keyword" @click="keyword = ''">
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
        { key: "client_name", label: "Client Name", sortable: true },
        { key: "tray_code", label: "Tray Code", sortable: true },
        { key: "pick_by", label: "Pick By", sortable: true },
        { key: "check_by", label: "Check By", sortable: true },
        { key: "packby", label: "Pack By", sortable: true },
        { key: "status", label: "Status", sortable: true },
      ],
      items: [],
      keyword: undefined,
      loading: true,
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
      orderId: this.keyword,
      cusOrderNo: this.keyword,
      clientId: this.keyword,
    });
  },
  methods: {
    async getList({ page, pageSize, orderId, cusOrderNo, clientId }) {
      try {
        this.loading = true;

        const res = await this.$api.order.packing.getHistory({
          page,
          pageSize,
          orderId,
          cusOrderNo,
          clientId,
        });

        this.items = res?.data?.records.map((item) => ({
          id: item.id,
          client_name: item.client_name,
          tray_code: item.tray_code,
          pick_by: item.pick_by,
          check_by: item.check_by,
          pack_by: item.pack_by,
          status: item.status,
        }));

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
        cusOrderNo: this.keyword,
        clientId: this.keyword,
      });
    },
    onChangePerPage(value) {
      this.currentPage = 1

      this.getList({
        page: this.currentPage,
        pageSize: value,
        orderId: this.keyword,
        cusOrderNo: this.keyword,
        clientId: this.keyword,
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
          orderId: this.keyword,
          cusOrderNo: this.keyword,
          clientId: this.keyword,
        });
        this.timeout.search = null;
      }, 500);
    },
  },
};
</script>
