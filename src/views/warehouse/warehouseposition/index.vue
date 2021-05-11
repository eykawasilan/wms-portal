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
            <h2>5. How many Partition in each Level<br>on each Rack for each Row?</h2>
            <b-col
              md="10"
              class="ml-auto mr-auto mt-5"
            >
              <!-- Tabs with card integration -->
              <b-tabs
                v-model="tabIndex"
              >
                <b-tab title="Row 1">
                  <b-row
                    class="match-height mt-5"
                  >
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 1:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack1level1">
                          1
                        </option>
                        <option value="rack1level2">
                          2
                        </option>
                        <option value="rack1level3">
                          3
                        </option>
                        <option value="rack1level4">
                          4
                        </option>
                        <option value="rack1level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 2:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected2"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack2level1">
                          1
                        </option>
                        <option value="rack2level2">
                          2
                        </option>
                        <option value="rack2level3">
                          3
                        </option>
                        <option value="rack2level4">
                          4
                        </option>
                        <option value="rack2level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 3:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected3"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack3level1">
                          1
                        </option>
                        <option value="rack3level2">
                          2
                        </option>
                        <option value="rack3level3">
                          3
                        </option>
                        <option value="rack3level4">
                          4
                        </option>
                        <option value="rack3level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 4:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected4"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack4level1">
                          1
                        </option>
                        <option value="rack4level2">
                          2
                        </option>
                        <option value="rack4level3">
                          3
                        </option>
                        <option value="rack4level4">
                          4
                        </option>
                        <option value="rack4level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 5:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected5"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack5level1">
                          1
                        </option>
                        <option value="rack5level2">
                          2
                        </option>
                        <option value="rack5level3">
                          3
                        </option>
                        <option value="rack5level4">
                          4
                        </option>
                        <option value="rack5level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Row 2">
                  <b-row
                    class="match-height mt-5"
                  >
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 1:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack1level1">
                          1
                        </option>
                        <option value="rack1level2">
                          2
                        </option>
                        <option value="rack1level3">
                          3
                        </option>
                        <option value="rack1level4">
                          4
                        </option>
                        <option value="rack1level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 2:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected2"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack2level1">
                          1
                        </option>
                        <option value="rack2level2">
                          2
                        </option>
                        <option value="rack2level3">
                          3
                        </option>
                        <option value="rack2level4">
                          4
                        </option>
                        <option value="rack2level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 3:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected3"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack3level1">
                          1
                        </option>
                        <option value="rack3level2">
                          2
                        </option>
                        <option value="rack3level3">
                          3
                        </option>
                        <option value="rack3level4">
                          4
                        </option>
                        <option value="rack3level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 4:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected4"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack4level1">
                          1
                        </option>
                        <option value="rack4level2">
                          2
                        </option>
                        <option value="rack4level3">
                          3
                        </option>
                        <option value="rack4level4">
                          4
                        </option>
                        <option value="rack4level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 5:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected5"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack5level1">
                          1
                        </option>
                        <option value="rack5level2">
                          2
                        </option>
                        <option value="rack5level3">
                          3
                        </option>
                        <option value="rack5level4">
                          4
                        </option>
                        <option value="rack5level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Row 3">
                  <b-row
                    class="match-height mt-5"
                  >
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 1:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack1level1">
                          1
                        </option>
                        <option value="rack1level2">
                          2
                        </option>
                        <option value="rack1level3">
                          3
                        </option>
                        <option value="rack1level4">
                          4
                        </option>
                        <option value="rack1level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 2:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected2"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack2level1">
                          1
                        </option>
                        <option value="rack2level2">
                          2
                        </option>
                        <option value="rack2level3">
                          3
                        </option>
                        <option value="rack2level4">
                          4
                        </option>
                        <option value="rack2level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 3:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected3"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack3level1">
                          1
                        </option>
                        <option value="rack3level2">
                          2
                        </option>
                        <option value="rack3level3">
                          3
                        </option>
                        <option value="rack3level4">
                          4
                        </option>
                        <option value="rack3level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 4:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected4"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack4level1">
                          1
                        </option>
                        <option value="rack4level2">
                          2
                        </option>
                        <option value="rack4level3">
                          3
                        </option>
                        <option value="rack4level4">
                          4
                        </option>
                        <option value="rack4level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Level 5:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected5"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="rack5level1">
                          1
                        </option>
                        <option value="rack5level2">
                          2
                        </option>
                        <option value="rack5level3">
                          3
                        </option>
                        <option value="rack5level4">
                          4
                        </option>
                        <option value="rack5level5">
                          5
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Row 4">
                  <b-row
                    class="match-height mt-5"
                  >
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Rack 1:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="row1rack1">
                          1 Rack
                        </option>
                        <option value="row1rack2">
                          2 Rack
                        </option>
                        <option value="row1rack3">
                          3 Rack
                        </option>
                        <option value="row1rack4">
                          4 Rack
                        </option>
                        <option value="row1rack5">
                          5 Rack
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Rack 2:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected2"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="row2rack1">
                          1 Rack
                        </option>
                        <option value="row2rack2">
                          2 Rack
                        </option>
                        <option value="row2rack3">
                          3 Rack
                        </option>
                        <option value="row2rack4">
                          4 Rack
                        </option>
                        <option value="row2rack5">
                          5 Rack
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Rack 3:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected3"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="row3rack1">
                          1 Rack
                        </option>
                        <option value="row3rack2">
                          2 Rack
                        </option>
                        <option value="row3rack3">
                          3 Rack
                        </option>
                        <option value="row3rack4">
                          4 Rack
                        </option>
                        <option value="row3rack5">
                          5 Rack
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Rack 4:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected4"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="row4rack1">
                          1 Rack
                        </option>
                        <option value="row4rack2">
                          2 Rack
                        </option>
                        <option value="row4rack3">
                          3 Rack
                        </option>
                        <option value="row4rack4">
                          4 Rack
                        </option>
                        <option value="row4rack5">
                          5 Rack
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Rack 5:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected5"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="row5rack1">
                          1 Rack
                        </option>
                        <option value="row5rack2">
                          2 Rack
                        </option>
                        <option value="row5rack3">
                          3 Rack
                        </option>
                        <option value="row5rack4">
                          4 Rack
                        </option>
                        <option value="row5rack5">
                          5 Rack
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Row 5">
                  <b-row
                    class="match-height mt-5"
                  >
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Rack 1:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="row1rack1">
                          1 Rack
                        </option>
                        <option value="row1rack2">
                          2 Rack
                        </option>
                        <option value="row1rack3">
                          3 Rack
                        </option>
                        <option value="row1rack4">
                          4 Rack
                        </option>
                        <option value="row1rack5">
                          5 Rack
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Rack 2:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected2"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="row2rack1">
                          1 Rack
                        </option>
                        <option value="row2rack2">
                          2 Rack
                        </option>
                        <option value="row2rack3">
                          3 Rack
                        </option>
                        <option value="row2rack4">
                          4 Rack
                        </option>
                        <option value="row2rack5">
                          5 Rack
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Rack 3:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected3"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="row3rack1">
                          1 Rack
                        </option>
                        <option value="row3rack2">
                          2 Rack
                        </option>
                        <option value="row3rack3">
                          3 Rack
                        </option>
                        <option value="row3rack4">
                          4 Rack
                        </option>
                        <option value="row3rack5">
                          5 Rack
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Rack 4:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected4"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="row4rack1">
                          1 Rack
                        </option>
                        <option value="row4rack2">
                          2 Rack
                        </option>
                        <option value="row4rack3">
                          3 Rack
                        </option>
                        <option value="row4rack4">
                          4 Rack
                        </option>
                        <option value="row4rack5">
                          5 Rack
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                  <b-row class="match-height mt-3">
                    <b-col
                      md="3"
                      class="text-right rack-title"
                    >
                      Rack 5:
                    </b-col>
                    <b-col
                      md="6"
                    >
                      <select
                        v-model="selected5"
                        name="parent"
                        class="form-control"
                        required
                      >
                        <option
                          value=""
                          selected
                          disabled
                        >
                          Please select one
                        </option>
                        <option value="row5rack1">
                          1 Rack
                        </option>
                        <option value="row5rack2">
                          2 Rack
                        </option>
                        <option value="row5rack3">
                          3 Rack
                        </option>
                        <option value="row5rack4">
                          4 Rack
                        </option>
                        <option value="row5rack5">
                          5 Rack
                        </option>
                      </select>
                    </b-col>
                  </b-row>
                </b-tab>
              </b-tabs>

              <!-- Control buttons-->
              <div class="text-center">
                <b-button-group class="mt-1">
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    @click="tabIndex--"
                  >
                    Previous
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(113, 102, 240, 0.15)'"
                    variant="outline-primary"
                    @click="tabIndex++"
                  >
                    Next
                  </b-button>
                </b-button-group>
              </div>
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
            style="border-left:1px solid #333; height:60vh"
          >
            <b-row>
            <b-col>
              <span>
                <h4 class="text-left">Rack 1</h4>
                <div v-if="selected === 'rack1level1'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected === 'rack1level2'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected === 'rack1level3'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected === 'rack1level4'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 4
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected === 'rack1level5'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 4
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 5
                    </b-col>
                  </b-row>
                </div>
              </span>
            </b-col>
            <!--------------------------------------------rack2------------------------------------>
            <b-col
              class="offset-1"
            >
              <span>
                <h4 class="text-left">Rack 2</h4>
                <div v-if="selected2 === 'rack2level1'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected2 === 'rack2level2'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected2 === 'rack2level3'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected2 === 'rack2level4'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 4
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected2 === 'rack2level5'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 4
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 5
                    </b-col>
                  </b-row>
                </div>
              </span>
            </b-col>
            <!------------------------------------rack3------------------------------------>
            <b-col
              class="offset-1"
            >
              <span>
                <h4 class="text-left">Rack 3</h4>
                <div v-if="selected3 === 'rack3level1'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Level 1
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected3 === 'rack3level2'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected3 === 'rack3level3'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected3 === 'rack3level4'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 4
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected3 === 'rack3level5'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 4
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 5
                    </b-col>
                  </b-row>
                </div>
              </span>
            </b-col>
            <!------------------------------------rack4------------------------------------>
            <b-col
              class="offset-1"
            >
              <span>
                <h4 class="text-left">Rack 4</h4>
                <div v-if="selected4 === 'rack4level1'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected4 === 'rack4level2'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected4 === 'rack4level3'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected4 === 'rack4level4'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 4
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected4 === 'rack4level5'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 4
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 5
                    </b-col>
                  </b-row>
                </div>
              </span>
            </b-col>
            <!------------------------------------Rack5------------------------------------>
            <b-col
              class="offset-1"
            >
              <span>
                <h4 class="text-left">Rack 5</h4>
                <div v-if="selected5 === 'rack5level1'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected5 === 'rack5level2'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected5 === 'rack5level3'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected5 === 'rack5level4'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 4
                    </b-col>
                  </b-row>
                </div>
                <div v-if="selected5 === 'rack5level5'">
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 1
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 2
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 3
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 4
                    </b-col>
                  </b-row>
                  <b-row>
                    <b-col
                      class="box-rack"
                    >
                      Rack 5
                    </b-col>
                  </b-row>
                </div>
              </span>
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
                  to="/warehouse/warehouselevel"
                  type="is-link"
                  block
                  :disabled="invalid"
                  variant="outline-dark"
                  class="mt-5 w-100"
                >
                  Back
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
import {
  BCard,
  BRow,
  BCol,
  BButton,
  BTab,
  BTabs,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BCard,
    BRow,
    BCol,
    BButton,
    BTab,
    BTabs,
  },
  directives: {
    Ripple,
  },
  data() {
    return {
      selected: '',
      selected2: '',
      selected3: '',
      selected4: '',
      selected5: '',
      tabIndex: 0,
    }
  },
}
</script>
