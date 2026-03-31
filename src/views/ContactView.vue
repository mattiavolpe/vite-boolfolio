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
    }
  },
  methods: {
    async sendMail() {
      this.isSending = true;
      this.statusMessage = "";

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      try {
        const response = await axios.post(state.host + state.contactEndpoint, data);
        console.log(response);
        this.statusMessage = "Message sent successfully!";
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      } catch (error) {
        console.error(error);
        this.statusMessage = "Failed to send message. Please try again.";
      } finally {
        this.isSending = false;
      }
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
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" :disabled="isSending" required aria-required="true">
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span class="text-danger" aria-hidden="true">*</span></label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" :disabled="isSending" required aria-required="true">
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span class="text-danger" aria-hidden="true">*</span></label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" :disabled="isSending" required aria-required="true"></textarea>
      </div>
      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-2 py-1" type="submit" :disabled="isSending" :aria-disabled="isSending">
        {{ isSending ? 'Sending...' : 'Send e-mail' }}
      </button>
      <div v-if="statusMessage" class="mt-3 fw-bold" role="status" aria-live="polite">
        {{ statusMessage }}
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
