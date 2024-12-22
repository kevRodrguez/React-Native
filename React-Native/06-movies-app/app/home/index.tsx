import { View, Text, ActivityIndicator, ScrollView, SafeAreaView, StatusBar, Platform } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useMovies } from '@/presentation/hooks/useMovies'
import MainSlideshow from '@/presentation/components/movies/MainSlideshow'
import MovieHorizontalList from '@/presentation/components/movies/MovieHorizontalList'

import { LinearGradient } from 'expo-linear-gradient';


const HomeScreen = () => {
    const safeArea = useSafeAreaInsets();
    const { nowPlayingQuery, popularQuery, topRatedQuery, upcomingQuery } = useMovies();

    // si el sistema operativo es IOS
    if (Platform.OS === 'ios') {
        StatusBar.setBarStyle('light-content', true);
    }

    if (nowPlayingQuery.isLoading) {

        return (
            <View className='justify-center items-center flex-1 bg-[#0e0e0e]'>
                <LinearGradient
                    colors={['#19A080', 'transparent']}
                    start={[0, 0]}
                    end={[0.4, 1]}
                    style={{
                        position: 'absolute',
                        //zIndex: 0,
                        width: '100%',
                        height: '50%',

                    }}
                />

                <ActivityIndicator size="large" color="#19A080" />
            </View>
        )

    }


    return (
        <>
            <View className='bg-[#0e0e0e]'>
                <LinearGradient
                    colors={['#19A080', 'transparent']}
                    start={[0, 0]}
                    end={[0.4, 1]}
                    style={{
                        position: 'absolute',
                        //zIndex: 0,
                        width: '100%',
                        height: '50%',

                    }}
                />


                <ScrollView>
                    {/* style={{ paddingTop: safeArea.top }} */}
                    <View className='pb-10 '>
                        <Text className='text-5xl font-bold px-4 mb-2 mt-4 text-[#FBFFFF]' style={{ paddingTop: safeArea.top }}>Peliculas</Text>
                        {/* <Text>{JSON.stringify(nowPlayingQuery.data)}</Text> */}

                        {/* Carousel de imagenes */}
                        <MainSlideshow movies={nowPlayingQuery.data ?? []}

                        />

                        {/* <MainSlideshow movies={popularQuery.data ?? []} /> */}

                        {/* Populares */}
                        <MovieHorizontalList
                            movies={popularQuery.data ?? []}
                            title='Populares'

                        />

                        {/* Top Rated */}
                        <MovieHorizontalList
                            movies={topRatedQuery.data?.pages.flat() ?? []}
                            title='Mejor Calificadas'
                            loadNextPage={topRatedQuery.fetchNextPage}
                        />

                        {/* Upcoming */}
                        <MovieHorizontalList
                            movies={upcomingQuery.data ?? []}
                            title='Proximamente'
                        />


                    </View>
                </ScrollView>
            </View>

        </>

    )
}

export default HomeScreen