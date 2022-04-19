---
title: 'Đa hình trong C++'
date: '2020-06-01'
lastmod: '2020-06-01'
draft: false
tags: ['lap-trinh', 'lap-trinh-c++']
images:
  [
    '/static/thumbnails/2020/Da-hinh-trong-c++.jpg',
    '/static/images/2020/06/da-hinh-trong-c++/Polymorphism-Class-Diagram-1.jpg',
  ]
authors: ['khiemle']
layout: PostLayout
summary: 'Để tiếp nối chuỗi bài viết về lập trình hướng đối tượng trong C++, mình sẽ giới thiệu với các bạn về đa hình trong C++.'
---

![Đa hình trong C++](/static/thumbnails/2020/Da-hinh-trong-c++.jpg)

# Đa hình là gì?

Đa hình là một trong bốn tính chất đặc trưng của lập trình hướng đối tượng bên cạnh tính đóng gói, tính trừu tượng và tính kế thừa. Vậy thì đa hình là gì?

Đa hình (polymorphism) là hiện tượng mà các đối tượng thuộc các class khác nhau có thể biểu diễn cùng một thông thiệp theo các cách khác nhau. Hơi nặng về lý thuyết một chút nhưng xem ví dụ sau bạn sẽ rõ ngay!

Ví dụ hai con vật là con chó và con mèo, hai con vật này đều có thể phát ra tiếng nhưng con mèo sẽ kêu "meo meo" còn con chó lại sủa "gâu gâu". Hành động phát ra tiếng này tuy là một hành động nhưng khi được 2 đối tượng khác nhau là chó và mèo thực hiện thì lại khác nhau.

Trước khi đi vào chi tiết, hãy chắc chắn rằng bạn đã nắm được các kiến thức sau:

- _Con trỏ và cấp phát động trong C++_[^pointer_in_c++]
- _Cơ bản về Class trong C++_[^class_in_c++]
- _Kế thừa trong C++_[^inherit_in_c++]
- _Vector trong C++_[^vector_in_c++]

# Các loại đa hình

Có hai loại đa hình, một là Compile time Polymorphism và Runtime Polymorphism. Compile time Polymorphism nghĩa là cách mà đối tượng thực hiện thông điệp được xác định ngay lúc biên dịch chương trình. Ví dụ cơ bản của Compile time Polymorphism là Overriding và Overloading.

Khi bạn overloading, các hàm đó sẽ có cùng tên nhưng khác tham số, đó chính là đa hình, cùng là một hàm nhưng với các đối tượng là các tham số khác nhau thì hành động thực hiện cũng sẽ khác nhau. Tương tự với overriding, phương thức ở class cơ sở bị override ở class dẫn xuất, điều đó làm cho tuy cùng một phương thức nhưng đối tượng thuộc class cơ sở sẽ thực hiện khác đối tượng thuộc class dẫn xuất.

Đối với Runtime Polymorphism, cách mà đối tượng thực hiện thông điệp không được xác định lúc biên dịch mà nó chỉ được xác định khi chương trình được thực thi. Sử dụng lại ví dụ ban đầu, vẫn là hành động phát ra tiếng của chó và mèo, tuy nhiên, bạn sẽ không thể biết thực hiện như thế nào cho đến khi biết đối tượng là con chó hay mèo để thực hiện kêu "meo meo" hay là sủa "gâu gâu".

Compile time Polymorphism thì chắc các bạn cũng đã quá quen thuộc rồi, trong bài viết này, mình sẽ chỉ giới thiệu Runtime Polymorphism thôi.

# Lợi ích của đa hình

Như định nghĩa của đa hình, đa hình thực hiện cùng một thông điệp theo các cách khác nhau, do đó, code của chúng ta sẽ không bị lặp.

Ví dụ mình có bài toán công ty quản lý hai loại nhân viên là nhân viên văn phòng (NVVP) và nhân viên sản xuất (NVSX), mình sẽ cho người dùng nhập nhân nhiên và tính lương sau đó xuất ra. Mình sẽ có sơ đồ class như sau:

<p align="center">
  <img src="/static/images/2020/06/da-hinh-trong-c++/Polymorphism-Class-Diagram-1.jpg" alt="Sơ đồ Class"/>
