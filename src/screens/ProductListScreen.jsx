import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ProductListScreen = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const navigation = useNavigation();
  const cartItems = useSelector(state => state.cart.items);

  useEffect(() => {
    axios
      .get('https://fakestoreapi.com/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  const totalCartQuantity = Object.values(cartItems).reduce(
    (total, item) => total + item.quantity,
    0,
  );

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', {product: item})}>
      <Image
        source={{uri: item.image}}
        style={styles.image}
        resizeMode="contain"
      />
      <Text style={styles.brand}>{item.title.split(' ')[0]}</Text>
      <Text numberOfLines={2} style={styles.description}>
        {item.title}
      </Text>
      <Text style={styles.price}>₹{item.price}</Text>
    </TouchableOpacity>
  );

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <View style={styles.searchWrapper}>
          <Image
            source={require('../assets/search.png')}
            style={styles.iconImage}
          />
          <TextInput
            value={search}
            onChangeText={setSearch}
            style={styles.searchInput}
            placeholder="search"
            placeholderTextColor="#aaa"
          />
        </View>

        <TouchableOpacity
          style={styles.cartIconWrapper}
          onPress={() => navigation.navigate('Cart')}>
          <Image
            source={require('../assets/cart.png')}
            style={[styles.iconImage, {width: 26, height: 26}]}
          />
          {totalCartQuantity > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{totalCartQuantity}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <Text style={styles.heading}>Products</Text>
      <Text style={styles.count}>{filteredProducts.length} products found</Text>

      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        numColumns={2}
        columnWrapperStyle={{justifyContent: 'space-between'}}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default ProductListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F7FF',
    padding: 16,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  searchWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEEAFD',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 45,
    marginRight: 12,
  },
  iconImage: {
    width: 20,
    height: 20,
    marginRight: 8,
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    padding: 0,
  },
  cartIconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -2,
    backgroundColor: '#7A5EFF',
    borderRadius: 12,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginTop: 20,
  },
  count: {
    fontSize: 14,
    color: '#999',
    marginBottom: 8,
  },
  list: {
    paddingBottom: 30,
  },
  card: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 12,
    marginBottom: 14,
    shadowColor: '#A991FF',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 10,
  },
  brand: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#7A5EFF',
  },
  description: {
    fontSize: 13,
    color: '#444',
    marginVertical: 4,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
