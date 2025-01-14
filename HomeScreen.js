import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

const HomeScreen = ({ navigation }) => {
  const stats = [
    { icon: 'people', title: '10K+', subtitle: 'Active Users' },
    { icon: 'barbell', title: '500+', subtitle: 'Workout Plans' },
    { icon: 'heart', title: '98%', subtitle: 'Success Rate' },
    { icon: 'trophy', title: '50+', subtitle: 'Expert Trainers' },
  ];

  const programs = [
    {
      title: 'Strength Training',
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
      description: 'Build muscle and increase strength',
    },
    {
      title: 'Cardio Fitness',
      image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c',
      description: 'Improve cardiovascular health',
    },
    {
      title: 'HIIT Workouts',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a',
      description: 'Maximum calorie burn',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={['#1E1E1E', '#2A2A2A']}
        style={styles.heroSection}
      >
        <Text style={styles.heroTitle}>Transform Your Life</Text>
        <Text style={styles.heroSubtitle}>
          Your journey to a healthier lifestyle starts here
        </Text>
        <TouchableOpacity
          style={styles.startButton}
          onPress={() => navigation.navigate('Workouts')}
        >
          <Text style={styles.buttonText}>Start Your Journey</Text>
        </TouchableOpacity>
      </LinearGradient>

      <View style={styles.statsContainer}>
        {stats.map((stat, index) => (
          <View key={index} style={styles.statItem}>
            <Icon name={stat.icon} size={24} color="#D4AF37" />
            <Text style={styles.statTitle}>{stat.title}</Text>
            <Text style={styles.statSubtitle}>{stat.subtitle}</Text>
          </View>
        ))}
      </View>

      <Text style={styles.sectionTitle}>Featured Programs</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.programsContainer}
      >
        {programs.map((program, index) => (
          <TouchableOpacity
            key={index}
            style={styles.programCard}
            onPress={() => navigation.navigate('Workouts')}
          >
            <Image
              source={{ uri: program.image }}
              style={styles.programImage}
            />
            <View style={styles.programContent}>
              <Text style={styles.programTitle}>{program.title}</Text>
              <Text style={styles.programDescription}>
                {program.description}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  heroSection: {
    padding: 20,
    paddingTop: 40,
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: 10,
  },
  heroSubtitle: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  startButton: {
    backgroundColor: '#D4AF37',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: {
    color: '#1E1E1E',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 15,
    justifyContent: 'space-between',
  },
  statItem: {
    width: '48%',
    backgroundColor: '#2A2A2A',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  statTitle: {
    color: '#D4AF37',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  statSubtitle: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    padding: 20,
    paddingBottom: 10,
  },
  programsContainer: {
    paddingLeft: 20,
  },
  programCard: {
    width: width * 0.7,
    marginRight: 15,
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    overflow: 'hidden',
  },
  programImage: {
    width: '100%',
    height: 150,
  },
  programContent: {
    padding: 15,
  },
  programTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  programDescription: {
    fontSize: 14,
    color: '#CCCCCC',
  },
});

export default HomeScreen;
