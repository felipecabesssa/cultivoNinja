# CultivoNinja v2 🍃

Projeto Fullstack desenvolvido para gestão de cultivo indoor de alta performance. O sistema atua como um diário digital inteligente, oferecendo rastreamento de genética cronológico, cálculo de dias, monitoramento de parâmetros (EC/pH) e integração direta com o GitHub para armazenamento e exibição de fotos e históricos do cultivo legado.

## 🚀 Arquitetura e Tecnologias
- **Frontend**: Vue 3 (SPA), Tailwind CSS, Vue Router.
- **Backend**: Node.js, Express, Knex.js.
- **Banco de Dados**: Microsoft SQL Server.
- **Integração de Mídia**: GitHub REST API (Raw).

## 📊 Status Atual do Cultivo

Abaixo o acompanhamento em tempo real das genéticas ativas no laboratório:

| Genética | Estágio Atual | Clima (Temp) | Substrato | Iluminação | Equipamentos Ativos |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Super Lemon Haze** | Vegetativo (Recuperação Poda) | 23°C ~ 24°C (Noite) | Easy Coco | Quantum Board | AC Midea, Umidificador |
| **Radical Juice** | Cura | Ambiente Controlado | Easy Coco | N/A | Potes de Vidro, Termo-higrômetros |

> **Nota de Infraestrutura (Ambiente Vega):** O controle térmico está operando temporariamente com o equipamento Midea para estabilização noturna na casa dos 23/24°C, aguardando o retorno do AC principal (EOS) da assistência técnica para baixar a temperatura a 17°C, se necessário.

## 📅 Roadmap e Planejamento

### ✅ Concluído (Fase 1 - Estrutura)
- [x] Estabilizar integração Frontend-Backend com MS SQL Server nativo.
- [x] Implementar SPA com Vue Router (Dashboard, Radical Juice, SLH).
- [x] Criar galeria inteligente filtrando o ciclo de vida (Seed, Vega, Flora, Cura) pelo nome/data do arquivo.
- [x] Acesso via rede local (Mobile).

### ⏳ Curto Prazo (Fase 2 - Deploy e Refino)
- [ ] Refinar as expressões regulares para captura precisa das datas nas fotos.
- [ ] Finalizar templates das 3 páginas principais (CRUD completo de logs).
- [ ] Deploy em servidor de produção (Cloud/VPS dedicado) para acesso externo global.

### 🚀 Médio Prazo (Fase 3 - Analytics)
- [ ] Dashboard analítico (gráficos de consumo de nutrientes/EC/pH ao longo das semanas).
- [ ] Sistema de notificações de rega e manutenção.

## 🛠 Como rodar localmente
1. **Configuração do BD**: Execute os scripts em um MS SQL Server local.
2. **Backend**: `cd backend && npm install && npm run dev`
3. **Frontend**: `cd frontend && npm install && npm run dev`
---
*Desenvolvido por Felipe Andrade com foco em performance, organização de dados e excelência botânica.*