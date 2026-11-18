
import {
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Text,
    View,
} from 'react-native';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <View style={styles.card}>

        <View style={styles.iconCircle}>
          <Text style={styles.icon}>🚀</Text>
        </View>

        <Text style={styles.subtitle}>
          MY JOURNEY
        </Text>

        <Text style={styles.heading}>
          Hello, World!
        </Text>

        <View style={styles.line} />

        <Text style={styles.message}>
          After becoming an orphan, I decided
          to build my career in mobile development.
        </Text>

        <Text style={styles.quote}>
          "Your past doesn't define your future."
        </Text>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            BUILDING • LEARNING • GROWING
          </Text>
        </View>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B1120',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  card: {
    width: '100%',
    backgroundColor: '#172238',
    padding: 28,
    borderRadius: 24,
    alignItems: 'center',
    elevation: 10,
    borderWidth: 1,
    borderColor: '#263957',
  },

  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#263F68',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },

  icon: {
    fontSize: 38,
  },

  subtitle: {
    color: '#60A5FA',
    fontSize: 12,
    letterSpacing: 4,
    fontWeight: 'bold',
    marginBottom: 12,
  },

  heading: {
    color: '#FFFFFF',
    fontSize: 34,
    fontWeight: '800',
    marginBottom: 18,
  },

  line: {
    width: 55,
    height: 4,
    backgroundColor: '#3B82F6',
    borderRadius: 5,
    marginBottom: 24,
  },

  message: {
    color: '#D1D9E6',
    fontSize: 17,
    lineHeight: 29,
    textAlign: 'center',
    marginBottom: 25,
  },

  quote: {
    color: '#60A5FA',
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: 'center',
    marginBottom: 30,
  },

  footer: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 20,
    width: '100%',
    alignItems: 'center',
  },

  footerText: {
    color: '#94A3B8',
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: 'bold',
  },
});
