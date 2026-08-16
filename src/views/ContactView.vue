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
      isSending: false,
      statusMessage: "",
      isSuccess: false,
    }
  },
  methods: {
    sendMail() {
      this.isSending = true;
      this.statusMessage = "";
      this.isSuccess = false;

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        console.log(response)
        this.statusMessage = "Message sent successfully!";
        this.isSuccess = true;
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        console.error(error);
        this.statusMessage = "Failed to send message. Please try again.";
        this.isSuccess = false;
      })
      .finally(() => {
        this.isSending = false;
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
        <label for="name" class="d-block text_accent_custom fw-bold">Full name <span aria-hidden="true" class="text-danger">*</span></label>
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required :disabled="isSending">
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span aria-hidden="true" class="text-danger">*</span></label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required :disabled="isSending">
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span aria-hidden="true" class="text-danger">*</span></label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required :disabled="isSending"></textarea>
      </div>

      <div v-if="statusMessage" class="mb-3 status-message" :class="isSuccess ? 'text-success' : 'text-danger'" role="status" aria-live="polite">
        {{ statusMessage }}
      </div>

      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-3 py-2 d-flex align-items-center gap-2" type="submit" :disabled="isSending">
        <span v-if="isSending" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
        <span>{{ isSending ? 'Sending...' : 'Send e-mail' }}</span>
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
