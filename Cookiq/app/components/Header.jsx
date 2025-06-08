import { useContext } from 'react';
import { Dimensions, Image, Text, View } from 'react-native';
import { UserDetailContext } from '../../context/UserDetailContext';
import colors from '../../shared/colors';

const { width } = Dimensions.get('window');

const Header = () => {
  const { user } = useContext(UserDetailContext); 

  const userName = user?.name || 'Guest';

  const profilePicSource = { uri: user.picture }; 

  return (
    <View style={{
      flexDirection: 'row', 
      alignItems: 'center',
      // paddingHorizontal: 20, 
      paddingVertical: 15,
      width: '100%',
      
    }}>
      {/* Profile Picture */}
      <Image
        source={profilePicSource}
        style={{
          width: 50, 
          height: 50, 
          borderRadius: 25,
          marginRight: 15, 
          borderWidth: 2, 
          borderColor: colors.WHITE, 
        }}
      />

      {/* Welcome Text */}
      <View style={{
        flex: 1
      }}>
        <Text style={{
          fontSize: 16,
          color: colors.WHITE, 
          opacity: 0.7, 
        }}>Welcome,</Text>
        <Text style={{
          fontSize: 22,
          fontWeight: 'bold',
          color: colors.WHITE, 
        }}>{userName}!</Text>
      </View>
    </View>
  );
};

export { Header };

