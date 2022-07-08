---
title: Cơ bản về Class trong C++
date: '2020-03-25'
lastmod: '2020-03-25'
draft: false
tags: ['lap-trinh', 'lap-trinh-c++']
images: ['/static/thumbnails/2020/Co-ban-ve-class-trong-cpp.jpg']
authors: ['khiemle']
layout: PostLayout
summary: 'Tìm hiểu các khái niệm, kiến thức cơ bản về class trong C++. Thế nào là class, hàm dựng, thuộc tính và phương thức của class.'
---

![CoBanVeClassTrongC++](/static/thumbnails/2020/Co-ban-ve-class-trong-cpp.jpg)

# Class là gì?

Class hay lớp là một mô tả trừu tượng (abstract) của nhóm các đối tượng (object) có cùng bản chất, ngược lại mỗi một đối tượng là một thể hiện cụ thể (instance) cho những mô tả trừu tượng đó. Một class trong C++ sẽ có các đặc điểm sau:

- Một class bao gồm các thành phần dữ liệu (thuộc tính hay property) và các phương thức (hàm thành phần hay method).
- Class thực chất là một kiểu dữ liệu do người lập trình định nghĩa.
- Trong C++, từ khóa class sẽ chỉ điểm bắt đầu của một class sẽ được cài đặt.

Ví dụ về một class đơn giản, class Car. Một chiếc xe hơi vậy thì sẽ có chung những đặc điểm là đều có vô lăng, có bánh xe nhiều hơn 3, có động cơ... Đó là một class, một cái model hay mẫu mà người ta đã quy định là nếu đúng như vậy thì nó là xe hơi. Nhưng mà xe thì có thể có nhiều hãng khác nhau, BMW, Vinfast, Toyota... Thì mỗi hãng xe lại có những model xe khác nhau nhưng chúng đều là xe hơi. Vậy thì trong lập trình cũng vậy, class là quy định ra một mẫu, một cái model mà các thể hiện của nó (instance) hay đối tượng (object) phải tuân theo.

## Khai báo class và sử dụng class

Cú pháp khai báo một class cơ bản trong C++ như sau:

```cpp
class <ClassName> {
    <access_modifier>:
        <data_type> property;

        <return_type> <method_name>(arguments) {
            return <something_match_return_type>;
        }

        <_return_type> <_method_name>(_arguments);
};

<_return_type> <ClassName>::<_method_name>(_arguments) {
    return <something_match_return_type>;
}
```

Ví dụ một class cơ bản:

```cpp
class Person {
    public:
        string firstName; // property
        string lastName;  // property
        int age;          // property

        void fullname() { // method
            cout << firstName << ' ' << lastName;
        }
};
```

Trở lại với ví dụ ở đầu bài viết, class ở đây là Car, vậy thì thuộc tính của nó chính là speed, HP,... còn phương thức chính là run, turn left, right, turn on the light...

**Lưu** ý: các thuộc tính có thể bị trùng tên với các tham số trong các phương thức, vậy nên chúng ta nên dùng this-> hoặc toán tử phân giải phạm vi (::), ví dụ:

```cpp
class Person {
    public:
        string firstName;
        string lastName;
        int age;

        void fullname() {
            cout << this->firstName << ' ' << Person::lastName;
        }
};
```

Nói qua một chút về con trỏ this, con trỏ this đề cập đến thể hiện hay instance của class đó. Do đó, thông qua con trỏ this, ta có thể truy cập đến các thuộc tính hoặc phương thức thuộc class đó như trên ví dụ bên trên.

Đối với toán tử phạm vi :: dùng để xác định phương thức hoặc thuộc tính được gọi thuộc lớp nào. Như trong ví dụ trên là truy xuất thuộc tính lastName thuộc lớp Person. Nếu như gọi từ namespace hoặc emum thì toán tử :: được dùng để gọi thành viên của namepsace hoặc enum đó. Ngoài ra, toán tử phân giải phạm vi nếu không có tên lớp phía trước thì được dùng để gọi một biến bên ngoài scope. Ví dụ:

```cpp
int x;
int main()
{
    int x = 2;
    ::x = 3; // x ở ngoài
    return 0;
}
```

