<template>
  <b-row>
    <b-col>
      <b-card
        style="min-height:600px; height:100%;"
      >
        <b-row class="mt-5">
          <b-col
            md="6"
            class="text-center"
          >
            <h2>1. First,tell us how many row of rack you have in your warehouse?</h2>
            <b-col
              md="6"
              class="ml-auto mr-auto mt-3"
            >
              <ValidationObserver ref="form" #default="{}">
                <b-form @submit.prevent>
                  <b-row>
                    <b-col lg="12" md="12" sm="12">
                      <ValidationProvider
                        #default="{ errors }"
                        name="Row Number"
                        :rules="rules.rownumber"
                      >
                        <b-form-group class="w-100">
                          <b-input-group class="w-100">
                            <b-form-input
                              id="rownumber"
                              v-model="model.rownumber"
                              oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                              type="number"
                              maxlength="3"
                              value="100"
                              class="w-100"
                              :disabled="busy"
                              :state="errors.length > 0 ? false : null"
                              placeholder="Enter Row Number"
                            />
                          </b-input-group>
                          <small class="text-danger">{{ errors[0] }}</small>
                        </b-form-group>
                      </ValidationProvider>
                    </b-col>
                  </b-row>
                </b-form>
              </ValidationObserver>
            </b-col>
            <b-col
              class="mt-3"
            >
              <p>Magic will happen on your right hand side once you select the value</p>
            </b-col>
          </b-col>
          <b-col
            md="6"
            class="text-center"
            style="border-left:1px solid #333; height:50vh"
          >
            <b-col
              md="8"
              class="ml-auto mr-auto"
            >
            Row Display Here
            </b-col>
            <b-row>
              <b-col lg="12" md="12" sm="12" class="mt-5">
                {{ model.rownumber }}
              </b-col>
            </b-row>
          </b-col>
        </b-row>
        <b-col
          md="12"
        >
          <b-row>
            <b-col
              md="2"
              class="ml-auto"
            >
              <b-button
                v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                tag="router-link"
                to="/warehouse/warehouselayout"
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
      rules: {
        rownumber: {
          required: true,
        },
      },
      model: {
        rownumber: "",
      },
    }
  },
}
</script>
