import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CategoryIndicatorProps {
    categoryColor: string;
    colorScheme: 'light' | 'dark' | null | undefined;
    categoryName: string;
    count: number;
}

const CategoryIndicator = ({ categoryColor, colorScheme, categoryName, count } : CategoryIndicatorProps) => {
  const style = StyleSheet.create({
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            alignSelf: 'flex-start',
            padding: 12,
            borderRadius: 8,
            backgroundColor: '#f0f0f0',
            borderColor: Colors[colorScheme ?? 'light'].border,
            borderWidth: 1,
            gap: 8,
            maxHeight: 50,
        },
        categoryColor: {
            backgroundColor: categoryColor,
            borderRadius: 50,
            width: 10,
            height: 10,
        },
        categoryName: {
            color: Colors[colorScheme ?? 'light'].text,
            fontWeight: 'bold',
            fontSize: 12,
        },
        count: {
            color: Colors[colorScheme ?? 'light'].text,
            fontSize: 10,
            opacity: 0.5,
            backgroundColor: '#ffffffff',
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: 12,
            overflow: 'hidden',
        },
    });
    return (
        <View style={style.container}>
            <View style={style.categoryColor} />
            <Text style={style.categoryName}>{categoryName}</Text>
            <Text style={style.count}>{count}</Text>
        </View>
    )
}

export default CategoryIndicator