Sự khác biệt giữa this và class khá rõ ràng, this (ám chỉ thể hiện của class đang sử dụng this) chỉ sử dụng được trong class, còn đối với toán tử :: có thể sử dụng được cả ở trong và ngoài class. Quá rõ ràng, nếu dùng this ở ngoài thì biết nó chỉ thằng nào đúng không! Bạn không thể thay ::x ở ví dụ trên thành this->x hay ->x được.

Cú pháp tạo object của một class và sử dụng các thuộc tính và phương thức:

```cpp
// tạo một object
<className> <object>;
// gán giá trị cho thuộc tính của object
<object>.property = <value>;

// có thể sử dụng property như một biến thông thường
cout << <object>.property;
// có thể sử dụng method như một hàm thông thường
<object>.method();
```

**Lưu ý**: chỉ những thuộc tính và phương thức public thì mới có thể được sử dụng như cách trên. Ví dụ về cách sử dụng class:

```cpp
Person person;
person.firstName = "Khiem";
person.lastName = "Le";
person.fullname(); // sẽ in ra màn hình là "Khiem Le"
```

## Access modifiers & properties declaration

Access modifier là phạm vi truy cập của các thuộc tính và phương thức sẽ được khai báo bên dưới nó. Có 3 phạm vi truy cập trong C++ là public, private và protected.

- Các thuộc tính và phương thức khai báo public thì có thể được truy cập trực tiếp thông qua instance của class đó. Các thuộc tính nên khai báo là public nếu bạn không có ràng buộc điều kiện trước khi gán (người dùng có thể thoải mái gán giá trị) hoặc bạn không cần xử lý trước khi trả về giá trị thuộc tính;
- Đối với private thì chỉ có thể được truy cập gián tiếp qua các phương thức public (Getter và setter). Các thuộc tính private thường được sử dụng khi bạn không mong muốn người khác có thể tùy ý gán giá trị hoặc là bạn muốn xử lý trước khi trả về giá trị.
- Đối với protected, các phương thức và thuộc tính chỉ có thể truy cập qua các class kế thừa nó hoặc chính nó (sẽ được nói kĩ hơn trong bài kế thừa C++).

Ví dụ của access modifier:

```cpp
class MyClass
{
	public:
		int public_property;

	private:
		int _private_property;

	// protected sẽ được trình bày trong bài kế thừa và đa hình trong C++
};
```

Đối với quy cách đặt tên biến, bạn có thể sử dụng PascalCase, CammelCase... nhưng đối với các thuộc tính và phương thức private bạn nên đặt tên có dấu \_ đầu. Ví dụ như \_privateProp. Trong một số ngôn ngữ bật cao, thậm chí đã không còn từ khóa private mà thay vào đó sẽ chỉ là dấu \_ trước tên biến (ví dụ như Dart).

## Method declaration

Phương thức cũng giống như một hàm bình thường, bạn cũng có thể không trả về giá trị, có thể có hoặc không có tham số, có thể override hàm... Đối với các tham số truyền vào phương thức, bạn cũng có thể đặt tên trùng với thuộc tính của class, sử dụng kết hợp với toán tử :: và con trỏ this. Hoặc bạn có thể đặt tên khác với thuộc tính (thường thì sẽ thêm dấu \_ trước tên tham số như là thuộc tính private vậy).

Đối với phương thức thì có hai cách định nghĩa thi hành: định nghĩa thi hành trong lúc định nghĩa class và định nghĩa thi hành bên ngoài class.

Định nghĩa thi hành bên trong class:

```cpp
class Animal {
    public:
        string sound;

        void makeNoise() {
            cout << sound;
        }
};
```

Định nghĩa thi hành bên ngoài class:

```cpp
class Animal {
    public:
        string sound;

        void makeNoise();
};

void Animal::makeNoise() {
    cout << sound;
}
```

**Lưu ý**: các phương thức không làm thay đổi giá trị thuộc tính của đối tượng thì nên có từ khóa "const" trước phần thân. Ví dụ:

```cpp
class Animal {
    public:
        string sound;

        void makeNoise() const;
};

void Animal::makeNoise() const {
    cout << sound;
}
```

## Getter & setter

