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
      feedbackMessage: { type: "", text: "" },
    }
  },
  methods: {
    sendMail() {
      this.isSubmitting = true;
      this.feedbackMessage = { type: "", text: "" };
      const data = {
        name: this.name,
        emailAddress: this.emailAddress,
        emailContent: this.emailContent,
      }

      axios
      .post(state.host + state.contactEndpoint, data)
      .then(response => {
        this.feedbackMessage = { type: "success", text: "Your message has been sent successfully!" };
        this.name = "";
        this.emailAddress = "";
        this.emailContent = "";
      })
      .catch(error => {
        console.error(error);
        this.feedbackMessage = { type: "error", text: "There was an error sending your message. Please try again later." };
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
        <label for="name" class="d-block text_accent_custom fw-bold">Full name <span aria-hidden="true" class="text-danger">*</span></label>
        <input type="text" id="name" name="name" class="w-100 rounded-3 p-2" placeholder="Type your full name" v-model="name" required :disabled="isSubmitting">
      </div>
      <div class="mb-3">
        <label for="emailAddress" class="d-block text_accent_custom fw-bold">E-mail address <span aria-hidden="true" class="text-danger">*</span></label>
        <input type="email" id="emailAddress" name="emailAddress" class="w-100 rounded-3 p-2" placeholder="Type your e-mail address" v-model="emailAddress" required :disabled="isSubmitting">
      </div>
      <div class="mb-3">
        <label for="emailContent" class="d-block text_accent_custom fw-bold">Your message <span aria-hidden="true" class="text-danger">*</span></label>
        <textarea name="emailContent" id="emailContent" rows="10" class="w-100 rounded-3 p-2" placeholder="Type your message" v-model="emailContent" required :disabled="isSubmitting"></textarea>
      </div>
      <button class="bg_accent_custom border-0 text_dark_custom rounded fw-bold px-2 py-1" type="submit" :disabled="isSubmitting">
        <template v-if="isSubmitting">Sending...</template>
        <template v-else>Send e-mail</template>
      </button>
      <div v-if="feedbackMessage.text" class="mt-3 p-2 rounded-3" :class="feedbackMessage.type === 'success' ? 'bg-success text-white' : 'bg-danger text-white'">
        {{ feedbackMessage.text }}
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
@use "../assets/scss/partials/_variables.scss" as *;
</style>
