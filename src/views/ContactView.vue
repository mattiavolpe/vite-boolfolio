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
      isSubmitting: false,
      submitSuccess: false,
      submitError: false,
    }
  },
  methods: {
    sendMail() {
      this.isSubmitting = true;
      this.submitSuccess = false;
      this.submitError = false;

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        console.log(response)
        this.submitSuccess = true;
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        console.error(error);
        this.submitError = true;
      })
      .finally(() => {
        this.isSubmitting = false;
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
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required :disabled="isSubmitting">
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span class="text-danger" aria-hidden="true">*</span></label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required :disabled="isSubmitting">
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span class="text-danger" aria-hidden="true">*</span></label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required :disabled="isSubmitting"></textarea>
      </div>

      <div v-if="submitSuccess" class="alert alert-success mt-3" role="alert">
        Message sent successfully!
      </div>
      <div v-if="submitError" class="alert alert-danger mt-3" role="alert">
        Failed to send message. Please try again.
      </div>

      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-2 py-1 mt-2" type="submit" :disabled="isSubmitting">
        <span v-if="isSubmitting" class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
        {{ isSubmitting ? 'Sending...' : 'Send e-mail' }}
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
