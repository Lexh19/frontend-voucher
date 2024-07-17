<script setup>
import { ref } from 'vue'
import { register } from "../services/Registerservices"

const username = ref('')
const password = ref('')
const email = ref('')
const nama = ref('')

const registerAction = async () => {
  try {
    console.log('Submitting registration...')

    const response = await register(username.value, password.value, email.value, nama.value)
    
    // Log the response from the API
    console.log('Registration response:', response)
    
    // Store user data in localStorage
    localStorage.setItem("userData", JSON.stringify(response.data))

    console.log('Registration successful!')
  } catch (error) {
    console.error("Error in registerAction:", error)
  }
}
</script>


<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
    <!-- Background Image Column -->
    <VCol
      lg="8"
      class="d-none d-lg-flex"
    >
      <div class="position-relative auth-bg rounded-lg w-100 ma-8 me-0">
        <div class="d-flex align-center justify-center w-100 h-100">
          <VImg
            max-width="505"
            :src="authThemeImg"
            class="auth-illustration mt-16 mb-2"
          />
        </div>
        <VImg
          :src="authThemeMask"
          class="auth-footer-mask"
        />
      </div>
    </VCol>

    <!-- Registration Form Column -->
    <VCol
      cols="12"
      lg="4"
      class="d-flex align-center justify-center"
    >
      <VCard
        flat
        :max-width="500"
        class="mt-12 mt-sm-0 pa-4"
      >
        <VCardText>
          <!-- Title and Description -->
          <h5 class="text-h5 font-weight-semibold mb-1">
            Register
          </h5>
          <p class="mb-0">
            Please sign up to create your account.
          </p>
        </VCardText>

        <!-- Registration Form -->
        <VCardText>
          <VForm @submit.prevent="registerAction">
            <VRow>
              <!-- Username -->
              <VCol cols="12">
                <VTextField
                  v-model="username"
                  label="Username"
                  type="text"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- Password -->
              <VCol cols="12">
                <VTextField
                  v-model="password"
                  label="Password"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  :rules="[requiredValidator]"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />
              </VCol>

              <!-- Email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  label="Email"
                  type="email"
                  :rules="[requiredValidator, emailValidator]"
                />
              </VCol>

              <!-- Name -->
              <VCol cols="12">
                <VTextField
                  v-model="nama"
                  label="Nama"
                  type="text"
                  :rules="[requiredValidator]"
                />
              </VCol>

              <!-- Register Button -->
              <VCol
                cols="12"
                class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4"
              >
                <VBtn
                  block
                  type="submit"
                  @click="registerAction"
                >
                  Register
                </VBtn>
              </VCol>

              <!-- Already have an account link -->
              <VCol
                cols="12"
                class="text-center"
              >
                <RouterLink to="/login">
                  <a
                    class="text-primary ms-2"
                    href="#"
                  >Already have an account?</a>
                </RouterLink>
              </VCol>

              <!-- Auth providers -->
              <VCol
                cols="12"
                class="text-center"
              >
                <AuthProvider />
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>

<route lang="yaml">
meta:
  layout: blank
  action: read
  subject: Auth
  redirectIfLoggedIn: true
</route>
