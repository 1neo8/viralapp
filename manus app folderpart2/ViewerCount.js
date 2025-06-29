import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { VIEWER_TIERS } from './constants';

const ViewerCount = ({ tier }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const viewerData = VIEWER_TIERS[tier] || VIEWER_TIERS['Starter'];
    setCount(viewerData.viewers);
  }, [tier]);

  return (
    <View>
      <Text style={{ fontSize: 18 }}>Viewers: {count}</Text>
    </View>
  );
};

export default ViewerCount;