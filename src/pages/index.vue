<script setup>
import { ref, watchEffect } from "vue"
import { claimVoucher } from "../services/claimServices"
import { getvoucher } from "../services/voucherServices"

const listvoucher = ref([])

const loadpageData = async () => {
  try {
    const response = await getvoucher()

    console.log('API response:', response.data)
    listvoucher.value = response.data 
  } catch (error) {
    console.log(error)
  }
}

const handleClaim = async id => {
  try {
    const response = await claimVoucher(id)

    console.log('Claim response:', response)

    // Optionally, update the voucher list or display a success message
  } catch (error) {
    console.log('Error claiming voucher:', error)
  }
}

watchEffect(async () => {
  await loadpageData()
})
</script>

<template>
  <div>
    <VCard title="Pilihlah Voucher">
      <VRow class="px-7 pb-4">
        <VCol
          v-for="data in listvoucher"
          :key="data.id"
          cols="12"
          sm="4"
          md="4"
        >
          <VCard class="custom-card">
            <VImg
              :src="data.foto"
              class="custom-img"
            />
            <VCardItem>
              <VCardText class="text-h6 font-weight-bold">
                {{ data.nama }}
              </VCardText>
              <VRow>
                <VCol
                  :cols="12"
                  :sm="8"
                  :md="8"
                >
                  <VCardText>
                    <div><strong>Category:</strong> {{ data.kategori }}</div>
                    <div><strong>Status:</strong> {{ data.status }}</div>
                  </VCardText>
                </VCol>
                <VCol
                  :cols="12"
                  :sm="4"
                  :md="4"
                  class="d-flex justify-end align-center"
                >
                  <VBtn
                    class="text-none"
                    style="width: 107.5px;"
                    @click="handleClaim(data.id)"
                  >
                    Claim
                  </VBtn>
                </VCol>
              </VRow>
            </VCardItem>
          </VCard>
        </VCol>
      </VRow>
    </VCard>
  </div>
</template>

<style scoped>
.custom-card {
  display: flex;
  flex-direction: column;
  block-size: 100%; /* Ensures the card takes up the full height of the column */
}

.custom-img {
  block-size: 200px;
  inline-size: 100%;
  object-fit: cover;
}
</style>
