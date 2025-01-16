import { getMovieCastAction } from '@/core/actions/cast/get-movie-cast.action'
import { getMovieByIdAction } from '@/core/actions/movie/get-movie-by-id.action'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

export const useMovie = (id: number) => {
    const movieQuery = useQuery({
        queryKey: ['movie', id],
        queryFn: () => getMovieByIdAction(id),
        staleTime: 1000 * 60 * 60 * 24, //ms, seconds, minutes, hours

    })

    const castQuery = useQuery({
        queryKey: ['cast', id],
        queryFn: () => getMovieCastAction(id),
        staleTime: 1000 * 60 * 60 * 24, //ms, seconds, minutes, hours

    })

    

    return {
        movieQuery,
        castQuery
    }
}
