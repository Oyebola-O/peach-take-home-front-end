import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
  circle: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 15,
  },
});

const CircledEmoji = ({emoji, color, size, emojiSize}) => {
  const dynamicStyle = {
    backgroundColor: color || '#B6E4FB',
    width: size || 40,
    height: size || 40,
  };

  const emojiStyle = {
    fontSize: emojiSize || 15,
  };

  return (
    <View style={[styles.circle, dynamicStyle]}>
      <Text style={[styles.emoji, emojiStyle]}>{emoji}</Text>
    </View>
  );  
};

export default CircledEmoji;