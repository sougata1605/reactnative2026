
import { useEffect, useState } from 'react';

import {
    ActivityIndicator,
    FlatList,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';

const ProfileGallary = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    fetch('https://randomuser.me/api/?results=50')
      .then(res => res.json())
      .then(data => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  const colors = {
    background: isDark ? '#101827' : '#F3F6FB',
    card: isDark ? '#1E293B' : '#FFFFFF',
    heading: isDark ? '#FFFFFF' : '#172554',
    text: isDark ? '#CBD5E1' : '#64748B',
    name: isDark ? '#FFFFFF' : '#1E293B',
    border: isDark ? '#334155' : '#E2E8F0',
  };

  if (loading) {
    return (
      <View style={[styles.loader, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Loading Profiles...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />

      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={[styles.subtitle, { color: colors.text }]}>
            DISCOVER PEOPLE
          </Text>

          <Text style={[styles.heading, { color: colors.heading }]}>
            Profile Gallery
          </Text>

          <Text style={[styles.description, { color: colors.text }]}>
            Explore people from around the world
          </Text>
        </View>

        <View style={styles.countBox}>
          <Text style={styles.countNumber}>{users.length}</Text>
          <Text style={styles.countLabel}>Users</Text>
        </View>
      </View>

      {/* Profile List */}
      <FlatList
        data={users}
        numColumns={2}
        keyExtractor={item => item.login.uuid}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.card,
                borderColor: colors.border,
              },
            ]}
          >
            {/* Profile Image */}
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: item.picture.large }}
                style={styles.profileImage}
              />

              <View
                style={[
                  styles.statusDot,
                  {
                    backgroundColor:
                      item.gender === 'male' ? '#3B82F6' : '#EC4899',
                  },
                ]}
              />
            </View>

            {/* Name */}
            <Text
              style={[styles.name, { color: colors.name }]}
              numberOfLines={1}
            >
              {item.name.first} {item.name.last}
            </Text>

            {/* Gender */}
            <View
              style={[
                styles.genderBadge,
                {
                  backgroundColor:
                    item.gender === 'male' ? '#DBEAFE' : '#FCE7F3',
                },
              ]}
            >
              <Text
                style={[
                  styles.genderText,
                  {
                    color:
                      item.gender === 'male' ? '#2563EB' : '#DB2777',
                  },
                ]}
              >
                {item.gender === 'male' ? '♂ Male' : '♀ Female'}
              </Text>
            </View>

            {/* Age */}
            <Text style={[styles.info, { color: colors.text }]}>
              🎂 Age: {item.dob.age} years
            </Text>

            {/* Location */}
            <Text
              style={[styles.info, { color: colors.text }]}
              numberOfLines={1}
            >
              📍 {item.location.city}
            </Text>

            {/* Country */}
            <View style={styles.countryRow}>
              <Image
                source={{
                  uri: `https://flagcdn.com/w40/${item.nat.toLowerCase()}.png`,
                }}
                style={styles.flag}
              />

              <Text
                style={[styles.country, { color: colors.text }]}
                numberOfLines={1}
              >
                {item.location.country}
              </Text>
            </View>

            {/* Nationality */}
            <Text style={styles.nationality}>
              {item.nat}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ProfileGallary;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 22,
  },

  subtitle: {
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 6,
    color: '#6366F1',
  },

  heading: {
    fontSize: 27,
    fontWeight: '900',
    letterSpacing: -0.7,
  },

  description: {
    fontSize: 12,
    marginTop: 5,
  },

  countBox: {
    backgroundColor: '#6366F1',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 14,
    alignItems: 'center',
  },

  countNumber: {
    fontSize: 21,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },

  countLabel: {
    fontSize: 10,
    color: '#FFFFFF',
  },

  list: {
    paddingBottom: 25,
  },

  row: {
    justifyContent: 'space-between',
  },

  card: {
    width: '48%',
    borderRadius: 20,
    borderWidth: 1,
    padding: 12,
    marginBottom: 15,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },

  imageContainer: {
    marginTop: 5,
    marginBottom: 12,
    position: 'relative',
  },

  profileImage: {
    width: 85,
    height: 85,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: '#6366F1',
  },

  statusDot: {
    width: 17,
    height: 17,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    position: 'absolute',
    bottom: 2,
    right: 2,
  },

  name: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 8,
  },

  genderBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
    marginBottom: 10,
  },

  genderText: {
    fontSize: 11,
    fontWeight: '700',
  },

  info: {
    fontSize: 11,
    marginBottom: 7,
    textAlign: 'center',
  },

  countryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  flag: {
    width: 20,
    height: 14,
    marginRight: 5,
  },

  country: {
    fontSize: 10,
    flexShrink: 1,
  },

  nationality: {
    backgroundColor: '#6366F1',
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 9,
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: '600',
    color: '#6366F1',
  },
});
