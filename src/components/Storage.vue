<template>
  <div class="p-4 space-y-4">
    <h2 class="text-sm font-semibold text-purple-400 uppercase tracking-wider">Armazenamento de Informações</h2>

    <!-- Add new item -->
    <div class="bg-gray-800 rounded-lg p-3 space-y-2">
      <p class="text-xs text-gray-400">Adicionar novo item:</p>
      <input
        v-model="newKey"
        type="text"
        class="w-full bg-gray-700 text-gray-100 text-sm rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-purple-500"
        placeholder="Chave (ex: Login do sistema X)"
        @keyup.enter="focusValue"
        ref="keyInputRef"
      />
      <div class="flex gap-2">
        <input
          v-model="newValue"
          type="text"
          class="flex-1 bg-gray-700 text-gray-100 text-sm rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-purple-500"
          placeholder="Valor (ex: usuario@email.com)"
          @keyup.enter="addItem"
          ref="valueInputRef"
        />
        <button @click="addItem" :disabled="!newKey.trim() || !newValue.trim()" class="btn-primary px-4">
          ➕ Salvar
        </button>
      </div>
      <p v-if="addError" class="text-red-400 text-xs">{{ addError }}</p>
    </div>

    <!-- Search -->
    <div>
      <input
        v-model="search"
        type="text"
        class="w-full bg-gray-700 text-gray-100 text-sm rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-purple-500"
        placeholder="🔍 Buscar itens salvos..."
      />
    </div>

    <!-- Items list -->
    <div class="space-y-2">
      <p v-if="filteredItems.length === 0 && items.length === 0" class="text-xs text-gray-500 text-center py-4">
        Nenhum item salvo ainda. Adicione um acima!
      </p>
      <p v-else-if="filteredItems.length === 0" class="text-xs text-gray-500 text-center py-4">
        Nenhum item encontrado para "{{ search }}"
      </p>
      <div
        v-for="item in filteredItems"
        :key="item.id"
        class="bg-gray-800 rounded-lg px-3 py-2 flex items-start gap-2"
      >
        <div class="flex-1 min-w-0">
          <p class="text-xs text-purple-300 font-medium truncate">{{ item.key }}</p>
          <p class="text-sm text-gray-200 font-mono break-all">{{ item.value }}</p>
        </div>
        <div class="flex gap-1 flex-shrink-0">
          <button
            @click="copyItem(item)"
            class="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 hover:text-white px-2 py-1 rounded transition-colors"
            :title="'Copiar ' + item.key"
          >
            {{ copiedId === item.id ? '✅' : '📋' }}
          </button>
          <button
            @click="deleteItem(item.id)"
            class="text-xs bg-gray-700 hover:bg-red-700 text-gray-300 hover:text-white px-2 py-1 rounded transition-colors"
            :title="'Deletar ' + item.key"
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const STORAGE_KEY = 'devtools_storage_items'

const items = ref([])
const newKey = ref('')
const newValue = ref('')
const search = ref('')
const addError = ref('')
const copiedId = ref(null)
const keyInputRef = ref(null)
const valueInputRef = ref(null)

onMounted(() => {
  loadItems()
})

function loadItems() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    items.value = stored ? JSON.parse(stored) : []
  } catch {
    items.value = []
  }
}

function saveItems() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items.value))
}

const filteredItems = computed(() => {
  if (!search.value.trim()) return items.value
  const q = search.value.toLowerCase()
  return items.value.filter(
    (item) => item.key.toLowerCase().includes(q) || item.value.toLowerCase().includes(q)
  )
})

function addItem() {
  addError.value = ''
  if (!newKey.value.trim() || !newValue.value.trim()) return

  const duplicate = items.value.find((i) => i.key.toLowerCase() === newKey.value.trim().toLowerCase())
  if (duplicate) {
    addError.value = 'Já existe um item com essa chave.'
    return
  }

  items.value.unshift({
    id: Date.now(),
    key: newKey.value.trim(),
    value: newValue.value.trim()
  })
  saveItems()
  newKey.value = ''
  newValue.value = ''
  if (keyInputRef.value) keyInputRef.value.focus()
}

function deleteItem(id) {
  items.value = items.value.filter((i) => i.id !== id)
  saveItems()
}

async function copyItem(item) {
  try {
    await navigator.clipboard.writeText(item.value)
    copiedId.value = item.id
    setTimeout(() => { copiedId.value = null }, 2000)
  } catch {
    // Fallback for browsers/environments that don't support the Clipboard API
    const el = document.createElement('textarea')
    el.value = item.value
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copiedId.value = item.id
    setTimeout(() => { copiedId.value = null }, 2000)
  }
}

function focusValue() {
  if (valueInputRef.value) valueInputRef.value.focus()
}
</script>

<style scoped>
.btn-primary {
  @apply bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 rounded transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed;
}
</style>
