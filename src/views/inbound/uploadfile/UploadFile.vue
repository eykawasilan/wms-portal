<template>
  <b-card>
    <b-row class="match-height">
      <b-col
        xl="3"
        md="3"
        sm="6"
      >
        <statistic-card-vertical
          icon="ActivityIcon"
          statistic="50"
          statistic-title="Amount of SKUs"
          color="info"
        />
      </b-col>
      <b-col
        xl="3"
        md="3"
        sm="6"
      >
        <statistic-card-vertical
          color="warning"
          icon="MessageSquareIcon"
          statistic="40"
          statistic-title="Complete Information"
        />
      </b-col>
      <b-col
        xl="6"
        md="6"
        sm="12"
      >
        <b-col
          md="12"
          class="mt-3"
        >
          <b-row>
            <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
              <b-form-select
                v-model="selected"
                :options="options"
              />
            </div>
            <div class="col-lg-6">
              <b-button
                tag="router-link"
                to="/inbound/uploadfile"
                variant="primary"
                type="is-link"
                block
                :disabled="invalid"
              >
                P0-094745854 Uploaded
              </b-button>
            </div>
          </b-row>
        </b-col>
      </b-col>
    </b-row>
    <b-row>
      <b-col
        md="4"
        sm="8"
        class="my-1"
      >
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
                <option value="">
                  -- none --
                </option>
              </template>
            </b-form-select>
            <b-form-select
              v-model="sortDesc"
              size="sm"
              :disabled="!sortBy"
              class="w-50"
            >
              <option :value="false">
                Asc
              </option>
              <option :value="true">
                Desc
              </option>
            </b-form-select>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col
        md="6"
        class="my-1"
      >
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
              <b-button
                :disabled="!filter"
                @click="filter = ''"
              >
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
          :per-page="perPage"
          :current-page="currentPage"
          :items="items"
          :fields="fields"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          :filter="filter"
          :filter-included-fields="filterOn"
          @filtered="onFiltered"
        >
          <template #cell(status)="data">
            <b-badge :variant="status[1][data.value]">
              {{ status[0][data.value] }}
            </b-badge>
          </template>
        </b-table>
      </b-col>
      <b-col
        md="2"
        sm="4"
        class="my-1"
      >
        <b-form-group
          class="mb-0"
        >
          <label class="d-inline-block text-sm-left mr-50">Per page</label>
          <b-form-select
            id="perPageSelect"
            v-model="perPage"
            size="lg"
            :options="pageOptions"
            class="w-50"
          />
        </b-form-group>
      </b-col>
      <b-col
        md="10"
        sm="8"
        class="my-1"
      >
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="right"
          size="lg"
          class="my-50"
        />
      </b-col>
      <!-- submit and reset -->
      <b-col
        md="12"
        class="mt-5"
      >
        <b-row>
          <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12 mr-auto ml-auto">
            <b-button
              v-ripple.400="'rgba(255, 255, 255, 0.15)'"
              class="w-100"
              to="/inbound/uploadfile/uploadclientpo"
              type="submit"
              variant="primary"
            >
              Next
            </b-button>
          </div>
        </b-row>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BTable, BCard, BRow, BCol, BFormGroup, BFormSelect, BPagination, BInputGroup, BFormInput, BInputGroupAppend, BButton, BBadge,
} from 'bootstrap-vue'

import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'

export default {
  components: {
    StatisticCardVertical,
    BCard,
    BTable,
    BRow,
    BCol,
    BFormGroup,
    BFormSelect,
    BPagination,
    BInputGroup,
    BFormInput,
    BInputGroupAppend,
    BButton,
    BBadge,
  },
  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: '',
      sortDesc: false,
      sortDirection: 'asc',
      filter: null,
      filterOn: [],
      infoModal: {
        id: 'info-modal',
        title: '',
        content: '',
      },
      fields: [
        {
          key: 'id', label: 'Id',
        },
        { key: 'sku_id', label: 'SKU No', sortable: true },
        { key: 'product_name', label: 'Product Name', sortable: true },
        'product_type',
        'item_remark',
        'total_quantity',
      ],
      items: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          product_type: 'Food',
          item_remark: 'This item has been damaged',
          total_quantity: '1000',
        },
        {
          id: 2,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          product_type: 'Food',
          item_remark: 'This item has been damaged',
          total_quantity: '1000',
        },
        {
          id: 3,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          product_type: 'Food',
          item_remark: 'This item has been damaged',
          total_quantity: '1000',
        },
        {
          id: 4,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          product_type: 'Food',
          item_remark: 'This item has been damaged',
          total_quantity: '1000',
        },
        {
          id: 5,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          product_type: 'Food',
          item_remark: 'This item has been damaged',
          total_quantity: '1000',
        },
        {
          id: 6,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          product_type: 'Food',
          item_remark: 'This item has been damaged',
          total_quantity: '1000',
        },
        {
          id: 7,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          product_type: 'Food',
          item_remark: 'This item has been damaged',
          total_quantity: '1000',
        },
        {
          id: 8,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          product_type: 'Food',
          item_remark: 'This item has been damaged',
          total_quantity: '1000',
        },
        {
          id: 9,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          product_type: 'Food',
          item_remark: 'This item has been damaged',
          total_quantity: '1000',
        },
        {
          id: 10,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          product_type: 'Food',
          item_remark: 'This item has been damaged',
          total_quantity: '1000',
        },
      ],
    }
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length
  },
  methods: {
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`
      this.infoModal.content = JSON.stringify(item, null, 2)
      this.$root.$emit('bv::show::modal', this.infoModal.id, button)
    },
    resetInfoModal() {
      this.infoModal.title = ''
      this.infoModal.content = ''
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
}
</script>
