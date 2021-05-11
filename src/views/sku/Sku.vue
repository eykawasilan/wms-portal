<template>
  <div>
    <template v-if="options == null"> Loading Clients... </template>
    <template v-else>
      <b-card title="">
        <b-card-text>Select Client Name</b-card-text>
        <b-row>
          <b-col md="12">
            <b-row>
              <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                <b-form-select v-model="selected" :options="options" />
              </div>
              <div class="col-lg-3">
                <b-button
                  tag="router-link"
                  to="/sku/singlesku"
                  variant="primary"
                  type="is-link"
                  block
                >
                  Create Single SKU
                </b-button>
              </div>
              <div class="col-lg-3">
                <b-button
                  type="button"
                  variant="primary"
                  block
                  @click="onUpload()"
                >
                  Upload Bulk SKUs
                </b-button>
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-card>

      <input
        ref="file-selector"
        type="file"
        class="d-none"
        accept=".csv"
        @change="onFileChange"
      />
    </template>
  </div>
</template>

<script>
import { csv } from "csvtojson";

export default {
  watch: {
    selected(value) {
      this.$store.commit("sku/clientID", value);
    },
  },
  data() {
    return {
      selected: null,
      options: null,
    };
  },
  async beforeMount() {
    const res = await this.$api.client.getUserList({ page: 1, pageSize: 100 });
    this.options = res?.data?.records.map((item) => ({
      text: item.name,
      value: item.id,
    }));
    this.selected = this.options[0]?.value;
  },
  methods: {
    async onFileChange(event) {
      const file = event.target.files[0];
      const url = URL.createObjectURL(file);
      const res = await fetch(url);
      const text = await res.text();
      const data = await csv().fromString(text);
      URL.revokeObjectURL(url);

      await this.$api.inventory.sku.createBulk({
        bulkData: data.map((item) => ({
          barcode: item.BARCODE,
          boxesUPM: item.BOXES_UPM,
          carton: item.CARTON,
          category: item.CATEGORY,
          expiry: item.EXPIRY === "yes" ? 1 : 0,
          itemDesc: item.ITEM_DESCRIPTION,
          itemName: item.ITEM_NAME,
          palletUPM: item.PALLET_UPM,
          serial_code: item.SERIAL_CODE === "yes" ? 1 : 0,
        })),
        clientId: this.$store.state.sku.clientID,
      });

      this.$router.replace({
        name: "bulksku",
      });
    },
    onUpload() {
      this.$refs["file-selector"].click();
    },
  },
};
</script>

<style>
</style>
