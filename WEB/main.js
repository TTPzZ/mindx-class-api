
function xemBangXepHang() { // đọc dữ liệu từ database
    fetch('https://mindx-class-api.vercel.app/api')// api dùng chung để lấy dữ liệu từ database
        .then(response => response.json())
        .then(danhSachTop10  => { // danhSachTop10 là mảng chứa dữ liệu từ database do mình tự đặt
        danhSachTop10.sort((a, b) => b.score - a.score);// sắp xếp theo điểm từ cao xuống thấp
        let khungDanhSach = document.getElementById("danh_sach_top");
        khungDanhSach.innerHTML = "";
        for (let i = 0; i < danhSachTop10.length; i++) {
            let nguoi = danhSachTop10[i];
            khungDanhSach.innerHTML += "<li>Top " + (i + 1) + ": " + nguoi.name + " (" + nguoi.score + " điểm)</li>";
        }
    });
}
function luuDiemLenMang() { // ghi dữ liệu lên database
    let tenNguoiChoi = document.getElementById("o_nhap_ten").value;
    let diemCuaGame = document.getElementById("o_nhap_diem").value;
    fetch('https://mindx-class-api.vercel.app/api', {
        method: 'POST', // ghi bằng phương thức POST 
        headers: {
            'Content-Type': 'application/json'// định dạng dữ liệu gửi đi là JSON
        },
        body: JSON.stringify({
            id_class:"JSA17-Tên Mình",// định danh người sử dụng 
            name: tenNguoiChoi,
            score: diemCuaGame,
        })
    })
    .then(response => response.json())
    .then(ketQua => {
        alert("Đã lưu điểm lên hệ thống!"); 
    })
    .catch (error => {
        alert("Lưu điểm thất bại!"); 
    });
}

function tao_tai_khoan() { // ghi dữ liệu lên database
    let tenNguoiChoi = document.getElementById("o_nhap_ten").value;
    let diemCuaGame = document.getElementById("o_nhap_mat_khau").value;
    fetch('https://mindx-class-api.vercel.app/api', {
        method: 'POST', // ghi bằng phương thức POST 
        headers: {
            'Content-Type': 'application/json'// định dạng dữ liệu gửi đi là JSON
        },
        body: JSON.stringify({
            id_class:"JSA17-JSA17",// định danh người sử dụng 
            name: tenNguoiChoi,
            password: diemCuaGame,
        })
    })
    .then(response => response.json())
    .then(ketQua => {
        alert("Đã tạo tài khoản thành công!"); 
    })
    .catch (error => {
        alert("Tạo tài khoản thất bại!"); 
    });
}

function login() {
    let username = document.getElementById("o_nhap_ten").value;
    let password = document.getElementById("o_nhap_mat_khau").value;
    fetch('https://mindx-class-api.vercel.app/api')
    .then(response => response.json())
    .then(users => {
        let user = users.find(u => u.name === username && u.password === password);
        console.log(users);
        if (user){
            alert("Đăng nhập thành công!");
        }
        else {
            alert("Tên người dùng hoặc mật khẩu không đúng!");
        }

    })
}