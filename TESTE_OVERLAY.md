# 🎯 Teste de Overlay - MotoCalc

## 📱 **Opções para Teste Real**

### 1. **Expo Development Build (RECOMENDADO)**
```bash
# No terminal, dentro da pasta DriverHelper:
npx expo run:android
```

**O que acontece:**
- Gera um APK nativo do seu app
- Instala no seu celular Android
- Overlay funciona com permissões reais
- Botão flutuante aparece sobre outros apps

**Requisitos:**
- Celular Android conectado via USB
- Modo desenvolvedor ativado
- Depuração USB ativada

### 2. **EAS Build (Para produção)**
```bash
# Instalar EAS CLI
npm install -g @expo/eas-cli

# Login no Expo
eas login

# Build para Android
eas build --platform android
```

**O que acontece:**
- Gera APK para download
- Instala no celular
- Overlay funciona perfeitamente
- Pronto para produção

### 3. **React Native CLI (Alternativa)**
```bash
# Criar projeto React Native puro
npx react-native init MotoCalc
# Copiar código do MotoCalc
```

## 🚀 **Como Testar Agora**

### **Opção 1: Expo Development Build**
1. Conecte seu celular Android via USB
2. Ative modo desenvolvedor
3. Execute: `npx expo run:android`
4. Teste o overlay sobre outros apps

### **Opção 2: EAS Build**
1. Execute: `eas build --platform android`
2. Baixe o APK gerado
3. Instale no celular
4. Teste o overlay

## ⚠️ **Limitações do Expo Go**
- **Overlay real**: Não funciona sobre outros apps
- **Permissões**: Limitadas pelo Expo Go
- **Teste**: Apenas dentro do próprio app

## ✅ **Vantagens do Build Nativo**
- **Overlay real**: Funciona sobre qualquer app
- **Permissões**: Controle total
- **Performance**: Melhor que Expo Go
- **Produção**: Pronto para publicar

## 🎯 **Recomendação**
Use **Expo Development Build** para testar agora, depois **EAS Build** para produção.
