<template>
  <b-row class="match-height">
    <b-col
      lg="12"
      md="12"
      sm="12"
    >
      <b-card>
        <b-card-header>
          <b-row>
            <b-col lg="12" md="12" sm="12">
              <h2>Manifest Detail</h2>
            </b-col>
          </b-row>
        </b-card-header>
          <b-col lg="4" md="4" sm="6" class="ml-auto mt-3 mb-3">
            <b-row>
              <b-col>
                <b-button
                  tag="router-link"
                  to="/inbound/createthroughlist"
                  variant="outline-secondary"
                  type="is-link"
                  block
                  :disabled="invalid"
                >
                  Generate PDF
                </b-button>
              </b-col>
              <b-col>
                <b-button
                  tag="router-link"
                  to="/inbound/createthroughlist"
                  variant="outline-secondary"
                  type="is-link"
                  block
                  :disabled="invalid"
                >
                  Print
                </b-button>
              </b-col>
            </b-row>
          </b-col>
        <b-row>
          <b-col lg="6" md="6" sm="6">
            <b-row>
              <b-col lg="3" md="3" sm="3">
                Manifest Code:
              </b-col>
              <b-col lg="9" md="9" sm="9">
                UAZ-0993-220
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col lg="3" md="3" sm="3">
                Status:
              </b-col>
              <b-col lg="9" md="9" sm="9">
                Pending
              </b-col>
            </b-row>
          </b-col>
          <b-col lg="6" md="6" sm="6">
            <b-row>
              <b-col lg="3" md="3" sm="3">
                Created Date:
              </b-col>
              <b-col lg="9" md="9" sm="9">
                05/05/2021
              </b-col>
            </b-row>
            <b-row class="mt-2">
              <b-col lg="3" md="3" sm="3">
                Document URL:
              </b-col>
              <b-col lg="9" md="9" sm="9">
                <a href="http://wms-dev.epost.tech/">wms-dev.epost.tech</a>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-col lg="6" md="6" sm="12" class="ml-auto mr-auto mt-5">
          <b-row>
            <b-col>
              <b-button
                tag="router-link"
                to="/outbound/outboundlist"
                variant="danger"
                type="is-link"
                block
                :disabled="invalid"
              >
                Cancel
              </b-button>
            </b-col>
            <b-col>
              <b-button
                tag="router-link"
                to="/outbound/outboundlis"
                variant="primary"
                type="is-link"
                block
                :disabled="invalid"
              >
                Complete
              </b-button>
            </b-col>
          </b-row>
        </b-col>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
export default {
}
</script>
