import { useThemeColor } from '@/hooks/useThemeColor';
import FadeInImage from '@/presentation/images/FadeInImage';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';


const InfiniteScrollScreen = () => {
  const [numbers, setNumbers] = useState([0, 1, 2, 3, 4, 5])
  const primaryColor = useThemeColor({}, 'primary');

  const loadMore = () => {
    const newArray = Array.from({ length: 5 }, (_, i) => i + numbers.length)

    setTimeout(() => {
      setNumbers([...numbers, ...newArray])
    }, 3000);
  }

  return (
    <ThemedView>
      <FlatList
        data={numbers}
        renderItem={({ item }) => (
          <ListItem number={item} />
        )}
        onEndReached={loadMore}
        onEndReachedThreshold={0.6} // 0.6 = 60% va a recargar la lista cuando llegue al 60% de la lista
        ListFooterComponent={() => (
          <View style={{ height: 100, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size={40} color={primaryColor}/>
          </View>
        )}
      />

    </ThemedView>
  );
};
export default InfiniteScrollScreen;


interface ListItemProps {
  number: number
}

const ListItem = ({ number }: ListItemProps) => {
  return (
    <FadeInImage 
      uri = {`https://picsum.photos/id/${number}/500/400`}
      style = {{
        width: '100%',
        height: 400
      }}
    />
    // <Image
    //   source={{ uri: `https://picsum.photos/id/${number}/500/400` }} style={{ width: '100%', height: 400 }}
    // />
  )
}
