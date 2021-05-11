<template>
  <div>
    <template v-if="options == null"> Loading Clients... </template>
    <template v-else>
      <b-card title="">
        <b-card-text>Select Client Name</b-card-text>
        <b-row>
          <b-col md="12">
            <b-row>
              <div class="col-lg-4 col-md-4 col-sm-12 col-xs-12">
                <b-form-select v-model="selected" :options="options" />
              </div>
              <div class="col-lg-4">
                <b-button
                  tag="router-link"
                  to="/inbound/uploadfile"
                  variant="primary"
                  type="is-link"
                  block
                  :disabled="invalid"
                >
                  Upload Inbound Request File
                </b-button>
              </div>
              <div class="col-lg-4">
                <b-button
                  tag="router-link"
                  to="/inbound/createthroughlist"
                  variant="primary"
                  type="is-link"
                  block
                  :disabled="invalid"
                  @click="$store.commit('inbound/clientID', selected)"
                >
                  Create Inbound Request Through List
                </b-button>
              </div>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </template>
  </div>
</template>

<script>
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
};
</script>

<style>
</style>
