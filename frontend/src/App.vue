<template>
  <div class="min-h-screen bg-black text-white">
    <nav class="bg-green-900/30 border-b border-green-800 p-4 sticky top-0 z-50 backdrop-blur-md">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold text-green-400 tracking-widest uppercase">CultivoNinja</h1>
        
        <div class="space-x-6 font-semibold text-gray-400">
          <router-link 
            to="/" 
            class="hover:text-green-400 transition py-2" 
            active-class="text-green-400 border-b-2 border-green-400">
            Dashboard
          </router-link>
          
          <router-link 
            to="/radical-juice" 
            class="hover:text-purple-400 transition py-2" 
            active-class="text-purple-400 border-b-2 border-purple-400">
            Radical Juice
          </router-link>

          <router-link 
            to="/super-lemon-haze" 
            class="hover:text-yellow-400 transition py-2" 
            active-class="text-yellow-400 border-b-2 border-yellow-400">
            Super Lemon Haze
          </router-link>

          </div>
      </div>
    </nav>

    <main class="container mx-auto p-4 md:p-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup lang="ts">
// O App.vue agora é apenas o layout base (Header + Conteúdo).
// Toda a lógica de rega e formulário foi para o HomeView.vue!
</script>

<style>
/* Estilos globais caso precise de algo fora do Tailwind */
body {
  background-color: black;
}
</style>