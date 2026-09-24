# RobinLibCal - Cyberpunk Room Booking App

[![Live Demo](https://img.shields.io/badge/Live_Demo-TruongCongThanh_RobinLab-00ffcc?style=for-the-badge&logo=netlify)](https://truongcongthanh-robinlab.netlify.app/)

## 📖 Giới thiệu
RobinLibCal (Robin Spaces) là một ứng dụng đặt phòng (Room/Lab Booking) đa nền tảng mang đậm phong cách Cyberpunk và Sci-Fi. Ứng dụng cung cấp trải nghiệm hiện đại với nền không gian 3D có thể tương tác trực tiếp bằng con trỏ chuột.

🌍 **Trải nghiệm trực tiếp phiên bản Web tại:** [https://truongcongthanh-robinlab.netlify.app/](https://truongcongthanh-robinlab.netlify.app/)

## ✨ Tính năng nổi bật
- 🌌 **Giao diện Sci-Fi / Cyberpunk:** Thiết kế UI/UX không gian ảo với hiệu ứng hạt (Particle Background) 3D sống động.
- 🏢 **Quản lý Nodes / Trạm làm việc:** Xem danh sách các "Terminal" (Phòng Lab, Phòng Học), kiểm tra sức chứa và trạng thái theo thời gian thực (SYNCED - Trống / OFFLINE - Đã đặt).
- 🔒 **Hệ thống xác thực:** Mô phỏng bảng điều khiển tương lai, cho phép nhập User ID để "chiếm quyền" (đặt phòng) với hiệu ứng làm mờ (Blur) và chuyển động mượt mà.
- 📱 **Đa nền tảng:** Codebase dùng chung hoạt động trơn tru trên cả Web, iOS và Android.

## 🛠️ Công nghệ sử dụng
- **Framework:** [React Native](https://reactnative.dev/) & [Expo](https://expo.dev/)
- **Navigation:** React Navigation (Native Stack)
- **Đồ họa 3D:** [React Three Fiber](https://docs.pmnd.rs/react-three-fiber/) & Three.js
- **UI & Hiệu ứng:** Expo Blur, React Native Reanimated
- **Deploy:** Netlify

## 💻 Hướng dẫn chạy dự án cục bộ (Local Setup)

Nếu bạn muốn chạy dự án này trên máy tính cá nhân, hãy làm theo các bước sau:

**Bước 1: Clone dự án**
\`\`\`bash
git clone https://github.com/TenCuaBan/RobinLibCal.git
cd RobinLibCal
\`\`\`

**Bước 2: Cài đặt các thư viện phụ thuộc**
\`\`\`bash
npm install
# hoặc dùng yarn/bun
\`\`\`

**Bước 3: Khởi động máy chủ phát triển**
\`\`\`bash
npx expo start
\`\`\`
Sau đó, bạn có thể quét mã QR bằng ứng dụng Expo Go trên điện thoại, hoặc nhấn phím `w` để mở trên trình duyệt web cục bộ.
