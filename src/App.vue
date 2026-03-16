<template>
  <div class="w-[420px] min-h-[500px] bg-gray-900 text-gray-100 flex flex-col">
    <!-- Header -->
    <div class="bg-gray-800 px-4 py-3 border-b border-gray-700">
      <h1 class="text-lg font-bold text-purple-400 flex items-center gap-2">
        🛠️ DevTools Extension
      </h1>
    </div>

    <!-- Tab Navigation -->
    <div class="flex border-b border-gray-700 bg-gray-800">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'flex-1 py-2 px-3 text-sm font-medium transition-colors duration-150',
          activeTab === tab.id
            ? 'text-purple-400 border-b-2 border-purple-400 bg-gray-900'
            : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Tab Content -->
    <div class="flex-1 overflow-auto">
      <CpfCnpjCep v-if="activeTab === 'cpf'" />
      <JsonFormatter v-else-if="activeTab === 'json'" />
      <Storage v-else-if="activeTab === 'storage'" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import CpfCnpjCep from './components/CpfCnpjCep.vue'
import JsonFormatter from './components/JsonFormatter.vue'
import Storage from './components/Storage.vue'

const tabs = [
  { id: 'cpf', label: '🆔 CPF/CNPJ/CEP' },
  { id: 'json', label: '🗂️ JSON' },
  { id: 'storage', label: '🔐 Armazenamento' }
]

const activeTab = ref('cpf')
</script>