</p>

Sơ đồ Class

Dựa trên sơ đồ đã xây dựng, mình sẽ code các class như sau:

```cpp
class NhanVien
{
protected:
    string hoTen;
    float luong;

public:
    NhanVien()
    {
        this->hoTen = "";
        this->luong = 0.0;
    }

    void nhap()
    {
        cout << "Ho ten: ";
        cin.ignore();
        getline(cin, this->hoTen);
    }

    void xuat()
    {
        cout << "Ho ten: ";
        cout << this->hoTen << endl;
    }

    void tinhLuong() {}
};
```

```cpp
class NhanVienSanXuat : public NhanVien
{
private:
    int soSanPham;
    float tienCong1SP;

public:
    NhanVienSanXuat() : NhanVien()
    {
        this->soSanPham = 0;
        this->tienCong1SP = 0;
    }

    void nhap()
    {
        NhanVien::nhap();
        cout << "So san pham: ";
        cin >> this->soSanPham;
        cout << "Tien cong 1 san pham: ";
        cin >> this->tienCong1SP;
    }

    void xuat()
    {
        cout << "So san pham: ";
        cout << this->soSanPham << endl;
        cout << "Tien cong 1 san pham: ";
        cout << this->tienCong1SP << endl;
        cout << "Luong: ";
        cout << this->luong << endl;
    }

    void tinhLuong()
    {
        this->luong = this->soSanPham * this->tienCong1SP;
    }
};
```

```cpp
class NhanVienVanPhong : public NhanVien
{
private:
    float luongCoBan;
    int soNgayLamViec;

public:
    NhanVienVanPhong() : NhanVien()
    {
        this->luongCoBan = 0.0;
    }

    void nhap()
    {
        NhanVien::nhap();
        cout << "Luong co ban: ";
        cin >> this->luongCoBan;
        cout << "So ngay lam viec: ";
        cin >> this->soNgayLamViec;
    }

    void xuat()
    {
        NhanVien::xuat();
        cout << "Luong co ban: ";
        cout << this->luongCoBan << endl;
        cout << "So ngay lam viec: ";
        cout << this->soNgayLamViec << endl;
        cout << "Luong: ";
        cout << this->luong << endl;
    }

    void tinhLuong()
    {
        this->luong = this->soNgayLamViec * this->luongCoBan;
    }
};
```

```cpp
class CongTy
{
private:
    vector<NhanVienVanPhong> NVVP;
    vector<NhanVienSanXuat> NVSX;

public:
    void nhap()
    {
        cout << "Nhap so nhan vien van phong: ";
        int n;
        cin >> n;
        for (int i = 0; i < n; i++)
        {
            NhanVienVanPhong nv;
            nv.nhap();
            this->NVVP.push_back(nv);
        }

        cout << "Nhap so nhan vien san xuat: ";
        int m;
        cin >> m;
        for (int i = 0; i < m; i++)
        {
            NhanVienSanXuat nv;
            nv.nhap();
            this->NVSX.push_back(nv);
        }
    }

    void xuat()
    {
        cout << "Nhan vien van phong:" << endl;
        for (int i = 0; i < this->NVVP.size(); i++)
        {
            cout << "STT:" << i + 1 << endl;
            this->NVVP.at(i).xuat();
        }

        cout << "Nhan vien san xuat:" << endl;
        for (int i = 0; i < this->NVSX.size(); i++)
        {
            cout << "STT:" << i + 1 << endl;
            this->NVSX.at(i).xuat();
        }
    }

    void tinhLuong()
    {
        for (int i = 0; i < this->NVVP.size(); i++)
            this->NVVP.at(i).tinhLuong();
        for (int i = 0; i < this->NVSX.size(); i++)
            this->NVSX.at(i).tinhLuong();
    }
};
```

Nhìn vào những đoạn code trên, bạn có thể dễ dàng nhận ra rằng, tuy đều là hành động nhập, xuất và tính lương, tuy nhiên chúng ta lại phải gọi phương thức này cho 2 đối tượng thuộc kiểu khác nhau là NVVP và NVSX. Còn một điều nữa là tuy đều là nhân viên nhưng lại phải dùng 2 vector khác nhau để lưu trữ 2 đối tượng này.

