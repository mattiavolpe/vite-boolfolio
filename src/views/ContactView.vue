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
      statusType: "",
    }
  },
  methods: {
    sendMail() {
      this.isSending = true;
      this.statusMessage = "";
      this.statusType = "";

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
        this.statusType = "success";
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        console.error(error);
        this.statusMessage = "Failed to send message. Please try again.";
        this.statusType = "danger";
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
        <label for="name" class="d-block text_accent_custom fw-bold">Full name <span class="text-danger">*</span></label>
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required :disabled="isSending" aria-required="true">
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span class="text-danger">*</span></label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required :disabled="isSending" aria-required="true">
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span class="text-danger">*</span></label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required :disabled="isSending" aria-required="true"></textarea>
      </div>
      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-2 py-1 mb-3" type="submit" :disabled="isSending" aria-label="Send e-mail message">
        <span v-if="isSending">
          <font-awesome-icon icon="fa-regular fa-hourglass" class="fa-spin me-2" />
          Sending...
        </span>
        <span v-else>Send e-mail</span>
      </button>
      <div v-if="statusMessage" :class="['status-message p-3 rounded-3 fw-bold text-center mt-3', statusType === 'success' ? 'bg-success text-white' : 'bg-danger text-white']" role="alert" aria-live="polite">
        {{ statusMessage }}
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
