import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { HomeIcon } from "react-native-heroicons/outline";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../constants/DeviceDimention';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming } from 'react-native-reanimated';
import Header from './Header';
import { MotiView } from 'moti';



export default function Animation({ navigation, route }) {

  const [currentTlIndex, setCurrentTlIndex] = React.useState(0);
  const [lights, setLights] = React.useState(['green', 'red', 'red', 'red']);

  const [key1, setKey1] = useState(0);
  const [key2, setKey2] = useState(0);
  const [key3, setKey3] = useState(0);
  const [key4, setKey4] = useState(0);

  const laluanData  = route.params.laluanData;
   
  // result laluanData  // 
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

  useEffect(() => {
    const changeLight = () => {
      // Set all to red
      const newLights = ['red', 'red', 'red', 'red'];
      // Turn current light to green
      newLights[currentTlIndex] = 'green';
      setLights(newLights);
  
      // Get current green duration
      const currentGreenTime = laluanData[currentTlIndex]?.masaHijau || 10;
  
      // Wait for current green light to finish, then go to next light
      setTimeout(() => {
        const nextIndex = (currentTlIndex + 1) % 4;
        setCurrentTlIndex(nextIndex);
      }, currentGreenTime * 1000); // convert seconds to milliseconds
    };
  
    changeLight();
  }, [currentTlIndex]);





  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Header style={{ zIndex: 10, elevation: 10 }} />

        <View style={{  }}>
          <View style={{ height: DEVICE_HEIGHT * 0.4, marginTop:5, alignItems:'center', position: 'relative', zIndex: -1, backgroundColor:'white'}}>
            <Image source={require('../assets/images/intersection.jpg')} style={{ width: DEVICE_WIDTH* 0.99 , height: DEVICE_HEIGHT * 0.39, borderRadius: 10 }} />

            <Image id='TraficLight1' source={ lights[3] == 'green' ? require('../assets/images/tl_green.png') : require('../assets/images/tl_red.png') } style={{ width: DEVICE_WIDTH * 0.08, height: DEVICE_WIDTH * 0.2, position: 'absolute', bottom: '16%', right: '31%' }} />
            <Image id='TraficLight2' source={ lights[2] == 'green' ? require('../assets/images/tl_green.png') : require('../assets/images/tl_red.png') } style={{ width: DEVICE_WIDTH * 0.08, height: DEVICE_WIDTH * 0.2, position: 'absolute', bottom: '16%', left: '31%' }} />
            <Image id='TraficLight3' source={ lights[1] == 'green' ? require('../assets/images/tl_green.png') : require('../assets/images/tl_red.png') } style={{ width: DEVICE_WIDTH * 0.08, height: DEVICE_WIDTH * 0.2, position: 'absolute', top: '13%', right: '31%' }} />
            <Image id='TraficLight4' source={ lights[0] == 'green' ? require('../assets/images/tl_green.png') : require('../assets/images/tl_red.png') } style={{ width: DEVICE_WIDTH * 0.08, height: DEVICE_WIDTH * 0.2, position: 'absolute', top: '13%', left: '31%' }} />
          
            {
              lights[0] == 'green' &&
              <MotiView
                key={key1} // Changing key forces re-render
                from={{ translateX: DEVICE_WIDTH }}
                animate={{ translateX: -DEVICE_WIDTH }} // Move to the left
                transition={{ type: 'timing', duration: 5000 }}
                onDidAnimate={(key, finished) => {
                  if (key === 'translateX' && finished) {
                    setKey1(prevKey => prevKey + 1); // Reset animation
                  }
                }}
                style={{ position: 'absolute', bottom: '33%', right: 0 }}
              >
                <Image
                  source={require('../assets/images/car_blue.png')}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </MotiView>
            }

            {
              lights[1] == 'green' &&
              <MotiView
                key={key2} // Changing key forces re-render
                from={{ translateY:DEVICE_HEIGHT / 10 }}
                animate={{ translateY: -DEVICE_HEIGHT * 1.5 }} // Move to the left
                transition={{ type: 'timing', duration: 5000 }}
                onDidAnimate={(key, finished) => {
                  if (key === 'translateY' && finished) {
                    setKey2(prevKey => prevKey + 1); // Reset animation
                  }
                }}
                style={{ position: 'absolute', bottom: 0, right: '44%', zIndex: 1 }}
              >
                <Image
                  source={require('../assets/images/car_red.png')}
                  style={{ width: 100, height: 100 }}
                  resizeMode="contain"
                />
              </MotiView>
            }

            {
              lights[3] == 'green' &&
              <MotiView
                  key={key3} // Changing key forces re-render
                  from={{ translateX: -DEVICE_WIDTH }}
                  animate={{ translateX: DEVICE_WIDTH }} // Move to the left
                  transition={{ type: 'timing', duration: 5000 }}
                  onDidAnimate={(key, finished) => {
                    if (key === 'translateX' && finished) {
                      setKey3(prevKey => prevKey + 1); // Reset animation
                    }
                  }}
                  style={{ position: 'absolute', bottom: '43.5%', right: 0 }}
                >
                  <Image
                    source={require('../assets/images/car_blue.png')}
                    style={{ width: 100, height: 100, transform: [{ rotate: '180deg' }], }}
                    resizeMode="contain"
                  />
              </MotiView>
            }

            {
              lights[2] == 'green' &&
              <MotiView
                key={key4} // Changing key forces re-render
                from={{ translateY: -DEVICE_HEIGHT * 1.5}}
                animate={{ translateY: DEVICE_HEIGHT / 10 }} // Move to the left
                transition={{ type: 'timing', duration: 6000 }}
                onDidAnimate={(key, finished) => {
                  if (key === 'translateY' && finished) {
                    setKey4(prevKey => prevKey + 1); // Reset animation
                  }
                }}
                style={{ position: 'absolute', bottom: 0, left: '44%', zIndex: 1 }}
              >
                <Image
                  source={require('../assets/images/car_yellow.png')}
                  style={{ width: 100, height: 100, transform: [{ rotate: '180deg' }] }}
                  resizeMode="contain"
                />
              </MotiView>
            }

          

            </View>



            <View
              style={{
                paddingHorizontal: 16,
                paddingVertical: 16,
                height: DEVICE_HEIGHT * 0.6,
                position: 'relative',
                zIndex: 3,
                backgroundColor: '#fff',
                borderRadius: 12,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                <View style={{
                  width: '49%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8, // For Android
                }}>
                  <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 4, color: '#333' }}>
                    Laluan 1
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    Masa Hijau : <Text style={{fontWeight: 'bold', color:'#4CAF50'}}>{laluanData[0].masaHijau} s </Text>
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    Masa Merah : <Text style={{fontWeight: 'bold', color:'#F44336'}}>{laluanData[0].masaMerah} s </Text>
                  </Text>
                </View>


                <View style={{
                  width: '49%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8, // For Android
                }}>
                  <Text style={{ fontSize: 22, fontWeight: '700', marginBottom: 4, color: '#333' }}>
                    Laluan 2
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    Masa Hijau : <Text style={{fontWeight: 'bold', color:'#4CAF50'}}>{laluanData[1].masaHijau} s </Text>
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    Masa Merah : <Text style={{fontWeight: 'bold', color:'#F44336'}}>{laluanData[1].masaMerah} s </Text>
                  </Text>
                </View>
              </View>


              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 20,
                }}
              >
                <View style={{
                  width: '49%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8, // For Android
                }}>
                  <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 4, color: '#333' }}>
                    Laluan 3
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    Masa Hijau : <Text style={{fontWeight: 'bold', color:'#4CAF50'}}>{laluanData[2].masaHijau} s </Text>
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    Masa Merah : <Text style={{fontWeight: 'bold', color:'#F44336'}}>{laluanData[2].masaMerah} s </Text>
                  </Text>
                </View>


                <View style={{
                  width: '49%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRadius: 10,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4.65,
                  elevation: 8, // For Android
                }}>
                  <Text style={{ fontSize: 22, fontWeight: '600', marginBottom: 4, color: '#333' }}>
                    Laluan 4
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    Masa Hijau : <Text style={{fontWeight: 'bold', color:'#4CAF50'}}>{laluanData[3].masaHijau} s </Text>
                  </Text>
                  <Text style={{ fontSize: 20 }}>
                    Masa Merah : <Text style={{fontWeight: 'bold', color:'#F44336'}}>{laluanData[3].masaMerah} s </Text>
                  </Text>
                </View>
              </View>

            </View>


        </View>

        
      </SafeAreaProvider>
    </View>
  );
}
