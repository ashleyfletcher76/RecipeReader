import React from 'react';
import './src/i18n';
import { LanguageProvider, useLanguage } from './src/contexts/LanguageContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Button, View, Text, StyleSheet } from 'react-native';
import { useTranslation } from 'react-i18next';

function LanguageToggle() {
  const { language, updateLanguage } = useLanguage();
  const next = language === 'en' ? 'de' : 'en';
  return (
    <View style={styles.languageToggleContainer}>
      <Button title={`Switch to ${next.toUpperCase()}`} onPress={() => updateLanguage(next)} />
    </View>
  );
}

function Hello() {
  const { t } = useTranslation();
  return (
    <View style={styles.helloContainer}>
      <Text style={styles.helloText}>{t('welcome')}</Text>
    </View>
  );
}

export default function App() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <LanguageProvider>
        <View style={styles.screen}>
          <LanguageToggle />
          <Hello />
        </View>
      </LanguageProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  languageToggleContainer: {
    padding: 8,
  },
  helloContainer: {
    padding: 16,
  },
  helloText: {
    fontSize: 18,
  },
  root: {
    flex: 1,
    marginTop: 55,
  },
  screen: {
    flex: 1,
  },
});
