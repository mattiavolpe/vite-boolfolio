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
      loading: false,
      success: false,
      errorMsg: "",
    }
  },
  methods: {
    sendMail() {
      this.loading = true;
      this.success = false;
      this.errorMsg = "";
      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        console.log(response)
        this.success = true;
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        console.error(error);
        this.errorMsg = "An error occurred while sending your message. Please try again.";
      })
      .finally(() => {
        this.loading = false;
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
        <label for="name" class="d-block text_accent_custom fw-bold">Full name <span class="text-danger" aria-hidden="true">*</span></label>
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required aria-required="true">
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span class="text-danger" aria-hidden="true">*</span></label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required aria-required="true">
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span class="text-danger" aria-hidden="true">*</span></label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required aria-required="true"></textarea>
      </div>
      <div v-if="success" class="alert alert-success" role="alert">
        Message sent successfully!
      </div>
      <div v-if="errorMsg" class="alert alert-danger" role="alert">
        {{ errorMsg }}
      </div>
      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-3 py-2 d-flex align-items-center gap-2" type="submit" :disabled="loading">
        <span v-if="loading" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span v-if="loading">Sending...</span>
        <span v-else>Send e-mail</span>
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
