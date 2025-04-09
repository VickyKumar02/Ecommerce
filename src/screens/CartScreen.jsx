import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from '../redux/cartSlice';

const CartScreen = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.items);
  const total = useSelector(state => state.cart.totalPrice);

  console.log('CartItem: ', cartItems);

  const handleRemove = id => {
    Alert.alert('Remove Item', 'Are you sure you want to remove this item?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Remove',
        style: 'destructive',
        onPress: () => dispatch(removeFromCart(id)),
      },
    ]);
  };

  const renderItem = ({item}) => (
    <View style={styles.card}>
      <Image source={{uri: item.image}} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.price}>₹ {item.price.toFixed(2)}</Text>

        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => dispatch(decreaseQuantity(item.id))}>
            <Text style={styles.quantityText}>-</Text>
          </TouchableOpacity>

          <Text style={styles.quantity}>{item.quantity}</Text>

          <TouchableOpacity
            style={styles.quantityBtn}
            onPress={() => dispatch(increaseQuantity(item.id))}>
            <Text style={styles.quantityText}>+</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => handleRemove(item.id)}>
          <Text style={styles.remove}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={item => item.id.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />

          <View style={styles.footer}>
            <Text style={styles.total}>Total: ₹ {total.toFixed(2)}</Text>
            <TouchableOpacity
              style={styles.checkoutButton}
              onPress={() =>
                Alert.alert('Checkout', 'Proceeding to payment...')
              }>
              <Text style={styles.checkoutText}>Checkout</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Your cart is empty 😢</Text>
        </View>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#f7f7f7'},
  list: {padding: 10},
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    padding: 10,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    borderRadius: 8,
    marginRight: 10,
  },
  info: {flex: 1, justifyContent: 'space-between'},
  title: {fontSize: 16, fontWeight: 'bold', marginBottom: 5},
  price: {fontSize: 14, color: '#333'},
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 6,
  },
  quantityBtn: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 6,
  },
  quantityText: {fontSize: 16},
  quantity: {marginHorizontal: 12, fontSize: 16},
  remove: {
    color: 'red',
    marginTop: 4,
    fontSize: 13,
  },
  footer: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    backgroundColor: '#fff',
  },
  total: {fontSize: 18, fontWeight: 'bold', marginBottom: 10},
  checkoutButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  checkoutText: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {fontSize: 18, color: '#999'},
});
