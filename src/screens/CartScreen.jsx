import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} from '../redux/cartSlice';

const {width} = Dimensions.get('window');
const violet = '#7F3DFF';

const CartScreen = ({navigation}) => {
  const {items, totalQuantity, totalPrice} = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const renderItem = ({item}) => (
    <View style={styles.cartItem}>
      <Image source={{uri: item.image}} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.price}>₹{item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <View style={styles.quantitySubContainer}>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => dispatch(decreaseQuantity(item.id))}>
              <Text style={styles.qtyButtonText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qtyText}>{item.quantity}</Text>
            <TouchableOpacity
              style={styles.qtyButton}
              onPress={() => dispatch(increaseQuantity(item.id))}>
              <Text style={styles.qtyButtonText}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={() => dispatch(removeFromCart(item.id))}
            style={styles.removeButton}>
            <Image
              source={require('../assets/delete.png')}
              style={styles.removeIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../assets/back.png')}
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.headerText}>Your Cart</Text>
          <Text style={styles.subText}>{totalQuantity} items</Text>
        </View>
        <Text style={{width: 30}}></Text>
      </View>

      {/* Cart Items */}
      <FlatList
        data={items}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your cart is empty</Text>
        }
      />

      {/* Total + Checkout */}
      {items.length > 0 && (
        <View style={styles.checkoutContainer}>
          <View style={styles.totalBox}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalPrice}>₹{totalPrice.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginTop: 10,
    justifyContent: 'space-between',
  },
  backIcon: {
    width: 24,
    height: 24,
  },
  titleContainer: {
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#111',
  },
  subText: {
    fontSize: 14,
    color: '#777',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF9FF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
  itemImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: violet,
    marginVertical: 4,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantitySubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  qtyButton: {
    backgroundColor: violet,
    padding: 6,
    borderRadius: 6,
    marginHorizontal: 6,
  },
  qtyButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111',
  },
  removeButton: {
    padding: 4,
  },
  removeIcon: {
    width: 20,
    height: 20,
    tintColor: '#ff4444',
  },
  list: {
    paddingBottom: 90,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 100,
    fontSize: 16,
    color: '#aaa',
  },
  checkoutContainer: {
    position: 'absolute',
    bottom: 0,
    width: width,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  totalBox: {},
  totalLabel: {
    fontSize: 14,
    color: '#555',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '700',
    color: violet,
  },
  checkoutButton: {
    backgroundColor: violet,
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  checkoutText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
