<template>
  <div>
    <b-card>
      <b-col md="12">
        <div
          class="row"
        >
          <div
            class="col-lg-4 col-md-4 col-sm-12 col-xs-12"
          >
            <b-card
              no-body
              class="sku-statistic"
            >
              <b-card-header>
                <b-card-title>
                  Client Name
                </b-card-title>
              </b-card-header>
              <b-card-body class="statistics-body">
                <b-row>
                  <b-col
                    v-for="item in statisticsItems"
                    :key="item.icon"
                    md="6"
                    sm="6"
                    class="mb-2 mb-md-0"
                    :class="item.customClass"
                  >
                    <b-media no-body>
                      <b-media-aside
                        class="mr-2"
                      >
                        <b-avatar
                          size="48"
                          :variant="item.color"
                        >
                          <feather-icon
                            size="24"
                            :icon="item.icon"
                          />
                        </b-avatar>
                      </b-media-aside>
                      <b-media-body class="my-auto">
                        <h4 class="font-weight-bolder mb-0">
                          {{ item.title }}
                        </h4>
                        <b-card-text class="font-small-3 mb-0">
                          {{ item.subtitle }}
                        </b-card-text>
                      </b-media-body>
                    </b-media>
                  </b-col>
                </b-row>
              </b-card-body>
            </b-card>
          </div>
          <div
            class="col-lg-8 col-md-8 col-sm-12 col-xs-12"
          >
            <b-table
              responsive
              :items="items"
              :fields="fields"
              class="mb-0"
            />
          </div>
        </div>
      </b-col>
    </b-card>
  </div>
</template>

<script>
import {
  BTable, BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'

export default {
  components: {
    BTable,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BRow,
    BCol,
    BMedia,
    BMediaAside,
    BAvatar,
    BMediaBody,
  },
  data() {
    return {
      fields: [
        'skuid',
        'product_name',
        'product_type',
        'total_quantity',
      ],
      items: [
        {
          skuid: 'BM-0987625368',
          product_name: 'Germen Premier',
          product_type: 'Food',
          total_quantity: '1000',

        },
        {
          skuid: 'BM-0987625369',
          product_name: 'Germen Premier',
          product_type: 'Food',
          total_quantity: '1000',
        },
        {
          skuid: 'BM-0987625370',
          product_name: 'Germen Premier',
          product_type: 'Food',
          total_quantity: '1000',
        },
      ],
      statisticsItems: [
        {
          icon: 'UserIcon',
          color: 'light-info',
          title: '8.549k',
          subtitle: 'SKUs Count',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-danger',
          title: '1.423k',
          subtitle: 'Total Item Quantity',
          customClass: 'mb-2 mb-sm-0',
        },
      ],
    }
  },
}
</script>
