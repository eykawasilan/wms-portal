<template>
  <b-overlay
    :show="overlay"
    spinner-variant="primary"
    spinner-type="grow"
    spinner-small
    rounded="sm"
  >
    <b-row class="match-height">
      <b-col id="printMe" lg="3" md="3" sm="12">
        <b-card>
          <b-card-header>
            <h2>Customer Detail</h2>
          </b-card-header>
          <b-card-body>
            <b-col class="mb-2">
              <div>Customer Name:</div>
              <div class="font-weight-bold">
                <p>{{ customer.name || "-" }}</p>
              </div>
            </b-col>
            <b-col class="mb-2">
              <div>Customer Phone Number:</div>
              <div class="font-weight-bold">
                <p>{{ customer.phone || "-" }}</p>
              </div>
            </b-col>
            <b-col class="mb-2">
              <div>Customer Address</div>
              <div class="font-weight-bold">
                <p>
                  {{ customer.address || "-" }}
                </p>
              </div>
            </b-col>
            <b-col class="mb-2">
              <div>Customer Email:</div>
              <div class="font-weight-bold">
                <p>{{ customer.email || "-" }}</p>
              </div>
            </b-col>
            <b-col md="6" class="ml-auto mr-auto">
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
      <b-col lg="9" md="9" sm="12">
        <b-card>
          <b-card-header>
            <h2>Confirm List</h2>
          </b-card-header>
          <b-row>
            <b-col cols="12" class="mt-3">
              <b-table
                striped
                hover
                responsive
                :per-page="perPage"
                :items="items"
                :fields="fields"
              >
                <template #cell(order_item)="data">
                  {{ data.item.skuName }}
                  <br />
                  <small style="opacity: 0.8">{{ data.item.skuCode }}</small>
                </template>
              </b-table>
            </b-col>
          </b-row>
        </b-card>
      </b-col>
    </b-row>
  </b-overlay>
</template>

<script>
export default {
  data() {
    return {
      output: null,
      perPage: 5,
      pageOptions: [3, 5, 10],
      totalRows: 1,
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
        { key: "order_item", label: "Order Item", sortable: true },
        "quantity",
      ],
      items: [],
      selected: null,
      options: [{ value: null, text: "Please select Client Name" }],
      customer: {
        name: "",
        phone: "",
        address: "",
        email: "",
      },
      overlay: false,
      pdfUrl: null,
    };
  },
  async beforeMount() {
    this.getCustomerInfo();
    this.getOrderByTrayCode();
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;
  },
  methods: {
    async getCustomerInfo() {
      const { data } = await this.$api.order.getCustomerInfo({
        orderId: this.$route.params.id,
      });

      if (typeof data === "object") {
        const { customerInfo } = data;
        const address = [
          customerInfo.address1,
          customerInfo.address2,
          customerInfo.address3,
          customerInfo.address4,
        ];

        this.customer.name = customerInfo.name;
        this.customer.phone = customerInfo.phoneNo;
        this.customer.email = customerInfo.email;
        this.customer.address = address.filter((item) => item).join(",");
      }
    },
    async getOrderByTrayCode() {
      const { data } = await this.$api.order.getOrderByTrayCode({
        trayCode: this.$route.params.trayname,
      });

      if (typeof data === "object") {
        const { orderData } = data;

        this.items = orderData?.order_item.map((item) => ({
          id: item.id,
          order_item: item.sku?.sku_code,
          skuCode: item.sku?.sku_code,
          skuName: item.sku?.sku_name,
          quantity: item.qty,
        }));
      }
    },
    openPDF() {
      window.open(this.pdfUrl, "_blank");
    },
    async print() {
      try {
        this.overlay = true;

        if (!this.pdfUrl) {
          const { data } = await this.$api.order.print({
            orderId: this.$route.params.id,
          });

          const options = {
            type: data.type,
          };

          const file = new File(
            [data],
            `Packing Details -${this.$route.params.trayCode}.pdf`,
            options,
          );

          this.pdfUrl = URL.createObjectURL(file);
        }

        this.openPDF();
      } finally {
        this.overlay = false;
      }
    },
  },
};
</script>
