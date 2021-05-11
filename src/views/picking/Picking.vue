<template>
  <b-overlay
    :show="overlay"
    spinner-variant="primary"
    spinner-type="grow"
    spinner-small
    rounded="sm"
  >
    <b-row>
      <b-col lg="12" md="12" sm="12">
        <b-card>
          <b-card-header>
            <h2>Picking List</h2>
          </b-card-header>
          <b-card-body>
            <b-row>
              <b-col lg="2" md="4" sm="6">
                <h2 style="font-weight: 700; color: #ca141f">
                  {{ statistics.orderValues || "0" }}
                </h2>
                <p>Orders</p>
              </b-col>
              <b-col lg="2" md="4" sm="6">
                <h2 style="font-weight: 700; color: #ca141f">
                  {{ statistics.totalItem || "0" }}
                </h2>
                <p>Item to be pick</p>
              </b-col>
              <b-col lg="2" md="4" sm="6">
                <h2 style="font-weight: 700; color: #ca141f">
                  {{ statistics.orderType1Values || "0" }}
                </h2>
                <p>One SKU with<br />One Quantity</p>
              </b-col>
              <b-col lg="2" md="4" sm="6">
                <h2 style="font-weight: 700; color: #ca141f">
                  {{ statistics.orderType2Values || "0" }}
                </h2>
                <p>One SKU with<br />Multiple Quantity</p>
              </b-col>
              <b-col lg="2" md="4" sm="6">
                <h2 style="font-weight: 700; color: #ca141f">
                  {{ statistics.orderType3Values || "0" }}
                </h2>
                <p>Multiple SKU with<br />Multiple Quantity</p>
              </b-col>
            </b-row>
            <b-button
              class="mr-2"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary"
              @click="onGeneratePickList()"
            >
              Generate Pick List
            </b-button>

            <b-button
              v-if="!showGeneratedPickList"
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="outline-primary"
              @click="onGetGeneratedPickList()"
            >
              Generated Pick List
            </b-button>
            <b-collapse
              v-model="showGeneratedPickList"
              id="collapse-1"
              class="mt-2"
            >
              <b-row>
                <b-col lg="3" md="3" sm="12" class="shadow-sm border rounded">
                  <b-card class="text-center mt-5">
                    <h2 style="font-weight: 700; color: #ca141f">
                      {{ totalRows }}
                    </h2>
                    <p>Generated Pick List</p>
                    <b-button
                      variant="primary"
                      block
                      to="/picking/pickinghistory/"
                      type="button"
                      :disabled="invalid"
                    >
                      Pick List History
                    </b-button>
                  </b-card>
                </b-col>
                <b-col lg="9" md="9" sm="12">
                  <b-card class="border rounded">
                    <b-table
                      striped
                      hover
                      responsive
                      :busy="loading"
                      :per-page="perPage"
                      :items="items"
                      :fields="fields"
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
                            id="perPageSelect"
                            v-model="perPage"
                            size="lg"
                            :options="pageOptions"
                            class="w-50"
                            @change="onChangePerPage"
                          />
                        </b-form-group>
                      </b-col>
                      <b-col lg="8" md="8" sm="8">
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
            </b-collapse>
          </b-card-body>
        </b-card>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
import { VBToggle } from "bootstrap-vue";

import Ripple from "vue-ripple-directive";

export default {
  directives: {
    "b-toggle": VBToggle,
    Ripple,
  },
  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      fields: [
        {
          key: "id",
          label: "Id",
        },
        "picklist",
        "orders",
        "total_items",
        "picker",
      ],
      items: [],
      loading: true,
      statistics: {},
      overlay: false,
      showGeneratedPickList: false,
    };
  },
  async beforeMount() {
    this.getStatistics();
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    async getList({ page, pageSize }) {
      try {
        this.loading = true;

        const { data } = await this.$api.order.picking.getList({
          page,
          pageSize,
        });
        const { records, totalCount } = data;

        this.items = records.map((item) => ({
          id: item.id,
          picklist: item.pick_code || "-",
          orders: item.orderValues,
          total_items: item.totalItem,
          picker: item.picker || "-",
        }));

        this.totalRows = totalCount;
      } finally {
        this.loading = false;
      }
    },
    async getStatistics() {
      const { data } = await this.$api.order.picking.getStatistics();
      this.statistics = data;
    },
    async onGeneratePickList() {
      try {
        this.overlay = true;
        await this.$api.order.picking.generateList();

        this.getList({ page: this.currentPage, pageSize: this.perPage });
        this.getStatistics();
      } finally {
        this.overlay = false;
      }
    },
    async onGetGeneratedPickList() {
      try {
        this.overlay = true;
        await this.getList({ page: this.currentPage, pageSize: this.perPage });
        this.showGeneratedPickList = true;
      } finally {
        this.overlay = false;
      }
    },
    onChangeCurrentPage(value) {
      this.getList({ page: value, pageSize: this.perPage });
    },
    onChangePerPage(value) {
      this.currentPage = 1;

      this.getList({ page: this.currentPage, pageSize: value });
    },
  },
};
</script>
