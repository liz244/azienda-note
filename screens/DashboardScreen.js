import { useIsFocused } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { loadNotes } from '../utils/storage';

export default function DashboardScreen({ navigation }) {
  const [notes, setNotes] = useState([]);
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
        return '#FF6B6B'; // red
      case 'Normal':
        return '#FFA500'; // orange
      case 'Reminder':
        return '#87CEFA'; // blue
      default:
        return '#ccc';
    }
  };

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
      {notes.length === 0 ? (
        <Text style={styles.empty}>No notes yet.</Text>
      ) : (
        <FlatList
          data={notes}
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
    backgroundColor: '#fff',
  },
  list: {
    paddingBottom: 80,
  },
  noteCard: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 6,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#777',
    marginBottom: 8,
  },
  content: {
    fontSize: 14,
    color: '#333',
  },
  addButton: {
    position: 'absolute',
    bottom: 25,
    right: 25,
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    elevation: 5,
  },
  addText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  empty: {
    textAlign: 'center',
    color: '#999',
    marginTop: 50,
    fontSize: 16,
  },
});
