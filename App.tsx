import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { 
  StyleSheet, 
  Text, 
  View, 
  ScrollView, 
  TouchableOpacity, 
  Switch,
  SafeAreaView
} from 'react-native';
import SystemOverlay from './components/SystemOverlay';


// Cores do tema
const colors = {
  light: {
    background: '#FFFFFF',
    surface: '#F8F9FA',
    primary: '#FF6B35',
    secondary: '#1E3A8A',
    text: '#1F2937',
    textSecondary: '#6B7280',
    border: '#E5E7EB',
    card: '#FFFFFF',
  },
  dark: {
    background: '#0F172A',
    surface: '#1E293B',
    primary: '#FF6B35',
    secondary: '#1E3A8A',
    text: '#F8FAFC',
    textSecondary: '#94A3B8',
    border: '#334155',
    card: '#1E293B',
  }
};

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [assistenteEnabled, setAssistenteEnabled] = useState(false);
  const [calculoEnabled, setCalculoEnabled] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [selectedApps, setSelectedApps] = useState({
    uber: true,
    '99': true,
    indriver: true
  });


  const theme = isDarkMode ? colors.dark : colors.light;

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const toggleAppSelection = (appName: string) => {
    setSelectedApps(prev => ({
      ...prev,
      [appName]: !prev[appName as keyof typeof prev]
    }));
  };

  const handleAssistenteToggle = (value: boolean) => {
    setAssistenteEnabled(value);
  };


  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Text style={[styles.logo, { color: theme.primary }]}>MotoCalc</Text>
            <TouchableOpacity onPress={toggleTheme} style={styles.themeToggle}>
              <Text style={styles.themeIcon}>{isDarkMode ? '☀️' : '🌙'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Banner de Assinatura */}
        <View style={[styles.subscriptionBanner, { backgroundColor: theme.primary }]}>
          <View style={styles.subscriptionContent}>
            <View style={styles.subscriptionText}>
              <Text style={styles.subscriptionTitle}>Assinatura Ativa</Text>
              <Text style={styles.subscriptionDate}>Renova em: sex, 26 de set de 2025</Text>
            </View>
            <Text style={styles.lightningIcon}>⚡</Text>
          </View>
        </View>

        {/* Seções de Funcionalidades */}
        <View style={styles.featuresContainer}>
          
          {/* Assistente */}
          <View style={[styles.featureCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.featureHeader}>
              <View style={styles.featureTitleContainer}>
                <Text style={[styles.featureTitle, { color: theme.text }]}>Assistente</Text>
                <Text style={[styles.featureStatus, { color: theme.textSecondary }]}>OFF</Text>
              </View>
              <View style={styles.featureControls}>
                <TouchableOpacity style={styles.settingsButton}>
                  <Text style={[styles.settingsIcon, { color: theme.textSecondary }]}>⚙️</Text>
                </TouchableOpacity>
                <Switch
                  value={assistenteEnabled}
                  onValueChange={handleAssistenteToggle}
                  trackColor={{ false: '#E5E7EB', true: theme.primary }}
                  thumbColor={assistenteEnabled ? '#FFFFFF' : '#F3F4F6'}
                />
              </View>
            </View>
            <Text style={[styles.featureDescription, { color: theme.textSecondary }]}>
              Ligue para utilizar os recursos abaixo
            </Text>
          </View>

          {/* Cálculo de Ganhos */}
          <View style={[styles.featureCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.featureHeader}>
              <View style={styles.featureTitleContainer}>
                <View style={styles.featureTitleWithIcon}>
                  <Text style={styles.dollarIcon}>💰</Text>
                  <Text style={[styles.featureTitle, { color: theme.text }]}>Cálculo de Ganhos</Text>
                </View>
                <Text style={[styles.featureStatus, { color: theme.textSecondary }]}>OFF</Text>
              </View>
              <View style={styles.featureControls}>
                <TouchableOpacity style={styles.settingsButton}>
                  <Text style={[styles.settingsIcon, { color: theme.textSecondary }]}>⚙️</Text>
                </TouchableOpacity>
                <Switch
                  value={calculoEnabled}
                  onValueChange={setCalculoEnabled}
                  trackColor={{ false: '#E5E7EB', true: theme.primary }}
                  thumbColor={calculoEnabled ? '#FFFFFF' : '#F3F4F6'}
                />
              </View>
            </View>
            <Text style={[styles.featureDescription, { color: theme.textSecondary }]}>
              Exibe a rentabilidade de corridas em um card junto às chamadas
            </Text>
            <View style={styles.appLogos}>
              <TouchableOpacity 
                style={[
                  styles.appLogo, 
                  { backgroundColor: selectedApps.uber ? '#000000' : '#E5E7EB' }
                ]}
                onPress={() => toggleAppSelection('uber')}
              >
                <Text style={[
                  styles.appLogoText, 
                  { color: selectedApps.uber ? '#FFFFFF' : '#9CA3AF' }
                ]}>UBER</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.appLogo, 
                  { backgroundColor: selectedApps['99'] ? '#FFD700' : '#E5E7EB' }
                ]}
                onPress={() => toggleAppSelection('99')}
              >
                <Text style={[
                  styles.appLogoText, 
                  { color: selectedApps['99'] ? '#000000' : '#9CA3AF' }
                ]}>99</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[
                  styles.appLogo, 
                  { backgroundColor: selectedApps.indriver ? '#00C851' : '#E5E7EB' }
                ]}
                onPress={() => toggleAppSelection('indriver')}
              >
                <Text style={[
                  styles.appLogoText, 
                  { color: selectedApps.indriver ? '#FFFFFF' : '#9CA3AF' }
                ]}>iD</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Câmera Secreta */}
          <View style={[styles.featureCard, { backgroundColor: theme.card, borderColor: theme.border }]}>
            <View style={styles.featureHeader}>
              <View style={styles.featureTitleContainer}>
                <View style={styles.featureTitleWithIcon}>
                  <Text style={styles.cameraIcon}>📹</Text>
                  <Text style={[styles.featureTitle, { color: theme.text }]}>Câmera Secreta</Text>
                </View>
                <Text style={[styles.featureStatus, { color: theme.textSecondary }]}>OFF</Text>
              </View>
              <View style={styles.featureControls}>
                <TouchableOpacity style={styles.settingsButton}>
                  <Text style={[styles.settingsIcon, { color: theme.textSecondary }]}>⚙️</Text>
                </TouchableOpacity>
                <Switch
                  value={cameraEnabled}
                  onValueChange={setCameraEnabled}
                  trackColor={{ false: '#E5E7EB', true: theme.primary }}
                  thumbColor={cameraEnabled ? '#FFFFFF' : '#F3F4F6'}
                />
              </View>
            </View>
            <Text style={[styles.featureDescription, { color: theme.textSecondary }]}>
              Grave suas corridas diretamente do botão flutuante
            </Text>
          </View>
        </View>

        {/* Botões de Ação */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.primary }]}>
            <Text style={styles.actionButtonIcon}>❓</Text>
            <Text style={styles.actionButtonText}>AJUDA</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.actionButton, { backgroundColor: theme.primary }]}>
            <Text style={styles.actionButtonIcon}>▶️</Text>
            <Text style={styles.actionButtonText}>TUTORIAIS</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Navegação Inferior */}
      <View style={[styles.bottomNavigation, { backgroundColor: theme.secondary }]}>
        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, { color: theme.primary }]}>🚗</Text>
          <Text style={[styles.navText, { color: theme.primary }]}>Assistente</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <View style={styles.userContainer}>
            <Text style={[styles.navIcon, { color: theme.textSecondary }]}>👤</Text>
            <View style={styles.onlineIndicator} />
          </View>
          <Text style={[styles.navText, { color: theme.textSecondary }]}>Rafael</Text>
        </TouchableOpacity>
      </View>


      {/* Overlay de Sistema */}
      <SystemOverlay 
        isVisible={assistenteEnabled}
        theme={theme}
        onClose={() => setAssistenteEnabled(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  themeToggle: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  themeIcon: {
    fontSize: 18,
  },
  logo: {
    fontSize: 28,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  subscriptionBanner: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 12,
    padding: 16,
  },
  subscriptionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subscriptionText: {
    flex: 1,
  },
  subscriptionTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subscriptionDate: {
    color: '#FFFFFF',
    fontSize: 14,
    opacity: 0.9,
  },
  lightningIcon: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  featuresContainer: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  featureCard: {
    borderRadius: 12,
    borderWidth: 1,
    padding: 16,
    marginBottom: 16,
  },
  featureHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  featureTitleContainer: {
    flex: 1,
  },
  featureTitleWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  featureStatus: {
    fontSize: 12,
    fontWeight: '500',
  },
  featureControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsButton: {
    marginRight: 12,
  },
  settingsIcon: {
    fontSize: 18,
  },
  featureDescription: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  appLogos: {
    flexDirection: 'row',
    gap: 8,
  },
  appLogo: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  appLogoText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dollarIcon: {
    fontSize: 18,
  },
  cameraIcon: {
    fontSize: 18,
  },
  actionButtons: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 12,
    marginBottom: 24,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  actionButtonIcon: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomNavigation: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
  },
  userContainer: {
    position: 'relative',
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  navIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  navText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
