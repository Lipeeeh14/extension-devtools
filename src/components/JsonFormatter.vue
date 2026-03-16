<template>
  <div class="p-4 space-y-3">
    <h2 class="text-sm font-semibold text-purple-400 uppercase tracking-wider">Formatador / Minificador de JSON</h2>

    <!-- Input -->
    <div class="space-y-1">
      <label class="text-xs text-gray-400">Cole seu JSON aqui:</label>
      <textarea
        v-model="input"
        rows="8"
        class="w-full bg-gray-700 text-gray-100 text-xs font-mono rounded px-3 py-2 border border-gray-600 focus:outline-none focus:border-purple-500 resize-none"
        placeholder='{"exemplo": "cole seu JSON aqui"}'
        @input="errorMsg = ''"
      ></textarea>
    </div>

    <!-- Error Message -->
    <div v-if="errorMsg" class="bg-red-900/50 border border-red-600 text-red-300 text-xs rounded px-3 py-2">
      ⚠️ {{ errorMsg }}
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2">
      <button @click="format" class="btn-primary flex-1">✨ Formatar</button>
      <button @click="minify" class="btn-primary flex-1">🗜️ Minificar</button>
      <button @click="clear" class="btn-secondary">🗑️ Limpar</button>
    </div>

    <!-- Output -->
    <div v-if="output" class="space-y-1">
      <div class="flex items-center justify-between">
        <label class="text-xs text-gray-400">Resultado:</label>
        <button @click="copyOutput" class="text-xs text-purple-400 hover:text-purple-300 transition-colors">
          {{ copied ? '✅ Copiado!' : '📋 Copiar' }}
        </button>
      </div>
      <div class="relative">
        <pre
          class="w-full bg-gray-700 text-green-300 text-xs font-mono rounded px-3 py-2 border border-gray-600 overflow-auto max-h-48 whitespace-pre-wrap break-all"
        >{{ output }}</pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const input = ref('')
const output = ref('')
const errorMsg = ref('')
const copied = ref(false)

function format() {
  errorMsg.value = ''
  output.value = ''
  if (!input.value.trim()) {
    errorMsg.value = 'Digite ou cole um JSON para formatar.'
    return
  }
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed, null, 2)
  } catch (e) {
    errorMsg.value = `JSON inválido: ${e.message}`
  }
}

function minify() {
  errorMsg.value = ''
  output.value = ''
  if (!input.value.trim()) {
    errorMsg.value = 'Digite ou cole um JSON para minificar.'
    return
  }
  try {
    const parsed = JSON.parse(input.value)
    output.value = JSON.stringify(parsed)
  } catch (e) {
    errorMsg.value = `JSON inválido: ${e.message}`
  }
}

function clear() {
  input.value = ''
  output.value = ''
  errorMsg.value = ''
  copied.value = false
}

async function copyOutput() {
  if (!output.value) return
  try {
    await navigator.clipboard.writeText(output.value)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  } catch {
    // Fallback for browsers/environments that don't support the Clipboard API
    const el = document.createElement('textarea')
    el.value = output.value
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = true
    setTimeout(() => { copied.value = false }, 2000)
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-150;
}
.btn-secondary {
  @apply bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-150;
}
</style>
