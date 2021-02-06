<template>
  <v-form ref="form">
    <v-text-field
      v-model="appId"
      label="Application ID"
      required
    ></v-text-field>
    <v-text-field v-model="state" label="State"></v-text-field>
    <v-text-field v-model="details" label="Details"></v-text-field>

    <v-container text-xs-center>
      <v-layout row wrap>
        <v-flex xs5 class="mx-auto">
          <v-card outlined class="pa-3">
            <v-text-field
              v-model="assets.small.key"
              label="Small image key (Remove to disable)"
            ></v-text-field>
            <v-text-field
              v-model="assets.small.text"
              label="Small image text"
            ></v-text-field>
          </v-card>
        </v-flex>
        <v-flex xs5 class="mx-auto">
          <v-card outlined class="pa-3">
            <v-text-field
              v-model="assets.big.key"
              label="Big image key (Remove to disable)"
            ></v-text-field>
            <v-text-field
              v-model="assets.big.text"
              label="Big image text"
            ></v-text-field>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-container text-xs-center>
      <v-layout row wrap>
        <v-flex xs5 class="mx-auto">
          <v-card outlined class="pa-3">
            <v-text-field
              v-model="buttons[0].label"
              label="Button one text (Remove to disable)"
            ></v-text-field>
            <v-text-field
              v-model="buttons[0].url"
              label="Button one URL"
            ></v-text-field>
          </v-card>
        </v-flex>
        <v-flex xs5 class="mx-auto">
          <v-card outlined class="pa-3">
            <v-text-field
              v-model="buttons[1].label"
              label="Button two text (Remove to disable)"
            ></v-text-field>
            <v-text-field
              v-model="buttons[1].url"
              label="Button two URL"
            ></v-text-field>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn color="success" class="mr-4" @click="update"> Update </v-btn>

    <v-btn color="error" class="mr-4" @click="reset"> Reset Form </v-btn>
    <ConfirmDialog ref="confirm" />
    <v-snackbar v-model="snackbar.enabled" :timeout="snackbar.timeout">
      {{ snackbar.text }}
      <template v-slot:action="{ attrs }">
        <v-btn
          :color="snackbar.color"
          text
          v-bind="attrs"
          @click="
            snackbar.enabled = false;
            snackbar.text = '';
          "
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-form>
  <!--<input
      type="text"
      name="App ID"
      id="appId"
      v-model="appId"
      v-if="advancedMode"
    />
  </div> -->
</template>

<script lang="ts">
import Vue from "vue";

import ConfirmDialog from "@/components/ConfirmDialog.vue";

export default Vue.extend({
  name: "Home",

  components: {
    ConfirmDialog,
  },

  data: () => ({
    appId: "806888556819382302",
    details: "",
    state: "",
    assets: {
      small: {
        key: "",
        text: "",
      },
      big: {
        key: "",
        text: "",
      },
    },
    buttons: [
      {
        label: "",
        url: "",
      },
      {
        label: "",
        url: "",
      },
    ],

    snackbar: { enabled: false, timeout: 2000, text: "", color: "" },
  }),

  methods: {
    async reset() {
      if (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (this.$refs.confirm as any).open(
          "Confirm",
          "Are you sure you want to reset?"
        )
      ) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this.$refs.form as any).reset();
      }
    },

    update() {
      if (this.appId === "") {
        this.snackbar.text = "Failed to update; Application ID can't be empty";
        this.snackbar.color = "error";
        this.snackbar.enabled = true;
        return;
      }

      this.$store
        .dispatch("update", {
          applicationId: this.appId,
          state: this.state,
          details: this.details,
          assets: this.assets,
          buttons: this.buttons,
        })
        .then(() => {
          this.snackbar.text = "Successfully updated status";
          this.snackbar.enabled = true;
          this.snackbar.color = "success";
        })
        .catch((err) => {
          this.snackbar.text = err.message;
          this.snackbar.color = "error";
          this.snackbar.enabled = true;
        });
    },
  },
});
</script>
