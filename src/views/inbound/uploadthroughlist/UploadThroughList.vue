<template>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <b-row>
      <b-col
        lg="12"
        md="12"
        sm="12"
      >
        <b-row class="match-height">
          <b-col
            lg="3"
            md="3"
            sm="6"
          >
            <b-card>
              <b-card-body>
                <statistic-card-vertical
                  icon="ActivityIcon"
                  statistic="50"
                  statistic-title="Amount Of Added Item For Inbound Request"
                  color="primary"
                />
              </b-card-body>
            </b-card>
          </b-col>
          <b-col
            lg="3"
            md="3"
            sm="6"
          >
            <b-card>
              <b-card-body>
                <statistic-card-vertical
                  icon="PackageIcon"
                  statistic="1000"
                  statistic-title="Total Quantity To Be Inbound"
                  color="danger"
                />
              </b-card-body>
            </b-card>
          </b-col>
          <b-col
            lg="6"
            md="6"
            sm="12"
          >
            <b-card>
              <b-card-header>
                <h2>Select a Client</h2>
              </b-card-header>
              <b-card-body>
                <b-form-group
                  label-for=""
                >
                  <b-form-input
                    id=""
                    placeholder="clientname"
                    readonly
                  />
                </b-form-group>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            lg="12"
            md="12"
            sm="12"
          >
            <b-card>
              <b-card-body>
                <b-row>
                  <b-col
                    lg="4"
                    md="4"
                    sm="8"
                    class="my-1"
                  >
                    <b-form-group
                      label="Sort"
                      label-cols-sm="2"
                      label-align-sm="right"
                      label-size="default"
                      label-for="sortBySelect"
                      class="mb-0"
                    >
                      <b-input-group size="default">
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
                          size="default"
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
                    md="8"
                    class="my-1"
                    dir=""
                  >
                    <b-form-group
                      label="Filter"
                      label-cols-sm="2"
                      label-align-sm="right"
                      label-size="default"
                      label-for="filterInput"
                      class="mb-0"
                    >
                      <b-input-group
                        size="sm"
                      >
                        <b-form-input
                          id="filterInput"
                          v-model="filter"
                          type="search"
                          placeholder="Enter SKU to filter"
                        />
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                </b-row>
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
                    <template #cell(amount)>
                      <b-form-group>
                        <b-form-input
                          id=""
                          placeholder="Enter Amount"
                        />
                      </b-form-group>
                    </template>
                    <template #cell(status)="data">
                      <b-badge :variant="status[1][data.value]">
                        {{ status[0][data.value] }}
                      </b-badge>
                    </template>
                  </b-table>
                </b-col>
                <b-row class="match-height">
                  <b-col
                    lg="3"
                    md="3"
                    sm="3"
                    class="mt-2"
                  >
                    <b-form-group
                      class="mb-0"
                    >
                      <label class="d-inline-block text-sm-left mr-50">Per page</label>
                      <b-form-select
                        id="perPageSelect"
                        v-model="perPage"
                        size="default"
                        :options="pageOptions"
                        class="w-50"
                      />
                    </b-form-group>
                  </b-col>
                  <b-col
                    lg="6"
                    md="6"
                    sm="6"
                    class="mt-2"
                  >
                    <b-button
                      v-b-modal.modal-center
                      variant="primary"
                      class="w-50 ml-auto mr-auto"
                    >
                      Next
                    </b-button>
                  </b-col>
                  <!-- modal vertical center -->
                  <b-modal
                    id="modal-center"
                    centered
                    ok-only
                    ok-title="Save and Exit"
                  >
                    <b-col
                      lg="12"
                      md="12"
                      sm="12"
                      class="ml-auto mr-auto text-center"
                    >
                      There is changes you haven't save.<br>Do you want to save it?
                    </b-col>
                  </b-modal>
                  <b-col
                    lg="3"
                    md="3"
                    sm="3"
                    class="mt-2"
                  >
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      align="right"
                      size="default"
                      class="my-50"
                    />
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import {
  BRow, BCol, BCard, BCardBody, BCardHeader, BFormGroup, BFormInput, BFormSelect, BTable, BPagination, BBadge, BButton, BModal,
} from 'bootstrap-vue'

import StatisticCardVertical from '@core/components/statistics-cards/StatisticCardVertical.vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BCardHeader,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BTable,
    BPagination,
    BBadge,
    BButton,
    BModal,
    StatisticCardVertical,
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
        'description',
        'category',
        'amount',
      ],
      items: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          description: 'This item has been damaged',
          category: 'Beverage',
          amount: '',
        },
        {
          id: 2,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          description: 'This item has been damaged',
          category: 'Beverage',
          amount: '',
        },
        {
          id: 3,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          description: 'This item has been damaged',
          category: 'Beverage',
          amount: '',
        },
        {
          id: 4,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          description: 'This item has been damaged',
          category: 'Beverage',
          amount: '',
        },
        {
          id: 5,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          description: 'This item has been damaged',
          category: 'Beverage',
          amount: '',
        },
        {
          id: 6,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          description: 'This item has been damaged',
          category: 'Beverage',
          amount: '',
        },
        {
          id: 7,
          // eslint-disable-next-line global-require
          sku_id: 'BM-0987625368',
          product_name: 'Germen Premier Beer',
          description: 'This item has been damaged',
          category: 'Beverage',
          amount: '',
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
