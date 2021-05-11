<template>
  <b-row>
    <b-col lg="6" md="6" sm="12">
      <b-row>
        <b-col lg="6" md="6" sm="12">
          <b-card>
            <statistic-card-vertical
              icon="ActivityIcon"
              :statistic="statistics.pendingOutboundValues || '0'"
              statistic-title="Pending Outbound Orders"
              color="primary"
            />
          </b-card>
        </b-col>
        <b-col lg="6" md="6" sm="12">
          <b-card>
            <statistic-card-vertical
              icon="BoxIcon"
              :statistic="statistics.readyToBeShipValues || '0'"
              statistic-title="Orders Ready To Be Ship"
              color="danger"
            />
          </b-card>
        </b-col>
      </b-row>

      <b-overlay
        :show="manifest.overlay"
        spinner-variant="primary"
        spinner-type="grow"
        spinner-small
        rounded="sm"
      >
        <b-row>
          <b-col lg="3" md="3" sm="3">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary"
              @click="onGetManifestList()"
            >
              Generated Manifest List
            </b-button>
          </b-col>
          <b-col lg="3" md="3" sm="3">
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary"
              @click="onGenerateManifest()"
            >
              Generate Manifest
            </b-button>
          </b-col>
        </b-row>

        <b-collapse v-model="manifest.show" id="collapse-1" class="mt-2">
          <b-row>
            <b-col lg="12" md="12" sm="12">
              <b-card class="border rounded">
                <b-table
                  striped
                  hover
                  responsive
                  :per-page="manifest.perPage"
                  :items="manifest.items"
                  :fields="manifest.fields"
                >
                  <template #cell(status)="data">
                    <b-badge :variant="status[1][data.value]">
                      {{ status[0][data.value] }}
                    </b-badge>
                  </template>

                  <template #table-busy>
                    <div class="text-center my-2">
                      <b-spinner class="align-middle mr-2" />
                      <strong>Loading...</strong>
                    </div>
                  </template>
                </b-table>
                <b-row class="match-height">
                  <b-col lg="4" md="4" sm="4">
                    <b-form-group class="mb-0">
                      <label class="d-inline-block text-sm-left mr-50"
                        >Per page</label
                      >
                      <b-form-select
                        id="perPageSelect1"
                        v-model="manifest.perPage"
                        size="lg"
                        :options="pageOptions"
                        class="w-50"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col lg="8" md="8" sm="8">
                    <b-pagination
                      v-model="manifest.currentPage"
                      :total-rows="manifest.totalRows"
                      :per-page="manifest.perPage"
                      align="right"
                      size="lg"
                    />
                  </b-col>
                </b-row>
              </b-card>
            </b-col>
          </b-row>
        </b-collapse>
      </b-overlay>
    </b-col>
    <b-col lg="6" md="6" sm="12">
      <b-card>
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
            >
              <template #table-busy>
                <div class="text-center my-2">
                  <b-spinner class="align-middle mr-2" />
                  <strong>Loading...</strong>
                </div>
              </template>
            </b-table>
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
import StatisticCardVertical from "@core/components/statistics-cards/StatisticCardVertical.vue";

export default {
  components: {
    StatisticCardVertical,
  },
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
         { key: 'order_id', label: 'Orders #', sortable: true },
        { key: 'platform_name', label: 'Platform', sortable: true },
        { key: 'pl_logistic', label: '3PL Logistic', sortable: true },
      ],
      fields1: [
        {
          key: "id",
          label: "Id",
        },
         { key: 'manifest_code', label: 'Manifest Code', sortable: true },
        { key: 'order_number', label: 'Order Number', sortable: true },
        { key: 'created_date', label: 'Created Date', sortable: true },
        { key: 'status_detail', label: 'Status', sortable: true },
      ],
      manifest: {
        fields: [
          {
            key: "id",
            label: "Id",
          },
          { key: "manifest_code", label: "Manifest Code", sortable: true },
          { key: "order_number", label: "Order Number", sortable: true },
          { key: "created_date", label: "Created Date", sortable: true },
          { key: "status_detail", label: "Status", sortable: true },
        ],
        items: [],
        perPage: 5,
        currentPage: 1,
        totalRows: 0,
        show: false,
        loaded: false,
      },
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
    this.getManifestList({
      page: this.currentPage1,
      pageSize: this.perPage1,
      manifestId: this.keyword,
      manifestCode: this.keyword,
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

        const { data } = await this.$api.order.outbound.getList({
          page,
          pageSize,
          orderId,
          clientId,
          cusOrderNo,
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
    async getManifestList() {
      const { data } = await this.$api.order.manifest.getList({
        page: this.manifest.currentPage,
        pageSize: this.manifest.perPage,
      });

      if (typeof data === "object") {
        const { records, totalCount } = data;

        this.manifest.items = records.map((item) => {
          const createdDate = moment(item.cdate);
          return {
            id: item.id,
            manifest_code: item.manifest_code,
            order_number: item.totalOrder,
            created_date: createdDate.isValid()
              ? createdDate.format("YYYY-MM-DD hh:mm:ss a")
              : "-",
            status_detail: this.labels.manifest.status[item.status] || "-",
          };
        });

        this.manifest.totalRows = totalCount;
      }
    },
    onChangeClient(value) {
      this.currentPage = 1;

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
      this.currentPage = 1;

      this.getList({
        page: this.currentPage,
        pageSize: value,
        orderId: this.keyword,
        clientId: this.selected,
        cusOrderNo: this.keyword,
      });
    },
    async onGenerateManifest() {
      try {
        this.manifest.overlay = true;
        await this.$api.order.manifest.generateOrder();
        this.$toast.success("Generate manifest success");
        await this.onGenerateManifest();
      } finally {
        this.manifest.overlay = false;
      }
    },
    async onGetManifestList() {
      if (this.manifest.show) return;

      try {
        this.manifest.overlay = true;
        await this.getManifestList();
        this.manifest.show = true;
      } finally {
        this.manifest.overlay = false;
      }
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
