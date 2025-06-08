// components/shared/GradientBackground.jsx
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const GradientBackground = ({ children, style }) => {
  return (
    <LinearGradient
      colors={['#0f1538', '#131624', '#0d0e12']} // Your desired dark gradient colors
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      // Merge default styles with any custom styles passed via props
      style={[styles.gradient, style]}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    // By default, center content. Can be overridden by 'style' prop if needed.
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { GradientBackground };

