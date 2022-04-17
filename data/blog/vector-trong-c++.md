---
title: 'Vector trong C++'
date: '2020-03-24'
lastmod: '2020-03-24'
draft: false
tags: ['lap-trinh', 'lap-trinh-c++']
images: ['/static/thumbnails/2020/Vector-trong-c++.jpg']
authors: ['khiemle']
layout: PostLayout
summary: 'Vector là một lớp định nghĩa sẵn trong C++, cung cấp các thao tác giúp bạn dễ dàng quản lý và thao tác với mảng động trong C++. Trong bài viết này chúng ta sẽ tìm hiểu cách sử dụng vector trong C++.'
---

![Vector trong C++](/static/thumbnails/2020/Vector-trong-c++.jpg)

# Vector là gì và tại sao nên dùng vector?

Bạn đã bao giờ phát chán việc quản lý mảng động qua con trỏ trong C++ chưa? Hay việc mỗi khi bạn muốn resize kích thước mảng động trong C++, bạn phải tạo mảng mới, copy các phần tử qua mảng mới, rồi lại xóa mảng cũ đi. Quá phiền phức, tốn quá nhiều thời gian, vì thế mà C++ còn cung cấp cho chúng ta một kiểu nữa đó chính là kiểu vector. Vậy thì vector là gì?

Vector là một chuỗi các phần tử có cùng kiểu dữ liệu, cũng giống như mảng bình thường trong C++. Vậy thì tại sao phải dùng nó?

Đầu tiên, vector có thể tự tăng kích thước của nó mỗi khi ta thực hiện thêm một phần tử vào vector. Thứ 2, vector có thể tự giải phóng bộ nhớ khi ta thực hiện xong đoạn code và thoát ra khỏi scope chứa vector đó, việc này nhầm tránh rò rỉ bộ nhớ khi ta quên delete\[\] như con trỏ. Thứ ba là vector cung cấp các hàm cần thiết để chúng ta cho thể thao tác với mảng một cách dễ dàng.

# Cú pháp khai báo và các hàm cơ bản

Với quá nhiều lợi ích của vector thì việc gì chúng ta phải xử dụng mảng động để quản lý cho mất công đúng không nào! Hãy cùng tìm hiểu về cách sử dụng vector ngay sau đây.

## Khai báo vector

Để sử dụng vector bạn cần thêm thư viện vector trước. Cú pháp khai báo một vector như sau:

```cpp
#include <vector>
//...
vector<[kiểu_dữ_liệu]> tên_vector;
```

Vậy là chúng ta đã có một vector với mỗi phần tử có kiểu dữ liệu là \[kiểu_dữ_liệu\]. Bạn có thể gán giá trị trực tiếp cho vector ngay khi khởi tạo như ví dụ sau:

```cpp
vector<int> arr = {1, 2, 3};
// tạo một vector có ba phần tử là 1, 2, 3
```

Bạn cũng có thể khởi tạo một vector và gán giá trị một vector khác cho nó như sau:

```cpp
vector<int> A = {1, 2, 3};
vector<int> B = A;
// B cũng sẽ mang giá trị của A là {1, 2, 3}
```

## Truy xuất phần tử của vector

Truy xuất phần tử trong vector có thể được thực hiện qua hai cách là qua phương thức at() hoặc qua dấu \[\] như mảng thông thường.

```cpp
vector<int> arr = {1, 2, 3};
cout << arr.at(2); // được 3 vì vị trí số 2 chính là 3
// Hoặc
cout << arr[2]; // ta cũng được tương tự như trên
// gán phần tử
arr.at(0) = 0; // gán lại phần tử 0 bằng 0
// hoặc
arr[1] = 9; // gán lại phần tử 1 bằng 7
```

Cả hai cách đều có công dụng như nhau vậy thì sự khác nhau giữa chúng là gì? Chính là khả năng kiểm tra phạm vi. Đối với phương thức at(), bạn có thể dùng try catch để bắt lỗi như sau:

```cpp
vector<int> arr = {1, 2, 3};
try
{
	cout << arr.at(-1);
}
catch (const std::out_of_range& oor)
{
	std::cerr << "Out of Range error: " << oor.what() << '\n';
}
```

