import { View, Text, useWindowDimensions } from 'react-native'
import React, { useRef } from 'react'
import { Movie } from '@/infraestructure/interfaces/movie.interface';

import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel'
import MoviePoster from './MoviePoster'

import * as Haptics from 'expo-haptics';


interface Props {
    movies: Movie[];
}

const MainSlideshow = ({ movies }: Props) => {

    const ref = useRef<ICarouselInstance>(null);
    const width = useWindowDimensions().width;

    return (

        <View className='h-[250px] w-full '>

            <Carousel
                ref={ref}
                data={movies}
                renderItem={({ item }) =>
                    <MoviePoster
                        id={item.id}
                        poster={item.poster}
                        smallPoster={false}
                        style={{
                            borderRadius: 16,
                            padding: 2,
                            // Extra shadow around the container
                            shadowColor: '#139676',
                            shadowOffset: { width: 4, height: 4 },
                            shadowOpacity: 0.5,
                            shadowRadius: 9,
                        }}
                    />}
                width={200}
                height={350}
                style={{
                    width: width,
                    height: 350,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                mode='parallax'
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 50,
                }}
                defaultIndex={1}
                // vibrar al ir al siguiente slide
                onScrollStart={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
            //onProgressChange={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)}
            //onSnapToItem={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}

            />
        </View>
    )
}

export default MainSlideshow