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
      submitStatus: null,
      submitMessage: "",
    }
  },
  methods: {
    sendMail() {
      this.isSending = true;
      this.submitStatus = null;
      this.submitMessage = "";

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        this.isSending = false;
        this.submitStatus = "success";
        this.submitMessage = "Your message has been sent successfully!";
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
        console.log(response)
      })
      .catch(error => {
        this.isSending = false;
        this.submitStatus = "error";
        this.submitMessage = "There was an error sending your message. Please try again later.";
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
        <label for="name" class="d-block text_accent_custom fw-bold">Full name <span class="text-danger">*</span></label>
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required>
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span class="text-danger">*</span></label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required>
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span class="text-danger">*</span></label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required></textarea>
      </div>
      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-2 py-1" type="submit" :disabled="isSending">
        {{ isSending ? 'Sending...' : 'Send e-mail' }}
      </button>

      <div v-if="submitMessage" class="mt-3 fw-bold" :class="submitStatus === 'success' ? 'text-success' : 'text-danger'" role="status" aria-live="polite">
        {{ submitMessage }}
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
