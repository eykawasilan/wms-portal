<template>
  <b-row class="match-height">
    <b-col
      lg="12"
      md="12"
      sm="12"
    >
      <b-card>
        <b-card-header>
          <h2>Customer Detail</h2>
        </b-card-header>
        <b-card-body>
          <b-col
            class="mb-2"
          >
            <div>
              Customer Name:
            </div>
            <div
              class="font-weight-bold"
            >
              <p>Alex</p>
            </div>
          </b-col>
          <b-col
            class="mb-2"
          >
            <div>
              Customer Phone Number:
            </div>
            <div
              class="font-weight-bold"
            >
              <p>016-9330076</p>
            </div>
          </b-col>
          <b-col
            class="mb-2"
          >
            <div>
              Customer Address
            </div>
            <div
              class="font-weight-bold"
            >
              <p>No.10 Jalan Tun Hussien Onn,<br>Taman Midah,<br>41300 Selangor</p>
            </div>
          </b-col>
          <b-col
            class="mb-2"
          >
            <div>
              Customer Email:
            </div>
            <div
              class="font-weight-bold"
            >
              <p>alexchoong96@gmail.com</p>
            </div>
          </b-col>
          <b-col
            md="6"
            class="ml-auto mr-auto"
          >
            <b-button
              v-ripple.400="'rgba(113, 102, 240, 0.15)'"
              variant="primary"
              class="mt-5"
              @click="print"
            >
              Print CN
            </b-button>
          </b-col>
        </b-card-body>
      </b-card>
    </b-col>
    <b-col
      lg="9"
      md="9"
      sm="12"
    >
      <b-card>
        <b-card-header>
          <h2>Picking List</h2>
        </b-card-header>
        <b-row>
          <b-col
            lg="4"
            md="4"
            sm="6"
            class="mt-2"
          >
            <b-form-select
              v-model="selected"
              :options="options"
            />
          </b-col>
          <b-col
            lg="8"
            md="8"
            sm="6"
            class="mt-2"
          >
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
                />
              </b-input-group>
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col
            cols="12"
            class="mt-3"
          >
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
            />
          </b-col>
        </b-row>
        <b-row class="match-height">
          <b-col
            lg="6"
            md="6"
            sm="6"
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
            lg="6"
            md="6"
            sm="6"
          >
            <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="right"
              size="lg"
            />
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import {
  BRow, BCol, BCard, BCardHeader, BFormSelect, BFormGroup, BInputGroup, BFormInput, BTable, BPagination, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BFormSelect,
    BFormGroup,
    BInputGroup,
    BFormInput,
    BTable,
    BPagination,
    BButton,
  },
  data() {
    return {
      output: null,
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
        { key: 'picklist', label: 'Pick List', sortable: true },
        { key: 'order_from', label: 'Order From', sortable: true },
        'orders',
        'total_quantity_of_items',
        { key: 'picker', label: 'Picker', sortable: true },

      ],
      items: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          picklist: 'LZD-082749',
          orders: '5',
          total_quantity_of_items: '24',
          order_from: 'LAZADA',
          picker: 'Alex',
        },
        {
          id: 2,
          // eslint-disable-next-line global-require
          picklist: 'SHP-274965',
          orders: '8',
          total_quantity_of_items: '36',
          order_from: 'SHOPEE',
          picker: 'Ben',
        },
        {
          id: 3,
          // eslint-disable-next-line global-require
          picklist: 'ZLR-027593',
          orders: '3',
          total_quantity_of_items: '13',
          order_from: 'ZALORA',
          picker: 'Chris',
        },
        {
          id: 4,
          // eslint-disable-next-line global-require
          picklist: 'LZD-082749',
          orders: '5',
          total_quantity_of_items: '24',
          order_from: 'LAZADA',
          picker: 'Alex',
        },
        {
          id: 5,
          // eslint-disable-next-line global-require
          picklist: 'LZD-082749',
          orders: '5',
          total_quantity_of_items: '24',
          order_from: 'LAZADA',
          picker: 'Alex',
        },
        {
          id: 6,
          // eslint-disable-next-line global-require
          picklist: 'LZD-082749',
          orders: '5',
          total_quantity_of_items: '24',
          order_from: 'LAZADA',
          picker: 'Alex',
        },
        {
          id: 7,
          // eslint-disable-next-line global-require
          picklist: 'LZD-082749',
          orders: '5',
          total_quantity_of_items: '24',
          order_from: 'LAZADA',
          picker: 'Alex',
        },
        {
          id: 8,
          // eslint-disable-next-line global-require
          picklist: 'LZD-082749',
          orders: '5',
          total_quantity_of_items: '24',
          order_from: 'LAZADA',
          picker: 'Alex',
        },
        {
          id: 9,
          // eslint-disable-next-line global-require
          picklist: 'LZD-082749',
          orders: '5',
          total_quantity_of_items: '24',
          order_from: 'LAZADA',
          picker: 'Alex',
        },
        {
          id: 10,
          // eslint-disable-next-line global-require
          picklist: 'LZD-082749',
          orders: '5',
          total_quantity_of_items: '24',
          order_from: 'LAZADA',
          picker: 'Alex',
        },
      ],
      selected: null,
      options: [
        { value: null, text: 'Please select Client Name' },
      ],
    }
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
    print() {
      // Pass the element id here
      this.$htmlToPaper('printMe')
    },
  },
}
</script>
