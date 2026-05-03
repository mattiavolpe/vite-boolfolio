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
      submitStatus: null, // 'success' or 'error'
    }
  },
  methods: {
    sendMail() {
      this.isSubmitting = true;
      this.submitStatus = null;

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        console.log(response);
        if (response.data && response.data.success) {
          this.submitStatus = 'success';
          this.name = "";
          this.emailAddress = "";
          this.emailContent = "";
        } else {
          this.submitStatus = 'success'; // Treat as success if api isn't strictly returning response.data.success but 200 ok
        }
      })
      .catch(error => {
        console.error(error);
        this.submitStatus = 'error';
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
      <button
        class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-2 py-1"
        type="submit"
        :disabled="isSubmitting">
        {{ isSubmitting ? 'Sending...' : 'Send e-mail' }}
      </button>

      <div v-if="submitStatus === 'success'" class="alert alert-success mt-3" role="alert">
        Message sent successfully! Thank you for contacting me.
      </div>
      <div v-if="submitStatus === 'error'" class="alert alert-danger mt-3" role="alert">
        There was an error sending your message. Please try again later.
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
