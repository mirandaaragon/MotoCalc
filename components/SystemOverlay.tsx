import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Dimensions,
  Platform,
  Alert,
  PanResponder,
  Animated,
  Linking
} from 'react-native';
import * as Device from 'expo-device';

const { width, height } = Dimensions.get('window');

interface SystemOverlayProps {
  isVisible: boolean;
  theme: any;
  onClose: () => void;
}

export default function SystemOverlay({ isVisible, theme, onClose }: SystemOverlayProps) {
  const [hasPermission, setHasPermission] = useState(false);
  const [pan, setPan] = useState(new Animated.ValueXY());
  const [panResponder, setPanResponder] = useState(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: (pan.x as any)._value,
          y: (pan.y as any)._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        pan.flattenOffset();
        const maxX = width - 60;
        const maxY = height - 60;

        Animated.spring(pan, {
          toValue: {
            x: Math.max(0, Math.min((pan.x as any)._value, maxX)),
            y: Math.max(0, Math.min((pan.y as any)._value, maxY)),
          },
          useNativeDriver: false,
        }).start();
      },
    })
  );

  useEffect(() => {
    checkOverlayPermission();
  }, []);

  useEffect(() => {
    if (!isVisible) {
      // Reset position when assistente is disabled
      const newPan = new Animated.ValueXY();
      setPan(newPan);
      
      const newPanResponder = PanResponder.create({
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
          newPan.setOffset({
            x: (newPan.x as any)._value,
            y: (newPan.y as any)._value,
          });
          newPan.setValue({ x: 0, y: 0 });
        },
        onPanResponderMove: Animated.event(
          [null, { dx: newPan.x, dy: newPan.y }],
          { useNativeDriver: false }
        ),
        onPanResponderRelease: () => {
          newPan.flattenOffset();
          const maxX = width - 60;
          const maxY = height - 60;

          Animated.spring(newPan, {
            toValue: {
              x: Math.max(0, Math.min((newPan.x as any)._value, maxX)),
              y: Math.max(0, Math.min((newPan.y as any)._value, maxY)),
            },
            useNativeDriver: false,
          }).start();
        },
      });
      setPanResponder(newPanResponder);
    }
  }, [isVisible]);

  const checkOverlayPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        // Verificar se tem permissão de sobreposição
        const hasPermission = await Device.hasOverlayPermissionAsync();
        setHasPermission(hasPermission);
        
        if (!hasPermission) {
          requestOverlayPermission();
        }
      } catch (error) {
        console.log('Erro ao verificar permissão:', error);
        // Fallback: assumir que não tem permissão
        setHasPermission(false);
        requestOverlayPermission();
      }
    } else {
      setHasPermission(true);
    }
  };


  const requestOverlayPermission = async () => {
    if (Platform.OS === 'android') {
      Alert.alert(
        'Permissão de Sobreposição Necessária',
        'Para que o assistente funcione sobre outros apps, é necessário conceder permissão de sobreposição. Vamos abrir as configurações para você.',
        [
          {
            text: 'Cancelar',
            style: 'cancel',
          },
          {
            text: 'Abrir Configurações',
            onPress: async () => {
              try {
                // Tentar abrir as configurações de permissão
                const opened = await Device.openOverlayPermissionSettingsAsync();
                if (!opened) {
                  // Fallback: abrir configurações gerais do app
                  await Linking.openSettings();
                }
              } catch (error) {
                console.log('Erro ao abrir configurações:', error);
                // Fallback: abrir configurações gerais
                await Linking.openSettings();
              }
            },
          },
        ]
      );
    }
  };

  if (!isVisible) {
    return null;
  }

  if (!hasPermission) {
    return (
      <View style={styles.permissionContainer}>
        <View style={[styles.permissionBox, { backgroundColor: theme.primary }]}>
          <Text style={[styles.permissionTitle, { color: theme.background }]}>
            🎯 Permissão Necessária
          </Text>
          <Text style={[styles.permissionText, { color: theme.background }]}>
            O assistente precisa de permissão para aparecer sobre outros apps
          </Text>
          <TouchableOpacity 
            style={[styles.permissionButton, { backgroundColor: theme.background }]}
            onPress={checkOverlayPermission}
          >
            <Text style={[styles.permissionButtonText, { color: theme.primary }]}>
              Verificar Permissão
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.systemOverlay}>
      <Animated.View
        style={[
          styles.floatingButton,
          { 
            backgroundColor: theme.primary,
            transform: [
              { translateX: pan.x },
              { translateY: pan.y }
            ]
          }
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity 
          style={styles.buttonContent}
          onPress={onClose}
        >
          <Text style={styles.floatingButtonIcon}>🎯</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  systemOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'box-none',
    zIndex: 9999,
  },
  permissionContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 10000,
  },
  permissionBox: {
    margin: 20,
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  permissionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  permissionButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  permissionButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  floatingButton: {
    position: 'absolute',
    top: height * 0.3,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonContent: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  floatingButtonIcon: {
    fontSize: 24,
  },
});
