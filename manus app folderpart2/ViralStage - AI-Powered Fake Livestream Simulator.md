# ViralStage - AI-Powered Fake Livestream Simulator

🎭 **For Entertainment Only** - A React Native + Expo mobile app that simulates going live on popular social media platforms.

## 🚀 Features

### Core Functionality
- **Fake Livestream Simulation**: Mimics TikTok, Instagram, YouTube, Snapchat, and Facebook Live
- **Dynamic Viewer Count**: Displays realistic fake viewer counts (10K-100K+)
- **Scrolling Comments**: Real-time fake comment stream with multiple personality modes
- **Floating Reactions**: Animated hearts and emojis floating across the screen
- **Platform Skins**: Authentic UI styling for each social media platform
- **Screen Recording**: Export 15-second clips with fake UI overlay

### Comment Engine
- **Multiple Modes**: Fanboy, Troll, Romantic, and Multilingual comments
- **Real-time Updates**: New comments appear every 2 seconds
- **GPT-4 Ready**: Structured for easy AI integration

### Customization
- **Viewer Level Control**: Choose between 10K, 50K, or 100K viewer ranges
- **Comment Mode Toggle**: Switch between different comment personalities
- **Watermark Settings**: Optional disclaimer overlay on recordings
- **Platform Switching**: Live theme switching between social platforms

### Subscription System (Demo)
- **Three Tiers**: Starter ($4.99), Creator ($9.99), Elite ($19.99)
- **Stripe Integration**: Placeholder hooks for payment processing
- **Feature Gating**: Premium features based on subscription level

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS testing) or Android Emulator (for Android testing)

### Installation

1. **Navigate to project directory**
   ```bash
   cd ViralStage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

4. **Run on device/simulator**
   - Press `i` for iOS Simulator
   - Press `a` for Android Emulator
   - Press `w` for Web browser
   - Scan QR code with Expo Go app on physical device

## 📁 Project Structure

```
ViralStage/
├── App.js                     # Main app component with navigation
├── app.json                   # Expo configuration
├── package.json               # Dependencies and scripts
├── babel.config.js            # Babel configuration
├── assets/
│   └── dummy_video.txt        # Placeholder for video file
├── components/
│   ├── CommentStream.js       # Scrolling fake comments
│   ├── ViewerOverlay.js       # Live viewer count display
│   ├── SkinSwitcher.js        # Platform theme switcher
│   ├── ExportRecorder.js      # Recording functionality
│   ├── DisclaimerOverlay.js   # Entertainment disclaimer
│   ├── AudioEmojiReactor.js   # Audio-triggered emoji reactions
│   ├── SaveToCameraRoll.js    # Video export to camera roll
│   └── ViewerCount.js         # Viewer count component
├── screens/
│   ├── HomeScreen.js          # Main livestream simulation
│   ├── SettingsScreen.js      # App configuration
│   ├── RecordingsScreen.js    # Saved recordings gallery
│   └── BillingScreen.js       # Subscription management
├── utils/
│   ├── fakeComments.json      # Comment database
│   ├── skinThemes.js          # Platform styling themes
│   └── gptCommentEngine.js    # GPT comment generation
└── config/
    └── constants.js           # App constants and configuration
```

## 🎮 Usage Guide

### Home Screen
1. **Go Live**: Tap the "Go Live" button to start the fake stream
2. **Switch Platforms**: Use the horizontal platform selector to change themes
3. **Record**: Tap the record button to capture a 15-second clip
4. **Watch**: Enjoy fake viewers, comments, and floating reactions

### Settings Screen
- **Viewer Level**: Choose your fake audience size
- **Comment Mode**: Select comment personality (Fanboy/Troll/Romantic/Multilingual)
- **Watermark**: Toggle disclaimer overlay on recordings
- **Auto-start**: Automatically begin streaming on app launch

### Recordings Screen
- View all saved fake livestream recordings
- Play, share, or delete recordings
- See recording metadata (platform, duration, timestamp)

### Billing Screen
- View subscription tiers and features
- Demo payment flow (no real charges)
- Restore purchases functionality

## 🔧 Technical Implementation

### Key Technologies
- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and build tools
- **React Navigation**: Screen navigation and tab management
- **AsyncStorage**: Local data persistence
- **Expo AV**: Video and audio handling
- **Expo Linear Gradient**: Background styling

### Architecture
- **Component-based**: Modular, reusable UI components
- **Theme System**: Dynamic styling based on selected platform
- **State Management**: React hooks for local state
- **Persistent Storage**: Settings and recordings saved locally

## ⚠️ Important Disclaimers

### Entertainment Only
This app is designed **purely for entertainment purposes**. It simulates fake social media engagement and should not be used to:
- Mislead others about actual follower counts
- Create false impressions of popularity
- Deceive audiences about real engagement
- Violate platform terms of service

### No Real Streaming
- No actual livestreaming occurs
- All viewers, comments, and interactions are simulated
- Recordings are local only and contain fake UI elements
- No connection to real social media platforms

### Demo Features
- Payment processing is simulated (no real charges)
- Video recording is placeholder functionality
- Some features are stubs for future implementation

## 📄 License

This project is for educational and entertainment purposes only. Please use responsibly and in accordance with all applicable laws and platform terms of service.

## 🤝 Contributing

This is a demo project. For production use, consider:
- Implementing proper error handling
- Adding comprehensive testing
- Enhancing security measures
- Optimizing performance
- Adding accessibility features

---

**Remember: This is a simulation app for entertainment only. Always be transparent about fake content when sharing with others.**

