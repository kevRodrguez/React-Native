import { Image, Text, View } from 'react-native';
import { Cast } from '@/infraestructure/interfaces/movie.interface';

interface Props {
    actor: Cast;
}

export const ActorCard = ({ actor }: Props) => {
    return (
        <View
            className="m-2 w-[120px] my-10"
            style={{
                borderRadius: 16,
                padding: 10,
                // Extra shadow around the container
                shadowColor: '#19A080',
                shadowOffset: { width: 0, height: 0 },
                shadowOpacity: 0.6,
                shadowRadius: 9,
            }}
        >
            <Image
                source={{ uri: actor.avatar }}
                className="w-[100px] h-[150] rounded-2xl shadow"
                resizeMode="cover"
            />

            <View>
                <Text
                    numberOfLines={2}
                    adjustsFontSizeToFit
                    className="font-bold text-lg text-white mt-2"
                >
                    {actor.name}
                </Text>
                <Text className="text-white text-xs">{actor.character}</Text>
            </View>
        </View>
    );
};