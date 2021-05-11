<template>
  <b-card>
    <b-row class="match-height">
      <b-col xl="4" md="4" sm="4">
        <statistic-card-vertical
          icon="ActivityIcon"
          :statistic="!totalRows ? '-' : totalRows"
          statistic-title="Amount of SKUs"
          color="info"
        />
      </b-col>
      <b-col xl="4" md="4" sm="4">
        <statistic-card-vertical
          color="warning"
          icon="MessageSquareIcon"
          statistic="40"
          statistic-title="Complete Information"
        />
      </b-col>
      <b-col xl="4" md="4" sm="4">
        <statistic-card-vertical
          color="danger"
          icon="AlertOctagonIcon"
          statistic="5"
          statistic-title="Incomplete Information"
        />
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
          <template #cell(expiry_date)="data">
            <b-form-checkbox v-model="data.item.expiry_date" switch inline />
          </template>

          <template #cell(serial_number)="data">
            <b-form-checkbox v-model="data.item.serial_number" switch inline />
          </template>

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
        { key: "sku_id", label: "SKU No", sortable: true },
        { key: "item_name", label: "Item Name", sortable: true },
        "category",
        "expiry_date",
        "serial_number",
        "total_quantity",
      ],
      items: [],
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
    this.getList({ page: this.currentPage, pageSize: this.perPage });
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    async getList({ page, pageSize }) {
      try {
        this.loading = true;

        const res = await this.$api.inventory.sku.getList({
          page,
          pageSize,
        });

        this.items = res?.data?.records.map((item) => ({
          category: item.category,
          expiry_date: !!item.expiry,
          id: item.id,
          item_name: item.sku_name,
          serial_number: !!item.serial_code,
          sku_id: item.sku_code,
          total_quantity: "50",
        }));

        this.totalRows = res?.data?.totalCount;
      } finally {
        this.loading = false;
      }
    },
    onChangeCurrentPage(value) {
      this.getList({ page: value, pageSize: this.perPage });
    },
    onChangePerPage(value) {
      this.currentPage = 1

      this.getList({ page: this.currentPage, pageSize: value });
    },
  },
};
</script>
