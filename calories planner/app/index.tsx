import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// ─── Data ────────────────────────────────────────────────────────────────────

type Category = 'All' | 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';

type Meal = {
  id: string;
  name: string;
  calories: number;
  category: Exclude<Category, 'All'>;
  emoji: string;
  protein: number;
  carbs: number;
  fat: number;
};

const MEALS: Meal[] = [
  // Breakfast
  { id: 'b1', name: 'Oatmeal with Berries',  calories: 350, category: 'Breakfast', emoji: '🥣', protein: 12, carbs: 58, fat: 7  },
  { id: 'b2', name: 'Scrambled Eggs',         calories: 180, category: 'Breakfast', emoji: '🍳', protein: 14, carbs: 2,  fat: 12 },
  { id: 'b3', name: 'Greek Yogurt & Honey',   calories: 160, category: 'Breakfast', emoji: '🫙', protein: 15, carbs: 22, fat: 2  },
  { id: 'b4', name: 'Avocado Toast',          calories: 320, category: 'Breakfast', emoji: '🥑', protein: 8,  carbs: 35, fat: 18 },
  { id: 'b5', name: 'Banana Smoothie',        calories: 280, category: 'Breakfast', emoji: '🍌', protein: 6,  carbs: 52, fat: 5  },
  // Lunch
  { id: 'l1', name: 'Grilled Chicken Salad', calories: 380, category: 'Lunch', emoji: '🥗', protein: 38, carbs: 12, fat: 18 },
  { id: 'l2', name: 'Tuna Sandwich',         calories: 420, category: 'Lunch', emoji: '🥪', protein: 32, carbs: 38, fat: 14 },
  { id: 'l3', name: 'Lentil Soup',           calories: 260, category: 'Lunch', emoji: '🍲', protein: 18, carbs: 40, fat: 4  },
  { id: 'l4', name: 'Quinoa Bowl',           calories: 440, category: 'Lunch', emoji: '🫕', protein: 16, carbs: 68, fat: 12 },
  { id: 'l5', name: 'Veggie Wrap',           calories: 350, category: 'Lunch', emoji: '🌯', protein: 12, carbs: 48, fat: 10 },
  // Dinner
  { id: 'd1', name: 'Salmon with Veggies',  calories: 520, category: 'Dinner', emoji: '🐟', protein: 42, carbs: 24, fat: 28 },
  { id: 'd2', name: 'Chicken Stir-Fry',     calories: 460, category: 'Dinner', emoji: '🍜', protein: 36, carbs: 42, fat: 14 },
  { id: 'd3', name: 'Pasta Tomato Sauce',   calories: 580, category: 'Dinner', emoji: '🍝', protein: 18, carbs: 92, fat: 12 },
  { id: 'd4', name: 'Veggie Curry & Rice',  calories: 480, category: 'Dinner', emoji: '🍛', protein: 14, carbs: 72, fat: 16 },
  { id: 'd5', name: 'Grilled Steak',        calories: 600, category: 'Dinner', emoji: '🥩', protein: 52, carbs: 0,  fat: 38 },
  // Snacks
  { id: 's1', name: 'Mixed Nuts',      calories: 180, category: 'Snack', emoji: '🥜', protein: 6,  carbs: 8,  fat: 16 },
  { id: 's2', name: 'Apple',           calories: 80,  category: 'Snack', emoji: '🍎', protein: 0,  carbs: 20, fat: 0  },
  { id: 's3', name: 'Protein Bar',     calories: 220, category: 'Snack', emoji: '🍫', protein: 20, carbs: 24, fat: 8  },
  { id: 's4', name: 'Hummus & Veggies',calories: 150, category: 'Snack', emoji: '🫑', protein: 6,  carbs: 16, fat: 7  },
  { id: 's5', name: 'Rice Cakes',      calories: 70,  category: 'Snack', emoji: '🍘', protein: 2,  carbs: 14, fat: 1  },
];

const CATEGORIES: Category[] = ['All', 'Breakfast', 'Lunch', 'Dinner', 'Snack'];
const CAT_EMOJI: Record<Category, string> = {
  All: '🍽️', Breakfast: '🌅', Lunch: '☀️', Dinner: '🌙', Snack: '🍎',
};
const GOAL_PRESETS = [1500, 1800, 2000, 2500];

