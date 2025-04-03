import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon } from "react-native-heroicons/outline";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../constants/DeviceDimention';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import Header from './Header';



export default function Animation({ navigation, route }) {

  const laluanData  = route.params.laluanData;
   
  //result laluanData
  // [
  //   {
  //       "masaHijau": 17,
  //       "masaMerah": 69
  //   },
  //   {
  //       "masaHijau": 11,
  //       "masaMerah": 75
  //   },
  //   {
  //       "masaHijau": 12,
  //       "masaMerah": 74
  //   },
  //   {
  //       "masaHijau": 39,
  //       "masaMerah": 47
  //   }
  // ]

  const intersectionWidth = DEVICE_WIDTH * 0.4; // Width of the intersection image
  const carStartX = intersectionWidth * 0.9; // Start from right side of the image
  const blueCarPosition = useSharedValue(carStartX);

  useEffect(() => {

   
    console.log(laluanData);
    console.log(typeof(laluanData));
    
    blueCarPosition.value = withRepeat(
      withTiming(-carStartX, { duration: 8000 }),
      -2,
      false
    );

  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: blueCarPosition.value * 0.2}],
  }));



  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Header />

        <View style={{ flex: 1 }}>
          <View style={{ 
            height: DEVICE_HEIGHT * 0.5, justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
            <Image source={require('../assets/images/intersection.jpg')} style={{ width: DEVICE_WIDTH * 0.95, height: DEVICE_WIDTH * 0.99, borderRadius: 10 }} />

              <Animated.Image
                source={require('../assets/images/car_blue.png')}
                style={[{
                  width: DEVICE_WIDTH * 0.2,
                  height: DEVICE_WIDTH * 0.08,
                  position: 'absolute',
                  bottom: '42%', // Jarak antara setiap kereta
                  right: '0%',
                }, animatedStyle]}
              />


            <Image source={require('../assets/images/tl_red.png')} style={{ width: DEVICE_WIDTH * 0.08, height: DEVICE_WIDTH * 0.2, position: 'absolute', bottom: 110, right: 130 }} />
            <Image source={require('../assets/images/tl_red.png')} style={{ width: DEVICE_WIDTH * 0.08, height: DEVICE_WIDTH * 0.2, position: 'absolute', bottom: 110, left: 130 }} />
            <Image source={require('../assets/images/tl_red.png')} style={{ width: DEVICE_WIDTH * 0.08, height: DEVICE_WIDTH * 0.2, position: 'absolute', top: 110, right: 130 }} />
            <Image source={require('../assets/images/tl_green.png')} style={{ width: DEVICE_WIDTH * 0.08, height: DEVICE_WIDTH * 0.2, position: 'absolute', top: 110, left: 130 }} />
          </View>

          <View style={{width: DEVICE_WIDTH, paddingHorizontal:20}}>
                {/* {laluanData.map((item, index) => (
                    <Text style={{ fontSize: DEVICE_HEIGHT * 0.02, fontWeight: 'bold' }}>{item.masaHijau}</Text>
                ))} */}
          </View>
        </View>

        
      </SafeAreaProvider>
    </View>
  );
}
