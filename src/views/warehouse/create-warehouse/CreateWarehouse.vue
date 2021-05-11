<template>
  <b-row>
    <b-col>
      <b-card
        style="min-height:600px; height:600px;"
      >
        <b-row class="mt-5">
          <b-col
            md="6"
            class="text-center"
          >
            <h2>2. Select your warehouse layout.</h2>
            <b-col
              md="4"
              class="ml-auto mr-auto mt-3"
            >
              <b-form-group
                v-slot="{ ariaDescribedby }"
                label="Individual radios"
              >
                <b-col
                  md="12"
                >
                  <b-row>
                    <b-col
                      md="6"
                    >
                      <b-form-radio
                        v-model="selected"
                        :aria-describedby="ariaDescribedby"
                        name="some-radios"
                        value="A"
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
                        value="B"
                      >
                        Option B
                      </b-form-radio>
                    </b-col>
                  </b-row>
                </b-col>
              </b-form-group>
            </b-col>
            <p>Magic will happen on your right hand side your enter a value</p>
          </b-col>
          <b-col
            md="6"
            class="text-center"
          >
            Selected: <strong>{{ selected }}</strong>
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
                size="lg"
                variant="outline-dark"
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