Đối với thuộc tính private, ta không thể truy cập trực tiếp từ bên ngoài, vậy có cách nào để truy cập? Đây là lúc sử dụng phương thức. Các phương thức lấy giá trị của thuộc tính được gọi là getter, các phương thức gán giá trị cho thuộc tính được gọi là setter.

```cpp
class MyClass {
    private:
        int _age;

    public:
        int getAge() {         // getter
            return _age;
        }

        void setAge(int age) { // setter
            _age = age;
        }
};
```

Việc sử dụng các thuộc tính private nhằm mục đích không cho người khác tùy ý thay đổi giá trị của thuộc tính đó, ngoài ra còn giúp bạn xử lý kết quả trước khi trả về cho người yêu cầu. Việc đó được thực hiện thông qua getter và setter. Ví dụ:

```cpp
class MyClass {
    private:
        int _age;

    public:
        bool isOldEnough() {
            if (_age >= 18)
                return 1;
            return 0;
        }

        int getAge() {
            return _age;
        }

        void setAge(int age) {
            if (age < 18) {
                cout << "You are not old enough\n";
            } else {
                _age = age;
            }
        }
};
```

Lưu ý cách đặt tên getter và setter. Bạn nên đặt get vào trước tên getter và set vào trước tên setter như ví dụ bên trên của mình. Và cũng theo như phần lưu ý cuối mục "Method declaration" ở trên, các getter nên đặt là "const" bởi vì getter chỉ lấy giá trị chứ không thay đổi giá trị thuộc tính.

## Constructor

Constructor hay hàm dựng là một hàm đặc biệt, nó sẽ được gọi ngay khi chúng ta khởi tạo một object. Vậy thì tại sao chúng ta lại cần có constructor?

Nếu bạn để ý ví dụ trên bạn sẽ thấy ta phải khởi tạo một object sau đó gán các property và sử dụng, việc này rất tốn thời gian. Constructor sẽ giúp chúng ta giải quyết việc này. Cú pháp khai báo một constructor giống với hàm nhưng không có kiểu dữ liệu trả về:

```cpp
class MyClass {
  public:
    MyClass() { // constructor
      cout << "Hello World!";
    }
};

// sử dụng
MyClass object; // sẽ in ra màn hình "Hello World"
```

Lưu ý constructor phải được khai báo public. Công dụng chính của constructor chính là khởi gán các thuộc tính, vậy nên constructor thường được định nghĩa như sau:

```cpp
class Person {
	public:
	    string firstName;
	    string lastName;
	    int age;

	    Person(string _firstName, string _lastName, int _age)
	    {
	        firstName = _firstName;
	        lastName = _lastName;
	        age = _age;
	    }

	    void fullname() {
			cout << firstName << ' ' << lastName;
	    }
};
```

Constructor cũng có thể định nghĩa thi hành bên ngoài class giống như phương thức vậy:

```cpp
class Person {
	public:
	    string firstName;
	    string lastName;
	    int age;

	    Person(string _firstName, string _lastName, int _age);

	    void fullname() {
	        cout << firstName << ' ' << lastName;
	    }
};

Person::Person(string _firstName, string _lastName, int _age)
{
	firstName = _firstName;
	lastName = _lastName;
	age = _age;
}
```

Để khởi tạo một object thông qua constructor, ta làm như sau:

```cpp
Person person("Khiem", "Le", 20);
person.fullname(); // Khiem Le
```

Như vậy chúng ta không cần phải set từng thuộc tính cho object đó mà khởi tạo trực tiếp qua constructor.

## Destructor

Đối với một số ngôn ngữ lập trình khác có thể destructor không phổ biến, nhưng đối với C++, việc được quản lý bộ nhớ một cách hoàn toàn do người lập trình làm chủ thì destructor là vô cùng cần thiết. Hãy thử nghĩ xem, trong số thuộc tính của class bạn định nghĩa có một con trỏ, mảng động... và bạn không sử dụng desctructor thì sẽ như thế nào? Đương nhiên sẽ xảy ra chuyện rò rỉ bộ nhớ và điều này cực kì không tốt. Với destructor bạn có thể xóa con trỏ đi khi object được thu hồi hoặc bạn có thể gọi tường minh destructor.

Cách khai báo destructor cũng giống như đối với constructor nhưng có kí hiệu ~ phía trước:

