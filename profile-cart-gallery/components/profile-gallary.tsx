
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

const cardColors = [
  '#F06400',
  '#7135A5',
  '#4245E8',
  '#16A078',
  '#D51D91',
  '#C21878',
  '#258FD0',
  '#C21878',
  '#269D91',
  '#E64A19',
  '#3445B5',
  '#168B68',
];

const ProfileGallary = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // IP-based country states
  const [country, setCountry] = useState('Detecting...');
  const [countryCode, setCountryCode] = useState('');

  // FETCH USERS
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=5000')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch users');
        return res.json();
      })
      .then(data => {
        setUsers(data.results);
        setLoading(false);
      })
      .catch(error => {
        console.log('User API Error:', error);
        setLoading(false);
      });
  }, []);

  // DETECT COUNTRY USING IP ADDRESS (with fallback APIs for mobile)
  useEffect(() => {
    let isMounted = true;

    const detectCountry = async () => {
      // API 1: ipwho.is
      try {
        const response = await fetch('https://ipwho.is/');
        const data = await response.json();

        if (response.ok && data.success !== false && data.country && data.country_code) {
          if (isMounted) {
            setCountry(data.country);
            setCountryCode(data.country_code);
          }
          return;
        }
      } catch (error) {
        console.log('ipwho.is failed:', error);
      }

      // API 2: ipapi.co
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();

        if (response.ok && !data.error && data.country_name && data.country_code) {
          if (isMounted) {
            setCountry(data.country_name);
            setCountryCode(data.country_code);
          }
          return;
        }
      } catch (error) {
        console.log('ipapi.co failed:', error);
      }

      // API 3: country.is (returns country code only)
      try {
        const response = await fetch('https://api.country.is/');
        const data = await response.json();

        const countryNames: { [key: string]: string } = {
          IN: 'India',
          US: 'United States',
          GB: 'United Kingdom',
          CA: 'Canada',
          AU: 'Australia',
          DE: 'Germany',
          FR: 'France',
          ES: 'Spain',
          BD: 'Bangladesh',
          NP: 'Nepal',
          SG: 'Singapore',
          AE: 'United Arab Emirates',
        };

        const code = data.country;

        if (response.ok && code && isMounted) {
          setCountryCode(code);
          setCountry(countryNames[code] || code);
          return;
        }
      } catch (error) {
        console.log('country.is failed:', error);
      }

      if (isMounted) {
        setCountry('Location unavailable');
        setCountryCode('');
      }
    };

    detectCountry();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#FF6B00" />
        <Text style={styles.loadingText}>
          Loading Profiles...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar
        backgroundColor="#20232E"
        barStyle="light-content"
      />

      {/* TOP HEADER */}

      <View style={styles.header}>

        <TouchableOpacity style={styles.notification}>
          <Text style={styles.headerIcon}>🔔</Text>

          <View style={styles.notificationBadge}>
            <Text style={styles.badgeText}>2</Text>
          </View>
        </TouchableOpacity>

        {/* IP DETECTED COUNTRY */}

        <TouchableOpacity style={styles.location}>

          {countryCode !== '' && (
            <Image
              source={{
                uri: `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`,
              }}
              style={styles.headerFlag}
              resizeMode="contain"
            />
          )}

          <Text style={styles.locationText}>
            📍 {country}
          </Text>

          <Text style={styles.arrow}>⌄</Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.searchIcon}>⌕</Text>
        </TouchableOpacity>

      </View>

      {/* PROFILE GALLERY */}

      <FlatList
        data={users}
        keyExtractor={item => item.login.uuid}
        numColumns={3}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.list}

        renderItem={({ item, index }) => (

          <TouchableOpacity
            activeOpacity={0.85}
            style={[
              styles.card,
              {
                backgroundColor:
                  cardColors[index % cardColors.length],
              },
            ]}
          >

            {/* TOP CARD ICONS */}

            <View style={styles.cardTop}>
              <Text style={styles.smallIcon}>●</Text>
              <Text style={styles.smallIcon}>♨</Text>
            </View>

            {/* PROFILE IMAGE */}

            <View style={styles.imageWrapper}>
              <Image
                source={{ uri: item.picture.large }}
                style={styles.profileImage}
              />
            </View>

            {/* USER NAME */}

            <Text style={styles.name} numberOfLines={2}>
              {item.name.first} {item.name.last}
            </Text>

            {/* GENDER */}

            <Text style={styles.profession}>
              {item.gender === 'male' ? '♂ Male' : '♀ Female'}
            </Text>

            {/* AGE */}

            <Text style={styles.age}>
              Age: {item.dob.age}
            </Text>

            {/* CITY */}

            <View style={styles.cityContainer}>
              <Text style={styles.city} numberOfLines={1}>
                {item.location.city}
              </Text>
            </View>

            {/* USER COUNTRY FLAG */}

            <View style={styles.flagContainer}>
              <Image
                source={{
                  uri: `https://flagcdn.com/w40/${item.nat.toLowerCase()}.png`,
                }}
                style={styles.flag}
                resizeMode="contain"
              />

              <Text style={styles.nationality}>
                {item.nat}
              </Text>
            </View>

          </TouchableOpacity>
        )}
      />

      {/* BOTTOM NAVIGATION */}

      <View style={styles.bottomNav}>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>ϟ</Text>
          <Text style={styles.navText}>Feed</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={[styles.navIcon, styles.activeIcon]}>♙</Text>
          <Text style={[styles.navText, styles.activeText]}>
            Explore
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addIcon}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>☏</Text>
          <Text style={styles.navText}>Messages</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>♟</Text>
          <Text style={styles.navText}>Profile</Text>
        </TouchableOpacity>

      </View>

    </View>
  );
};

