import ThemedCard from '@/presentation/shared/ThemedCard';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { View, Text, SectionList } from 'react-native';


interface Houses {
  title: string;
  data: string[];
}

const houses: Houses[] = [
  {
    title: 'DC Comics',
    data: [
      'Superman',
      'Batman',
      'Wonder Woman (Mujer Maravilla)',
      'The Flash (Flash)',
      'Aquaman',
      'Green Lantern (Linterna Verde)',
      'Cyborg',
      'Shazam',
      'Green Arrow (Flecha Verde)',
      'Batgirl (Batichica)',
      'Nightwing (Ala Nocturna)',
      'Supergirl',
      'Martian Manhunter (Detective Marciano)',
      'Harley Quinn',
      'Joker',
      'Catwoman (Gata Salvaje)',
      'Lex Luthor',
      'Poison Ivy (Hiedra Venenosa)',
      'Robin',
      'Deathstroke (Deathstroke el Terminator)',
    ],
  },
  {
    title: 'Marvel Comics',
    data: [
      'Spider-Man (Hombre Araña)',
      'Iron Man (Hombre de Hierro)',
      'Captain America (Capitán América)',
      'Thor',
      'Black Widow (Viuda Negra)',
      'Hulk',
      'Doctor Strange (Doctor Extraño)',
      'Black Panther (Pantera Negra)',
      'Captain Marvel (Capitana Marvel)',
      'Wolverine',
      'Deadpool',
      'Scarlet Witch (Bruja Escarlata)',
      'Ant-Man (Hombre Hormiga)',
      'Wasp (Avispa)',
      'Groot',
      'Rocket Raccoon (Mapache Cohete)',
      'Gamora',
      'Drax the Destroyer (Drax el Destructor)',
    ],
  },
  {
    title: 'Anime',
    data: [
      'Son Goku (Dragon Ball)',
      'Naruto Uzumaki (Naruto)',
      'Monkey D. Luffy (One Piece)',
      'Sailor Moon (Sailor Moon)',
      'Kenshin Himura (Rurouni Kenshin)',
      'Edward Elric (Fullmetal Alchemist)',
      'Inuyasha (Inuyasha)',
      'Sakura Kinomoto (Cardcaptor Sakura)',
      'Light Yagami (Death Note)',
      'Eren Yeager (Attack on Titan)',
      'Lelouch Lamperouge (Code Geass)',
      'Vegeta (Dragon Ball)',
      'Ichigo Kurosaki (Bleach)',
      'Kaneki Ken (Tokyo Ghoul)',
      'Gon Freecss (Hunter x Hunter)',
      'Asuka Langley Soryu (Neon Genesis Evangelion)',
      'Saitama (One Punch Man)',
      'Mikasa Ackerman (Attack on Titan)',
      'Natsu Dragneel (Fairy Tail)',
      'Usagi Tsukino (Sailor Moon)',
      'Sasuke Uchiha (Naruto)',
    ],
  },
];

const SectionListScreen = () => {
  return (
    <ThemedView margin>
      <ThemedCard>

        <SectionList
          sections={houses}
          // ayuda a react a identificar un elemento cambia
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => <ThemedText>{item}</ThemedText>}

          ListHeaderComponent={() => <ThemedText type='h1' className='font-bold mb-3'>Personajes de Comics y Anime</ThemedText>}

          renderSectionHeader={({ section }) => (
            <ThemedText type='h2' className='bg-light-background dark:bg-dark-background p-2 my-2 rounded font-bold'>{section.title}</ThemedText>
          )}

          stickySectionHeadersEnabled // para que se quede fijo el titulo de la seccion en android

          ListFooterComponent={() => (
            <ThemedText type='h2' className='text-center mt-3 bg-light-background dark:bg-dark-background p-2 mb-10 rounded'>
              Total de Personajes: {houses.reduce((acc, curr) => acc + curr.data.length, 0)}
            </ThemedText>)}

          showsVerticalScrollIndicator={false}
        />

      </ThemedCard>
    </ThemedView >
  );
};
export default SectionListScreen;