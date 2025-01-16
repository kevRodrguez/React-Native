import { View, Text, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { Movie } from '@/infraestructure/interfaces/movie.interface'
import MoviePoster from './MoviePoster'

import * as Haptics from 'expo-haptics';

interface Props {
    title?: string;
    movies: Movie[];

    loadNextPage?: () => void;

}

const MovieHorizontalList = ({ title, movies, loadNextPage }: Props) => {

    const isLoading = useRef(false);

    useEffect(() => {
        setTimeout(() => {
            isLoading.current = false;
        }, 200);
    }, [movies])

    const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        if (isLoading.current) return;

        const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
        const isEndReached = contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;

        if (!isEndReached) return;

        isLoading.current = true;

        //TODOS
        console.log('Cargar mas peliculas');

        //if (loadNextPage)...
        loadNextPage && loadNextPage();
    }

    return (
        <View>
            {title && <Text className='text-3xl font-light px-4 mb-2 mt-3 text-[#FBFFFF]'>{title}</Text>}

            {/* <Text className='text-3xl font-bold px-4'>Populares</Text> */}
            <FlatList
                horizontal
                data={movies}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, i) => `${item.id} -${i}`} // item.id.toString()
                renderItem={({ item }) => (
                    <MoviePoster
                        id={item.id}
                        poster={item.poster}
                        smallPoster
                        style={{
                            borderRadius: 16,
                            padding: 15,
                            // Extra shadow around the container
                            shadowColor: '#19A080',
                            shadowOffset: { width: 2, height: 2 },
                            shadowOpacity: 0.4,
                            shadowRadius: 7,
                        }}
                    />
                )}
                onScroll={onScroll}
                //vibrar al hacer scroll
                onScrollBeginDrag={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
                //onMomentumScrollBegin={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}

            />
        </View>
    )
}

export default MovieHorizontalList