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
      feedbackMessage: "",
      feedbackStatus: "", // 'success' or 'error'
    }
  },
  methods: {
    sendMail() {
      this.isSending = true;
      this.feedbackMessage = "";
      this.feedbackStatus = "";

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        this.feedbackStatus = "success";
        this.feedbackMessage = "Your message has been sent successfully!";
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        console.error(error);
        this.feedbackStatus = "error";
        this.feedbackMessage = "An error occurred while sending your message. Please try again later.";
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
        <label for="name" class="d-block text_accent_custom fw-bold">Full name <span class="text-danger" aria-hidden="true">*</span></label>
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required :disabled="isSending">
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span class="text-danger" aria-hidden="true">*</span></label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required :disabled="isSending">
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span class="text-danger" aria-hidden="true">*</span></label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required :disabled="isSending"></textarea>
      </div>

      <div v-if="feedbackMessage" role="status" aria-live="polite" class="mb-3 fw-bold" :class="feedbackStatus === 'success' ? 'text-success' : 'text-danger'">
        {{ feedbackMessage }}
      </div>

      <button
        class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-3 py-2 d-inline-flex align-items-center gap-2"
        type="submit"
        :disabled="isSending"
        :aria-busy="isSending"
      >
        <font-awesome-icon v-if="isSending" icon="fa-solid fa-circle-notch" spin />
        <span>{{ isSending ? 'Sending...' : 'Send e-mail' }}</span>
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
