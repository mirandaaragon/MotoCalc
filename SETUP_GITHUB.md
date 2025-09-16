# 🚀 Setup GitHub Actions para Builds Rápidos

## ⚡ **Vantagens do GitHub Actions:**
- ✅ Builds 10x mais rápidos (2-5 minutos vs 160 minutos)
- ✅ Builds automáticos a cada push
- ✅ Sem fila de espera
- ✅ Logs detalhados
- ✅ Grátis para repositórios públicos

## 📋 **Passos para Configurar:**

### 1. **Criar Repositório no GitHub**
1. Acesse: https://github.com/new
2. Nome: `MotoCalc` (ou outro nome)
3. Marque como **Público** (para builds gratuitos)
4. Clique em "Create repository"

### 2. **Fazer Upload do Código**
1. **Opção A - Git (Recomendado):**
   ```bash
   # Instalar Git primeiro: https://git-scm.com/downloads
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/MotoCalc.git
   git push -u origin main
   ```

2. **Opção B - Upload Manual:**
   - Baixe todos os arquivos do projeto
   - Faça upload no GitHub via interface web

### 3. **Configurar Token do Expo**
1. Acesse: https://expo.dev/settings/access-tokens
2. Clique em "Create token"
3. Nome: `GitHub Actions`
4. Copie o token gerado

### 4. **Adicionar Secret no GitHub**
1. No seu repositório GitHub, vá em **Settings**
2. Clique em **Secrets and variables** → **Actions**
3. Clique em **New repository secret**
4. Nome: `EXPO_TOKEN`
5. Valor: Cole o token do Expo
6. Clique em **Add secret**

### 5. **Fazer Push para Ativar Build**
```bash
git add .
git commit -m "Add GitHub Actions workflow"
git push
```

## 🎯 **Resultado:**
- Build automático em 2-5 minutos
- APK disponível para download
- Logs detalhados no GitHub Actions
- Sem fila de espera!

## 📱 **Como Baixar o APK:**
1. Vá em **Actions** no seu repositório GitHub
2. Clique no build mais recente
3. Baixe o APK na seção **Artifacts**

## 🔧 **Arquivos Criados:**
- `.github/workflows/build.yml` - Configuração do GitHub Actions
- `.gitignore` - Arquivos a serem ignorados
- `SETUP_GITHUB.md` - Este arquivo de instruções

**Com GitHub Actions, seus builds serão muito mais rápidos!** ⚡