## Lấy phần tử đầu và cuối của vector

Để lấy phần tử đầu và cuối ta sử phương thức hàm font() và back().

```cpp
vector<int> arr = {1, 2, 3};
cout << arr.front(); // được phần tử đầu là 1
cout << arr.back(); // được phần tử cuối là 3
```

## Thêm phần tử vào cuối vector

Để thêm phần tử vào cuối vector ta sử dụng phương thức push_back().

```cpp
vector<int> arr = {1, 2, 3};
arr.push_back(4);
// Mảng sau khi thêm là {1, 2, 3, 4}
```

Lưu ý sau khi thêm vào thì size của vector sẽ tăng lên 1 và nếu size vượt quá capacity thì capacity cũng sẽ tự động được tăng lên. (size và capacity sẽ được trình bày bên dưới).

## Loại bỏ phần tử cuối vector

Để loại bỏ đi phần tử cuối cùng của vector, ta sử dụng phương thức pop_back().

```cpp
vector<int> arr = {1, 2, 3};
arr.pop_back(4);
// Mảng sau khi loại bỏ phần tử cuối là {1, 2, 3}
```

Lưu ý sau khi loại bỏ phần tử cuối thì size sẽ tự giảm xuống 1 nhưng capacity không thay đổi (size và capacity sẽ được trình bày bên dưới).

## Số phần tử của vector

Để biết được số phần tử của vector ta sử dụng phương thức size().

```cpp
vector<int> arr = {1, 2, 3};
cout << arr.size(); // ta sẽ được 3 vì vector có 3 phần tử
```

## Kích thước của vector

Để biết được kích thước của vector ta dùng phương thức capacity().

```cpp
vector<int> arr = {1, 2, 3};
cout << arr.capacity(); //  ta sẽ được 3 vì vector có kích thước là 3 phần tử
```

Có nhiều bạn bị nhầm giữa số lượng phần tử (size) và kích thước vector (capacity). Kích thước là số lượng phần tử nhiều nhất mà vector đó từng chứa còn số lượng phần tử là số lượng phần tử mà vector đó hiện tại đang chứa. Các bạn có thể xem ví dụ sau để hiểu thêm:

```cpp
vector<int> arr = {1, 2, 3};
cout << arr.size(); // được 3 vì vector đang chứa 3 phần tử
cout << arr.capacity(); // được 3 vì vector chứa nhiều nhất là 3 phần tử
arr.pop_back(); // lấy đi phần tử cuối
cout << arr.size(); // được 2 vì vector đang chứa 2 phần tử
cout << arr.capacity(); // vẫn được 3 vì vector này từng chứa nhiều nhất 3 phần tử
```

## Thay đổi số phần tử của vector

Bạn có thể dùng phương thức resize() để thay đổi số phần tử của vector.

```cpp
vector<int> arr = {1, 2, 3};
cout << arr.size(); // được 3 vì vector đang giữ 3 phần tử
arr.resize(1);
cout << arr.size(); // được 1 vì vector đã được resize về 1
```

Lưu ý là sau khi resize thì vector sẽ chỉ lấy đủ số phần tử đã set còn tất cả những phần tử sau sẽ bỏ đi.

```cpp
vector<int> arr = {1, 2, 3};
cout << arr.size(); // được 3 vì vector đang giữ 3 phần tử
arr.resize(1);
cout << arr.size(); // được 1 vì vector đã được resize về 1

// Xét ví dụ sau
cout << arr.at(2);
cout << arr[2];
// cả hai đều lỗi vì truy cập phần tử lớn hơn size của vector
```

## Xóa hết phần tử của vector

Để xóa tất cả các phần tử của vector ta dùng phương thức clear(). Sau khi xóa thì size cũng sẽ trở về 0.

```cpp
vector<int> arr = {1, 2, 3};
cout << arr.size(); // được 3
arr.clear();
cout << arr.size(); // được 0 vì đã xoá hết phần tử của vector
```

# Lời kết

Trên đây là bài viết vector trong C++ của mình, nếu có sai xót dì các bạn có thể comment bên dưới video để giúp mình sửa sai nha. Cảm ơn các bạn đã theo dõi bài viết!
