// import React, {useState, useEffect} from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   FlatList,
//   TouchableOpacity,
//   Dimensions,
//   ScrollView,
// } from 'react-native';
// import {useDispatch} from 'react-redux';
// import {addToCart} from '../redux/cartSlice';

// const {width} = Dimensions.get('window');

// const ProductDetailScreen = ({route, navigation}) => {
//   const {product} = route.params;
//   const dispatch = useDispatch();

//   const imageList = [product.image, product.image, product.image];

//   const [selectedImage, setSelectedImage] = useState(imageList[0]);

//   const handleAddToCart = () => {
//     dispatch(addToCart(product));
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <TouchableOpacity
//         style={styles.backButton}
//         onPress={() => navigation.goBack()}>
//         <Image source={require('../assets/back.png')} style={styles.icon} />
//       </TouchableOpacity>

//       <View style={styles.imageContainer}>
//         <Image source={{uri: selectedImage}} style={styles.mainImage} />
//       </View>

//       <FlatList
//         data={imageList}
//         keyExtractor={(_, index) => index.toString()}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.thumbnailList}
//         renderItem={({item}) => (
//           <TouchableOpacity onPress={() => setSelectedImage(item)}>
//             <Image source={{uri: item}} style={styles.thumbnail} />
//           </TouchableOpacity>
//         )}
//       />

//       <View style={styles.infoContainer}>
//         <View style={styles.titleRow}>
//           <Text style={styles.productTitle}>
//             {product.title.split(' ').slice(0, 2).join(' ')}
//           </Text>
//           <Text style={styles.price}>₹{product.price}</Text>
//         </View>
//         <Text style={styles.description} numberOfLines={4}>
//           {product.description}
//         </Text>

//         <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
//           <Text style={styles.addButtonText}>ADD TO CART</Text>
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const violet = '#7F3DFF';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   backButton: {
//     position: 'absolute',
//     zIndex: 10,
//     top: 40,
//     left: 20,
//     backgroundColor: '#fff',
//     padding: 8,
//     borderRadius: 100,
//     elevation: 4,
//   },
//   icon: {
//     width: 24,
//     height: 24,
//   },
//   imageContainer: {
//     marginTop: 80, // Makes space below back button
//     alignItems: 'center',
//   },
//   mainImage: {
//     width: width,
//     height: 300,
//     resizeMode: 'contain',
//   },
//   thumbnailList: {
//     paddingHorizontal: 16,
//     marginVertical: 16,
//   },
//   thumbnail: {
//     width: 70,
//     height: 70,
//     borderRadius: 10,
//     resizeMode: 'contain',
//     marginRight: 10,
//     borderWidth: 1,
//     borderColor: '#eee',
//   },
//   thumbnailSelected: {
//     borderWidth: 2,
//     borderColor: violet,
//   },
//   infoContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 40,
//   },
//   titleRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   productTitle: {
//     fontSize: 22,
//     fontWeight: '700',
//     color: '#111',
//   },
//   price: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: violet,
//   },
//   description: {
//     fontSize: 14,
//     color: '#777',
//     marginTop: 10,
//     lineHeight: 20,
//   },
//   addButton: {
//     backgroundColor: violet,
//     paddingVertical: 14,
//     borderRadius: 12,
//     marginTop: 20,
//     alignItems: 'center',
//   },
//   addButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '600',
//   },
// });

// export default ProductDetailScreen;

import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {addToCart} from '../redux/cartSlice';

const {width} = Dimensions.get('window');
const violet = '#7F3DFF';

const ProductDetailScreen = ({route, navigation}) => {
  const {product} = route.params;
  const dispatch = useDispatch();
  const thumbnails = [product.image, product.image];

  const [selectedImage, setSelectedImage] = useState(thumbnails[0]);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    ToastAndroid.show('Item added to cart', ToastAndroid.LONG);
  };

  return (
    <>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Image source={require('../assets/back.png')} style={styles.icon} />
      </TouchableOpacity>
      <ScrollView style={styles.container}>
        {/* Back Button */}

        {/* Main Image */}
        <Image source={{uri: selectedImage}} style={styles.mainImage} />

        {/* Thumbnails */}
        <FlatList
          data={thumbnails}
          keyExtractor={(_, index) => index.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.thumbnailList}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => setSelectedImage(item)}>
              <Image source={{uri: item}} style={styles.thumbnail} />
            </TouchableOpacity>
          )}
        />

        {/* Product Info */}
        <View style={styles.infoContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.productTitle}>
              {product.title.split(' ').slice(0, 2).join(' ')}
            </Text>
            <Text style={styles.price}>₹{product.price}</Text>
          </View>

          {/* Rating */}
          <View style={styles.ratingRow}>
            <Image
              source={require('../assets/star.png')}
              style={styles.starIcon}
            />
            <Text style={styles.ratingText}>
              {product.rating?.rate ?? '4.5'} ({product.rating?.count ?? '120'})
            </Text>
          </View>

          {/* Description */}
          <Text style={styles.description} numberOfLines={4}>
            {product.description}
          </Text>

          {/* Add to Cart */}
          <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
            <Text style={styles.addButtonText}>ADD TO CART</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    zIndex: 10,
    top: 30,
    left: 20,
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 100,
    elevation: 4,
  },
  icon: {
    width: 24,
    height: 24,
  },
  mainImage: {
    width: width,
    height: 300,
    resizeMode: 'contain',
    marginTop: 70, // Space for back button
  },
  thumbnailList: {
    paddingHorizontal: 16,
    marginVertical: 16,
  },
  thumbnail: {
    width: 70,
    height: 70,
    borderRadius: 10,
    resizeMode: 'contain',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  thumbnailSelected: {
    borderColor: violet,
    borderWidth: 2,
  },
  infoContainer: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111',
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: violet,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  starIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFA500', // Or use violet
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#444',
  },
  description: {
    fontSize: 14,
    color: '#777',
    marginTop: 10,
    lineHeight: 20,
  },
  addButton: {
    backgroundColor: violet,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 20,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ProductDetailScreen;
