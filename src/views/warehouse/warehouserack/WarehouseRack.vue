<template>
  <b-row class="match-height">
    <b-col>
      <b-card
        style="min-height:700px; height:100%;"
      >
        <b-row class="mt-5">
          <b-col
            md="6"
            class="text-center"
          >
            <h2>3. How many Racks in each row?</h2>
            <b-col lg="12" md="12" sm="12" class="mt-5">
              <b-row class="match-height">
                <b-col lg="2" md="2" sm="2" class="text-right">
                  <h4>Row 1:</h4>
                </b-col>
                <b-col lg="8" md="8" sm="10">
                  <ValidationObserver ref="form" #default="{}">
                      <ValidationProvider
                        #default="{ errors }"
                        name="Rack Number"
                        :rules="rules.racknumber"
                      >
                        <b-form-group class="w-100">
                          <b-input-group class="w-100">
                            <b-form-input
                              id="racknumber"
                              v-model="model.racknumber"
                              type="number"
                              maxlength="3"
                              value="100"
                              class="w-100"
                              :disabled="busy"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Enter Rack Number"
                            />
                          </b-input-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </ValidationProvider>
                    </ValidationObserver>
                </b-col>
              </b-row>
              <b-row class="match-height">
                <b-col lg="2" md="2" sm="2" class="text-right">
                  <h4>Row 2:</h4>
                </b-col>
                <b-col lg="8" md="8" sm="10">
                  <ValidationObserver ref="form" #default="{}">
                      <ValidationProvider
                        #default="{ errors }"
                        name="Rack Number"
                        :rules="rules.racknumber2"
                      >
                        <b-form-group class="w-100">
                          <b-input-group class="w-100">
                            <b-form-input
                              id="racknumber2"
                              v-model="model.racknumber2"
                              type="number"
                              maxlength="3"
                              value="100"
                              class="w-100"
                              :disabled="busy"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Enter Rack Number"
                            />
                          </b-input-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </ValidationProvider>
                  </ValidationObserver>
                </b-col>
              </b-row>
              <b-row class="match-height">
                <b-col lg="2" md="2" sm="2" class="text-right">
                  <h4>Row 3:</h4>
                </b-col>
                <b-col lg="8" md="8" sm="10">
                  <ValidationObserver ref="form" #default="{}">
                      <ValidationProvider
                        #default="{ errors }"
                        name="Rack Number"
                        :rules="rules.racknumber3"
                      >
                        <b-form-group class="w-100">
                          <b-input-group class="w-100">
                            <b-form-input
                              id="racknumber3"
                              v-model="model.racknumber3"
                              type="number"
                              maxlength="3"
                              value="100"
                              class="w-100"
                              :disabled="busy"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Enter Rack Number"
                            />
                          </b-input-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </ValidationProvider>
              </ValidationObserver>
                </b-col>
              </b-row>
              <b-row>
                <b-col class="overflow-auto">
                  <b-col lg="6" md="6" sm="12" class="mt-3 ml-auto mr-auto">
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                      first-number
                      last-number
                    />
                  </b-col>
                </b-col>
              </b-row>
            </b-col>
            <b-col
              class="mt-3"
            >
              <p>Magic will happen on your right hand side once you click on Submit button</p>
            </b-col>
          </b-col>
          <b-col
            md="6"
            class="text-center"
            style="border-left:1px solid #333; height:60vh"
          >
            <b-col
              md="8"
              class="ml-auto mr-auto"
            >
            Rack Display Here
            </b-col>
            <b-row>
              <b-col lg="12" md="12" sm="12" class="mt-5">
                {{ model.racknumber }}
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12" md="12" sm="12" class="mt-5">
                {{ model.racknumber2 }}
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="12" md="12" sm="12" class="mt-5">
                {{ model.racknumber3 }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-row
          class="mt-3"
        >
          <b-col
            md="12"
          >
            <b-row>
              <b-col
                md="2"
                class="mr-auto"
              >
                <b-button
                  v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                  tag="router-link"
                  to="/warehouse/warehouselayout"
                  type="is-link"
                  block
                  :disabled="invalid"
                  variant="outline-dark"
                  class="mt-5 w-100"
                >
                  Back
                </b-button>
              </b-col>
              <b-col
                md="2"
                class="ml-auto"
              >
                <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                tag="router-link"
                to="/warehouse/warehouselevel"
                type="is-link"
                block
                :disabled="invalid"
                variant="outline-primary"
                class="mt-5 w-100"
              >
                Next
              </b-button>
              </b-col>
            </b-row>
          </b-col>
        </b-row>
      </b-card>
    </b-col>
  </b-row>
</template>

<script>
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  data() {
    return {
      rows: 100,
      perPage: 10,
      currentPage: 1,
      selected: null,
      options: null,
      rules: {
        racknumber: {
          required: true,
        },
        racknumber2: {
          required: true,
        },
        racknumber3: {
          required: true,
        },
      },
      model: {
        racknumber: "",
        racknumber2: "",
        racknumber3: "",
      },
    }
  },
}
</script>
