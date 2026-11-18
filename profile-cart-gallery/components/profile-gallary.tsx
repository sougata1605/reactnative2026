
import { StyleSheet, Text, View, FlatList, Image, ActivityIndicator, useColorScheme } from 'react-native';
import React, { useEffect, useState } from 'react';

const ProfileGallary = () => {

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();

  useEffect(() => {
    fetch("https://randomuser.me/api/?results=10")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        colorScheme === "dark" ? styles.darkBg : styles.lightBg
      ]}
    >

      <Text style={styles.heading}>Profile Gallery</Text>

      <FlatList
        data={users}
        keyExtractor={(item) => item.login.uuid}

        renderItem={({ item }) => (

          <View style={styles.card}>

            <Image
              source={{ uri: item.picture.large }}
              style={styles.profileImage}
            />

            <View style={styles.userInfo}>

              <Text style={styles.name}>
                {item.name.title} {item.name.first} {item.name.last}
              </Text>

              <Text style={styles.text}>
                Gender: {item.gender}
              </Text>

              <Text style={styles.text}>
                Age: {item.dob.age}
              </Text>

              <Text style={styles.text}>
                Email: {item.email}
              </Text>

              <Text style={styles.text}>
                Phone: {item.phone}
              </Text>

              <Text style={styles.text}>
                City: {item.location.city}
              </Text>

              <Text style={styles.text}>
                Country: {item.location.country}
              </Text>

              <Text style={styles.text}>
                Nationality: {item.nat}
              </Text>

            </View>

          </View>

        )}

        showsVerticalScrollIndicator={false}
      />

    </View>
  );
};

export default ProfileGallary;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 15,
  },

  lightBg: {
    backgroundColor: '#F2F4F7',
  },

  darkBg: {
    backgroundColor: '#121212',
  },

  heading: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#007AFF',
  },

  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
  },

  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  userInfo: {
    flex: 1,
    marginLeft: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222222',
    marginBottom: 8,
  },

  text: {
    fontSize: 13,
    color: '#555555',
    marginBottom: 5,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
