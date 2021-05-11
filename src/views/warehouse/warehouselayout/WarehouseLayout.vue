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
            <h2>2. Select your warehouse layout.</h2>
            <b-col
              md="6"
              class="ml-auto mr-auto mt-5"
            >
              <b-form-group
                v-slot="{ ariaDescribedby }"
              >
                <b-row>
                  <b-col
                    md="6"
                  >
                    <b-form-radio
                      v-model="selected"
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="optionA"
                    >
                      Option A
                    </b-form-radio>
                  </b-col>
                  <b-col
                    md="6"
                  >
                    <b-form-radio
                      v-model="selected"
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="optionB"
                    >
                      Option B
                    </b-form-radio>
                  </b-col>
                </b-row>
              </b-form-group>
            </b-col>
            <b-col
              class="mt-3"
            >
              <p>WOAH~~ Something just change on your right hand side</p>
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
              <span>
                <div v-if="selected === 'optionA'">
                  <b-col
                    class="box-layout mt-5"
                  >
                    Row 1
                  </b-col>
                  <b-col
                    class="box-layout-path"
                  >
                    path 1
                  </b-col>
                  <b-col
                    class="box-layout"
                  >
                    Row 2
                  </b-col>
                  <b-col
                    class="box-layout"
                  >
                    Row 3
                  </b-col>
                  <b-col
                    class="box-layout-path"
                  >
                    path 1
                  </b-col>
                  <b-col
                    class="box-layout"
                  >
                    Row 4
                  </b-col>
                  <b-col
                    class="box-layout"
                  >
                    Row 5
                  </b-col>
                  <b-col
                    class="box-layout-path"
                  >
                    path 1
                  </b-col>
                </div>
                <div v-if="selected === 'optionB'">
                  <b-col
                    class="box-layout-path mt-5"
                  >
                    path 1
                  </b-col>
                  <b-col
                    class="box-layout"
                  >
                    Row 1
                  </b-col>
                  <b-col
                    class="box-layout"
                  >
                    Row 2
                  </b-col>
                  <b-col
                    class="box-layout-path"
                  >
                    path 1
                  </b-col>
                  <b-col
                    class="box-layout"
                  >
                    Row 3
                  </b-col>
                  <b-col
                    class="box-layout"
                  >
                    Row 4
                  </b-col>
                  <b-col
                    class="box-layout-path"
                  >
                    path 1
                  </b-col>
                  <b-col
                    class="box-layout"
                  >
                    Row 5
                  </b-col>
                </div>
              </span>
            </b-col>
          </b-col>
        </b-row>
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
                to="/warehouse/warehouserow"
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
                to="/warehouse/warehouserack"
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
import {
  BCard,
  BRow,
  BCol,
  BFormGroup,
  BButton,
  BFormRadio,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BFormGroup,
    BFormRadio,
    BButton,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selected: '',
    }
  },
}
</script>
