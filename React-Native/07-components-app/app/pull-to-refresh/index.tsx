import { useThemeColor } from '@/hooks/useThemeColor';
import ThemedText from '@/presentation/shared/ThemedText';
import ThemedView from '@/presentation/shared/ThemedView';
import { useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { RefreshControl } from 'react-native-gesture-handler';

const PullToRefreshScreen = () => {

  const primaryColor = useThemeColor({}, 'primary');

  const [isRefreshing, SetIsRefreshing] = useState(false)

  const onRefresh = async() => {
    SetIsRefreshing(true)

    setTimeout(() => {
      SetIsRefreshing(false)
    }, 2000)
  }

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={[primaryColor]} // se pueden agregar mas colores, aunque eso solo se mostraría en android
        />

      }
    >
      <ThemedView margin>
        <ThemedText>PullToRefreshScreen</ThemedText>

      </ThemedView>
    </ScrollView>
  );
};
export default PullToRefreshScreen;
