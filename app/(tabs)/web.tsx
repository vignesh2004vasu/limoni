import React from 'react';
import { StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const WebPageScreen = () => {
  return (
    <View style={styles.container}>
      <WebView 
        source={{ uri: 'https://www.youtube.com/watch?v=3j9DcRCxrFg' }} 
        style={styles.webview} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
  },
});

export default WebPageScreen;
