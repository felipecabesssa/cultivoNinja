<script setup lang="ts">
import { ref, computed } from 'vue';
import HistoricoLogs from '../components/HistoricoLogs.vue';

const volume = ref(5);
const dosagemA = ref(2);
const dosagemB = ref(2);
const dosagemC = ref(1);
const diario = ref('');

// Calcula o total automaticamente
const totalMl = computed(() => {
  const porLitro = Number(dosagemA.value) + Number(dosagemB.value) + Number(dosagemC.value);
  return (porLitro * volume.value).toFixed(1);
});

const salvarRega = async () => {
  const payload = {
    volume: volume.value,
    dosagemA: dosagemA.value,
    dosagemB: dosagemB.value,
    dosagemC: dosagemC.value,
    total_ml: totalMl.value,
    observacoes: diario.value
  };
  
  try {
    const response = await fetch('/api/rega', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    if (response.ok) {
      alert('Registro salvo com sucesso!');
      diario.value = ''; // Limpa o campo de texto após salvar
      // Num futuro próximo, faremos a lista atualizar sozinha aqui!
    }
  } catch (err) {
    console.error('Erro ao conectar com a API:', err);
    alert('Erro ao salvar. Verifique o console.');
  }
};
</script>

<template>
  <div class="min-h-screen bg-black text-white p-4 md:p-8">
    <header class="bg-green-900/30 border border-green-800 p-6 rounded-xl mb-6 text-center">
      <h1 class="text-4xl font-bold text-green-400 tracking-widest uppercase">CultivoNinja</h1>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div class="space-y-6">
        
        <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 class="text-blue-400 font-bold text-xl mb-4">💧 Cálculo de Rega</h2>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm text-gray-400 mb-1">Volume de Água (L)</label>
              <input v-model="volume" type="number" class="w-full bg-black p-2 rounded border border-gray-700 text-white focus:border-blue-500 outline-none">
            </div>
            
            <div class="grid grid-cols-3 gap-2">
              <div>
                <label class="block text-xs text-gray-400 mb-1 text-center">Nut A (ml)</label>
                <input v-model="dosagemA" class="w-full bg-black p-2 rounded border border-gray-700 text-center text-white focus:border-blue-500 outline-none">
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1 text-center">Nut B (ml)</label>
                <input v-model="dosagemB" class="w-full bg-black p-2 rounded border border-gray-700 text-center text-white focus:border-blue-500 outline-none">
              </div>
              <div>
                <label class="block text-xs text-gray-400 mb-1 text-center">Nut C (ml)</label>
                <input v-model="dosagemC" class="w-full bg-black p-2 rounded border border-gray-700 text-center text-white focus:border-blue-500 outline-none">
              </div>
            </div>

            <div class="p-3 bg-blue-900/20 rounded border border-blue-900/50 text-center">
              <p class="text-xs font-bold text-blue-500">Total a dosar</p>
              <p class="text-3xl text-blue-300 font-bold">{{ totalMl }} ml</p>
            </div>
          </div>
        </div>

        <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 class="text-yellow-500 font-bold text-xl mb-4">📝 Diário de Bordo</h2>
          <textarea v-model="diario" class="w-full h-32 bg-black rounded-lg p-3 border border-gray-700 text-white focus:border-yellow-500 outline-none resize-none" placeholder="O que aconteceu hoje? (Ex: Primeira poda realizada na SLH)"></textarea>
          
          <button @click="salvarRega" class="w-full mt-4 bg-green-700 hover:bg-green-600 py-3 rounded-lg font-bold transition text-lg">
            Salvar Registro
          </button>
        </div>
      </div>

      <div class="h-full">
        <HistoricoLogs />
      </div>

    </div>
  </div>
</template>