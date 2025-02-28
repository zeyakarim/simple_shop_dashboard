import { useState } from 'react';
import { StyleSheet, SafeAreaView, Text, View, TextInput, Pressable, FlatList } from 'react-native';

const itemsArray = [
  { item: 'Wheat', quantity: 5 },
  { item: 'Rice', quantity: 15 },
  { item: 'Basmati Rice', quantity: 25 },
  { item: 'Pulse', quantity: 50 },
  { item: 'Masala', quantity: 5 },
  { item: 'Oil', quantity: 15 },
  { item: 'Biryani Rice', quantity: 25 },
  { item: 'Pulao Rice', quantity: 50 },
  { item: 'Masala', quantity: 5 },
  { item: 'Oil', quantity: 15 },
  { item: 'Biryani Rice', quantity: 25 },
  { item: 'Pulao Rice', quantity: 50 },
]

const CreateStock = () => {
    const [items, setItems] = useState(itemsArray || []);
    const [updateMode, setUpdateMode] = useState(false)
    const [item, setItem] = useState({
        name: '',
        quantity: 0
    })

    const handleSubmit = () => {
        if (!item?.name.trim()) return; // Prevent empty items
    
        if (updateMode) {
            setItems((prevItems) =>
                prevItems.map((itemData) =>
                    itemData.item === item.name
                        ? { item: item.name, quantity: Number(item.quantity) } // Ensure quantity is a number
                        : itemData
                )
            );
            setUpdateMode(false);
        } else {
            setItems((prevItems) => [
                ...prevItems ?? [], // Ensure prevItems is an array
                { item: item.name, quantity: Number(item.quantity) },
            ]);
        }
    
        // Reset form
        setItem({ name: "", quantity: 0 });
    };    

    const handleRemove = (name: string) => {
        const removedItem = items?.filter((item) => item?.item !== name)
        setItems(removedItem)
    };

    // type ItemType = {
    //     name: string;
    //     quantity: number;
    //   };
      
    // const handleUpdate = (item: ItemType) => {
    //     setItem(item);
    // };

    type ItemType = {
        item: string;
        quantity: number;
    };
      
    const handleUpdate = (item: ItemType) => {
        setUpdateMode(true)
        setItem({
            name: item.item,
            quantity: item.quantity,
        });
    };
      

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ gap: 10}}>
                <TextInput 
                    placeholder='Enter an item name'
                    style={styles.input}
                    value={item.name}
                    onChangeText={(text) => {
                        setItem({...item, name: text})
                    }}
                />
                <TextInput 
                    placeholder='Enter an quantity' 
                    style={styles.input}
                    value={item.quantity?.toString()}
                    onChangeText={(text) => {
                        const numericValue = text.replace(/[^0-9]/g, ""); // Remove non-numeric characters
                        setItem({ ...item, quantity: numericValue ? parseInt(numericValue, 10) : 0 });
                    }}
                    inputMode='numeric'
                    keyboardType='numeric'
                />
                <Pressable style={styles.button} onPress={handleSubmit}>
                    <Text style={{ fontWeight: 500}}>{updateMode ? 'UPDATE' : 'ADD'} ITEM IN STOCK</Text>
                </Pressable>
            </View>
            <View style={styles.itemHeader}>
                <Text style={styles.item}>All Items in Stock</Text>
            </View>

            <FlatList 
                data={items}
                renderItem={({item, index}) => (
                    <View style={[styles.itemBox, item?.quantity >= 10 ? styles.highStock :styles.lowStock]} key={index}>
                        <Text style={styles.item}>{item?.item}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={styles.item}>{item?.quantity}</Text>
                            <Text 
                                style={[styles.item, {marginLeft: 10}]} 
                                onPress={() => handleUpdate(item)}
                            >Update</Text>
                            <Text 
                                style={[styles.item, {marginLeft: 10}]} 
                                onPress={() => handleRemove(item?.item)}
                            >Delete</Text>
                        </View>
                    </View>
                )}
                keyExtractor={(item, index) => item?.item ?? index.toString()}
                // with the help of this add gap
                ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
            />
        </SafeAreaView>
    );
}

export default CreateStock;

const styles = StyleSheet.create({
  container: {
    gap: 10,
    marginHorizontal: 20,
    marginVertical: 10
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10
  },
  itemBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'lightgreen',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 10
  },
  highStock: {
    backgroundColor: 'lightgreen',
  },
  lowStock: {
    backgroundColor: 'lightpink',
  },
  item: {
    fontWeight: 500,
    fontSize: 16
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 10
  },
  button: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center'
  }
});
