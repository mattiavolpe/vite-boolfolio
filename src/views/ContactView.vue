<script>
import { state } from "../state.js";
import axios from "axios";
import SectionTitle from "../components/SectionTitle.vue";
export default {
  name: "ContactsView",
  components: {
    SectionTitle,
  },
  data() {
    return {
      state,
      name: "",
      emailAddress: "",
      emailContent: "",
    }
  },
  methods: {
    sendMail() {
      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.error(error);
      })
    },
  }
}
</script>

<template>
  <div class="container py-5">
    <SectionTitle>
      CONTACT ME
    </SectionTitle>
    <form @submit.prevent="sendMail()">
      <div class="mb-3">
        <label for="name" class="d-block text_accent_custom fw-bold">Full name</label>
        <input type="mail" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name">
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address</label>
        <input type="mail" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress">
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Insert your text</label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your e-mail message" v-model="emailContent"></textarea>
      </div>
      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-2 py-1" type="submit">Send e-mail</button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