// ─── Component ───────────────────────────────────────────────────────────────

export default function App() {
  const insets = useSafeAreaInsets();
  const [goal, setGoal]       = useState(2000);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filter, setFilter]   = useState<Category>('All');

  const toggle = (id: string) =>
    setSelected(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });

  const picked   = MEALS.filter(m => selected.has(m.id));
  const total    = picked.reduce((s, m) => s + m.calories, 0);
  const protein  = picked.reduce((s, m) => s + m.protein,  0);
  const carbs    = picked.reduce((s, m) => s + m.carbs,    0);
  const fat      = picked.reduce((s, m) => s + m.fat,      0);
  const progress = Math.min(total / goal, 1);
  const remaining = goal - total;
  const over      = remaining < 0;

  let progressColor = '#4ECDC4';
  if (progress >= 1)   progressColor = '#FF6B6B';
  else if (progress >= 0.8) progressColor = '#F7DC6F';
  const visible = filter === 'All' ? MEALS : MEALS.filter(m => m.category === filter);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" backgroundColor="#0f0f1a" />

      <ScrollView
        contentContainerStyle={styles.scroll}
        showsVerticalScrollIndicator={false}
        bounces={false}
        overScrollMode="never"
      >
        {/* ── Header ── */}
        <View style={styles.header}>
          <Text style={styles.title}>Calorie Planner</Text>
          {selected.size > 0 && (
            <TouchableOpacity onPress={() => setSelected(new Set())}>
              <Text style={styles.clearAll}>Clear all</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* ── Goal selector ── */}
        <Text style={styles.sectionLabel}>Daily goal</Text>
        <View style={styles.goalRow}>
          {GOAL_PRESETS.map(g => (
            <TouchableOpacity
              key={g}
              style={[styles.goalBtn, goal === g && styles.goalBtnOn]}
              onPress={() => setGoal(g)}
            >
              <Text style={[styles.goalBtnText, goal === g && styles.goalBtnTextOn]}>
                {g}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Progress card ── */}
        <View style={styles.card}>
          <View style={styles.progressTop}>
            <View>
              <Text style={styles.totalKcal}>
                {total.toLocaleString()}
                <Text style={styles.goalKcal}> / {goal.toLocaleString()} kcal</Text>
              </Text>
              <Text style={[styles.remaining, over && styles.over]}>
                {over
                  ? `${Math.abs(remaining)} kcal over goal`
                  : `${remaining} kcal remaining`}
              </Text>
            </View>
            <Text style={[styles.pct, { color: progressColor }]}>
              {Math.round(progress * 100)}%
            </Text>
          </View>

          <View style={styles.track}>
            <View
              style={[
                styles.fill,
                { width: `${Math.round(progress * 100)}%` as any, backgroundColor: progressColor },
              ]}
            />
          </View>

          {picked.length > 0 && (
            <View style={styles.macros}>
              <Macro label="Protein" value={protein} color="#4ECDC4" />
              <Macro label="Carbs"   value={carbs}   color="#F7DC6F" />
              <Macro label="Fat"     value={fat}     color="#FF6B6B" />
            </View>
          )}
        </View>

        {/* ── Category filter ── */}
        <ScrollView
          horizontal
          nestedScrollEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.filterRowOuter}
          contentContainerStyle={styles.filterRow}
        >
          {CATEGORIES.map(cat => (
            <TouchableOpacity
              key={cat}
              style={[styles.filterTab, filter === cat && styles.filterTabOn]}
              onPress={() => setFilter(cat)}
            >
              <Text style={styles.filterEmoji}>{CAT_EMOJI[cat]}</Text>
              <Text style={[styles.filterText, filter === cat && styles.filterTextOn]}>
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* ── Meal list ── */}
        {visible.map(meal => {
          const on = selected.has(meal.id);
          return (
            <TouchableOpacity
              key={meal.id}
              style={[styles.mealRow, on && styles.mealRowOn]}
              onPress={() => toggle(meal.id)}
              activeOpacity={0.75}
            >
              <Text style={styles.mealEmoji}>{meal.emoji}</Text>

              <View style={styles.mealInfo}>
                <Text style={styles.mealName}>{meal.name}</Text>
                <Text style={styles.mealMeta}>
                  {meal.category}  ·  P {meal.protein}g  C {meal.carbs}g  F {meal.fat}g
                </Text>
              </View>

              <Text style={[styles.mealKcal, on && styles.mealKcalOn]}>
                {meal.calories}
              </Text>

              <View style={[styles.check, on && styles.checkOn]}>
                {on && <Text style={styles.checkMark}>✓</Text>}
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

function Macro({ label, value, color }: Readonly<{ label: string; value: number; color: string }>) {
  return (
    <View style={[styles.macro, { backgroundColor: color + '22' }]}>
      <Text style={[styles.macroVal, { color }]}>{value}g</Text>
      <Text style={styles.macroLabel}>{label}</Text>
    </View>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0f0f1a' },
  scroll:    { padding: 20, paddingBottom: 60 },

  header: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 20,
  },
  title:    { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  clearAll: { color: '#FF6B6B', fontSize: 14, fontWeight: '500' },

  sectionLabel: {
    color: '#555', fontSize: 11, letterSpacing: 1.2,
    textTransform: 'uppercase', marginBottom: 10,
  },
  goalRow: { flexDirection: 'row', gap: 8, marginBottom: 20 },
  goalBtn: {
    flex: 1, paddingVertical: 10, alignItems: 'center',
    backgroundColor: '#1a1a2e', borderRadius: 10,
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  goalBtnOn:     { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  goalBtnText:   { color: '#555', fontSize: 13, fontWeight: '600' },
  goalBtnTextOn: { color: '#fff' },

  card: {
    backgroundColor: '#1a1a2e', borderRadius: 18,
    padding: 16, marginBottom: 20,
  },
  progressTop: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'flex-start', marginBottom: 14,
  },
  totalKcal: { color: '#fff', fontSize: 30, fontWeight: 'bold' },
  goalKcal:  { color: '#555', fontSize: 16, fontWeight: 'normal' },
  remaining: { color: '#888', fontSize: 13, marginTop: 3 },
  over:      { color: '#FF6B6B' },
  pct:       { fontSize: 22, fontWeight: '700' },

  track: {
    height: 8, backgroundColor: '#2a2a3e',
    borderRadius: 4, overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: 4 },

  macros: { flexDirection: 'row', gap: 8, marginTop: 14 },
  macro:  {
    flex: 1, borderRadius: 10,
    paddingVertical: 10, alignItems: 'center',
  },
  macroVal:   { fontSize: 17, fontWeight: '700' },
  macroLabel: { color: '#666', fontSize: 11, marginTop: 2 },

  filterRowOuter: { marginBottom: 16 },
  filterRow: { gap: 8, paddingBottom: 4 },
  filterTab: {
    flexDirection: 'row', alignItems: 'center', gap: 5,
    backgroundColor: '#1a1a2e', borderRadius: 20,
    paddingHorizontal: 14, paddingVertical: 8,
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  filterTabOn:   { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  filterEmoji:   { fontSize: 13 },
  filterText:    { color: '#555', fontSize: 13, fontWeight: '500' },
  filterTextOn:  { color: '#fff' },

  mealRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#1a1a2e', borderRadius: 14,
    padding: 14, marginBottom: 8,
    borderWidth: 1, borderColor: '#2a2a3e',
  },
  mealRowOn:   { borderColor: '#6C63FF', backgroundColor: '#1c1930' },
  mealEmoji:   { fontSize: 28, marginRight: 12 },
  mealInfo:    { flex: 1 },
  mealName:    { color: '#fff', fontSize: 15, fontWeight: '500', marginBottom: 3 },
  mealMeta:    { color: '#444', fontSize: 11 },
  mealKcal:    { color: '#555', fontSize: 15, fontWeight: '600', marginRight: 10 },
  mealKcalOn:  { color: '#6C63FF' },
  check: {
    width: 26, height: 26, borderRadius: 13,
    borderWidth: 2, borderColor: '#333',
    justifyContent: 'center', alignItems: 'center',
  },
  checkOn:   { backgroundColor: '#6C63FF', borderColor: '#6C63FF' },
  checkMark: { color: '#fff', fontSize: 13, fontWeight: 'bold' },
});
