export const PLATFORMS = {
  TIKTOK: 'tiktok',
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
  SNAPCHAT: 'snapchat',
  FACEBOOK: 'facebook',
};

export const VIEWER_LEVELS = {
  LOW: { min: 8000, max: 15000, label: '10K' },
  MEDIUM: { min: 40000, max: 60000, label: '50K' },
  HIGH: { min: 90000, max: 120000, label: '100K' },
};

export const COMMENT_MODES = {
  FANBOY: 'fanboy',
  TROLL: 'troll',
  ROMANTIC: 'romantic',
  MULTILINGUAL: 'multilingual',
};

export const REACTIONS = ['❤️', '😍', '🔥', '👏', '😂', '😮', '💯', '🎉'];

export const RECORDING_DURATION = 15; // seconds

export const COMMENT_INTERVAL = 2000; // milliseconds

export const BILLING_TIERS = {
  STARTER: {
    name: 'Starter',
    price: '$4.99/month',
    features: ['Basic platforms', 'Standard comments', 'Watermark'],
  },
  CREATOR: {
    name: 'Creator',
    price: '$9.99/month',
    features: ['All platforms', 'Custom comments', 'No watermark', 'HD export'],
  },
  ELITE: {
    name: 'Elite',
    price: '$19.99/month',
    features: ['Everything in Creator', 'AI comments', 'Analytics', 'Priority support'],
  },
};

