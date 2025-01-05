import { useRef, useState } from 'react';
import { View, Text, Image, ImageSourcePropType, FlatList, useWindowDimensions, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';

import ThemedButton from '@/presentation/shared/ThemedButton';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';

import { router } from 'expo-router';


interface Slide {
  title: string;
  desc: string;
  img: ImageSourcePropType;
}

const items: Slide[] = [
  {
    title: 'Titulo 1',
    desc: 'Ea et eu enim fugiat sunt reprehenderit sunt aute quis tempor ipsum cupidatat et.',
    img: require('../../assets/images/slides/slide-1.png'),
  },
  {
    title: 'Titulo 2',
    desc: 'Anim est quis elit proident magna quis cupidatat curlpa labore Lorem ea. Exercitation mollit velit in aliquip tempor occaecat dolor minim amet dolor enim cillum excepteur. ',
    img: require('../../assets/images/slides/slide-2.png'),
  },
  {
    title: 'Titulo 3',
    desc: 'Ex amet duis amet nulla. Aliquip ea Lorem ea culpa consequat proident. Nulla tempor esse ad tempor sit amet Lorem. Velit ea labore aute pariatur commodo duis veniam enim.',
    img: require('../../assets/images/slides/slide-3.png'),
  },
];


const SlideScreen = () => {

  //al terminar los slides se muestra de nuevo el scrollbar usando un usState
  const [scrollEnabled, setScrollEnabled] = useState(false);

  const flatListRef = useRef<FlatList>(null);
  const [currentSlideIndex, setcurrentSlideIndex] = useState(0);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    //si el scroll esta habilitado no se ejecuta la funcion
    if (scrollEnabled) return;

    const { contentOffset, layoutMeasurement } = event.nativeEvent;

    const currentIndex = Math.round(contentOffset.x / layoutMeasurement.width); //redondea el indice del slide actual en base a la posicion del scroll horizontal 
    setcurrentSlideIndex(currentIndex > 0 ? currentIndex : 0);

    // si el slide actual es el ultimo se habilita el scroll
    if (currentIndex === items.length - 1) {
      setScrollEnabled(true);
    }
  }

  const scrollToSlide = (index: number) => {
    if (!flatListRef.current) return;

    flatListRef.current?.scrollToIndex({
      index,
      animated: true,
    });

  }


  return (
    <ThemedView>
      <FlatList
        ref={flatListRef}
        data={items}
        renderItem={({ item }) => <SlideItem item={item} />}
        keyExtractor={(item) => item.title}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEnabled={scrollEnabled} //bloquea el slide mientras no pase por todos los items
        onScroll={onScroll}
      />

      {currentSlideIndex === items.length - 1 ?
        (
          <ThemedButton
            className='absolute bottom-10 right-5 w-[150px]'
            onPress={() => router.dismiss()}
          >
            Saltar
          </ThemedButton>
        
        ) : (
          <ThemedButton
            className='absolute bottom-10 right-5 w-[150px]'
            onPress={() => scrollToSlide(currentSlideIndex + 1)}

          >
            Siguiente
          </ThemedButton>
        )
      }
    </ThemedView>
  )
}
export default SlideScreen;


interface SlideItemProps {
  item: Slide;
}

//Componente que renderiza cada item del slide
const SlideItem = ({ item }: SlideItemProps) => {
  const { width } = useWindowDimensions();
  const { title, desc, img } = item;

  return (
    <ThemedView
      className='flex-1 rounded p-10 justify-center bg-red-500'
      style={{ width }}
    >
      <Image
        source={img}
        style={{
          width: width * 0.7,
          height: width * 0.7,
          resizeMode: 'center',
          alignSelf: 'center',
        }}
      />

      <ThemedText
        type='h1'
        className='text-light-primary dark:text-dark-primary'
      >
        {title}
      </ThemedText>

      <ThemedText
        type='h2'
        className='mt-10 text-light-text dark:text-dark-text'
      >
        {desc}
      </ThemedText>

    </ThemedView>
  )
}




