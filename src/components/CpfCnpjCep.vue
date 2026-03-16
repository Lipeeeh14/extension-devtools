<template>
  <div class="p-4 space-y-4">
    <!-- CPF Section -->
    <div class="bg-gray-800 rounded-lg p-4 space-y-3">
      <h2 class="text-sm font-semibold text-purple-400 uppercase tracking-wider">CPF</h2>
      <div class="flex items-center gap-2">
        <input
          :value="cpfFormatted"
          readonly
          class="flex-1 bg-gray-700 text-gray-100 text-sm rounded px-3 py-2 font-mono border border-gray-600 focus:outline-none"
          placeholder="Clique em Gerar"
        />
        <label class="flex items-center gap-1 text-xs text-gray-400 cursor-pointer select-none">
          <input type="checkbox" v-model="cpfMask" class="accent-purple-500" />
          Máscara
        </label>
      </div>
      <div class="flex gap-2">
        <button @click="generateCpf" class="btn-primary flex-1">🎲 Gerar</button>
        <button @click="copy(cpfFormatted, 'cpf')" :disabled="!cpfValue" class="btn-secondary flex-1">
          {{ copied === 'cpf' ? '✅ Copiado!' : '📋 Copiar' }}
        </button>
      </div>
    </div>

    <!-- CNPJ Section -->
    <div class="bg-gray-800 rounded-lg p-4 space-y-3">
      <h2 class="text-sm font-semibold text-purple-400 uppercase tracking-wider">CNPJ</h2>
      <div class="flex items-center gap-2">
        <input
          :value="cnpjFormatted"
          readonly
          class="flex-1 bg-gray-700 text-gray-100 text-sm rounded px-3 py-2 font-mono border border-gray-600 focus:outline-none"
          placeholder="Clique em Gerar"
        />
        <label class="flex items-center gap-1 text-xs text-gray-400 cursor-pointer select-none">
          <input type="checkbox" v-model="cnpjMask" class="accent-purple-500" />
          Máscara
        </label>
      </div>
      <div class="flex gap-2">
        <button @click="generateCnpj" class="btn-primary flex-1">🎲 Gerar</button>
        <button @click="copy(cnpjFormatted, 'cnpj')" :disabled="!cnpjValue" class="btn-secondary flex-1">
          {{ copied === 'cnpj' ? '✅ Copiado!' : '📋 Copiar' }}
        </button>
      </div>
    </div>

    <!-- CEP Section -->
    <div class="bg-gray-800 rounded-lg p-4 space-y-3">
      <h2 class="text-sm font-semibold text-purple-400 uppercase tracking-wider">CEP</h2>
      <div class="flex items-center gap-2">
        <input
          :value="cepFormatted"
          readonly
          class="flex-1 bg-gray-700 text-gray-100 text-sm rounded px-3 py-2 font-mono border border-gray-600 focus:outline-none"
          placeholder="Clique em Gerar"
        />
        <label class="flex items-center gap-1 text-xs text-gray-400 cursor-pointer select-none">
          <input type="checkbox" v-model="cepMask" class="accent-purple-500" />
          Máscara
        </label>
      </div>
      <div class="flex gap-2">
        <button @click="generateCep" class="btn-primary flex-1">🎲 Gerar</button>
        <button @click="copy(cepFormatted, 'cep')" :disabled="!cepValue" class="btn-secondary flex-1">
          {{ copied === 'cep' ? '✅ Copiado!' : '📋 Copiar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const cpfValue = ref('')
const cnpjValue = ref('')
const cepValue = ref('')
const cpfMask = ref(true)
const cnpjMask = ref(true)
const cepMask = ref(true)
const copied = ref(null)

const cpfFormatted = computed(() => {
  if (!cpfValue.value) return ''
  if (cpfMask.value) {
    return cpfValue.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
  }
  return cpfValue.value
})

const cnpjFormatted = computed(() => {
  if (!cnpjValue.value) return ''
  if (cnpjMask.value) {
    return cnpjValue.value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  }
  return cnpjValue.value
})

const cepFormatted = computed(() => {
  if (!cepValue.value) return ''
  if (cepMask.value) {
    return cepValue.value.replace(/(\d{5})(\d{3})/, '$1-$2')
  }
  return cepValue.value
})

function generateCpf() {
  const rand = (n) => Math.round(Math.random() * n)
  const mod = (a, b) => a - Math.floor(a / b) * b
  const n = Array.from({ length: 9 }, () => rand(9))
  let d1 = mod(n.reduce((acc, val, i) => acc + val * (10 - i), 0) * 10, 11)
  if (d1 === 10) d1 = 0
  let d2 = mod([...n, d1].reduce((acc, val, i) => acc + val * (11 - i), 0) * 10, 11)
  if (d2 === 10) d2 = 0
  cpfValue.value = [...n, d1, d2].join('')
  copied.value = null
}

function generateCnpj() {
  const rand = (n) => Math.round(Math.random() * n)
  const n = Array.from({ length: 12 }, (_, i) => {
    if (i < 8) return rand(9)
    if (i === 8) return 0
    if (i === 9) return 0
    if (i === 10) return 0
    return 1
  })
  const calcDigit = (arr, peso) => {
    const sum = arr.reduce((acc, val, i) => acc + val * peso[i], 0)
    const r = sum % 11
    return r < 2 ? 0 : 11 - r
  }
  const d1 = calcDigit(n, [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  const d2 = calcDigit([...n, d1], [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2])
  cnpjValue.value = [...n, d1, d2].join('')
  copied.value = null
}

function generateCep() {
  const prefix = String(Math.floor(Math.random() * 99998) + 1).padStart(5, '0')
  const suffix = String(Math.floor(Math.random() * 999)).padStart(3, '0')
  cepValue.value = prefix + suffix
  copied.value = null
}

async function copy(text, type) {
  if (!text) return
  try {
    await navigator.clipboard.writeText(text)
    copied.value = type
    setTimeout(() => { copied.value = null }, 2000)
  } catch {
    // Fallback for browsers/environments that don't support the Clipboard API
    const el = document.createElement('textarea')
    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
    copied.value = type
    setTimeout(() => { copied.value = null }, 2000)
  }
}
</script>

<style scoped>
.btn-primary {
  @apply bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-150;
}
.btn-secondary {
  @apply bg-gray-600 hover:bg-gray-500 text-white text-sm font-medium py-2 px-3 rounded transition-colors duration-150 disabled:opacity-40 disabled:cursor-not-allowed;
}
</style>
