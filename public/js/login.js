
// Lấy form qua ID
const loginForm = document.getElementById('loginForm');

// Lắng nghe sự kiện submit
loginForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Ngăn chuyển hướng mặc định

    // Lấy dữ liệu từ form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kiểm tra dữ liệu (nếu cần)
    if (!email || !password) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }

    // Xử lý dữ liệu (giả lập xử lý)
    console.log('Email:', email);
    console.log('Password:', password);

    // Hiển thị thông báo thành công
    alert('Đăng nhập thành công!');
});