Câu hỏi đặt ra là liệu có cách nào để có thể lưu trữ 2 loại nhân viên này trong cùng một vector? Và phương thức nhập, xuất, tính lương có thể tự động biết nó thực hiện hành động cho đối tượng nào để thực hiện cho đúng không? Câu trả lời là có và nó được thực hiện thông qua phương thức ảo. Vậy thì hãy cùng tìm hiểu phương thức ảo là gì?

# Phương thức ảo

Phương thức ảo (virtual method) trong C++ là cách thể hiện tính đa hình trong lập trình hướng đối tượng của C++, các phương thức ở class cơ sở có tính đa hình phải được định nghĩa là một phương thức ảo.

Và để khai báo một phương thức ảo, ta khai báo như bình thường nhưng thêm từ khóa "virtual" phía trước.

```cpp
class <ClassName>
{
protected:
    virtual <returnType> <methodName>([<params>]) {}
};
```

Ví dụ như trong bài toán ở trên, các phương thức tính lương, nhập và xuất đều có tính đa hình do đối với hai đối tượng NVSX và NVVP thì sẽ có cách thực hiện phương thức khác nhau. Do đó, mình sẽ chỉnh sửa 3 phương thức này ở class dẫn xuất thành phương thức ảo như sau:

```cpp
class NhanVien
{
public:
    virtual void nhap()
    {
        // code goes here...
    }

    virtual void xuat()
    {
        // code goes here...
    }

    virtual void tinhLuong()
    {
        // code goes here...
    }
};
```

Chúng ta đã có các phương thức ảo, vậy vấn đề hiện tại là làm sao để chương trình biết phương thức của đối tượng nào để thực hiện cho đúng? Thì trong C++, tính đa hình được thể hiện thông qua tham chiếu và con trỏ. Cụ thể như sau:

Đối với tham chiếu, đối tượng tham chiếu của class cơ sở có thể tham chiếu đến đối tượng thuộc class dẫn xuất. Lúc này, khi gọi phương thức ảo, chương trình sẽ gọi đúng phương thức của đối tượng mà biến tham chiếu tham chiếu tới. Ví dụ:

```cpp
NhanVienVanPhong nvvp;
NhanVien &nv = nv; // biến nv tham chiếu đến biến nvvp

nv.nhap(); // Phương thức được gọi là sẽ phương thức nhập của class NhanVienVanPhong
```

Do để tham chiếu đến một biến, bắt buộc biến kia phải tồn tại trước, do đó cách tham chiếu rất ít khi được sử dụng mà thay vào đó, người ta sẽ dùng con trỏ.

