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
      sendStatus: null,
    }
  },
  methods: {
    sendMail() {
      this.isSending = true;
      this.sendStatus = null;

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        console.log(response);
        this.sendStatus = 'success';
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        console.error(error);
        this.sendStatus = 'error';
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
        <label for="name" class="d-block text_accent_custom fw-bold">Full name <span aria-hidden="true" style="color: #dc3545;">*</span></label>
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required>
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span aria-hidden="true" style="color: #dc3545;">*</span></label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required>
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span aria-hidden="true" style="color: #dc3545;">*</span></label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required></textarea>
      </div>
      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-2 py-1 d-flex align-items-center justify-content-center" type="submit" :disabled="isSending">
        <span v-if="isSending" class="spinner-border spinner-border-sm" style="margin-right: 0.5rem;" aria-hidden="true"></span>
        {{ isSending ? 'Sending...' : 'Send e-mail' }}
      </button>
      <p v-if="sendStatus === 'success'" class="mt-2 mb-0" style="color: #28a745;" role="status">Message sent successfully!</p>
      <p v-if="sendStatus === 'error'" class="mt-2 mb-0" style="color: #dc3545;" role="alert">Failed to send message. Please try again.</p>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
