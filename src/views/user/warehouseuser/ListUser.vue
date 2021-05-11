<template>
  <div class="col-lg-12 col-md-12 col-sm-12">
    <b-row>
      <b-col lg="12" md="12" sm="12">
        <b-row>
          <b-col lg="12" md="12" sm="12">
            <b-card>
              <b-row class="match-height">
                <b-col lg="9" md="9" sm="8" class="mt-3">
                  <h2>List User</h2>
                </b-col>
                <b-col lg="3" md="3" sm="4" class="mt-3">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    class="w-100"
                    to="/user/warehouseuser/adduser"
                    type="add"
                    variant="primary"
                  >
                    Add User
                  </b-button>
                </b-col>
              </b-row>
              <b-card-body>
                <b-row>
                  <b-col lg="4" md="4" sm="8" class="my-1">
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
                            <option value="">-- none --</option>
                          </template>
                        </b-form-select>
                        <b-form-select
                          v-model="sortDesc"
                          size="default"
                          :disabled="!sortBy"
                          class="w-50"
                        >
                          <option :value="false">Asc</option>
                          <option :value="true">Desc</option>
                        </b-form-select>
                      </b-input-group>
                    </b-form-group>
                  </b-col>
                  <b-col md="8" class="my-1" dir="">
                    <b-form-group
                      label="Filter"
                      label-cols-sm="2"
                      label-align-sm="right"
                      label-size="default"
                      label-for="filterInput"
                      class="mb-0"
                    >
                      <b-input-group size="sm">
                        <b-form-input
                          id="filterInput"
                          v-model="keyword"
                          type="search"
                          placeholder="Type to Search"
                          @keyup="onKeyUpKeyword"
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
                      <label class="d-inline-block text-sm-left mr-50"
                        >Per page</label
                      >
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
              </b-card-body>
            </b-card>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import moment from "moment";

export default {
  data() {
    return {
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
      currentPage: 1,
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
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
        { key: "name", label: "Name" },
        "email",
        { key: "start_date", label: "Start Date" },
        { key: "phone_no", label: "Phone Number" },
      ],
      items: [],
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
  beforeMount() {
    this.getList({
      page: this.currentPage,
      pageSize: this.perPage,
      email: this.keyword,
      name: this.keyword,
    });
  },
  methods: {
    async getList({ page, pageSize, email = undefined, name = undefined }) {
      try {
        this.loading = true;

        const res = await this.$api.warehouse.user.getList({
          page,
          pageSize,
          email,
          name,
        });

        this.items = res?.data?.records.map((item) => ({
          id: item.id,
          name: item.name,
          email: item.email,
          start_date: item.start_date
            ? moment(item.start_date).format("DD/MM/YYYY")
            : "-",
          phone_no: `+${item.phone_code}${item.phone_no}`,
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
        email: this.keyword,
        name: this.keyword,
      });
    },
    onChangePerPage(value) {
      this.currentPage = 1

      this.getList({
        page: this.currentPage,
        pageSize: value,
        email: this.keyword,
        name: this.keyword,
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
          email: this.keyword,
          name: this.keyword,
        });
        this.timeout.search = null;
      }, 500);
    },
  },
};
</script>
