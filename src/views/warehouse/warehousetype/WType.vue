<template>
  <b-row class="match-height">
    <b-col>
      <b-card class="text-center p-5">
        <h1>Please select your warehouse type.</h1>
        <b-row class="match-height">
          <b-col
            lg="6"
            md="6"
            sm="12"
            class="mt-5 ml-auto mr-auto"
          >
            <b-col
              lg="10"
              md="10"
              sm="10"
              class="ml-auto mr-auto"
            >
              <h3>Standard Warehouse</h3>
              <p>Standard warehouse can be use for most of the use case in all industry</p>
            </b-col>
            <b-col
              lg="4"
              md="4"
              sm="8"
              class="ml-auto mr-auto"
            >
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                class="w-100"
                to="/warehouse/warehousetype"
                variant="primary"
              >
                Create
              </b-button>
            </b-col>
          </b-col>
          <b-col
            lg="6"
            md="6"
            sm="12"
            class="mt-5 ml-auto mr-auto"
          >
            <b-col
              lg="10"
              md="10"
              sm="10"
              class="ml-auto mr-auto"
            >
              <h3>Fulfillment Warehouse</h3>
              <p>Fulfillment warehouse is targeted to e-commerce player with all the functionality to speed up the process and reduce the cost. In Fulfillment warehouse, you will have two types of warehouse racking system, Low Rack and High Rack.</p>
              <b-col
                lg="4"
                md="4"
                sm="8"
                class="ml-auto mr-auto"
              >
                <b-button
                  -ripple.400="'rgba(255, 255, 255, 0.15)'"
                  class="w-100"
                  to="/warehouse/warehousetype"
                  variant="primary"
                >
                  Create
                </b-button>
              </b-col>
            </b-col>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>
<script>
import {
  BRow, BCol, BCard, BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BButton,
  },
}
</script>
