import { View, Text } from 'react-native'
import React from 'react'
import { CompleteMovie } from '@/infraestructure/interfaces/movie.interface'
import { Ionicons } from '@expo/vector-icons';
import { Formatter } from '@/config/helpers/formatter';

interface Props {
    movie: CompleteMovie;
}

const MovieDescription = ({ movie }: Props) => {
    return (
        <View className='mx-4'>
            <View className='flex flex-row items-center '>
                <Ionicons name="star"
                    size={22}
                    color={'#FFD700'}
                    className='shadow mr-2' />

                <Text className='text-[#FBFFFF] text-xl font-bold'>{movie.rating}</Text>

                <View className='flex-1 items-end flex-wrap ml-5 justify-end'>
                    <Text className='text-[#FBFFFF] text-xl'>{movie.genres.join(', ')}</Text>

                </View>
            </View>

            <Text className='text-[#FBFFFF] font-bold mt-5 text-2xl'>Sinopsis</Text>

            <Text className='text-[#FBFFFF] mt-2 text-justify items-stretch text-xl'>{movie.description}</Text>

            <Text className='text-[#FBFFFF] font-bold mt-5 text-2xl'>Presupuesto</Text>
            <Text className='text-[#FBFFFF] mt-2 text-justify items-stretch text-xl'>{Formatter.currency(movie.budget)}</Text>
        </View>
    )
}

export default MovieDescription