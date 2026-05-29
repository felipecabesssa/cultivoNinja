<template>
  <div class="min-h-screen bg-black text-white p-4 md:p-8 space-y-8">
    
    <header class="bg-gradient-to-r from-purple-900 to-black p-8 rounded-2xl border border-purple-800 shadow-lg shadow-purple-900/20">
      <h1 class="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
        Radical Juice
      </h1>
      <p class="text-gray-300 text-lg">Histórico Completo: Do Seed à Cura</p>
    </header>

    <!-- Cards Interativos de Fases -->
    <section>
      <h2 class="text-2xl font-bold text-purple-400 mb-4">📸 Linha do Tempo Visial (Clique para filtrar)</h2>
      <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div v-for="fase in fases" :key="fase.nome" 
             @click="selecionarFase(fase.nome)"
             :class="[
               'relative h-32 rounded-xl overflow-hidden group cursor-pointer border transition duration-300',
               faseAtiva === fase.nome ? 'border-purple-400 ring-2 ring-purple-500 ring-offset-2 ring-offset-black scale-105' : 'border-gray-700 hover:border-purple-500'
             ]">
          <div :class="['absolute inset-0 transition', fase.bg, faseAtiva === fase.nome ? 'opacity-80' : 'opacity-40 group-hover:opacity-60']"></div>
          <div class="absolute inset-0 flex items-center justify-center">
            <span class="font-bold text-lg tracking-wider">{{ fase.nome }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Nova Seção: Galeria de Fotos do GitHub -->
    <section v-if="faseAtiva" class="bg-gray-900 p-6 rounded-xl border border-gray-800 animate-fade-in">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-2xl font-bold text-pink-400">Galeria: {{ faseAtiva }}</h2>
        <button @click="buscarFotosDoGithub" class="text-xs bg-gray-800 hover:bg-gray-700 px-3 py-1 rounded text-gray-300 transition">
          Sincronizar Pasta de Imagens
        </button>
      </div>

      <div v-if="carregandoFotos" class="text-gray-500 animate-pulse">Buscando imagens no GitHub...</div>
      
      <div v-else class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div v-for="(foto, index) in fotosFiltradas" :key="index" class="relative group aspect-square rounded-lg overflow-hidden border border-gray-700">
          <img :src="foto.url" class="w-full h-full object-cover transition duration-500 group-hover:scale-110" loading="lazy" />
          <!-- Exibe o nome do arquivo ao passar o mouse -->
          <div class="absolute bottom-0 inset-x-0 bg-black/70 p-2 translate-y-full group-hover:translate-y-0 transition">
            <p class="text-xs text-center text-gray-300 truncate">{{ foto.nome }}</p>
          </div>
        </div>
        <div v-if="fotosFiltradas.length === 0 && !carregandoFotos" class="col-span-full text-center text-gray-500 py-8">
          Nenhuma foto categorizada para a fase de {{ faseAtiva }} ainda.
        </div>
      </div>
    </section>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Coluna Principal -->
      <div class="lg:col-span-2 space-y-6">
        <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-blue-400">📖 Diário Legado</h2>
            <button @click="buscarDiarioAntigo" class="bg-blue-900/50 hover:bg-blue-800 text-blue-300 px-4 py-2 rounded text-sm transition">
              ⬇️ Sincronizar README
            </button>
          </div>
          <div v-if="diarioCarregando" class="text-gray-500 animate-pulse">Carregando...</div>
          <div v-else-if="diarioMD" class="bg-black p-4 rounded border border-gray-700 max-h-96 overflow-y-auto custom-scrollbar">
            <pre class="text-gray-300 font-mono text-sm whitespace-pre-wrap">{{ diarioMD }}</pre>
          </div>
        </div>

        <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h2 class="text-2xl font-bold text-green-400 mb-4">🌱 Novos Registros</h2>
          <textarea class="w-full bg-black p-3 rounded border border-gray-700 focus:border-purple-500 outline-none text-white h-24 mb-3" placeholder="Novo evento com a Radical..."></textarea>
          <button class="bg-purple-700 hover:bg-purple-600 px-6 py-2 rounded font-bold transition">Salvar Log</button>
        </div>
      </div>

      <!-- Infraestrutura -->
      <aside class="space-y-6">
        <div class="bg-gray-900 p-6 rounded-xl border border-gray-800">
          <h3 class="text-xl font-bold text-amber-500 mb-3">⚙️ Infraestrutura</h3>
          <ul class="text-gray-300 space-y-2 text-sm">
            <li class="flex justify-between border-b border-gray-800 pb-1"><span>Substrato:</span> <span class="font-bold text-white">Easy Coco</span></li>
            <li class="flex justify-between border-b border-gray-800 pb-1"><span>Iluminação:</span> <span class="font-bold text-white">Quantum Board</span></li>
            <li class="flex justify-between"><span>Genética:</span> <span class="font-bold text-white">Radical Juice</span></li>
          </ul>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

const diarioMD = ref('');
const diarioCarregando = ref(false);
const faseAtiva = ref('VEGA'); // Começa com a VEGA selecionada
const carregandoFotos = ref(false);

interface Foto { nome: string; url: string; fase: string; }
const galeriaCompleta = ref<Foto[]>([]);

const fases = [
  { nome: 'SEED', bg: 'bg-green-900' },
  { nome: 'VEGA', bg: 'bg-emerald-700' },
  { nome: 'FLORA', bg: 'bg-purple-800' },
  { nome: 'SECAGEM', bg: 'bg-amber-900' },
  { nome: 'CURA', bg: 'bg-blue-900' }
];

const selecionarFase = (nomeFase: string) => {
  faseAtiva.value = nomeFase;
  if (galeriaCompleta.value.length === 0) {
    buscarFotosDoGithub();
  }
};

// Filtra a galeria com base no botão clicado
const fotosFiltradas = computed(() => {
  return galeriaCompleta.value.filter(foto => foto.fase === faseAtiva.value);
});

// A Mágica Matemática de ler a pasta do GitHub
const buscarFotosDoGithub = async () => {
  carregandoFotos.value = true;
  try {
    const response = await fetch('https://api.github.com/repos/felipecabesssa/cultivoNinjaMD/contents/assets/imgs/fotos_reais');
    if (!response.ok) throw new Error('Falha ao acessar pasta no GitHub');
    
    const arquivos = await response.json();
    
    // DEFINA AQUI A DATA QUE VOCÊ PLANTOU A RADICAL JUICE (Formato: YYYY-MM-DD)
    const dataInicioCultivo = new Date('2026-01-01T00:00:00'); 
    
    galeriaCompleta.value = arquivos
      .filter((file: any) => file.name.match(/\.(jpg|jpeg|png)$/i))
      .map((file: any) => {
        const nomeUpper = file.name.toUpperCase();
        let faseAtribuida = 'VEGA'; // Padrão
        
        // Expressão Regular para achar datas como 20260315, 2026-03-15 ou 2026_03_15 no nome da foto
        const matchData = file.name.match(/(20\d{2})[-_]?(\d{2})[-_]?(\d{2})/);

        if (matchData) {
          // Se achou uma data no nome, calcula a idade da planta!
          const ano = parseInt(matchData[1]);
          const mes = parseInt(matchData[2]) - 1; // Mês no JS começa no 0
          const dia = parseInt(matchData[3]);
          const dataFoto = new Date(ano, mes, dia);

          // Diferença em dias entre a semente e a foto
          const diferencaTempo = dataFoto.getTime() - dataInicioCultivo.getTime();
          const diasDeVida = Math.floor(diferencaTempo / (1000 * 3600 * 24));

          // Lógica dos ciclos (Ajuste os dias conforme sua necessidade)
          if (diasDeVida <= 7) faseAtribuida = 'SEED';
          else if (diasDeVida > 7 && diasDeVida <= 40) faseAtribuida = 'VEGA';
          else if (diasDeVida > 40 && diasDeVida <= 100) faseAtribuida = 'FLORA';
          else if (diasDeVida > 100 && diasDeVida <= 115) faseAtribuida = 'SECAGEM';
          else if (diasDeVida > 115) faseAtribuida = 'CURA';
          
        } else {
          // Se a foto não tiver data no nome, tenta achar pela palavra-chave
          if (nomeUpper.includes('SEED') || nomeUpper.includes('GERMINA')) faseAtribuida = 'SEED';
          else if (nomeUpper.includes('FLORA')) faseAtribuida = 'FLORA';
          else if (nomeUpper.includes('SECA')) faseAtribuida = 'SECAGEM';
          else if (nomeUpper.includes('CURA')) faseAtribuida = 'CURA';
        }

        return {
          nome: file.name,
          url: file.download_url,
          fase: faseAtribuida
        };
      });
  } catch (error) {
    console.error(error);
  } finally {
    carregandoFotos.value = false;
  }
};

// Atualize esta URL para a URL 'Raw' do seu arquivo MD exato
const buscarDiarioAntigo = async () => {
  diarioCarregando.value = true;
  try {
    const response = await fetch('COLE_AQUI_O_LINK_RAW_DO_GITHUB');
    if (response.ok) diarioMD.value = await response.text();
  } catch (error) {
    console.error(error);
  } finally {
    diarioCarregando.value = false;
  }
};
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar { width: 6px; }
.custom-scrollbar::-webkit-scrollbar-thumb { background: #6b21a8; border-radius: 10px; }
.animate-fade-in { animation: fadeIn 0.4s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
</style>