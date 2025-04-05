import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaProvider,useSafeAreaInsets } from 'react-native-safe-area-context'
import { DEVICE_HEIGHT, DEVICE_WIDTH } from '../constants/DeviceDimention'
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { HomeIcon } from "react-native-heroicons/outline";

const QuizData = [
  {
    id: 1,
    question: 'Apakah tujuan utama reka bentuk lampu isyarat berfasa di persimpangan jalan?',
    options: ['Mengurangkan kesesakan lalu lintas', 'Mempercepatkan kelajuan kenderaan', 'Menggalakkan penggunaan jalan raya pada waktu malam', 'Menghapuskan keperluan pejalan kaki'],
    answer: 'Mengurangkan kesesakan lalu lintas',
  },
  {
    id: 2,
    question: 'Apakah elemen utama yang perlu dipertimbangkan dalam reka bentuk sistem lampu isyarat berfasa?',
    options: ['Jumlah kenderaan dan pejalan kaki', 'Jenis bahan yang digunakan dalam lampu isyarat', 'Warna lampu isyarat sahaja', 'Jumlah tempat letak kereta berdekatan'],
    answer: 'Jumlah kenderaan dan pejalan kaki',
  },
  {
    id: 3,
    question: `Apakah maksud 'fasa' dalam sistem lampu isyarat berfasa?`,
    options: ['Tempoh masa lampu berwarna hijau sahaja', 'Susunan kenderaan di persimpangan', 'Urutan kawalan lalu lintas untuk setiap arah di persimpangan', 'Keamatan cahaya yang dipancarkan oleh lampu isyarat'],
    answer: 'Urutan kawalan lalu lintas untuk setiap arah di persimpangan',
  },
  {
    id: 4,
    question: 'Bagaimanakah teknologi moden membantu dalam reka bentuk sistem lampu isyarat berfasa?',
    options: ['Menggunakan sensor untuk mengesan aliran lalu lintas', 'Mengurangkan jumlah fasa kepada satu sahaja', 'Menggantikan semua lampu isyarat dengan papan tanda jalan', 'Meningkatkan ketinggian tiang lampu isyarat'],
    answer: 'Menggunakan sensor untuk mengesan aliran lalu lintas',
  },
  {
    id: 5,
    question: 'Apakah kelebihan utama sistem lampu isyarat berfasa dibandingkan dengan sistem lampu isyarat konvensional?',
    options: ['Mengurangkan perlanggaran di persimpangan', ' Membenarkan semua kenderaan bergerak serentak', 'Menghapuskan keperluan papan tanda jalan', 'Mengurangkan bilangan lorong jalan'],
    answer: 'Mengurangkan perlanggaran di persimpangan',
  },
  {
    id: 6,
    question: `Apakah yang dimaksudkan dengan sistem lampu isyarat berfasa dan apakah dua manfaat utamanya dalam mengawal aliran trafik?`,
    options: ['Kaedah pengawalan trafik yang membahagikan pergerakan kenderaan dan pejalan kaki kepada beberapa fasa bagi mengelakkan konflik', 'Mengurangkan risiko perlanggaran di persimpangan', 'Menghapuskan keperluan had laju di kawasan persimpangan', 'Menyebabkan kesesakan lalu lintas di semua arah'],
    answer: 'Kaedah pengawalan trafik yang membahagikan pergerakan kenderaan dan pejalan kaki kepada beberapa fasa bagi mengelakkan konflik',
  },
  {
    id: 7,
    question: `Sebuah persimpangan dikawal oleh lampu isyarat tiga fasa dengan tempoh kitaran sebanyak 90 saat. Jika tempoh hijau untuk Fasa 1 adalah 35 saat, tempoh hijau untuk Fasa 2 adalah 30 saat, hitung tempoh baki untuk Fasa 3.`,
    options: ['20 saat', '25 saat', '30 saat', '35 saat'],
    answer: '25 saat',
  },
  {
    id: 8,
    question: `Jika kadar aliran trafik bagi satu lorong adalah 600 kenderaan/jam dan tempoh hijau yang diperuntukkan ialah 30 saat, hitung jumlah maksimum kenderaan yang dapat melalui persimpangan dalam satu tempoh hijau.`,
    options: ['3 kenderaan', '5 kenderaan', '10 kenderaan', '15 kenderaan'],
    answer: '5 kenderaan',
  },
  {
    id: 9,
    question: `Sebuah persimpangan dikawal dengan lampu isyarat dua fasa. Jika jumlah trafik masuk bagi Fasa A ialah 900 kenderaan/jam dan bagi Fasa B ialah 700 kenderaan/jam, hitung peratusan pembahagian masa hijau yang optimum untuk setiap fasa supaya aliran trafik seimbang.`,
    options: ['56.25% untuk Fasa A, 43.75% untuk Fasa B', '50% untuk Fasa A, 50% untuk Fasa B', '60% untuk Fasa A, 40% untuk Fasa B', '45% untuk Fasa A, 55% untuk Fasa B'],
    answer: '56.25% untuk Fasa A, 43.75% untuk Fasa B',
  },
  {
    id: 10,
    question: `Sebuah lampu isyarat di sebuah persimpangan mempunyai waktu pembersihan (clearance time) sebanyak 5 saat antara setiap fasa. Jika jumlah tempoh kitaran adalah 100 saat, dan terdapat 3 fasa dalam sistem, berapakah tempoh maksimum yang boleh diperuntukkan untuk setiap fasa (termasuk waktu hijau dan kuning)?`,
    options: ['25 saat', '30 saat', '28.33 saat', '35 saat'],
    answer: '28.33 saat',
  }
];


