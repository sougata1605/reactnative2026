import React from 'react'

import { Text, View, StyleSheet,Image,TextInput } from "react-native";

const Index = () => {
  return (
    <view>

      
      <text>
        Subhas chandra chatterjee 
      </text>
<view><text>  Shanta chatterjee</text></view>
    

<Image
  source={require('../../assets/images/1789721838294.jpg')}
  style={{ height: 100, width: 100 }}
/>



     
    </view>



  )
}


const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default Index