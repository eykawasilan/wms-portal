<template>
  <b-row>
    <b-col lg="3" md="3" sm="6">
      <statistic-card-vertical
        icon="ActivityIcon"
        :statistic="statistics.pendingOutboundValues || '0'"
        statistic-title="Pending Outbound Orders"
        color="primary"
        class="h-25"
      />
    </b-col>
    <b-col lg="3" md="3" sm="6">
      <statistic-card-vertical
        icon="BoxIcon"
        :statistic="statistics.readyToBeShipValues || '0'"
        statistic-title="Orders Ready To Be Ship"
        color="danger"
        class="h-25"
      />
    </b-col>
    <b-col lg="6" md="6" sm="12">
      <b-card>
        <template v-if="options == null"> Loading Clients... </template>
        <template v-else>
          <b-card-header>
            <h2>Outbound List</h2>
          </b-card-header>
          <b-row class="match-height">
            <b-col lg="4" md="4" sm="6" class="mt-2">
              <b-form-select
                v-model="selected"
                :options="options"
                @change="onChangeClient"
              />
            </b-col>
            <b-col lg="8" md="8" sm="6" class="mt-2">
              <b-row>
                <b-col md="12" sm="12">
                  <b-form-group
                    label="Sort"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="default"
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
              </b-row>
              <b-row>
                <b-col lg="12" md="12" sm="6" class="mt-2">
                  <b-form-group
                    label="Filter"
                    label-cols-sm="3"
                    label-align-sm="right"
                    label-size="default"
                    label-for="filterInput"
                    class="mb-0"
                  >
                    <b-input-group size="default" class="w-100">
                      <b-form-input
                        id="filterInput"
                        v-model="filter"
                        type="search"
                        placeholder="Type to Search"
                      />
                    </b-input-group>
                  </b-form-group>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
          <b-row>
            <b-col cols="12" class="mt-3">
              <b-table
                striped
                hover
                responsive
                :busy="loading"
                :per-page="perPage"
                :items="items"
                :fields="fields"
              />
            </b-col>
          </b-row>
          <b-row class="match-height">
            <b-col lg="6" md="6" sm="6">
              <b-form-group class="mb-0">
                <label class="d-inline-block text-sm-left mr-50"
                  >Per page</label
                >
                <b-form-select
                  id="perPageSelect"
                  v-model="perPage"
                  size="lg"
                  :options="pageOptions"
                  class="w-50"
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
              />
            </b-col>
          </b-row>
        </template>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import StatisticCardVertical from "@core/components/statistics-cards/StatisticCardVertical.vue";

export default {
  components: {
    StatisticCardVertical,
  },
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
        { key: "order_id", label: "Orders #", sortable: true },
        { key: "platform_name", label: "Platform", sortable: true },
        { key: "pl_logistic", label: "3PL Logistic", sortable: true },
      ],
      items: [],
      selected: null,
      options: null,
      statistics: {},
      loading: true,
      keyword: undefined,
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
  async beforeMount() {
    const promises = [
      this.$api.order.outbound.getStatistics(),
      this.$api.client.getUserList({ page: 1, pageSize: 100 }),
    ];
    const [statisticsRes, clientRes] = await Promise.all(promises);

    this.options = clientRes?.data.records.map((item) => ({
      text: item.name,
      value: item.id,
    }));
    this.selected = this.options[0]?.value;

    this.statistics = statisticsRes?.data;

    this.getList({
      page: this.currentPage,
      pageSize: this.perPage,
      orderId: this.keyword,
      clientId: this.selected,
      cusOrderNo: this.keyword,
    });
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
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

        const res = await this.$api.order.outbound.getList({
          page,
          pageSize,
          orderId,
          clientId,
          cusOrderNo,
        });

        this.items = res?.data?.records.map((item) => ({
          id: item.id,
          // eslint-disable-next-line global-require
          order_id: "LZD-082749",
          platform_name: "LAZADA",
          pl_logistic: "JNT",
        }));

        this.totalRows = res?.data?.totalCount;
      } finally {
        this.loading = false;
      }
    },
    onChangeClient(value) {
      this.currentPage = 1

      this.getList({
        page: this.currentPage,
        pageSize: this.perPage,
        orderId: this.keyword,
        clientId: value,
        cusOrderNo: this.keyword,
      });
    },
    onChangeCurrentPage(value) {
      this.getList({
        page: value,
        pageSize: this.perPage,
        orderId: this.keyword,
        clientId: this.selected,
        cusOrderNo: this.keyword,
      });
    },
    onChangePerPage(value) {
      this.currentPage = 1

      this.getList({
        page: this.currentPage,
        pageSize: value,
        orderId: this.keyword,
        clientId: this.selected,
        cusOrderNo: this.keyword,
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
          clientId: this.selected,
          cusOrderNo: this.keyword,
        });
        this.timeout.search = null;
      }, 500);
    },
  },
};
</script>
