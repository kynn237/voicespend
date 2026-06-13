// HomeScreen.js — Dashboard dépenses
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {
  const expenses = [
    { id: 1, amount: 5000, category: 'Alimentation', description: 'Marché' },
    { id: 2, amount: 2500, category: 'Transport', description: 'Taxi' },
    { id: 3, amount: 1500, category: 'Loisirs', description: 'Cinéma' },
  ];

  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <ScrollView style={styles.container}>
      {/* Total du mois */}
      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Total ce mois</Text>
        <Text style={styles.totalAmount}>{total.toLocaleString()} XAF</Text>
      </View>

      {/* Liste des dépenses */}
      <Text style={styles.sectionTitle}>Dépenses récentes</Text>
      {expenses.map(expense => (
        <View key={expense.id} style={styles.expenseCard}>
          <View>
            <Text style={styles.expenseDesc}>{expense.description}</Text>
            <Text style={styles.expenseCategory}>{expense.category}</Text>
          </View>
          <Text style={styles.expenseAmount}>
            {expense.amount.toLocaleString()} XAF
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a0f', padding: 16 },
  totalCard: {
    backgroundColor: '#6c63ff',
    borderRadius: 16, padding: 24,
    alignItems: 'center', marginBottom: 24,
  },
  totalLabel: { color: 'rgba(255,255,255,0.7)', fontSize: 14 },
  totalAmount: { color: '#fff', fontSize: 32, fontWeight: '700', marginTop: 4 },
  sectionTitle: { color: '#888', fontSize: 12, marginBottom: 12,
    textTransform: 'uppercase', letterSpacing: 1 },
  expenseCard: {
    backgroundColor: '#0f0f18',
    borderRadius: 12, padding: 16,
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
    borderWidth: 0.5, borderColor: 'rgba(255,255,255,0.08)',
  },
  expenseDesc: { color: '#e2e2e8', fontSize: 14, fontWeight: '500' },
  expenseCategory: { color: '#555', fontSize: 12, marginTop: 2 },
  expenseAmount: { color: '#6c63ff', fontSize: 16, fontWeight: '600' },
});