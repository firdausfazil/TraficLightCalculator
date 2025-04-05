//import liraries
import React, { Component, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, SafeAreaView, Image } from 'react-native';
//import { color, container } from './constant';
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../constants/DeviceDimention';
import { MotiView } from 'moti';
import { Easing } from 'react-native-reanimated';

// create a component
const TestAnimation = () => {

    const width                 = DEVICE_WIDTH;
    const [phase, setPhase]     = useState('start'); // 'start' → 'stop' → 'left'
    const [phase2, setPhase2]   = useState('start'); // 'start' → 'stop' → 'right'

    const [tl_color, set_tl_color] = useState(['green', 'yellow', 'red'])

    const [first_traffic_light, set_first_traffic_light]    = useState(2)
    const [second_traffic_light, set_second_traffic_light]  = useState(2)
    const [third_traffic_light, set_third_traffic_light]    = useState(2)
    const [fourth_traffic_light, set_fourth_traffic_light]  = useState(2)

    
    useEffect(() => {
        // Selepas 3 saat berhenti, kereta akan bergerak ke kiri
        if (phase === 'stop') {
            const timeout = setTimeout(() => {
                setPhase('left');
            }, 1000); // Tunggu 3 saat sebelum bergerak ke kiri
            return () => clearTimeout(timeout); // Bersihkan timeout jika komponen di-unmount
        } else if (phase === 'right') {
            const timeout = setTimeout(() => {
              setPhase('start'); // Reset balik ke kiri selepas sampai ke kanan
            }, 5000); // Tunggu sebelum reset (boleh ubah tempoh ini)
            return () => clearTimeout(timeout);
          }
    }, [phase]);



    useEffect(() => {
        setInterval(() => {
            if(first_traffic_light !== 2) {
                set_first_traffic_light(first_traffic_light + 1)
            } else {
                set_first_traffic_light(0)
                setTimeout(() => {
                    set_first_traffic_light(1)
                }, 3000);
            }
        }, 5000);
    }, [first_traffic_light])



    return (
        <View style={styles.container}>
            <SafeAreaView />
            <ImageBackground
            source={require('../assets/images/intersection.jpg')}
            imageStyle={{
                width: '100%',
                height: 400,
                resizeMode: 'cover'
            }}
            >

                <Image 
                source={first_traffic_light === 0 ? require('../assets/images/tl_green.png') : first_traffic_light === 1 ? require('../assets/images/tl_red.png') : require('../assets/images/tl_red.png')}
                style={{
                    position: 'absolute',
                    top: 115,
                    right: 145,
                    width: 40,
                    height: 40
                }}
                resizeMode='contain'
                />

                <Image 
                source={second_traffic_light === 0 ? require('../assets/images/tl_green.png') : second_traffic_light === 1 ? require('../assets/images/tl_red.png') : require('../assets/images/tl_red.png')}
                style={{
                    position: 'absolute',
                    top: 115,
                    left: 145,
                    width: 40,
                    height: 40
                }}
                resizeMode='contain'
                />


                <MotiView
                    from={{ translateX: width }} // Bermula dari luar skrin kanan
                    animate={{
                        translateX: phase === 'start' ? width / 1.6 : phase === 'left' ? -100 : width / 1.6,
                    }} // Bergerak ke tengah, berhenti, kemudian bergerak ke kiri
                    transition={{
                        type: 'timing',
                        duration: phase === 'left' ? 4000 : 3000, // Lebih lama untuk kesan pecutan
                        easing: phase === 'left' ? Easing.in(Easing.exp) : Easing.out(Easing.exp),
                    }}
                    onDidAnimate={(key, finished) => {
                        if (key === 'translateX' && finished && phase === 'start') {
                            setPhase('stop'); // Tukar fasa ke 'stop' selepas sampai tengah
                        }
                    }}
                    style={{
                        width: 100,
                        height: 50,
                        position: 'absolute',
                        top: (20/100) * DEVICE_HEIGHT
                    }}
                >
                    <Image
                    source={require('../assets/images/car_blue.png')} // Gantikan dengan imej kereta sendiri
                    style={{ width: 100, height: 50 }}
                    />
                </MotiView>

             
                
            </ImageBackground>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default TestAnimation;
