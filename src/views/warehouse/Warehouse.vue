<template>
  <b-row>
    <b-col>
      <b-card>
        <b-card-body
          class="text-center p-5"
        >
          <h1>You haven’t set up the layout for your warehouse.</h1>
          <b-col
            lg="3"
            md="3"
            sm="4"
            class="mt-3 ml-auto mr-auto"
          >
            <b-button
              tag="router-link"
              to="/warehouse/warehouserow"
              variant="primary"
              type="is-link"
              block
              :disabled="invalid"
            >
              Create
            </b-button>
          </b-col>
          <b-col
            lg="6"
            md="6"
            sm="12"
            class="ml-auto mr-auto"
          >
            <p>Don’t worry, we will guide you to create your perfect layout</p>
          </b-col>
        </b-card-body>
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
