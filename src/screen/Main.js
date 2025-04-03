import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../constants/DeviceDimention'
import { SafeAreaProvider } from 'react-native-safe-area-context'

export default function Main({navigation}) {

  const button = [
    {
      id:1,
      name: 'Quiz',
      path: 'MainQuiz'
    },
    {
      id:2,
      name: 'Calculation',
      path: 'Calculation'
    },
    {
      id:3,
      name: 'Notes',
      path: 'Notes'
    }
  ]

  return (
    <View style={{flex:1,}}>
      <SafeAreaProvider>
        <View style={{height: DEVICE_HEIGHT * 0.4, backgroundColor: '#b6277e', borderBottomRightRadius:  70, alignItems:'center', justifyContent:'center', }} >
          <Text style={{color: 'white', fontSize: DEVICE_HEIGHT*0.03}}>TLCALCULATOR</Text>
          <Image source={require('../assets/logo/logo.png')} style={{width: DEVICE_WIDTH*0.3, height:DEVICE_WIDTH*0.3}} />
        </View>
        
        <View style={{height: DEVICE_HEIGHT * 0.6, justifyContent:'center', alignItems:'center', gap:DEVICE_HEIGHT*0.06 }}>
          {
            button.map((item, index) => {
                return (
                    <TouchableOpacity onPress={() => navigation.navigate(`${item.path}`)} key={index} style={{paddingVertical:DEVICE_HEIGHT*0.02, width: DEVICE_WIDTH*0.7, justifyContent:'center', alignItems:'center', backgroundColor:'#d9d9d9', borderRadius:50}}>
                        <Text style={{fontSize: DEVICE_HEIGHT*0.02, fontWeight:600}}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })
          }
        </View>
      </SafeAreaProvider>
    </View>
  )
}

const styles = StyleSheet.create({})