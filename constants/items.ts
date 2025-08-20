export interface Item {
  id: string;
  name: string;
  description: string | null;
  price: number;
  image: any;
  stock: number;
}

export const tempItems: Item[] = [
  {
    id: '1',
    name: 'Sample Item 1',
    description: 'This is a description for Sample Item 1',
    price: 9.99,
    image: require('@/assets/images/sampleItem.jpg'),
    stock: 5,
  },
  {
    id: '2',
    name: 'Sample Item 2',
    description: 'This is a description for Sample Item 2',
    price: 14.99,
    image: require('@/assets/images/sampleItem.jpg'),
    stock: 30,
  },
  {
    id: '3',
    name: 'Sample Item 3',
    description: 'This is a description for Sample Item 3',
    price: 7.49,
    image: require('@/assets/images/sampleItem.jpg'),
    stock: 25,
  },
  {
    id: '4',
    name: 'Sample Item 4',
    description: null,
    price: 12.99,
    image: require('@/assets/images/sampleItem.jpg'),
    stock: 40,
  },
  {
    id: '5',
    name: 'Sample Item 5',
    description: 'This is a description for Sample Item 5',
    price: 3.00,
    image: require('@/assets/images/sampleItem.jpg'),
    stock: 100,
  },
  {
    id: '6',
    name: 'Sample Item 6',
    description: null,
    price: 30.00,
    image: require('@/assets/images/sampleItem.jpg'),
    stock: 15,
  },
  {
    id: '7',
    name: 'Sample Item 7',
    description: 'This is a description for Sample Item 7',
    price: 7.49,
    image: require('@/assets/images/sampleItem.jpg'),
    stock: 60,
  },
  {
    id: '8',
    name: 'Sample Item 8',
    description: 'This is a description for Sample Item 8',
    price: 12.99,
    image: require('@/assets/images/sampleItem.jpg'),
    stock: 35,
  },
  {
    id: '9',
    name: 'Sample Item 9',
    description: 'This is a description for Sample Item 9',
    price: 3.00,
    image: require('@/assets/images/sampleItem.jpg'),
    stock: 80,
  },
  {
    id: '10',
    name: 'Sample Item 10',
    description: null,
    price: 30.00,
    image: require('@/assets/images/sampleItem.jpg'),
    stock: 20,
  },
];