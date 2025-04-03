import { View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { HomeIcon } from 'react-native-heroicons/outline';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; // ✅ Import useNavigation

export default function Header() {
    const insets = useSafeAreaInsets();
    const navigation = useNavigation(); // ✅ Get navigation instance

    return (
        <View
            style={{
                paddingTop: insets.top,
                backgroundColor: '#b6277e',
                borderBottomRightRadius: 20,
                borderBottomLeftRadius: 20,
                paddingHorizontal: 30,
                paddingBottom: 10,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Image
                    source={require('../assets/logo/logo.png')}
                    style={{ width: 50, height: 50 }}
                    resizeMode="contain"
                />
                <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                    <HomeIcon color="white" size={40} />
                </TouchableOpacity>
            </View>
        </View>
    );
}
