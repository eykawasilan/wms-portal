<template>
  <b-row>
    <b-col lg="12" md="12" sm="12">
      <b-card>
        <b-card-header>
          <h2>Racking List</h2>
        </b-card-header>
        <b-row class="match-height">
          <b-col lg="8" md="8" sm="6" class="mt-2 ml-auto">
            <b-form-group
              label="Filter"
              label-cols-sm="2"
              label-align-sm="right"
              label-size="default"
              label-for="filterInput"
              class="mb-0 w-75 ml-auto"
            >
              <b-input-group size="default">
                <b-form-input
                  id="filterInput"
                  v-model="filter"
                  type="search"
                  placeholder="Type to Search"
                  @keyup="onKeyUpKeyword"
                />
              </b-input-group>
            </b-form-group>
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
        </b-row>
        <b-row class="match-height">
          <b-col lg="6" md="6" sm="6">
            <b-form-group class="mb-0">
              <label class="d-inline-block text-sm-left mr-50">Per page</label>
              <b-form-select
                id="perPageSelect"
                v-model="perPage"
                size="default"
                :options="pageOptions"
                class="w-25"
                @change="onChangePerPage"
              />
            </b-form-group>
          </b-col>
          <b-col md="6" sm="6" class="my-1">
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
        "id",
        "product_name",
        "product_category",
        "item_remark",
        "total_quantity",
        "container_code",
        "locationLabel",
      ],
      items: [],
      loading: true,
      keyword: undefined,
      timeout: {
        search: null,
      },
    };
  },
  beforeMount() {
    this.getList({
      page: this.currentPage,
      pageSize: this.perPage,
      skuLocationId: this.keyword,
      batchId: this.keyword,
      containerRunningCodeId: this.keyword,
      status: this.keyword,
    });
  },
  methods: {
    async getList({
      page,
      pageSize,
      skuLocationId = undefined,
      batchId = undefined,
      containerRunningCodeId = undefined,
      status = undefined,
    }) {
      try {
        this.loading = true;

        const res = await this.$api.inventory.batch.getList({
          page,
          pageSize,
          skuLocationId,
          batchId,
          containerRunningCodeId,
          status,
        });

        this.items = res?.data?.records.map((item) => ({
          id: item.id,
          product_name: item.sku_batch.sku.sku_name || "-",
          product_category: item.product_category || "-",
          item_remark: item.sku_batch.sku.remarks || "-",
          total_quantity: item.batch_qty,
          container_code: item.container_running_code || "-",
          locationLabel: item.location_label || "-",
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
        skuLocationId: this.keyword,
        batchId: this.keyword,
        containerRunningCodeId: this.keyword,
        status: this.keyword,
      });
    },
    onChangePerPage(value) {
      this.currentPage = 1;

      this.getList({
        page: this.currentPage,
        pageSize: value,
        skuLocationId: this.keyword,
        batchId: this.keyword,
        containerRunningCodeId: this.keyword,
        status: this.keyword,
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
          skuLocationId: this.keyword,
          batchId: this.keyword,
          containerRunningCodeId: this.keyword,
          status: this.keyword,
        });
        this.timeout.search = null;
      }, 500);
    },
  },
};
</script>