const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

export default function Quiz({ navigation }) {
  const insets = useSafeAreaInsets();

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const shuffledQuestions = shuffleArray([...QuizData]).map((q) => ({
      ...q,
      options: shuffleArray([...q.options]),
    }));
    setQuestions(shuffledQuestions);
    setStartTime(new Date());
  }, []);

  const handleNext = () => {
    if (selectedOption === questions[currentQuestion].answer) {
      setCorrectAnswers(correctAnswers + 1);
    }
    setAnswers([...answers, { question: questions[currentQuestion].question, selected: selectedOption, correct: questions[currentQuestion].answer }]);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
    } else {
      setEndTime(new Date());
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]?.selected || null);
      setAnswers(answers.slice(0, -1)); // Remove the last recorded answer
    }
  };

  const renderResult = () => {
    
    const timeTaken = ((endTime - startTime) / 1000).toFixed(2);
    return (
      <View style={styles.resultContainer}>
        

        <ScrollView style={{ marginTop: 20, height: DEVICE_HEIGHT*0.6,  paddingVertical: DEVICE_HEIGHT*0.005 }} showsVerticalScrollIndicator={false} contentContainerStyle={{paddingHorizontal: DEVICE_WIDTH*0.05,}}>
          <View style={{marginBottom:10}}> 
            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'semibold', fontSize:DEVICE_HEIGHT*0.018}}>Skor Anda: </Text>
              <Text style={{fontWeight:'bold', fontSize:DEVICE_HEIGHT*0.02}}>{correctAnswers} / {questions.length}</Text>
            </View>

            <View style={{flexDirection:'row'}}>
              <Text style={{fontWeight:'semibold', fontSize:DEVICE_HEIGHT*0.018}}>Masa diambil: </Text>
              <Text style={{fontWeight:'bold', fontSize:DEVICE_HEIGHT*0.02}}>{timeTaken} saat</Text>
            </View>
          </View>

          <Text style={{textDecorationLine:'underline', fontSize:DEVICE_HEIGHT*0.02, marginBottom:5}}>Review:</Text>
          {answers.map((item, index) => (
            <View key={index} style={styles.answerContainer}>
              <Text style={{ fontWeight: 'bold' }}>{index + 1}. {item.question}</Text>
              <Text>Jawapan anda: <Text style={{ color: item.selected === item.correct ? 'green' : 'red' }}>{item.selected || 'Tiada jawapan'}</Text></Text>
              <Text>Jawapan betul: <Text style={{ color: 'green' }}>{item.correct}</Text></Text>
            </View>
          ))}
        </ScrollView>
      </View>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaProvider>

        {/* Header */}
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
            {
              endTime && 
              (<TouchableOpacity onPress={() => navigation.navigate('Main')}>
                <HomeIcon color="white" size={40} />
              </TouchableOpacity>)
            }
          </View>
        </View>


        <View style={{ height: DEVICE_HEIGHT * 0.72 }}>
          {!endTime ? (
            <View style={{ flex: 1,  paddingHorizontal: DEVICE_WIDTH * 0.05, marginTop: DEVICE_HEIGHT*0.02 }}>
              <View style={{alignItems:'center'}}>
                <Text style={{ fontSize: 18, fontWeight: 'bold',  marginBottom: 20 }}>
                  Soalan {currentQuestion + 1} / {questions.length}
                </Text>
              </View>

              <View>
                <Text>Soalan:</Text>
                <Text style={{ fontSize: DEVICE_HEIGHT*0.02, fontWeight: 'semibold', textAlign: 'justify', marginBottom: 20 }}>
                  {questions[currentQuestion]?.question}
                </Text>
              </View>

              <View>
                <Text>Sila pilih jawapan anda: </Text>
                {questions[currentQuestion]?.options.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[{ padding: 15, backgroundColor: '#ddd', borderRadius: 12, alignItems: 'start', marginVertical: 5 }, selectedOption === option && { backgroundColor: '#b6277e' }]}
                    onPress={() => setSelectedOption(option)}
                  >
                    <Text style={{ fontSize: 16, color: '#000' }}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              
            </View>
          ) : renderResult()}
        </View>
      </SafeAreaProvider>

      {!endTime ? 
        (
          <View style={{ width: DEVICE_WIDTH, position: 'absolute', bottom: DEVICE_HEIGHT * 0.05, left: 0, flexDirection:'row', paddingHorizontal: DEVICE_WIDTH*0.05 }}>
            <View style={{flex:1}}>
              {currentQuestion > 0 && (
                <TouchableOpacity
                  style={{ backgroundColor: '#ccc', padding: 15, borderRadius: 200, width: DEVICE_WIDTH * 0.13, alignItems: 'center', elevation:1 }}
                  onPress={handleBack}
                >
                  
                  <ChevronLeftIcon color="black" />
                </TouchableOpacity>
              )}
            </View>

            <TouchableOpacity
              style={{ backgroundColor: '#b6277e', padding: 15, borderRadius: 200, width: DEVICE_WIDTH * 0.3, alignItems:'center', elevation:4 }}
              onPress={handleNext}
              disabled={selectedOption === null}
            >
              <Text style={{ color: '#fff', fontSize: 16, fontWeight: 'bold' }}>Seterusnya</Text>
            </TouchableOpacity>
          </View>
        )
        :
        (
          <View style={{ width: DEVICE_WIDTH, position: 'absolute', bottom: DEVICE_HEIGHT * 0.05, left: 0 }}>
            <TouchableOpacity onPress={() => navigation.replace('MainQuiz')} style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#d2cfd2', paddingVertical: 15, marginHorizontal: DEVICE_WIDTH * 0.05, borderRadius: 250, elevation:4 }}>
              <Text style={{ fontSize: DEVICE_HEIGHT * 0.02, fontWeight: '600' }}>Retake Quiz</Text>
            </TouchableOpacity>
          </View>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  resultContainer: {
    flex: 1,
    alignItems: 'center',
    //justifyContent: 'center',
  },
  answerContainer: {
    marginBottom: 15,
  },
});
