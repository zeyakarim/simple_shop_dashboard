import { StyleSheet, SafeAreaView, Text, View, FlatList } from 'react-native';

const items = [
  { item: 'Wheat', quantity: 5 },
  { item: 'Rice', quantity: 15 },
  { item: 'Basmati Rice', quantity: 25 },
  { item: 'Pulse', quantity: 50 },
]

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemHeader}>
        <Text style={styles.item}>Items</Text>
        <Text style={styles.item}>Quantity</Text>
      </View>

      <FlatList
        data={items}
        renderItem={({item, index}) => (
          <View style={[styles.itemBox, index % 2=== 0 ? styles.even :styles.odd]} key={index}>
            <Text style={styles.item}>{item?.item}</Text>
            <Text style={styles.item}>{item?.quantity}</Text>
          </View>
        )}
        keyExtractor={(item, index) => item?.item ?? index.toString()}
        // with the help of this add gap
        ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginHorizontal: 20,
    marginVertical: 10
  },
  button: {
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'green',
    borderRadius: 20,
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 14
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightgreen',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10
  },
  even: {
    backgroundColor: 'lightgreen',
  },
  odd: {
    backgroundColor: 'lightpink',
  },
  item: {
    fontWeight: 500,
    fontSize: 16
  }
});
