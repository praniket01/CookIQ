// components/shared/GradientBackground.jsx
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet } from 'react-native';

const GradientBackground = ({ children, style }) => {
  return (
    <LinearGradient
      colors={['#0f1538', '#131624', '#0d0e12']} 
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      
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

