import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Share,
  Linking,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ShareScreen = () => {
  const appUrl = Platform.select({
    ios: 'https://apps.apple.com/app/palestra-fitness/id123456789',
    android: 'https://play.google.com/store/apps/details?id=com.palestra.app',
  });

  const shareApp = async () => {
    try {
      await Share.share({
        message: `Check out Palestra - Your premium fitness companion! Download now: ${appUrl}`,
        url: appUrl,
        title: 'Palestra Fitness App',
      });
    } catch (error) {
      console.error(error);
    }
  };

  const openStore = () => {
    Linking.openURL(appUrl);
  };

  const shareOptions = [
    {
      icon: 'share-social',
      title: 'Share with Friends',
      subtitle: 'Invite friends to join Palestra',
      onPress: shareApp,
    },
    {
      icon: 'star',
      title: 'Rate the App',
      subtitle: 'Love Palestra? Rate us!',
      onPress: openStore,
    },
    {
      icon: 'mail',
      title: 'Feedback',
      subtitle: 'Help us improve',
      onPress: () => Linking.openURL('mailto:feedback@palestra.com'),
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="share-outline" size={60} color="#D4AF37" />
        <Text style={styles.title}>Share Palestra</Text>
        <Text style={styles.subtitle}>
          Help others discover their fitness potential with Palestra
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {shareOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={styles.option}
            onPress={option.onPress}
          >
            <Icon name={option.icon} size={28} color="#D4AF37" />
            <View style={styles.optionText}>
              <Text style={styles.optionTitle}>{option.title}</Text>
              <Text style={styles.optionSubtitle}>{option.subtitle}</Text>
            </View>
            <Icon name="chevron-forward" size={24} color="#FFFFFF" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Why Share?</Text>
        <View style={styles.infoItem}>
          <Icon name="people-outline" size={24} color="#D4AF37" />
          <Text style={styles.infoText}>Build a stronger fitness community</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="trophy-outline" size={24} color="#D4AF37" />
          <Text style={styles.infoText}>Help others achieve their goals</Text>
        </View>
        <View style={styles.infoItem}>
          <Icon name="gift-outline" size={24} color="#D4AF37" />
          <Text style={styles.infoText}>Earn rewards for referrals</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 20,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#CCCCCC',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  optionsContainer: {
    marginBottom: 40,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
  },
  optionText: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  optionSubtitle: {
    fontSize: 14,
    color: '#CCCCCC',
  },
  infoContainer: {
    backgroundColor: '#2A2A2A',
    padding: 20,
    borderRadius: 15,
  },
  infoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  infoText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginLeft: 15,
  },
});

export default ShareScreen;
