<template>
  <div>
    <b-card title="">
      <template v-if="options == null"> Loading Clients... </template>
      <template v-else>
        <b-card-text>Select Client Name</b-card-text>
        <b-row>
          <b-col md="12">
            <b-row>
              <div class="col-lg-3 col-md-5 col-sm-12 col-xs-12">
                <b-form-select v-model="selected" :options="options" />
              </div>
              <div class="col-lg-5">
                <b-button
                  type="button"
                  variant="outline-primary"
                  block
                  @click="onUpload()"
                >
                  Upload Order File
                </b-button>
              </div>
              <div class="col-lg-4">
                <b-button
                  ref="submit"
                  v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                  tag="router-link"
                  to="/order/orderlist"
                  type="button"
                  variant="primary"
                  @click="onSubmit()"
                >
                  Confirm
                </b-button>
              </div>
            </b-row>
          </b-col>
        </b-row>
      </template>
    </b-card>

    <input
      ref="file-selector"
      type="file"
      class="d-none"
      accept=".csv"
      @change="onFileChange"
    >
  </div>
</template>

<script>
import { csv } from "csvtojson";

export default {
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
      try {
        const file = event.target.files[0];
        const url = URL.createObjectURL(file);
        const res = await fetch(url);
        const text = await res.text();
        const data = await csv().fromString(text);
        URL.revokeObjectURL(url);

        await this.$api.order.createBulk({
          bulkData: data.map((item) => ({
            cusOrderNo: item.CUSTOMER_ORDER_NO,
            trackingCode: item.TRACKING_CODE,
            logisticPartner: item.LOGISTIC_PARTNER,
            orderDate: item.ORDER_DATE,
            shipDate: item.SHIP_DATE,
            cusPhoneNo: item.CUSTOMER_PHONE_NO,
            shipToCusName: item.SHIP_TO_CUSTOMER_NAME,
            shipToAddr1: item.SHIP_TO_ADDR_1,
            shipToAddr2: item.SHIP_TO_ADDR_2,
            shipToAddr3: item.SHIP_TO_ADDR_3,
            shipToAddr4: item.SHIP_TO_ADDR_4,
            shipToPostcode: item.SHIP_TO_POSTCODE,
            shipToCity: item.SHIP_TO_CITY,
            shipToState: item.SHIP_TO_STATE,
            shipToCountry: item.SHIP_TO_COUNTRY,
            shipToTel: item.SHIP_TO_TEL,
            shipToFax: item.SHIP_TO_FAX,
            shipToEmail: item.SHIP_TO_EMAIL,
            barcode: item.BARCODE,
            qty: item.QTY,
          })),
          clientId: this.selected,
        });

        this.$router.replace({
          name: "orderlist",
        });
      } catch {
        this.$refs["file-selector"].value = "";
      }
    },
    onUpload() {
      this.$refs["file-selector"].click();
    },
  },
};
</script>

<style>
</style>
