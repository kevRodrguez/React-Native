import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { ActorCard } from './actorCard'
import { Cast } from '@/infraestructure/interfaces/movie.interface';

interface Props {
    cast: Cast[];
}

const MovieCastHorizontalList = ({ cast }: Props) => {


    return (
        <>
            <View>
                <Text className='text-[#FBFFFF] font-bold mt-5 text-2xl mx-4'>Reparto</Text>

                <FlatList
                    horizontal
                    data={cast}
                    keyExtractor={(item, i) => `${item.id} -${i}`}
                    renderItem={({ item }) => <ActorCard actor={item} />}
                    showsHorizontalScrollIndicator={false}
                    
                    
                />

            </View>
        </>
    )
}

export default MovieCastHorizontalList