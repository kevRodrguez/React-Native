import { View, Text, ActivityIndicator, ScrollView, SafeAreaView } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useMovies } from '@/presentation/hooks/useMovies'
import MainSlideshow from '@/presentation/components/Movies/MainSlideshow'
import MovieHorizontalList from '@/presentation/components/Movies/MovieHorizontalList'




const HomeScreen = () => {
    const safeArea = useSafeAreaInsets();
    const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } = useMovies();

    if (nowPlayingQuery.isLoading) {

        return (
            <View className='justify-center items-center flex-1'>
                <ActivityIndicator size="small" color="#0000ff" />
            </View>
        )

    }


    return (
        <SafeAreaView>

            <ScrollView>
                {/* style={{ paddingTop: safeArea.top }} */}
                <View className='pb-10 '>
                    <Text className='text-3xl font-bold px-4 mb-2 '>Peliculas</Text>
                    {/* <Text>{JSON.stringify(nowPlayingQuery.data)}</Text> */}

                    {/* Carousel de imagenes */}
                    <MainSlideshow movies={nowPlayingQuery.data ?? []} />

                    {/* <MainSlideshow movies={popularQuery.data ?? []} /> */}

                    {/* Populares */}
                    <MovieHorizontalList
                        movies={popularQuery.data ?? []}
                        title='Populares'
                    />

                    {/* Top Rated */}
                    <MovieHorizontalList
                        movies={topRatedQuery.data ?? []}
                        title='Mejor Calificadas'
                    />

                    {/* Upcoming */}
                    <MovieHorizontalList
                        movies={upcomingQuery.data ?? []}
                        title='Proximamente'
                    />


                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default HomeScreen