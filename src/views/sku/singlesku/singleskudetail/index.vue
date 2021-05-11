<template>
  <div>
    <b-card>
      <b-card-header> SKU List </b-card-header>
      <b-col lg="12" md="12" sm="12">
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
      </b-col>
      <b-row>
        <b-col md="2" sm="4" class="my-1">
          <b-form-group class="mb-0">
            <label class="d-inline-block text-sm-left mr-50">Per page</label>
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
        <b-col md="10" sm="8" class="my-1">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      fields: [
        "manufacturing_barcode",
        "pallet_upm",
        "item_name",
        "carton",
        "item_description",
        "boxes_upm",
        "category_name",
      ],
      items: [],
      loading: true,
    };
  },
  beforeMount() {
    this.getList({ page: this.currentPage, pageSize: this.perPage });
  },
  methods: {
    async getList({ page, pageSize }) {
      try {
        this.loading = true;

        const res = await this.$api.inventory.sku.getList({
          page,
          pageSize,
        });

        this.items = res?.data?.records.map((item) => ({
          id: item.id,
          manufacturing_barcode: item.barcode_1,
          pallet_upm: item.pallet_upm,
          item_name: item.sku_name,
          carton: item.carton,
          item_description: item.desc,
          boxes_upm: item.boxes_upm,
          category_name: item.category,
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
