import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const WorkoutsScreen = () => {
  const workoutCategories = [
    {
      title: 'Strength Training',
      icon: 'barbell',
      workouts: [
        {
          name: 'Full Body Strength',
          duration: '45 min',
          level: 'Intermediate',
          image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48',
        },
        {
          name: 'Upper Body Power',
          duration: '30 min',
          level: 'Advanced',
          image: 'https://images.unsplash.com/photo-1538805060514-97d9cc17730c',
        },
      ],
    },
    {
      title: 'Cardio',
      icon: 'heart',
      workouts: [
        {
          name: 'HIIT Cardio Blast',
          duration: '30 min',
          level: 'Intermediate',
          image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a',
        },
        {
          name: 'Endurance Run',
          duration: '45 min',
          level: 'Beginner',
          image: 'https://images.unsplash.com/photo-1518459031867-a89b944bffe4',
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {workoutCategories.map((category, index) => (
        <View key={index} style={styles.categorySection}>
          <View style={styles.categoryHeader}>
            <Icon name={category.icon} size={24} color="#D4AF37" />
            <Text style={styles.categoryTitle}>{category.title}</Text>
          </View>
          
          {category.workouts.map((workout, wIndex) => (
            <TouchableOpacity key={wIndex} style={styles.workoutCard}>
              <Image
                source={{ uri: workout.image }}
                style={styles.workoutImage}
              />
              <View style={styles.workoutInfo}>
                <Text style={styles.workoutName}>{workout.name}</Text>
                <View style={styles.workoutDetails}>
                  <View style={styles.detailItem}>
                    <Icon name="time-outline" size={16} color="#D4AF37" />
                    <Text style={styles.detailText}>{workout.duration}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Icon name="fitness-outline" size={16} color="#D4AF37" />
                    <Text style={styles.detailText}>{workout.level}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  categorySection: {
    padding: 20,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginLeft: 10,
  },
  workoutCard: {
    backgroundColor: '#2A2A2A',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 15,
  },
  workoutImage: {
    width: '100%',
    height: 150,
  },
  workoutInfo: {
    padding: 15,
  },
  workoutName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  workoutDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    color: '#CCCCCC',
    marginLeft: 5,
    fontSize: 14,
  },
});

export default WorkoutsScreen;
