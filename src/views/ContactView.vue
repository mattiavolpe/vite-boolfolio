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
      if (this.isSending) return;
      this.isSending = true;
      this.statusMessage = "";

      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        this.isSending = false;
        this.isSuccess = true;
        this.statusMessage = "Message sent successfully!";
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        this.isSending = false;
        this.isSuccess = false;
        this.statusMessage = "Failed to send message. Please try again.";
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
    <div aria-live="polite" class="mb-3">
      <div v-if="statusMessage" :class="['alert', isSuccess ? 'alert-success' : 'alert-danger']" role="alert">
        {{ statusMessage }}
      </div>
    </div>
    <form @submit.prevent="sendMail()">
      <div class="mb-3">
        <label for="name" class="d-block text_accent_custom fw-bold">Full name <span class="text-danger" aria-hidden="true">*</span></label>
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required aria-required="true">
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span class="text-danger" aria-hidden="true">*</span></label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required aria-required="true">
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span class="text-danger" aria-hidden="true">*</span></label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required aria-required="true"></textarea>
      </div>
      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-3 py-2 d-flex align-items-center gap-2" type="submit" :disabled="isSending" :aria-disabled="isSending">
        <span v-if="!isSending">Send e-mail</span>
        <span v-else>Sending...</span>
        <font-awesome-icon v-if="isSending" icon="fa-solid fa-spinner" spin />
      </button>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
