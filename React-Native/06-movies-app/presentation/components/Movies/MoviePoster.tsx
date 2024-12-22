import React from 'react'
import { Pressable, Image } from 'react-native'

import { LinearGradient } from 'expo-linear-gradient'
import { router } from 'expo-router'
import * as Haptics from 'expo-haptics'

interface Props {
  id: number
  poster: string
  smallPoster?: boolean
  className?: string

  style?: any
}

const MoviePoster = ({ id, poster, smallPoster = false, className, style }: Props) => {
  return (
    <Pressable
      onLongPress={() => Haptics.selectionAsync()}
      onPress={() => {
        router.push(`/movie/${id}`)
        Haptics.selectionAsync()
        console.log(id)
      }}
      //onPressIn={() => Haptics.selectionAsync()}
      className={`relative active:opacity-90 px-2 ${className}`}
      style={style}

    >
      <Image
        source={{ uri: poster }}
        className='rounded-2xl bg-gray-200'
        style={{
          width: smallPoster ? 80 : 150,
          height: smallPoster ? 130 : 250,
        }}
        resizeMode="cover"
      />
    </Pressable>
  )
}

export default MoviePoster