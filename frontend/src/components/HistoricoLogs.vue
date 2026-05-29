<template>
  <div class="h-96 overflow-y-auto bg-gray-900 border border-gray-700 rounded-lg p-4 custom-scrollbar">
    <h3 class="text-amber-400 font-bold mb-4 sticky top-0 bg-gray-900 pb-2">Últimos 30 registros</h3>
    <div v-for="log in logs" :key="log.id" class="border-b border-gray-800 py-2 text-sm">
      <!-- Corrigido para acessar data_hora -->
      <span class="text-gray-500">{{ new Date(log.data_hora).toLocaleDateString() }}</span>
      <span class="ml-2 text-blue-300">{{ log.total_ml }}ml</span>
      <p class="text-gray-300 mt-1">{{ log.observacoes || 'Sem observações' }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const logs = ref<any[]>([]);

onMounted(async () => {
  try {
    // IMPORTANTE: Adicione o http://localhost:3000 aqui
    const res = await fetch('http://localhost:3000/api/logs');
    logs.value = await res.json();
  } catch (err) {
    console.error("Erro ao carregar logs:", err);
  }
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #4a5568; border-radius: 10px; }
</style>