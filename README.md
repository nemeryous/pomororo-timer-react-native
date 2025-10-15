# 🍅 Pomodoro Timer App

<div align="center">

![Pomodoro Timer](https://img.shields.io/badge/Pomodoro-Timer-FF6B6B?style=for-the-badge&logo=clockify&logoColor=white)
![React Native](https://img.shields.io/badge/React_Native-0.76.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Expo](https://img.shields.io/badge/Expo-52.0-000020?style=for-the-badge&logo=expo&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

Ứng dụng Pomodoro Timer đơn giản và hiệu quả, giúp bạn quản lý thời gian làm việc theo kỹ thuật Pomodoro với giao diện đẹp mắt và trải nghiệm mượt mà.

</div>

---

## 📱 Demo

<div align="center">

|                              Timer Screen                              |                               History Screen                               |                               Settings Screen                                |
| :--------------------------------------------------------------------: | :------------------------------------------------------------------------: | :--------------------------------------------------------------------------: |
| ![Timer](https://via.placeholder.com/250x500/1A1A2E/FF6B6B?text=Timer) | ![History](https://via.placeholder.com/250x500/1A1A2E/FF6B6B?text=History) | ![Settings](https://via.placeholder.com/250x500/1A1A2E/FF6B6B?text=Settings) |

</div>

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

## 📋 Yêu cầu hệ thống

- **Node.js**: >= 18.0.0 (khuyến nghị LTS 20.x)
- **npm**: >= 9.0.0 hoặc **yarn**: >= 1.22.0
- **Expo Go** app trên điện thoại (iOS/Android)
- **Expo CLI** (được cài tự động)

### Hệ điều hành hỗ trợ:

- ✅ iOS 13.4+
- ✅ Android 5.0+ (API 21+)
- ✅ Web (experimental)

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

### Hướng dẫn app

#### Màn hình Timer

- Nhấn **"Bắt đầu"** để khởi động timer
- Nhấn **"Tạm dừng"** để dừng tạm thời
- Nhấn **"Đặt lại"** để reset về thời gian ban đầu
- Timer tự động chuyển giữa Work và Break

#### Màn hình Lịch sử

- Xem **biểu đồ 7 ngày** gần nhất
- Xem **danh sách chi tiết** các phiên đã hoàn thành
- **Thống kê tổng quan** ở trên cùng

#### Màn hình Cài đặt

- Điều chỉnh **thời gian làm việc** (1-120 phút)
- Điều chỉnh **thời gian nghỉ** (1-60 phút)
- Thiết lập **số phiên trước nghỉ dài**

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

## 🔧 Configuration

### Thay đổi thời gian mặc định

Chỉnh sửa trong `app/index.js`:

```javascript
const [workTime, setWorkTime] = useState(25); // Phút làm việc
const [breakTime, setBreakTime] = useState(5); // Phút nghỉ ngơi
```

### Tùy chỉnh màu sắc

Thay đổi trong styles của từng file:

```javascript
// Màu chủ đạo
'#FF6B6B'; // Red - Work sessions
'#4ECDC4'; // Teal - Break sessions
'#1A1A2E'; // Dark background
'#16213E'; // Card background
```

### Thêm âm thanh thông báo

1. Thêm file âm thanh vào `assets/`
2. Cập nhật `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-notifications",
        {
          "sounds": ["./assets/notification-sound.wav"]
        }
      ]
    ]
  }
}
```

## 🐛 Xử lý lỗi thường gặp

### Lỗi: Module not found

```bash
rm -rf node_modules package-lock.json
npm install
npx expo start -c
```

### Lỗi: Thông báo không hoạt động

- **iOS**: Chỉ hoạt động trên thiết bị thật, không simulator
- **Android**: Kiểm tra quyền POST_NOTIFICATIONS đã được cấp

### Lỗi: Expo Router không hoạt động

Kiểm tra `package.json`:

```json
{
  "main": "expo-router/entry"
}
```

### Lỗi: Chart không hiển thị

```bash
npm install react-native-svg@15.8.0
npx expo start -c
```

## 📦 Build Production

### Setup EAS Build

```bash
# Cài đặt EAS CLI
npm install -g eas-cli

# Đăng nhập
eas login

# Cấu hình project
eas build:configure
```

### Build cho Android

```bash
# Development build
eas build --profile development --platform android

# Production build (APK)
eas build --profile preview --platform android

# Production build (AAB for Play Store)
eas build --platform android
```

### Build cho iOS

```bash
# Development build
eas build --profile development --platform ios

# Production build
eas build --platform ios
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run linter
npm run lint
```

## 📝 Changelog

### Version 1.0.0 (2025-01-13)

- ✨ Initial release
- ⏱️ Basic timer functionality
- 📊 History tracking với charts
- ⚙️ Customizable settings
- 🔔 Local notifications
- 📳 Haptic feedback