```cpp
class MyClass {
    public:
        MyClass() { // constructor
            cout << "Constructor is executed\n";
        }

        ~MyClass() { // destructor
            cout << "Constructor is executed\n";
        }
};

// Khởi tạo object
ClassName t; // gọi constructor không tường minh
// Gọi destructor tường minh
t.~MyClass();
```

## Static member

Static member hay thành viên tĩnh trong class C++ cũng tương tự như với static variable (biến tĩnh) trong function. Đối với function, sau khi thực hiện xong khối lệnh và thoát thì biến tĩnh vẫn sẽ không mất đi. Đối với class, thành viên tĩnh sẽ là thuộc tính dùng chung cho tất cả các đối tượng của class đó, cho dù là không có đối tượng nào tồn tại. Tức là bạn có thể khai báo nhiều object, mỗi object các thuộc tính của nó đều khác nhau nhưng riêng static thì chỉ có một và static member tồn tại trong suốt chương trình cho dù có hay không có object nào của nó hay nói ngắn gọn là dùng chung một biến static.

Các thành viên tĩnh của class có thể được truy cập từ bất kì đối tượng nào của class đó hoặc thông qua toán tử phạm vi (::). Biến tĩnh cũng có phạm vi truy cập như một biến thông thường (public, private và protected). Để khai báo một biến tĩnh, ta thực hiện thêm từ khóa "static" vào trước kiểu dữ liệu, sau đó khởi tạo giá trị bên ngoài như sau:

```cpp
class MyClass {
    public:
        static int count;
};

int MyClass::count = 0;
```

Bây giờ bạn có thể sử dụng biến tĩnh như cách đã trình bày bên trên:

```cpp
cout << MyClass::count; // 0
MyClass::count++; // 1
```

Để thấy được sự "dùng chung" của static member, các bạn có thể xem ví dụ sau:

```cpp
MyClass khiemle;
khiemle.count = 100;
cout << MyClass::count; // 100
```

Trong ví dụ trên rõ ràng là mình chỉ set thuộc tính của object khiemle thôi nhưng mà khi in biến count qua toán tử phạm vi thì vẫn được kết quả là 100. Nghĩa là tất cả các object đều dùng chung thuộc tính static đó. Bạn có thể đặt thuộc tính tĩnh là hằng như sau:

```cpp
class MyClass {
    public:
        static const int count;
};

const int MyClass::count = 0;
```

Thuộc tính là const sẽ không được thay đổi trong suốt chương trình, do đó bạn có thể gán giá trị ngay khi khai báo như sau:

```cpp
class MyClass {
    public:
        static const int count = 0;
};

//const int MyClass::count = 0; Không cần dòng này nữa
```

Lưu ý là đối với static member không phải là hằng bạn sẽ không gán giá trị như cách trên được:

```cpp
class MyClass {
    public:
        static int count = 0; // không được phép
};
```

Tiếp theo là phương thức tĩnh. Phương thức tĩnh cũng giống như thuộc tính tĩnh, chúng ta có thể gọi trực tiếp qua toán tử phạm vi mà không cần một object nào của nó tồn tại cả.

```cpp
class MyClass {
	public:
	    static void sayHello() {
	        cout << "Hello";
	    }
};

MyClass::sayHello(); // Hello
```

Lưu ý là các phương thức tĩnh sẽ chỉ truy cập được đến các biến tĩnh và phương thức tĩnh khác chứ không được truy cập thành viên khác ngoài static member.

```cpp
class Person {
	public:
	    string firstName;
	    string lastName;

	    static void fullname() {
	        cout << firstName << ' ' << lastName; // không hợp lệ
	    }
};
```

# Tổng kết

Qua bài viết này, mình đã giới thiệu cho các bạn về class, thuộc tính, phương thức và hàm dựng trong C++. Trong bài viết thì cách đặt tên hàm, biến có phần không thống nhất với nhau, bạn nên chọn một cách đặt tên phù hợp nhất với bản thân để clean code. Nếu có sai xót hoặc thắc mắc gì, các bạn có thể để lại bình luận bên dưới bài viết để giúp mình phát triển bài viết tốt hơn. Cảm ơn các bạn đã theo dõi bài viết!
