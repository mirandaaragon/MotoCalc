# 🎯 Como Testar o Overlay Real - MotoCalc

## ⚠️ **Problema Atual**
O app está rodando **dentro do Expo Go**, então quando você minimiza, está minimizando o Expo Go, não o seu app. Por isso o overlay não funciona sobre outros apps.

## 🚀 **Soluções para Teste Real**

### **Opção 1: Expo Development Build (Recomendado)**
```bash
# Instalar JDK primeiro (necessário)
# Baixar: https://www.oracle.com/java/technologies/downloads/

# Depois executar:
npx expo run:android --device
```

**Vantagens:**
- ✅ Gera APK nativo
- ✅ Overlay funciona sobre outros apps
- ✅ Permissões reais do Android
- ✅ Não precisa de conta

**Requisitos:**
- JDK instalado
- Celular Android conectado
- Modo desenvolvedor ativo

### **Opção 2: EAS Build (Gratuito)**
```bash
# Criar conta gratuita no Expo
# Executar:
eas build --platform android
```

**Vantagens:**
- ✅ Gera APK para download
- ✅ Overlay funciona perfeitamente
- ✅ Pronto para produção
- ✅ Conta gratuita

### **Opção 3: React Native CLI**
```bash
# Criar projeto React Native puro
npx react-native init MotoCalc
# Copiar código do MotoCalc
```

**Vantagens:**
- ✅ Controle total
- ✅ Overlay nativo
- ✅ Sem limitações do Expo

## 📱 **Teste Atual (Expo Go)**
Por enquanto, você pode testar:
1. **Ativar o Assistente** no app
2. **Botão flutuante** aparece dentro do app
3. **Arrastar** o botão funciona
4. **Minimizar** não funciona (limitação do Expo Go)

## 🎯 **Recomendação**
1. **Instale o JDK** (Java Development Kit)
2. **Execute**: `npx expo run:android --device`
3. **Teste o overlay real** sobre outros apps

## ⚡ **Alternativa Rápida**
Se não quiser instalar JDK agora:
1. **Crie conta gratuita** no Expo
2. **Execute**: `eas build --platform android`
3. **Baixe o APK** gerado
4. **Instale no celular** e teste

## 🔧 **Próximos Passos**
1. Escolher uma das opções acima
2. Gerar APK nativo
3. Testar overlay sobre outros apps
4. Confirmar que funciona perfeitamente

**O código está pronto! Só precisa gerar o APK nativo para testar o overlay real!** 🚀
