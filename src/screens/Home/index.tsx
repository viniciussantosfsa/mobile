import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import { Image, FlatList } from 'react-native';
import { styles } from './style';
import logoImg from '../../assets/logo-nlw-esports.png';
import { Heading } from '../../components/Heading';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';

export function Home() {

  const [games, setGames] = useState<GameCardProps[]>([]);

  const navigation = useNavigation();


  function handOpenGaming({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id , title , bannerUrl });
  }

  useEffect(() => {
    fetch('http://10.0.0.108:3333/games')
      .then(response => response.json())
      .then(data => setGames(data))
  }, []);

  return (
    <Background>
    <SafeAreaView style={styles.container}>

      <Image source={logoImg} style={styles.logo} />

      <Heading
        title="Encontre seu DUO"
        subtitle="Selecione o game que deseja jogar...">
      </Heading>

      <FlatList data={games} keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <GameCard data={item} onPress={() => handOpenGaming(item)} />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.contentList}
      />


    </SafeAreaView>
    </Background>

  );
}