import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {DEVICE_HEIGHT, DEVICE_WIDTH} from '../constants/DeviceDimention';
import {HomeIcon} from 'react-native-heroicons/outline';
import Header from './Header';

export default function Calculation({navigation}) {
	const [jumlahKehilanganMasa, setJumlahKehilanganMasa] = useState(0);
	const [masaKuning, setMasaKuning] = useState(0);
	const [jumlahKitaranMasa, setJumlahKitaranMasa] = useState(0);

	const [kadarAlirTrafik1, setKadarAlirTrafik1] = useState(0);
	const [kapasitiLane1, setKapasitiLane1] = useState(0);
	const [kadarAlirTrafik2, setKadarAlirTrafik2] = useState(0);
	const [kapasitiLane2, setKapasitiLane2] = useState(0);
	const [kadarAlirTrafik3, setKadarAlirTrafik3] = useState(0);
	const [kapasitiLane3, setKapasitiLane3] = useState(0);
	const [kadarAlirTrafik4, setKadarAlirTrafik4] = useState(0);
	const [kapasitiLane4, setKapasitiLane4] = useState(0);

	let Y1 = 0;
	let Y2 = 0;
	let Y3 = 0;
	let Y4 = 0;
	let Y = 0;
	let GTotal = 0;

	let masaHijauLaluan1 = 0;
	let masaHijauLaluan2 = 0;
	let masaHijauLaluan3 = 0;
	let masaHijauLaluan4 = 0;

	let masaMerahLaluan1 = 0;
	let masaMerahLaluan2 = 0;
	let masaMerahLaluan3 = 0;
	let masaMerahLaluan4 = 0;

	const calculationY = () => {
		Y1 = Number(kadarAlirTrafik1) / Number(kapasitiLane1);
		Y2 = Number(kadarAlirTrafik2) / Number(kapasitiLane2);
		Y3 =
		kadarAlirTrafik3 != 0 && kapasitiLane3 != 0
			? kadarAlirTrafik3 / kapasitiLane3
			: 0;
		Y4 =
		kadarAlirTrafik4 != 0 && kapasitiLane4 != 0
			? kadarAlirTrafik4 / kapasitiLane4
			: 0;

		Y = Y1 + Y2 + Y3 + Y4;
	};

	const calculationMasaHijau = () => {
		calculationY();
		GTotal = jumlahKitaranMasa - jumlahKehilanganMasa;
		console.log(Y1);
		console.log(Y);

		masaHijauLaluan1 = Math.round(GTotal * (Y1 / Y));
		masaHijauLaluan2 = Math.round(GTotal * (Y2 / Y));
		masaHijauLaluan3 = Math.round(GTotal * (Y3 / Y));
		masaHijauLaluan4 = Math.round(GTotal * (Y4 / Y));
	};

	const calculationMasaMerah = () => {
		// List of fields with their labels for better alerts
		const fields = [
		{value: jumlahKehilanganMasa, label: 'Jumlah Kehilangan Masa'},
		{value: jumlahKitaranMasa, label: 'Jumlah Kitaran Masa'},
		{value: masaKuning, label: 'Masa Kuning'},
		{value: kadarAlirTrafik1, label: 'Kadar Alir Trafik Laluan 1'},
		{value: kapasitiLane1, label: 'Kapasiti Laluan 1'},
		{value: kadarAlirTrafik2, label: 'Kadar Alir Trafik Laluan 2'},
		{value: kapasitiLane2, label: 'Kapasiti Laluan 2'},
		{value: kadarAlirTrafik3, label: 'Kadar Alir Trafik Laluan 3'},
		{value: kapasitiLane3, label: 'Kapasiti Laluan 3'},
		{value: kadarAlirTrafik4, label: 'Kadar Alir Trafik Laluan 4'},
		{value: kapasitiLane4, label: 'Kapasiti Laluan 4'},
		];

		// Check if all fields are filled and are numbers
		for (let field of fields) {
		if (
			field.value === '' ||
			isNaN(Number(field.value)) ||
			field.value === 0
		) {
			Alert.alert(
			'Input Error',
			`Sila masukkan nilai nombor yang sah untuk "${field.label}".`,
			);
			return;
		}
		}

		calculationMasaHijau();
		masaMerahLaluan1 =
		Number(jumlahKitaranMasa) -
		(Number(masaHijauLaluan1) + Number(masaKuning));
		masaMerahLaluan2 =
		Number(jumlahKitaranMasa) -
		(Number(masaHijauLaluan2) + Number(masaKuning));
		masaMerahLaluan3 =
		masaHijauLaluan3 != 0
			? Number(jumlahKitaranMasa) -
			(Number(masaHijauLaluan3) + Number(masaKuning))
			: 0;
		masaMerahLaluan4 =
		masaHijauLaluan4 != 0
			? Number(jumlahKitaranMasa) -
			(Number(masaHijauLaluan4) + Number(masaKuning))
			: 0;

		const laluanData = [
		{masaHijau: masaHijauLaluan1, masaMerah: masaMerahLaluan1},
		{masaHijau: masaHijauLaluan2, masaMerah: masaMerahLaluan2},
		{masaHijau: masaHijauLaluan3, masaMerah: masaMerahLaluan3},
		{masaHijau: masaHijauLaluan4, masaMerah: masaMerahLaluan4},
		];

		//console.log(laluanData);

		navigation.navigate('Animation', {laluanData: laluanData});
	};

	return (
		<SafeAreaProvider style={{flex: 1}}>
		<Header />

		
		<KeyboardAvoidingView
			behavior={Platform.OS === 'ios' ? 'height' : 'height'}
			style={{flex: 1}}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0} // Adjust offset as needed
		>
		<ScrollView
			keyboardDismissMode="interactive"
			keyboardShouldPersistTaps="handled"
			contentContainerStyle={{
			  paddingVertical: DEVICE_HEIGHT * 0.02,
			  paddingHorizontal: DEVICE_WIDTH * 0.05,
			}}
			style={{flexGrow: 1}}
		>
			{/* ALL field */}
			<Text style={{fontSize: DEVICE_HEIGHT * 0.02, fontWeight: 'bold'}}>
			Sila lengkapkan maklumat di bawah:
			</Text>

			<View style={{alignItems: 'center', gap: 15, marginTop: 20}}>
			<View style={styles.inputContainer}>
				<Text style={styles.label}>Jumlah Kehilangan Masa(s)</Text>
				<TextInput
				style={styles.input}
				placeholder="12"
				keyboardType="numeric"
				value={jumlahKehilanganMasa}
				onChangeText={val => setJumlahKehilanganMasa(val)}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Jumlah Kitaran Masa(s)</Text>
				<TextInput
				style={styles.input}
				placeholder="90"
				keyboardType="numeric"
				value={jumlahKitaranMasa}
				onChangeText={val => setJumlahKitaranMasa(val)}
				/>
			</View>

			<View style={styles.inputContainer}>
				<Text style={styles.label}>Masa Kuning(s)</Text>
				<TextInput
				style={styles.input}
				placeholder="5"
				keyboardType="numeric"
				value={masaKuning}
				onChangeText={val => setMasaKuning(val)}
				/>
			</View>

			<View style={[styles.inputContainer, {flexDirection: 'row'}]}>
				<View style={[styles.inputContainer2]}>
				<Text style={[styles.label, {paddingLeft: 5}]}>
					Kadar Alir Trafik
				</Text>
				<View style={{gap: 10, paddingHorizontal: 5}}>
					<TextInput
					style={styles.input}
					placeholder="Laluan 1"
					keyboardType="numeric"
					value={kadarAlirTrafik1}
					onChangeText={val => setKadarAlirTrafik1(val)}
					/>
					<TextInput
					style={styles.input}
					placeholder="Laluan 2"
					keyboardType="numeric"
					value={kadarAlirTrafik2}
					onChangeText={val => setKadarAlirTrafik2(val)}
					/>
					<TextInput
					style={styles.input}
					placeholder="Laluan 3"
					keyboardType="numeric"
					value={kadarAlirTrafik3}
					onChangeText={val => setKadarAlirTrafik3(val)}
					/>
					<TextInput
					style={styles.input}
					placeholder="Laluan 4"
					keyboardType="numeric"
					value={kadarAlirTrafik4}
					onChangeText={val => setKadarAlirTrafik4(val)}
					/>
				</View>
				</View>

				<View style={styles.inputContainer2}>
				<Text style={[styles.label, {paddingLeft: 5}]}>
					Kapasiti Laluan
				</Text>
				<View style={{gap: 10, paddingHorizontal: 5}}>
					<TextInput
					style={styles.input}
					placeholder="Laluan 1"
					keyboardType="numeric"
					value={kapasitiLane1}
					onChangeText={val => setKapasitiLane1(val)}
					/>
					<TextInput
					style={styles.input}
					placeholder="Laluan 2"
					keyboardType="numeric"
					value={kapasitiLane2}
					onChangeText={val => setKapasitiLane2(val)}
					/>
					<TextInput
					style={styles.input}
					placeholder="Laluan 3"
					keyboardType="numeric"
					value={kapasitiLane3}
					onChangeText={val => setKapasitiLane3(val)}
					/>
					<TextInput
					style={styles.input}
					placeholder="Laluan 4"
					keyboardType="numeric"
					value={kapasitiLane4}
					onChangeText={val => setKapasitiLane4(val)}
					/>
				</View>
				</View>
			</View>
			</View>
		</ScrollView>
		</KeyboardAvoidingView>

		<View
			style={{
			width: DEVICE_WIDTH,
			position: 'absolute',
			bottom: DEVICE_HEIGHT * 0.05,
			left: 0,
			}}>
			<TouchableOpacity
			//onPress={() => navigation.navigate('Animation')}
			onPress={calculationMasaMerah}
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#d2cfd2',
				paddingVertical: 15,
				marginHorizontal: DEVICE_WIDTH * 0.05,
				borderRadius: 250,
				elevation: 3,
			}}>
			<View style={[styles.shadow]}>
				<Text style={{fontSize: DEVICE_HEIGHT * 0.02, fontWeight: 600}}>
				Kira
				</Text>
			</View>
			</TouchableOpacity>
		</View>
		</SafeAreaProvider>
	);
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
  },
  inputContainer2: {
    width: '50%',
  },
  label: {
    fontSize: DEVICE_HEIGHT * 0.018,
    fontWeight: '400',
    marginBottom: 2,
    color: '#333',
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: DEVICE_HEIGHT * 0.018,
    backgroundColor: '#fff',
  },
  input2: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: DEVICE_HEIGHT * 0.018,
    backgroundColor: '#fff',
    alignSelf: 'center',
  },
});
