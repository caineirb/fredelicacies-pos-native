import React from 'react';
import { TextInput } from 'react-native';

interface SearchBarProps {
    searchItem: string;
    setSearchItem: (text: string) => void;
}


export default function SearchBar({ searchItem, setSearchItem }: SearchBarProps) {
  return (
    <TextInput
      placeholder="Search..."
      onChangeText={setSearchItem}
      value={searchItem}
    />
  )
}