export default ProfileGallary;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#20232E',
  },

  loader: {
    flex: 1,
    backgroundColor: '#20232E',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    color: '#FFFFFF',
    marginTop: 12,
    fontSize: 15,
  },

  // HEADER

  header: {
    height: 65,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 17,
  },

  notification: {
    position: 'relative',
    padding: 5,
  },

  headerIcon: {
    fontSize: 23,
    color: '#FFFFFF',
  },

  notificationBadge: {
    position: 'absolute',
    right: -2,
    top: -2,
    backgroundColor: '#FF4B16',
    width: 19,
    height: 19,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
  },

  // COUNTRY HEADER

  location: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerFlag: {
    width: 25,
    height: 18,
    marginRight: 7,
  },

  locationText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  arrow: {
    color: '#FFFFFF',
    fontSize: 20,
    marginLeft: 5,
  },

  searchButton: {
    width: 34,
    height: 34,
    backgroundColor: '#343846',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },

  searchIcon: {
    color: '#FFFFFF',
    fontSize: 25,
  },

  // FLATLIST

  list: {
    paddingHorizontal: 9,
    paddingBottom: 12,
  },

  row: {
    justifyContent: 'space-between',
  },

  // PROFILE CARD

  card: {
    width: '32.3%',
    height: 218,
    borderRadius: 6,
    marginBottom: 4,
    paddingHorizontal: 5,
    alignItems: 'center',
    overflow: 'hidden',
  },

  cardTop: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
  },

  smallIcon: {
    color: '#FFFFFF',
    fontSize: 9,
    fontWeight: 'bold',
  },

  imageWrapper: {
    marginTop: 12,
    width: 76,
    height: 76,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
  },

  name: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
    minHeight: 30,
  },

  profession: {
    color: '#F5EAF5',
    fontSize: 10,
    textAlign: 'center',
    marginTop: 2,
  },

  age: {
    color: '#F5EAF5',
    fontSize: 10,
    marginTop: 4,
  },

  cityContainer: {
    marginTop: 'auto',
    marginBottom: 7,
    width: '100%',
    alignItems: 'center',
  },

  city: {
    color: '#F5EAF5',
    fontSize: 11,
    textAlign: 'center',
  },

  // CARD FLAGS

  flagContainer: {
    position: 'absolute',
    top: 7,
    left: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },

  flag: {
    width: 28,
    height: 19,
    resizeMode: 'contain',
  },

  nationality: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },

  // BOTTOM NAVIGATION

  bottomNav: {
    height: 68,
    backgroundColor: '#191C27',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 5,
    borderTopWidth: 1,
    borderTopColor: '#343846',
  },

  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  navIcon: {
    fontSize: 23,
    color: '#AEB3C0',
  },

  navText: {
    fontSize: 9,
    color: '#AEB3C0',
    marginTop: 3,
  },

  activeIcon: {
    color: '#FF6B00',
  },

  activeText: {
    color: '#FF6B00',
  },

  addButton: {
    width: 43,
    height: 43,
    borderRadius: 25,
    backgroundColor: '#FF6B00',
    justifyContent: 'center',
    alignItems: 'center',
  },

  addIcon: {
    color: '#FFFFFF',
    fontSize: 32,
    lineHeight: 37,
    fontWeight: 'bold',
  },

});
