# 🛠️ DevTools Extension

Uma extensão do Chrome completa para apoio a testes e uso diário, construída com **Vue 3 + Vite + Tailwind CSS**.

---

## ✨ Funcionalidades

### 🆔 Gerador de CPF, CNPJ e CEP
- Geração de **CPF válido** com algoritmo de dígito verificador
- Geração de **CNPJ válido** com algoritmo de dígito verificador
- Geração de **CEP aleatório**
- Opção de exibir com ou sem formatação (máscara)
- Botão para copiar com feedback visual ("Copiado!")

### 🗂️ Formatador / Minificador de JSON
- Cole qualquer JSON e clique em **Formatar** para exibir com indentação de 2 espaços
- Clique em **Minificar** para remover espaços e quebras de linha
- Resultado em área com destaque visual (verde)
- Botão para copiar o resultado
- Validação de JSON inválido com mensagem de erro clara

### 🔐 Armazenamento de Informações Genéricas
- Salve pares de **chave + valor** (ex: "Login do sistema X" → "usuario@email.com")
- Listagem de todos os itens salvos
- Botão para copiar o valor de cada item
- Botão para deletar cada item
- Campo de busca/filtro para encontrar itens salvos
- Dados persistidos via `localStorage`

---

## 🚀 Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+
- npm 9+

### Instalar dependências

```bash
npm install
```

### Modo desenvolvimento

```bash
npm run dev
```

Abre em `http://localhost:5173` no navegador.

### Build para extensão Chrome

```bash
npm run build
```

Os arquivos de distribuição serão gerados na pasta `dist/`.

---

## 🔌 Carregar a Extensão no Chrome (Modo Desenvolvedor)

1. Execute `npm run build` para gerar a pasta `dist/`
2. Abra o Chrome e acesse `chrome://extensions/`
3. Ative o **Modo do desenvolvedor** (toggle no canto superior direito)
4. Clique em **"Carregar sem compactação"**
5. Selecione a pasta `dist/` do projeto
6. A extensão aparecerá na barra de extensões do Chrome 🎉

---

## 🧰 Stack Utilizada

| Tecnologia | Versão | Finalidade |
|---|---|---|
| [Vue 3](https://vuejs.org/) | ^3.4 | Framework JavaScript |
| [Vite](https://vitejs.dev/) | ^5.0 | Bundler e servidor de desenvolvimento |
| [Tailwind CSS](https://tailwindcss.com/) | ^3.4 | Estilização utilitária |
| [PostCSS](https://postcss.org/) | ^8.4 | Processamento de CSS |
| [Autoprefixer](https://github.com/postcss/autoprefixer) | ^10.4 | Compatibilidade de CSS |

---

## 📁 Estrutura do Projeto

```
extension-devtools/
├── public/
│   └── manifest.json          # Manifest V3 da extensão Chrome
├── src/
│   ├── assets/
│   │   └── main.css           # Importações do Tailwind CSS
│   ├── components/
│   │   ├── CpfCnpjCep.vue     # Gerador de CPF, CNPJ e CEP
│   │   ├── JsonFormatter.vue  # Formatador/Minificador de JSON
│   │   └── Storage.vue        # Armazenamento de chave-valor
│   ├── App.vue                # Componente raiz com navegação por abas
│   └── main.js                # Entry point do Vue
├── index.html                 # Entry point do Vite
├── vite.config.js             # Configuração do Vite
├── tailwind.config.js         # Configuração do Tailwind CSS
├── postcss.config.js          # Configuração do PostCSS
└── package.json
```

---

## 📝 Licença

MIT
