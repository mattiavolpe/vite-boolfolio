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
      // Added isSending state to disable submit button during async request (UX enhancement)
      isSending: false,
      // Added isSuccess and isError states for accessible post-submission feedback
      isSuccess: false,
      isError: false,
    }
  },
  methods: {
    sendMail() {
      // Set sending state to provide visual feedback and prevent duplicate submissions
      this.isSending = true;
      this.isSuccess = false;
      this.isError = false;

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        console.log(response);
        // Provide success feedback and clear form
        this.isSuccess = true;
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        console.error(error);
        // Provide error feedback
        this.isError = true;
      })
      .finally(() => {
        // Always reset sending state
        this.isSending = false;
      });
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
        <!-- Changed type="mail" to type="text" and added 'required' for native browser validation -->
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required>
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span class="text-danger" aria-hidden="true">*</span></label>
        <!-- Changed type="mail" to type="email" and added 'required' for correct native browser validation -->
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required>
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span class="text-danger" aria-hidden="true">*</span></label>
        <!-- Added 'required' attribute for client-side validation -->
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required></textarea>
      </div>
      <!-- Disabled button while sending to prevent multi-clicks and indicate loading -->
      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-2 py-1" type="submit" :disabled="isSending">
        {{ isSending ? 'Sending...' : 'Send e-mail' }}
      </button>

      <!-- Accessible post-submission feedback messages using role="status" and aria-live="polite" -->
      <div v-if="isSuccess" role="status" aria-live="polite" class="mt-3 text-success fw-bold">
        Your message has been sent successfully!
      </div>
      <div v-if="isError" role="status" aria-live="polite" class="mt-3 text-danger fw-bold">
        There was an error sending your message. Please try again.
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
