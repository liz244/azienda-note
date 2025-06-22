import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { loadNotes } from '../utils/storage';

export default function DashboardScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchNotes = async () => {
      const data = await loadNotes();
      setNotes(data);
    };

    if (isFocused) {
      fetchNotes();
    }
  }, [isFocused]);
const getPriorityColor = (priority) => {
  switch (priority) {
    case 'Important':
      return '#F45B69'; // rouge vif
    case 'Normal':
      return '#114B5F'; // bleu foncé
    case 'Reminder':
      return '#7EE4EC'; // bleu clair
    default:
      return '#ccc'; // par défaut
  }
};

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    note.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.noteCard, { borderLeftColor: getPriorityColor(item.priority) }]}
      onPress={() => navigation.navigate('Note', { note: item })}
    >
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text numberOfLines={2} style={styles.content}>
        {item.content}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search notes..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999"
      />

      {filteredNotes.length === 0 ? (
        <Text style={styles.empty}>No matching notes.</Text>
      ) : (
        <FlatList
          data={filteredNotes}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}

      <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('Form')}>
        <Text style={styles.addText}>ADD</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1FAEE',
  },
  searchInput: {
    fontFamily: 'Montserrat_400Regular',
    fontSize: 16,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
    color: '#1D3557',
  },
  list: {
    paddingBottom: 80,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 6,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Montserrat_700Bold',
    marginBottom: 4,
    color: '#1D3557',
  },
  date: {
    fontSize: 12,
    fontFamily: 'Montserrat_400Regular',
    color: '#6C757D',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    fontFamily: 'Montserrat_400Regular',
    color: '#343A40',
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#457B9D',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
  },
  addText: {
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
    fontSize: 16,
    fontFamily: 'Montserrat_400Regular',
  },
});
