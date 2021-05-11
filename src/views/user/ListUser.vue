<template>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <b-row>
      <b-col
        lg="12"
        md="12"
        sm="12"
      >
        <b-row>
          <b-col
            lg="12"
            md="12"
            sm="12"
          >
            <b-card>
              <b-row class="match-height">
                <b-col
                  lg="9"
                  md="9"
                  sm="8"
                  class="mt-3"
                >
                  <h2>List User</h2>
                </b-col>
                <b-col
                  lg="3"
                  md="3"
                  sm="4"
                  class="mt-3"
                >
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    class="w-100"
                    to="/user/adduser"
                    type="add"
                    variant="primary"
                  >
                    Add User
                  </b-button>
                </b-col>
              </b-row>
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
                          placeholder="Type to Search"
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
                    <template #cell(status)="data">
                      <b-badge :variant="status[1][data.value]">
                        {{ status[0][data.value] }}
                      </b-badge>
                    </template>
                  </b-table>
                </b-col>
                <b-row>
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
                        size="default"
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
  BRow, BCol, BCard, BCardBody, BFormGroup, BFormInput, BFormSelect, BTable, BPagination, BBadge, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardBody,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BTable,
    BPagination,
    BBadge,
    BButton,
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
        { key: 'user_name', label: 'User Name', sortable: true },
        'email',
        { key: 'location', label: 'Location', sortable: true },
        { key: 'start_date', label: 'Start Date', sortable: true },
        { key: 'phone_no', label: 'Phone Number', sortable: true },
      ],
      items: [
        {
          id: 1,
          // eslint-disable-next-line global-require
          user_name: 'Bailie Coulman',
          email: 'bcoulman1@yolasite.com',
          location: 'Ara Damansara',
          start_date: '3/02/2021',
          phone_no: '+60172370000',
        },
        {
          id: 2,
          // eslint-disable-next-line global-require
          user_name: 'Korrie OCrevy',
          email: 'kocrevy0@thetimes.co.uk',
          location: 'Kota Damansara',
          start_date: '6/02/2021',
          phone_no: '+60172370000',
        },
        {
          id: 3,
          // eslint-disable-next-line global-require
          user_name: 'Stella Ganderton',
          email: 'Stella Ganderton',
          location: 'Mutiara Damansara',
          start_date: '3/02/2021',
          phone_no: '+60172370000',
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
