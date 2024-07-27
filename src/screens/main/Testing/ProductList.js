// 1. Fetch categories
// 2. Fetch products and assign them to their categories
// 3. Pagination & Search Query
// 4. Design

import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ScrollView, Image, ActivityIndicator, StyleSheet } from 'react-native';
import axios from 'axios';

const ProductList = () => {
    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const categoryResponse = await axios.get('https://foodcort.onrender.com/api/category');
                const productResponse = await axios.get('https://foodcort.onrender.com/api/products');

                if (categoryResponse.data.success && productResponse.data.success) {
                    const categoryData = categoryResponse.data.displayCategoryData;
                    const productData = productResponse.data.data;
                    const categorizedProducts = categorizeProducts(categoryData, productData);
                    setCategories(categorizedProducts);
                } else {
                    console.error('Failed to fetch data.');
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoadingCategories(false);
            }
        };

        fetchData();
    }, []);

    const categorizeProducts = (categoryData, productData) => {
        const categorizedProducts = {}

        const categoryMap = {}
        categoryData.forEach(category => {
            categoryMap[category._id] = category.categoryName
        })

        productData.forEach(product => {
            const categoryName = categoryMap[product.category];
            if (categoryName) {
                if (!categorizedProducts[categoryName]) {
                    categorizedProducts[categoryName] = [];
                }
                categorizedProducts[categoryName].push(product);
            }
        })

        return categorizedProducts
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.title}>Food Delivery</Text>
            {
                loadingCategories ? (
                    <ActivityIndicator size="large" color="#000" />
                ) : (
                    Object.entries(categories).map(([categoryName, products]) => {
                        return (
                            <View key={categoryName} style={styles.categoryContainer}>
                                <Text style={styles.categoryTitle}>{categoryName}</Text>
                                <FlatList
                                    data={products}
                                    horizontal
                                    renderItem={({ item }) => {
                                        const cleanDescription = item.productDescription.replace(/<p>/g, '').replace(/<\/p>/g, '')
                                        return (
                                            <View style={styles.productCard}>
                                                <Image
                                                    source={{ uri: `data:image/jpeg;base64,${item.image_product}` }}
                                                    style={styles.productImage}
                                                />
                                                <View style={styles.productInfo}>
                                                    <Text style={styles.productTitle}>{item.productTitle}</Text>
                                                    <Text style={styles.productDescription}>{cleanDescription}</Text>
                                                    <Text style={styles.productPrice}>Price: ₹{item.productPrice}</Text>
                                                    <Text style={styles.productRating}>Rating: {item.productRating}</Text>
                                                    <Text style={styles.productDeliveryTime}>Delivery: {item.productDeliveryTime}</Text>
                                                </View>
                                            </View>
                                        )
                                    }}
                                    keyExtractor={item => item._id}
                                    contentContainerStyle={styles.productList}
                                />
                            </View>
                        )
                    })
                )
            }
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        paddingVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        paddingHorizontal: 25
    },
    categoryContainer: {
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        paddingHorizontal: 25
    },
    productCard: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginHorizontal: 5,
        padding: 10,
        width: 300,
        elevation: 3,
    },
    productImage: {
        width: '100%',
        height: 120,
        borderRadius: 10,
        marginBottom: 10,
    },
    productInfo: {
        flex: 1,
    },
    productTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    productDescription: {
        fontSize: 14,
        marginBottom: 5,
    },
    productPrice: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    productRating: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    productDeliveryTime: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    productList: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
});

export default ProductList