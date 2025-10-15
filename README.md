# 🍅 Pomodoro Timer App

## ✨ Tính năng

### 🎯 Core Features

- ⏱️ **Timer đếm ngược** với giao diện trực quan
- 🔄 **Tự động chuyển đổi** giữa phiên Work và Break
- 🔔 **Thông báo push** khi phiên kết thúc (hoạt động cả khi app đóng)
- 📳 **Haptic feedback** khi tương tác
- 💡 **Giữ màn hình sáng** trong khi timer chạy
- 💾 **Lưu trữ lịch sử** tự động vào thiết bị

### 📊 Analytics & History

- 📈 **Biểu đồ trực quan** hiển thị số phiên hoàn thành theo ngày
- 📋 **Lịch sử chi tiết** các phiên làm việc
- 📊 **Thống kê tổng quan**: tổng phiên, tổng thời gian làm việc
- 🗑️ **Xóa lịch sử** với xác nhận an toàn

### ⚙️ Customization

- ⏲️ **Tùy chỉnh thời gian** Work/Break theo ý muốn
- 🔧 **Cài đặt linh hoạt** nghỉ dài sau N phiên
- 🔄 **Khôi phục mặc định** một chạm
- 💡 **Hướng dẫn sử dụng** tích hợp

### 🎨 UI/UX

- 🌙 **Dark theme** đẹp mắt, dễ nhìn
- 🎨 **Màu sắc phân biệt** Work (đỏ) và Break (xanh)
- 📊 **Progress bar** theo dõi tiến độ
- 🧭 **Tab navigation** dễ sử dụng

## 🛠️ Công nghệ sử dụng

### Core Technologies

- **[React Native](https://reactnative.dev/)** `0.76.3` - Framework UI cross-platform
- **[Expo SDK](https://expo.dev/)** `~52.0.0` - Development platform
- **[Expo Router](https://docs.expo.dev/router/introduction/)** `~4.0.0` - File-based routing

### Key Libraries

| Library                                     | Version | Purpose            |
| ------------------------------------------- | ------- | ------------------ |
| `expo-notifications`                        | ~0.29.0 | Push notifications |
| `expo-keep-awake`                           | ~14.0.0 | Keep screen awake  |
| `expo-haptics`                              | ~14.0.0 | Haptic feedback    |
| `@react-native-async-storage/async-storage` | 1.23.1  | Local storage      |
| `react-native-chart-kit`                    | 6.12.0  | Charts & graphs    |
| `react-native-svg`                          | 15.8.0  | SVG support        |

## 🚀 Cài đặt

### 1. Clone repository

```bash
git clone https://github.com/yourusername/pomodoro-timer-app.git
cd pomodoro-timer-app
```

### 2. Cài đặt dependencies

```bash
# Sử dụng npm
npm install

# Hoặc yarn
yarn install
```

### 3. Khởi chạy development server

```bash
# Khởi động Expo
npm start

# Hoặc
npx expo start
```

### 4. Chạy trên thiết bị

#### 📱 iOS/Android (Expo Go)

1. Cài đặt **Expo Go** từ App Store hoặc Google Play
2. Quét QR code từ terminal
3. App sẽ tự động load

#### 💻 Simulator/Emulator

```bash
# iOS Simulator (chỉ macOS)
npm run ios

# Android Emulator
npm run android
```

#### 🌐 Web Browser

```bash
npm run web
```

## 📖 Sử dụng

### Kỹ thuật Pomodoro cơ bản

1. **Chọn nhiệm vụ** bạn muốn hoàn thành
2. **Bắt đầu timer** 25 phút (1 Pomodoro)
3. **Làm việc tập trung** cho đến khi timer kết thúc
4. **Nghỉ ngơi ngắn** 5 phút
5. **Lặp lại** bước 2-4
6. Sau **4 Pomodoros**, nghỉ dài 15-30 phút

## 📁 Cấu trúc dự án

```
pomodoro-timer-app/
├── app/                      # Expo Router screens
│   ├── _layout.js           # Tab navigation layout
│   ├── index.js             # Timer screen
│   ├── history.js           # History & analytics
│   └── settings.js          # Settings screen
├── assets/                   # Images, icons, fonts
│   ├── icon.png
│   ├── splash.png
│   ├── adaptive-icon.png
│   └── favicon.png
├── app.json                  # Expo configuration
├── package.json              # Dependencies
├── babel.config.js           # Babel configuration
└── README.md                 # Documentation
```

```
