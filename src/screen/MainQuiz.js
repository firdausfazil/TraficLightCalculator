import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaProvider,useSafeAreaInsets } from 'react-native-safe-area-context'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../constants/DeviceDimention'
import LottieView from 'lottie-react-native';
import { HomeIcon } from "react-native-heroicons/outline";

export default function MainQuiz({navigation}) {
  const insets = useSafeAreaInsets();
  return (
         <SafeAreaProvider style={{flex:1,}}>
          <View
            style={{
              paddingTop: insets.top, // Ensure content doesn't overlap with status bar
              backgroundColor: '#b6277e',
              borderBottomRightRadius: 20,
              borderBottomLeftRadius: 20,
              paddingHorizontal: 30,
              paddingBottom: 10, // Give some spacing before content
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Logo */}
              <Image
                source={require('../assets/logo/logo.png')}
                style={{ width: 50, height: 50, }} // Set a fixed size instead of relying on DEVICE_WIDTH
                resizeMode="contain"
              />

              {/* Home Button */}
              <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <HomeIcon color="white" size={40} />
              </TouchableOpacity>
            </View>
          </View>

            <View style={{height: DEVICE_HEIGHT * 0.6, alignItems:'center', gap:DEVICE_HEIGHT*0.06, paddingVertical: DEVICE_HEIGHT*0.05 }}>
                <Text style={{fontWeight:'bold', fontSize: DEVICE_HEIGHT*0.03}}>Let's do some quiz!</Text>

                <LottieView source={require('../assets/images/quiz.json')} autoPlay loop style={{width:DEVICE_WIDTH*0.7, height:DEVICE_WIDTH*0.7}} />
            </View>

         <View style={{width:DEVICE_WIDTH, position:'absolute', bottom:DEVICE_HEIGHT*0.05, left:0}}>
          <View style={{justifyContent:'center', alignItems:'center',  backgroundColor:'#d2cfd2',  paddingVertical:15, marginHorizontal:DEVICE_WIDTH*0.05, borderRadius: 250, elevation:3}}>
            <TouchableOpacity onPress={() => navigation.navigate('Quiz')} style={[styles.shadow]}>
                <Text  style={{fontSize: DEVICE_HEIGHT*0.02, fontWeight:600}}>Start Now</Text>
            </TouchableOpacity>
          </View>
         </View>
         </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({})