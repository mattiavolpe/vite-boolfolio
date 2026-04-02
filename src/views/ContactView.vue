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
      feedbackType: "", // 'success' or 'error'
    }
  },
  methods: {
    sendMail() {
      this.isSending = true;
      this.feedbackMessage = "";
      this.feedbackType = "";

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        this.feedbackMessage = "Your message was sent successfully!";
        this.feedbackType = "success";
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        this.feedbackMessage = "Failed to send message. Please try again.";
        this.feedbackType = "error";
        console.error(error);
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
        <label for="name" class="d-block text_accent_custom fw-bold">Full name</label>
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required>
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address</label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required>
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message</label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required></textarea>
      </div>
      <div class="d-flex align-items-center gap-3">
        <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-2 py-1" type="submit" :disabled="isSending">
          {{ isSending ? 'Sending...' : 'Send e-mail' }}
        </button>
        <div v-if="feedbackMessage" role="status" aria-live="polite" :class="feedbackType === 'success' ? 'text-success' : 'text-danger'">
          {{ feedbackMessage }}
        </div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
