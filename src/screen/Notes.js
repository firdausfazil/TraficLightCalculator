import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../constants/DeviceDimention'
import { HomeIcon } from "react-native-heroicons/outline";



export default function Notes({navigation}) {
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
            source={require('../assets/images/notes.png')}
            style={{ width: 50, height: 50, }} // Set a fixed size instead of relying on DEVICE_WIDTH
            resizeMode="contain"
          />

          {/* Home Button */}
          <TouchableOpacity onPress={() => navigation.navigate('Main')}>
            <HomeIcon color="white" size={40} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={{height: DEVICE_HEIGHT * 0.85, paddingTop: 10, paddingBottom: DEVICE_HEIGHT*0.04, paddingHorizontal: DEVICE_WIDTH*0.05 }}>
          <ScrollView>
            {/* <Image source={require('../assets/images/notes.png')} style={{width: DEVICE_WIDTH*0.15, height:DEVICE_WIDTH*0.15}} /> */}

            <View style={{gap:7, marginTop:20}}>

              <View>
                <Text style={{fontSize: DEVICE_HEIGHT*0.02, fontWeight:'bold'}}>Pengenalan</Text>
                <Text style={{fontSize: DEVICE_HEIGHT*0.02, textAlign: 'justify'}}>Berikut adalah nota ringkas mengenai pengenalan lampu isyarat (traffic light) dan cara pengiraan fasa lampu isyarat:</Text>
              </View>

              <View>
                <Text style={{fontSize: DEVICE_HEIGHT*0.02, fontWeight:'bold'}}>Pengenalan Lampu Isyarat (Traffic Light)</Text>
                <Text style={{fontSize: DEVICE_HEIGHT*0.02, textAlign: 'justify'}}>Lampu isyarat merupakan sistem kawalan lalu lintas yang digunakan untuk mengawal pergerakan kenderaan dan pejalan kaki di persimpangan jalan. Ia berfungsi untuk mengelakkan kesesakan lalu lintas serta mengingkatkan keselamatan pengguna jalan raya.</Text>
              </View>

              <View>
                <Text style={{ fontSize: DEVICE_HEIGHT * 0.02, fontWeight: 'bold' }}>
                  Komponen utama lampu isyarat
                </Text>
                <View style={{ marginLeft: 10 }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: DEVICE_HEIGHT * 0.02 }}>1. </Text>
                    <Text style={{ fontSize: DEVICE_HEIGHT * 0.02, textAlign: 'justify', flex: 1 }}>
                      Lampu Merah - Mengarah kenderaan untuk berhenti
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: DEVICE_HEIGHT * 0.02 }}>2. </Text>
                    <Text style={{ fontSize: DEVICE_HEIGHT * 0.02, textAlign: 'justify', flex: 1 }}>
                      Lampu Kuning (ember) - Memberi amaran bahawa lampu akan bertukar kepada merah
                    </Text>
                  </View>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={{ fontSize: DEVICE_HEIGHT * 0.02 }}>3. </Text>
                    <Text style={{ fontSize: DEVICE_HEIGHT * 0.02, textAlign: 'justify', flex: 1 }}>
                      Lampu Hijau - Membenarkan kenderaan untuk bergerak
                    </Text>
                  </View>
                </View>
              </View>

            </View>
          </ScrollView>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({})