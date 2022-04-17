---
title: 'Hàm bạn và lớp bạn trong C++'
date: '2020-04-05'
lastmod: '2020-04-05'
draft: false
tags: ['lap-trinh', 'lap-trinh-c++']
images: ['/static/thumbnails/2020/Ham-ban-va-lop-ban-trong-c++.jpg']
authors: ['khiemle']
layout: PostLayout
summary: 'Nếu như bạn đã học lập trình hướng đối tượng trong C++ thì chắc bạn bạn không thể nào không học về hàm bạn và lớp bạn trong C++. Trong bài viết này mình sẽ giới thiệu cho các bạn về hàm bạn và lớp bạn trong C++.'
---

![Hàm bạn và lớp bạn trong C++](/static/thumbnails/2020/Ham-ban-va-lop-ban-trong-c++.jpg)

# Đặt vấn đề

Giả sử bạn có hai class là MyClass1 và MyClass2, không dùng getter và setter, bạn hãy giải quyết hai vấn đề sau:

- Truy cập thành phần private hoặc protected của hai class trên trong một hàm khác không phải thành phần của hai class đó.
- Truy cập thành phần private hoặc protected của MyClass1 từ thành phần của class MyClass2.

Nhìn qua có vẻ khó nhưng nếu bạn biết được hàm bạn và lớp bạn thì mọi chuyện sẽ cực kỳ đơn giản.

# Hàm bạn

Hàm bạn (friend function) là hàm có thể truy cập thành phần private hoặc protected của lớp xem nó là bạn.

Giả sử mình có class MyClass và hàm myFunc như sau:

```cpp
class MyClass
{
private:
    int _privateProp;

public:
    MyClass(int n) // constructor
    {
        this->_privateProp = n;
    }
};

void myFunc(MyClass mClass)
{
    cout << mClass._privateProp; // Không hợp lệ
}
```

Như bạn thấy trong đoạn code trên, dòng in ra giá trị thuộc tính \_privateProp là không hợp lệ do nó là thuộc tính private và không được phép truy cập từ bên ngoài. Tuy nhiên mọi chuyện sẽ khác nếu hàm myFunc là hàm bạn của lớp MyClass.

Để khai báo hàm bạn, ta có cú pháp như sau:

```cpp
class <ClassName>
{
    // properties & methods
    friend <return_type> <func_name>([<parameters>]);
};
```

Chỉ đơn giản như bạn khai báo function prototype và thêm từ khóa friend ở phía trước. Vậy thì đối với ví dụ của mình thì sẽ thêm như sau:

```cpp
class MyClass
{
    // properties & methods
    friend void myFunc(MyClass);
};
```

**Lưu ý**: nhiều bạn thường nhầm hàm myFunc là thành phần của class MyClass. Hàm myFunc **không phải** là thành phần của lớp MyClass, nó chỉ là một hàm bình thường (không hề có toán tử phạm vi `::` trước tên hàm).

Bây giờ thì hàm myFunc đã là hàm bạn của lớp MyClass, do đó đoạn code in giá trị thuộc tính \_privateProp sẽ hợp lệ. VÍ dụ hoàn chỉnh như sau:

```cpp
#include <iostream>
using namespace std;

class MyClass
{
private:
    int _privateProp;

public:
    MyClass(int n)
    {
        this->_privateProp = n;
    }

    friend void myFunc(MyClass);
};

void myFunc(MyClass mClass)
{
    cout << mClass._privateProp;
}

int main()
{
    MyClass mClass(2409);
    myFunc(mClass); // in ra màn hình 2409
    return 0;
}
```

Như vậy vấn đề đầu tiên đã được giải quyết, giờ chúng ta hãy đến với vấn đề thứ hai.

# Lớp bạn

Lớp bạn (friend class) là lớp có thể truy cập các thành phần private hoặc protected của lớp xem nó là bạn.

Giả sử mình có hai class như sau:

```cpp
class MyClass1
{
private:
    int _privateProp;

public:
    MyClass1(int n)
    {
        this->_privateProp = n;
    }
};

class MyClass2
{
private:
    int _privateProp;

public:
    MyClass2(int n) // constructor
    {
        this->_privateProp = n;
    }

    void myMethod(MyClass1 mClass)
    {
        cout << mClass._privateProp; // Không hợp lệ
    }
};
```

Trong đoạn code trên, dòng in giá trị thuộc tính \_privateProp trong phương thức myMethod của lớp MyClass2 không hợp lệ do ta không thể truy cập thành phần private hoặc protected từ bên ngoài class.

Để phương thức myMethod có thể truy cập được thành phần private, protected của lớp MyClass1, hay tổng quát hơn là để lớp MyClass2 có thể truy cập thành phần private, protected của lớp MyClass1, ta sử dụng cú pháp:

```cpp
class <ClassName>
{
    // properties & methods
    friend class <friendClass>;
}
```

Quay trở lại với ví dụ, chúng ta chỉ cần thêm như sau để đoạn code hợp lệ:

```cpp
class MyClass1
{
    // properties & methods
    friend class MyClass2;
}
```

Như vậy, lớp MyClass2 đã là lớp bạn của lớp MyClass1, vậy phương thức myMethod của lớp MyClass2 sẽ có quyền truy cập các thành phần private, protected của lớp MyClass1 một cách hợp lệ. Và đây là toàn bộ ví dụ:

```cpp
#include <iostream>
using namespace std;

class MyClass1
{
private:
    int _privateProp;

public:
    MyClass1(int n)
    {
        this->_privateProp = n;
    }

    friend class MyClass2;
};

class MyClass2
{
private:
    int _privateProp;

public:
    MyClass2(int n)
    {
        this->_privateProp = n;
    }

    void myMethod(MyClass1 mClass)
    {
        cout << mClass._privateProp;
    }
};

int main()
{
    MyClass1 mClass1(2409);
    MyClass2 mClass2(2001);
    mClass2.myMethod(mClass1); // in ra màn hình 2409
    return 0;
}
```

Như vậy, chúng ta đã giải quyết được vấn đề thứ hai ở phần đặt vấn đề đã đưa ra.

**Lưu ý**: lớp bạn là mối quan hệ một chiều, có nghĩa là lớp này có thể xem lớp kia là bạn, nhưng không có nghĩa lớp kia xem lớp này là bạn. Trong ví dụ trên, lớp MyClass1 xem lớp MyClass2 là bạn nhưng không có nghĩa là lớp MyClass2 xem lớp MyClass1 là bạn (nếu muốn, bạn phải khai báo lớp bạn tương tự cho lớp MyClass2).

# Tổng kết

Vậy là qua bài viết này, mình đã giới thiệu đến các bạn hàm bạn và lớp bạn trong C++. Nếu các bạn thấy hay, đừng quên đăng ký nhận thông báo mới nhất và chia sẻ để bạn bè cùng biết. Cảm ơn các bạn đã đọc bài viết!
