<template>
  <div class="min-h-screen bg-black text-white p-4 md:p-8 space-y-8">
    <header class="bg-gradient-to-r from-yellow-900 to-black p-8 rounded-2xl border border-yellow-800 shadow-lg shadow-yellow-900/20">
      <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 mb-2">
        Super Lemon Haze
      </h1>
      <p class="text-gray-300 text-lg">Poda Top (PCD) | Fase Atual: Vegetativo</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h2 class="text-2xl font-bold text-yellow-500 mb-4">📝 Novo Registro</h2>
        <textarea class="w-full bg-black p-3 rounded border border-gray-700 focus:border-yellow-500 outline-none text-white h-32 mb-3" placeholder="Ex: Poda top feita hoje, planta reagiu bem..."></textarea>
        <button class="bg-yellow-600 hover:bg-yellow-500 text-black px-6 py-2 rounded font-bold transition">Salvar Log</button>
      </div>
      
      <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
        <h3 class="text-xl font-bold text-amber-500 mb-3">⚙️ Genética Haze</h3>
        <ul class="text-gray-300 space-y-2 text-sm">
          <li class="flex justify-between border-b border-gray-800 pb-1"><span>Predominância:</span> <span class="font-bold text-white">Sativa</span></li>
          <li class="flex justify-between border-b border-gray-800 pb-1"><span>Terpenos:</span> <span class="font-bold text-white">Cítricos / Limão</span></li>
          <li class="flex justify-between"><span>Tempo Flora:</span> <span class="font-bold text-white">~10 Semanas</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Aqui faremos a mesma lógica de histórico depois!
</script>