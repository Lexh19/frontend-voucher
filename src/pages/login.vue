<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { login } from "../services/authService"

const router = useRouter()

const email = ref('admin@email.com')
const password = ref('admin123')

const loginAction = async () => {
  try {
    const response = await login(email.value, password.value)

    console.log(response.data.data)

    localStorage.setItem("userData", JSON.stringify(response.data))

    router.push({ name: 'index' }) 

  } catch (error) {
    console.log("Error in loginAction:", error)
  }
}
</script>



<template>
  <VRow
    no-gutters
    class="auth-wrapper"
  >
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
          <VNodeRenderer
            class="mb-6"
          />

          <h5 class="text-h5 font-weight-semibold mb-1" />
          <p class="mb-0">
            Please sign-in to your account and start the adventure
          </p>
        </VCardText>
       
        <VCardText>
          <VForm @submit.prevent="() => {}">
            <VRow>
              <!-- email -->
              <VCol cols="12">
                <VTextField
                  v-model="email"
                  label="Email"
                  type="email"
                  :rules="[requiredValidator, emailValidator]"
                />
              </VCol>

              <!-- password -->
              <VCol cols="12">
                <VTextField
                  v-model="password"
                  label="Password"
                  :rules="[requiredValidator]"
                  :type="isPasswordVisible ? 'text' : 'password'"
                  :append-inner-icon="isPasswordVisible ? 'tabler-eye-off' : 'tabler-eye'"
                  @click:append-inner="isPasswordVisible = !isPasswordVisible"
                />


                <div class="d-flex align-center flex-wrap justify-space-between mt-2 mb-4">
                  <VBtn
                    block
                    type="submit"
                    @click="loginAction"
                  >
                    Login
                  </VBtn>
                </div>
              </VCol>

              <!-- create account -->
              <VCol
                cols="12"
                class="text-center"
              >
                <span>New on our platform?</span>
                <RouterLink to="/register">
                  <a
                    class="text-primary ms-2"
                    href="#"
                  >
                    Create an account
                  </a>
                </RouterLink>
              </VCol>
              <VCol
                cols="12"
                class="d-flex align-center"
              />

              <!-- auth providers -->
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
