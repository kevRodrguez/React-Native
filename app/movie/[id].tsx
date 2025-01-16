import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import React, { useRef } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { getMovieByIdAction } from '@/core/actions/movie/get-movie-by-id.action';
import { useMovie } from '@/presentation/hooks/useMovie';
import MovieHeader from '@/presentation/components/movie/MovieHeader';
import { LinearGradient } from 'expo-linear-gradient';
import MovieDescription from '@/presentation/components/movie/MovieDescription';
import MovieCastHorizontalList from '@/presentation/components/cast/MovieCastHorizontalList';

const MovieScreen = () => {
  // se crea una referencia del scrollview  para forzar la posicion en 0 cuando se haga scroll hacia arriba
  const scrollViewRef = useRef<ScrollView | null>(null);

  const { id } = useLocalSearchParams();
  const { movieQuery, castQuery } = useMovie(+id); //+id para convertirlo a number

  if (movieQuery.isLoading || !movieQuery.data) {
    return (
      <>
        <View className='bg-[#0e0e0e] flex-1'>
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
          <ActivityIndicator size="small" color="#19A080"
            style={{ height: '100%' }} />

        </View>
      </>
    )
  }


  return (
    <>
      <View className='bg-[#0e0e0e] flex-1'>
        <LinearGradient
          colors={['#19A080', 'transparent']}
          start={[1, 0]}
          end={[0, 1]}
          style={{
            position: 'absolute',
            //zIndex: 0,
            width: '100%',
            height: '100%',

          }}
        />

        <ScrollView
          //para no hacer scroll hacia arriba
          ref={scrollViewRef}
          bounces
          onScroll={(e) => {
            if (e.nativeEvent.contentOffset.y < 0) {
              scrollViewRef.current?.scrollTo({ y: 0, animated: false });
            }
          }}
          scrollEventThrottle={16}

          className='mb-12'
        >
          <MovieHeader
            originalTitle={movieQuery.data.originalTitle}
            poster={movieQuery.data.poster}
            title={movieQuery.data.title}
          />

          <MovieDescription movie={movieQuery.data} />

          <MovieCastHorizontalList cast={castQuery.data || []} />

        </ScrollView>
      </View>
    </>
  )
}

export default MovieScreen