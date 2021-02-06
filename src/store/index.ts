import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    applicationId: "806888556819382302",
    state: "",
    details: "",
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
  },
  mutations: {
    setAppId(state, appId: string) {
      state.applicationId = appId;
    },
    setState(state, _state: string) {
      state.state = _state;
    },
    setDetails(state, details: string) {
      state.details = details;
    },
    setAssets(
      state,
      images: {
        small: { key: string; text: string };
        big: { key: string; text: string };
      }
    ) {
      state.assets = images;
    },
    setButtons(
      state,
      buttons: [{ label: string; url: string }, { label: string; url: string }]
    ) {
      state.buttons = buttons;
    },
  },
  actions: {
    async update({ commit }, data) {
      let updatedAppId = false; // Do something with this to reauth on the clientI

      if (data.applicationId) {
        updatedAppId = true;
        commit("setAppId", data.applicationid);
      }
      if (data.state) commit("setState", data.state);
      if (data.details) commit("setDetails", data.details);
      if (data.images) commit("setAssets", data.images);
      if (data.buttons) commit("setButtons", data.buttons);
    },
  },
  modules: {},
});
