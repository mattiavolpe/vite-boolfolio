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
      isLoading: false,
      statusMessage: "",
      statusError: false,
    }
  },
  methods: {
    sendMail() {
      this.isLoading = true;
      this.statusMessage = "";
      this.statusError = false;

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        this.statusMessage = "Message sent successfully!";
        this.statusError = false;
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        this.statusMessage = "Failed to send message. Please try again.";
        this.statusError = true;
      })
      .finally(() => {
        this.isLoading = false;
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
        <label for="name" class="d-block text_accent_custom fw-bold">
          Full name <span aria-hidden="true" class="text-danger">*</span>
        </label>
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required :disabled="isLoading">
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">
          E-mail address <span aria-hidden="true" class="text-danger">*</span>
        </label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required :disabled="isLoading">
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">
          Your message <span aria-hidden="true" class="text-danger">*</span>
        </label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required :disabled="isLoading"></textarea>
      </div>
      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-3 py-2" type="submit" :disabled="isLoading" aria-live="polite">
        <span v-if="isLoading">
          <font-awesome-icon icon="fa-regular fa-hourglass" class="me-2 fa-spin" />
          Sending...
        </span>
        <span v-else>Send e-mail</span>
      </button>
      <p v-if="statusMessage" id="status-message" aria-live="polite" class="mt-3 fw-bold" :class="statusError ? 'text-danger' : 'text-success'">
        {{ statusMessage }}
      </p>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
