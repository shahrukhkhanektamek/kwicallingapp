import React, { useContext } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';

import { AppContext } from '../Context/AppContext';


const categories = [
  { id: '1', title: 'Women', img: '../assets/img/category/img1.jpg', },
  { id: '2', title: 'Kids', img: '../assets/img/category/img1.jpg', },
  { id: '3', title: 'Appliances', img: '../assets/img/category/img1.jpg', },
  { id: '4', title: 'Footwear', img: '../assets/img/category/img1.jpg', },
];

const banners = [
  { id: '1', title: 'Women', img: '../assets/img/banner/img1.jpg', },
  { id: '2', title: 'Kids', img: '../assets/img/banner/img1.jpg', },
  { id: '3', title: 'Appliances', img: '../assets/img/banner/img1.jpg', },
  { id: '4', title: 'Footwear', img: '../assets/img/banner/img1.jpg', },
];

const products = [
  {
    id: '1',
    name: 'Bracelet Woman',
    price: '$65.00',
    rating: 4.8,
    img: '../assets/img/product/img1.jpg',
  },
  {
    id: '2',
    name: 'Sofa single coco',
    price: '$65.00',
    rating: 4.8,
    img: '../assets/img/product/img1.jpg',
  },
  {
    id: '3',
    name: 'Sofa single coco',
    price: '$65.00',
    rating: 4.8,
    img: '../assets/img/product/img1.jpg',
  },
  {
    id: '4',
    name: 'Sofa single coco',
    price: '$65.00',
    rating: 4.8,
    img: '../assets/img/product/img1.jpg',
  },
  {
    id: '5',
    name: 'Sofa single coco',
    price: '$65.00',
    rating: 4.8,
    img: '../assets/img/product/img1.jpg',
  },
  {
    id: '6',
    name: 'Sofa single coco',
    price: '$65.00',
    rating: 4.8,
    img: '../assets/img/product/img1.jpg',
  },
];
const { width } = Dimensions.get('window');
export default function HomeScreen() {


  const { drawerOpen, setDrawerOpen } = useContext(AppContext);


  const renderCategory = ({ item }) => (
    <View style={styles.categoryItem}>
      <Image source={require('../assets/img/category/img1.jpg')} style={styles.categoryImage} />
      <Text style={styles.categoryText}>{item.title}</Text>
    </View>
  );

  const renderBanner = ({ item }) => (
    <View style={styles.bannerItem}>
      <Image source={require('../assets/img/banner/img1.webp')} style={styles.bannerImage} />
    </View>
  );

 

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>            
            <Image
              source={require('../assets/img/logo.png')}
              style={styles.logo}
            />
          </View>
          <TouchableOpacity onPress={()=> setDrawerOpen(true)} >
            <Icon name="menu" style={styles.menu} />
          </TouchableOpacity>
        </View>


        {/* banners */}
        <View style={styles.categoryRow}>
          <FlatList
            horizontal
            data={banners}
            keyExtractor={item => item.id}
            renderItem={renderBanner}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
          />
        </View>


        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 10 }}
        >
          {categories.map(item => (
            <CategoryCard key={item.id} item={item} />
          ))}
        </ScrollView>

        {/* Products */}
        <View style={[styles.productList, { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }]}>
          {products.map(item => (
            <ProductCard key={item.id} item={item} />
          ))}
        </View>

      </ScrollView>

      
    </View>
  );
}




const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#f6f8f5' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  menu:{
    fontSize:30,
    color:'#657792'
  },
  logo: { width: 150, height: 40, borderRadius: 0, marginLeft: -15, resizeMode:'contain' },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#333' },
  headerSubtitle: { fontSize: 12, color: '#777' },

  categoryRow: {
    marginTop: 0,
    marginBottom: 20,
  },


  productList: { paddingHorizontal: 10, marginBottom: 80 },


  bannerListContent: {
    paddingHorizontal: 10,
  },
  bannerItem: {
    width: width - 40,     // full width minus side padding
    marginRight: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  bannerImage: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
    borderRadius: 16,
  },
});