Trong bài [Kế thừa trong C++](https://khiemle.dev/ke-thua-trong-cpp/), mình đã có nói con trỏ của class cơ sở có thể trỏ đến đối tượng của class dẫn xuất, tính đa hình trong C++ chủ yếu đều thể hiện qua cách này. Cũng tương tự như việc tham chiếu, thực hiện qua con trỏ như sau:

```cpp
NhanVien *nv = new NhanVienVanPhong; // con trỏ nv trỏ tới biến động kiểu NhanVienVanPhong

nv->nhap(); // Phương thức được gọi là sẽ phương thức nhập của class NhanVienVanPhong
```

Quay trở lại với bài toán ban đầu, giờ đây chúng ta đã có thể trả lời hai câu hỏi. Để lưu trữ 2 đối tượng mà chỉ dùng một vector chúng ta sẽ sử dụng con trỏ trỏ đến đối tượng thuộc class dẫn xuất. Các phương thức có thể được gọi theo đúng đối tượng thông qua con trỏ mà vector lưu trữ. Bây giờ chúng ta sẽ sửa lại như sau:

```cpp
// Thay
vector<NhanVienVanPhong> NVVP;
vector<NhanVienSanXuat> NVSX;
// ở class CongTy Bằng
vector<NhanVien *> NV;
```

Do thuộc tính thay đối, các phương thức có liên quan cũng thay đổi theo, ta sẽ sửa lại các phương thức của class CongTy không cần thực hiện trên hai vector khác nhau, hai đối tượng khác nhau nữa, chúng ta sẽ sử dụng tính đa hình, code như sau:

```cpp
void nhap()
{
    cout << "Nhap so nhan vien: ";
    int n;
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cout << "Nhan vien van phong (1), nhan vien san xuat (2): ";
        int k;
        cin >> k;
        NhanVien *nv;
        // Tùy vào người dùng chọn đối tượng nào để nhập
        if (k == 1)
            nv = new NhanVienVanPhong;
        else
            nv = new NhanVienSanXuat;
        nv->nhap(); // ta sẽ sử dụng hàm nhập của đối tượng mà người dùng chọn
        this->NV.push_back(nv);
    }
}

void xuat()
{
    cout << "Nhan vien van phong:" << endl;
    for (int i = 0; i < this->NV.size(); i++)
    {
        cout << "STT:" << i + 1 << endl;
        this->NV.at(i)->xuat(); // tùy vào đối tượng là gì mà phương thức xuất sẽ được gọi theo đúng đối tượng đó
    }
}

void tinhLuong()
{
    for (int i = 0; i < this->NV.size(); i++)
        this->NV.at(i)->tinhLuong(); // tùy vào đối tượng là gì mà phương thức tính lương sẽ được gọi theo đúng đối tượng đó
}
```

Cơ chế hoạt động của phương thức ảo là dựa trên liên kết động, có thể hiểu liên kết động là đối tượng không được xác định cụ thể khi biên dịch mà chỉ được xác định trong lúc chương trình thực thi.

Nói qua một chút về cách sử dụng tính đa hình với hàm. Giả sử mình muốn tính lương độc lập cho một nhân viên, không cụ thể nhân viên nào mà sẽ tùy thuộc vào nhân viên bạn muốn tính, mình sẽ viết hàm như sau:

```cpp
// Cách 1: tham chiếu
void tinhLuong(NhanVien &nv)
{
    nv.tinhLuong();
}

// Cách 2: con trỏ (nên dùng)
void tinhLuong(NhanVien *nv)
{
   nv->tinhLuong();
}
```

Rất tiện lợi phải không, thay vì việc phải viết hai hàm để gọi cho đúng phương thức theo từng đối tượng khác nhau.

**Lưu ý**: tính đa hình chỉ sử dụng được thông qua tham số là tham chiếu hoặc con trỏ, nếu bạn sử dụng một tham số bình thường, phương thức của class cơ sở sẽ được gọi vì về bản chất nó là một đối tượng thuộc kiểu class cơ sở.

```cpp
void tinhLuong(NhanVien nv)
{
    nv.tinhLuong(); // tham số nv thuộc class NhanVien nên phương thức tính lương của class NhanVien sẽ được gọi
}
```

# Phương thức thuần ảo

Nếu như phân tích kỹ thêm một chút, bạn sẽ thấy là class nhân viên thì phương thức tính lương không có bởi vì ta không thể tính lương cho một nhân viên mà không biết là nhân viên gì. Các class dẫn xuất của nó là một cụ thể hóa của class cơ sở nhân viên, nên ta có thể tính lương được, ta biết cách tính cho từng loại nhân viên như thế nào.

Từ những điều trên, ta có khái niệm phương thức thuần ảo. Phương thức thuần ảo (pure virtual method) là phương thức ảo không có phần định nghĩa và bắt buộc phải được override ở class dẫn xuất. Để khai báo phương thức thuần ảo, ta cũng khai báo tương tự như phương thức ảo nhưng thay vì định nghĩa phần thân hàm, ta sẽ cho nó bằng 0.

```cpp
class <ClassName>
{
public:
    virtual <returnType> <methodName>([<params>]) = 0;
};
```

Quay lại với bài toán của chúng ta, class nhân viên sẽ không cần có hàm tính lương cụ thể do ta không biết tính như thế nào khi không xác định được loại nhân viên. Và ở class dẫn xuất, chúng ta cần có cách tính lương khác nhau cho mỗi loại nhân viên, từ đó suy ra phương thức tính lương sẽ là phương thức thuần ảo. Chúng ta sẽ sửa lại như sau:

```cpp
class NhanVien
{
public:
    // code goes here...
    virtual void tinhLuong() = 0;
};
```

Khi mà phương thức tính lương trở thành thuần ảo, ở class dẫn xuất bắt buộc cần phải override lại phương thức này. Chúng ta vẫn thực hiện override bình thường. Do ở class dẫn xuất mình đã override rồi nên không cần sửa gì cả.

# Lớp trừu tượng

Lớp trừu tượng (abstract class) là một class chứa phương thức thuần ảo, không thể tạo một đối tượng thuộc lớp trừu tượng. Điều này hiển nhiên, bởi vì nếu class chứa một hoặc nhiều phương thức ảo, khi đối tượng được tạo thì phương thức đó sẽ không có định nghĩa và sẽ gây lỗi.

Một lớp trừu tượng phải có ít nhất một phương thức thuần ảo và nó có thể cùng có các phương thức và phương thức ảo khác. Các phương thức và phương thức ảo thuộc lớp trừu tượng vẫn có thể được gọi từ class dẫn xuất qua toán tử phạm vi (::) như bình thường.

Lớp trừu tượng làm cho logic thực tế trở nên hợp lý hơn trong lập trình. Như đã nói ở trên, bạn không thể tính lương khi không biết nhân viên đó là nhân viên gì, do đó, theo logic, ta không thể tạo đối tượng nhân viên được. Hay nói đúng hơn, ta không nên cho phép người lập trình có thể tạo ra đối tượng nhân viên bằng cách làm cho lớp đó trở thành lớp thuần ảo.

Vì phương thức nhập, xuất vẫn không cần override lại hoàn toàn, do đó mình sẽ giữ nguyên, chỉ đổi phương thức tính tiền thành phương thức thuần ảo thôi.

```cpp
class NhanVien
{
public:
    // Code goes here...
    virtual void tinhLuong() = 0;
};
```

Lúc này, bất kỳ class nào kế thừa từ class nhân viên đều phải override lại phương thức tính lương. Và bạn cũng không thể tạo được đối tượng nhân viên nữa. Ví dụ:

```cpp
class NhanVienKiemToan : public NhanVien
{
public:
    void tinhLuong() // override method tinhLuong
    {
        // Nếu không override sẽ nhận thông báo lỗi
    }
};
```

```cpp
NhanVien nx; // lỗi vì không thể tạo đối tượng thuộc abstract class
```

Lưu ý là con trỏ class nhân viên vẫn có thể tạo được bình thường (nếu không thì sao sử dụng được đa hình :D).

# Interface

Phần này giới thiệu thêm cho các bạn thôi bởi vì trong C++ không hỗ trợ sẵn concept interface, các bạn nên tìm hiểu concept của các ngôn ngữ hiện đại khác như C#, Java... Tuy nhiên ta vẫn có thể sử dụng concept của các ngôn ngữ khác cho C++.

Interface có thể được hiểu là một class trừu tượng hoàn toàn, nghĩa là mọi phương thức của interface đều là phương thức thuần ảo và bạn sẽ cần phải override lại tất cả các phương thức của interface ở class dẫn xuất. Ví dụ:

```cpp
class Animal // Animal là một Interface
{
protected:
    string sound;
public:
    virtual void move() = 0;
    virtual void makeNoise() = 0;
    virtual void eat() = 0;
};

// Class kế thừa từ Animal đều phải override toàn bộ
class Dog
{
public:
    Dog()
    {
        sound = "Woo - Woo!";
    }
    virtual void move()
    {
        // code goes here...
    }

    virtual void makeNoise()
    {
        // code goes here...
    }

    virtual void eat()
    {
        // code goes here...
    }
};
```

# Tổng kết

Vậy là trong bài viết này, mình đã giới thiệu cho các bạn về tính đa hình trong C++ và các vấn đề liên quan như phương thức ảo, thuần ảo, lớp trừu tượng và interface. Hy vọng là bài viết có ích với mọi người, đừng quên chia sẻ bài viết để mọi người cùng biết nha. Nếu có bất kỳ thắc mắc nào các bạn hãy để lại comment phía bên dưới mình sẽ phản hồi. Cảm ơn các bạn đã theo dõi bài viết!

# Source Code

```cpp
#include <iostream>
using namespace std;

#include <vector>
#include <string>

class NhanVien
{
protected:
    string hoTen;
    float luong;

public:
    NhanVien()
    {
        this->hoTen = "";
        this->luong = 0.0;
    }

    virtual void nhap()
    {
        cout << "Ho ten: ";
        cin.ignore();
        getline(cin, this->hoTen);
    }

    virtual void xuat()
    {
        cout << "Ho ten: ";
        cout << this->hoTen << endl;
    }

    virtual void tinhLuong() = 0;
};

class NhanVienSanXuat : public NhanVien
{
private:
    int soSanPham;
    float tienCong1SP;

public:
    NhanVienSanXuat() : NhanVien()
    {
        this->soSanPham = 0;
        this->tienCong1SP = 0;
    }

    void nhap()
    {
        NhanVien::nhap();
        cout << "So san pham: ";
        cin >> this->soSanPham;
        cout << "Tien cong 1 san pham: ";
        cin >> this->tienCong1SP;
    }

    void xuat()
    {
        cout << "So san pham: ";
        cout << this->soSanPham << endl;
        cout << "Tien cong 1 san pham: ";
        cout << this->tienCong1SP << endl;
        cout << "Luong: ";
        cout << this->luong << endl;
    }

    void tinhLuong()
    {
        this->luong = this->soSanPham * this->tienCong1SP;
    }
};

class NhanVienVanPhong : public NhanVien
{
private:
    float luongCoBan;
    int soNgayLamViec;

public:
    NhanVienVanPhong() : NhanVien()
    {
        this->luongCoBan = 0.0;
    }

    void nhap()
    {
        NhanVien::nhap();
        cout << "Luong co ban: ";
        cin >> this->luongCoBan;
        cout << "So ngay lam viec: ";
        cin >> this->soNgayLamViec;
    }

    void xuat()
    {
        NhanVien::xuat();
        cout << "Luong co ban: ";
        cout << this->luongCoBan << endl;
        cout << "So ngay lam viec: ";
        cout << this->soNgayLamViec << endl;
        cout << "Luong: ";
        cout << this->luong << endl;
    }

    void tinhLuong()
    {
        this->luong = this->soNgayLamViec * this->luongCoBan;
    }
};

class CongTy
{
private:
    vector<NhanVien *> NV;

public:
    void nhap()
    {
        cout << "Nhap so nhan vien: ";
        int n;
        cin >> n;
        for (int i = 0; i < n; i++)
        {
            cout << "Nhan vien van phong (1), nhan vien san xuat (2): ";
            int k;
            cin >> k;
            NhanVien *nv;
            // Tùy vào người dùng chọn đối tượng nào để nhập
            if (k == 1)
                nv = new NhanVienVanPhong;
            else
                nv = new NhanVienSanXuat;
            nv->nhap(); // ta sẽ sử dụng hàm nhập của đối tượng mà người dùng chọn
            this->NV.push_back(nv);
        }
    }

    void xuat()
    {
        cout << "Nhan vien van phong:" << endl;
        for (int i = 0; i < this->NV.size(); i++)
        {
            cout << "STT:" << i + 1 << endl;
            this->NV.at(i)->xuat(); // tùy vào đối tượng là gì mà phương thức xuất sẽ được gọi theo đúng đối tượng đó
        }
    }

    void tinhLuong()
    {
        for (int i = 0; i < this->NV.size(); i++)
            this->NV.at(i)->tinhLuong(); // tùy vào đối tượng là gì mà phương thức tính lương sẽ được gọi theo đúng đối tượng đó
    }
};

int main()
{
    CongTy cty;
    cty.nhap();
    cty.tinhLuong();
    cty.xuat();
    return 0;
}
```

[^pointer_in_c++]: [Con trỏ và cấp phát động trong C++](/blog/con-tro-va-cap-phat-dong-trong-c++)
[^class_in_c++]: [Cơ bản về Class trong C++](/blog/co-ban-ve-class-trong-c++)
[^inherit_in_c++]: [Kế thừa trong C++](/blog/ke-thua-trong-c++)
[^vector_in_c++]: [Vector trong C++](/blog/vector-trong-c++)
