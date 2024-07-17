<script setup>
import { ref, watchEffect } from "vue"
import { deleteVoucher } from "../services/delateHistoryServices"
import { gethistory } from "../services/historyservices"

const claimHistory = ref([])

const loadClaimHistory = async () => {
  try {
    const response = await gethistory()

    claimHistory.value = response.data // Anggap response.data adalah array objek riwayat klaim Anda
    console.log("Riwayat klaim:", claimHistory.value)
  } catch (error) {
    console.error("Error fetching claim history:", error)
  }
}

const handleDelete = async id => {
  try {
    const response = await deleteVoucher(id)

    console.log('Delete response:', response)
    
    // Update the claim history list to reflect the deletion
    await loadClaimHistory()
  } catch (error) {
    console.log('Error deleting voucher:', error)
  }
}

watchEffect(() => {
  loadClaimHistory()
})
</script>

<template>
  <div>
    <VCard>
      <VCardTitle>Riwayat Klaim</VCardTitle>
      <VCardText>
        <table class="text-no-wrap pa-7">
          <thead>
            <tr>
              <th class="w-25">
                Tanggal Klaim
              </th>
              <th class="w-50">
                Voucher
              </th>
              <th class="w-25">
                Aksi
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="claim in claimHistory"
              :key="claim.id"
            >
              <td>{{ new Date(claim.tanggal_claim).toLocaleDateString() }}</td>
              <td>
                <div class="d-flex align-center">
                  <VAvatar
                    variant="tonal"
                    class="me-3"
                    size="38"
                  >
                    <VImg :src="claim.voucher.foto" />
                  </VAvatar>
                  <div>{{ claim.voucher.nama }}</div>
                </div>
              </td>
              <td>
                <VBtn
                  class="text-none"
                  style="width: 107.5px;"
                  @click="handleDelete(claim.id)"
                >
                  Hapus
                </VBtn>
              </td>
            </tr>
          </tbody>
        </table>
      </VCardText>
    </VCard>
  </div>
</template>

<style scoped>
/* Pastikan tabel memiliki border */
table {
  border-collapse: collapse;
  inline-size: 100%;
}

th,
td {
  padding: 8px;
  border: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  text-align: start;
}

/* Sesuaikan lebar kolom */
.w-25 {
  inline-size: 25%;
}

.w-50 {
  inline-size: 50%;
}
</style>
