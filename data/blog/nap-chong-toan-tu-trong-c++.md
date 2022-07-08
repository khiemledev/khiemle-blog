---
title: 'Nạp chồng toán tử trong C++'
date: '2020-04-10'
lastmod: '2020-04-10'
draft: false
tags: ['lap-trinh', 'lap-trinh-c++']
images: ['/static/thumbnails/2020/Nap-chong-toan-tu-trong-cpp.jpg']
layout: PostLayout
authors: ['khiemle']
summary: 'Có bao giờ bạn tự hỏi rằng một hàm có thể được định nghĩa nhiều lần? Một kiểu dữ liệu tự định nghĩa thì có thể thực hiện các toán tử +, -, *, / trên đó không. Bài viết này sẽ giúp các bạn trả lời câu hỏi trên thông qua việc sử dụng nạp chồng toán tử.'
---

![Nạp chồng toán tử trong C++](/static/thumbnails/2020/Nap-chong-toan-tu-trong-cpp.jpg)

# Đầu tiên

Để đọc hiểu bài này tốt nhất, bạn nên có kiến thức về:

- [Cơ bản về class trong C++](/blog/co-ban-ve-class-trong-c++)
- [Hàm bạn và lớp bạn trong C++](/blog/ham-ban-va-lop-ban-trong-c++)
- Tham chiếu trong C++
- Ép kiểu ngầm định và ép kiểu tường minh

# Đặt vấn đề

Nếu bạn đã học qua lập trình C++ cơ bản, chắc chắc rằng trong hầu hết các bài tập về C++, bạn đều sử dụng các toán tử số học như cộng, trừ, nhân, chia. Hầu hết các toán tử đó đều được thực hiện trên toán hạng có kiểu dữ liệu cơ bản như int, float, double...

```cpp
int a = 5;
int b = 4;
int c = a + b;  // = 9
```

Vậy nếu như bạn muốn thực hiện các toán tử đó đối với toán hạng có kiểu dữ liệu bạn tự định nghĩa thì làm sao?

```cpp
PhanSo ps1(1, 2);
PhanSo ps2(2, 3);
// Làm sao để có thể cộng hai phân số?
PhanSo ketQua = ps1 + ps2;
```

Đây chính là lúc chúng ta sử dụng nạp chồng toán tử. Vậy hãy cùng tìm hiểu xem nạp chồng toán tử là gì và cách nạp chồng toán tử như thế nào.

# Nạp chồng toán tử là gì?

Cũng tương tự như nạp chồng hàm (overload function), bạn có thể định nghĩa nhiều hàm có cùng tên, nhưng khác tham số truyền vào, nạp chồng toán tử cũng tương tự.

Nạp chồng toán tử (overload operator) là bạn định nghĩa lại toán tử đã có trên kiểu dữ liệu người dùng tự định nghĩa để dể dàng thể hiện các câu lệnh trong chương trình.

Ví dụ như bạn định nghĩa phép cộng cho kiểu dữ liệu phân số thì sẽ thực hiện cộng hai phân số rồi trả về một phân số mới. So với việc thực hiện gọi hàm, việc overload toán tử sẽ làm cho câu lệnh ngắn gọn, dễ hiểu hơn.

```cpp
PhanSo ps1(1, 2);
PhanSo ps2(2, 3);
PhanSo ketQua;
// Dùng hàm
ketQua = ps1.cong(ps2);
// Dùng Overload operator
ketQua = ps1 + ps2;  // 7/6
```

# Cơ chế hoạt động

Về bản chất, việc thực hiện các toán tử cũng tương đương với việc gọi hàm, ví dụ:

```cpp
PhanSo a(1, 2);
PhanSo b(2, 3);
PhanSo ketQua = a + b;
// Tương đương với
PhanSo ketQua = a.cong(b);
```

Nếu bạn thực hiện toán tử trên hai toán hạng có kiểu dữ liệu cơ bản (float, double, int...), trình biên dịch sẽ tìm xem phiên bản nạp chồng toán tử nào phù hợp với kiểu dữ liệu đó và sử dụng, nếu không có sẽ báo lỗi.

Ngược lại nếu là kiểu dữ liệu tự định nghĩa như struct, class, trình biên dịch sẽ tìm xem có phiên bản nạp chồng toán tử nào phù hợp không? Nếu có thì sẽ sử dụng toán tử đó, ngược lại thì sẽ cố gắng chuyển đổi kiểu dữ liệu của các toán hạng đó sang kiểu dữ liệu có sẵn để thực hiện phép toán, không được sẽ báo lỗi.

# Các toán tử có thể được overload

```cpp
+	–	*	/	%	^	&	|
~	!	=	<	>	+=	-=	*=
/=	%=	^=	&=	|=	<<	>>	>>=
<<=	==	!=	<=	>=	&&	||	++
—	->*	,	->	[]	()	new	delete
new[]	delete[]
```

_Bảng các toán tử có thể overload_ được.

Vậy ta chỉ có một số toán tử sau không overload được:

- Toán tử `.`
- Toán tử phạm vi `::`
- Toán tử điều kiện `?:`
- Toán tử `sizeof`

Một số lưu ý:

- Các toán tử một ngôi `--, ++` có thể đứng trước hoặc sau toán hạng
- Một số toán tử có thể làm toán tử một ngôi hoặc hai ngôi như toán tử `*`
- Toán tử chỉ mục `[...]` là toán tử hai ngôi
- Các từ khóa new và delete cũng được xem là toán tử nên có thể được overload

# Cú pháp overload

Như đã giới thiệu, bản chất việc dùng toán tử là lời gọi hàm, do đó chúng ta overload toán tử cũng giống overload hàm, vậy chúng ta sẽ overload hàm nào? Chúng ta sẽ overload hàm có tên là `operator@`, với `@` là toán tử cần overload `+, -, *, /, ...`, kiểu trả về của hàm chính là lớp đó.

Có hai loại là hàm cục bộ (dùng phương thức của lớp) và hàm toàn cục (dùng hàm bạn). Chúng ta sẽ lần lượt tìm hiểu cách overload toán tử bằng cả hai cách.

## Cài đặt với hàm cục bộ

Đối với hàm cục bộ hay còn gọi là phương thức của lớp, số tham số sẽ ít hơn hàm toàn cục một tham số vì tham số đầu tiên mặc định chính là toán hạng đầu tiên. Vậy, đối với toán tử hai ngôi, ta chỉ cần truyền một tham số cho hàm, chính là toán hạng thứ hai. Ví dụ:

```cpp
class PhanSo
{
    int tu;
    int mau;

public:
    PhanSo() : tu(0), mau(1) {}

    PhanSo operator+(const PhanSo &ps)    // overload toán tử +
    {
        PhanSo kq;
        kq.tu = this->tu * ps.mau + ps.tu * this->mau;
        kq.mau = this->mau * ps.mau;
        return kq;
    }
};
```

Sau khi overload toán tử, bạn có thể sử dụng nó trên kiểu dữ liệu bạn đã định nghĩa:

```cpp
    PhanSo ps1(1, 2);
    PhanSo ps2(2, 3);
    PhanSo ps3 = ps1 + ps2;  // = 1/2 + 2/3
```

Giờ chúng ta hãy xem một ví dụ khác, overload toán tử cộng một phân số với một số nguyên.

```cpp
class PhanSo
{
    // properties & methods
    PhanSo operator+(const int &i)
    {
        PhanSo kq;
        kq.tu = this->tu + i * this->mau;
        return kq;
    }
}

// Sử dụng
PhanSo ps1(1, 2);
PhanSo ps2 = ps1 + 2;   // = 5/2
```

Do toán tử overload theo cách này là phương thức, được gọi từ một đối tượng, do đó mặc định toán hạng đầu tiên phải là toán hạng có kiểu dữ liệu của lớp đó, điều này cũng có nghĩa là bạn phải đặt toán hạng có kiểu dữ liệu của lớp đó đầu tiên rối mới đến toán hạng tiếp theo. Và đối với các kiểu dữ liệu có sẵn, ta không thể truy cập vào các lớp định nghĩa nên chúng, do đó ta không thể overload operator của chúng được. Vậy để giải quyết điều này thì làm như thế nào? Ta sẽ sử dụng hàm toàn cục.

## Cài đặt với hàm toàn cục

Thay vì đối với việc toán hạng đầu tiên luôn phải có kiểu là lớp nào đó, chúng ta sẽ sử dụng hàm bạn để có thể tự do lựa chọn thứ tự của các toán hạng. Ví dụ như bạn muốn `1 + ps1`, `ps1 + 1` đều được chứ không nhất thiết phải là `ps1 + 1` nữa. Chúng ta cài đặt với hàm bạn tương tự như sau:

```cpp
class PhanSo
{
    // properties & methods
    friend PhanSo operator+(const PhanSo &ps, const int &i);
}

PhanSo operator+(const PhanSo &ps, const int &i)
{
    PhanSo kq;
    kq.tu = ps.tu + i * ps.mau;
    return kq;
}

// Sử dụng
PhanSo ps1(1, 2);
PhanSo ps2 = ps1 + 2;   // = 5/2
```

Khá là giống với overload toán tử theo cách dùng phương thức phải không? Vậy nếu muốn đổi thứ tự toán hạng thì phải làm sao, đơn giản đổi thứ tự tham số là được:

```cpp
PhanSo operator+(const int &i, const PhanSo &ps)  // hàm bạn của class PhanSo
{
    return ps + i;
}
```

# Chuyển kiểu

Có hai loại chuyển kiểu là chuyển kiểu bằng toán tử chuyển kiểu và chuyển kiểu bằng constructor

## Overload toán tử chuyển kiểu

Như đã trình bày trong phần cơ chế, nếu không tìm thấy phiên bản nạp chồng toán tử nào phù hợp với kiểu dữ liệu của toán hạng, trình biên dịch sẽ chuyển đối toán hạng sang kiểu dữ liệu cơ bản để tính toán. Vậy chúng ta sẽ cần overload toán tử chuyển kiểu để trình biên dịch có thể chuyển kiểu dữ liệu ta định nghĩa sang kiểu dữ liệu cơ bản.

Ví dụ như mình muốn chuyển phân số về số thực, mình sẽ overload toán tử chuyển kiểu float:

```cpp
// Cú pháp
operator T()
{
    return x; // x có kiểu dữ liệu là T
}

// Ví dụ overload toán tử chuyển kiểu float
class PhanSo
{
    // properties & methods
    operator float();
}

PhanSo::operator float()
{
    return (float)this->tu / this->mau;
}
```

Lúc này, ta sẽ có thể thực hiện chuyển kiểu dữ liệu:

```cpp
PhanSo ps1(1, 2);
PhanSo ps2(2, 3);
float a = ps1 + ps2;
cout << a  << endl;    // ~ 1.67
cout << (float)ps1;   // = 0.5
```

## Chuyển kiểu bằng constructor

Để hạn chế việc phải overload toán tử với các toán hạng có kiểu dữ liệu khác nhau, ta sử dụng chuyển kiểu bằng constructor. Ví dụ:

```cpp
// constructor
PhanSo(int t, int m = 1) : tu(t), mau(m) {}
```

Với constructor được khai báo như trên, khi ta thực hiện cộng một số nguyên với một kiểu phân số, số nguyên sẽ được trình biên dịch chuyển thành kiểu phân số thông qua việc gọi constructor bên trên, với mẫu số là 1 và tử chính là toán hạng ta đang cộng.

```cpp
PhanSo ps(1, 2);
PhanSo kq = ps + 3; // = 7/2
// Có thể hiểu là
PhanSo kq = ps + PhanSo(3);
```

## Sự nhập nhằng

Sự nhập nhằng xảy ra khi bạn thực hiện chuyển kiểu bằng constructor và chuyển kiểu bằng toán tử chuyển kiểu. Sự nhập nhằng khiến cho trình biên dịch không xác định được nên chuyển kiểu bằng toán tử chuyển kiểu hay constructor, dẫn đến việc mất đi cơ chế chuyển kiểu tự động (ngầm định).

```cpp
class PhanSo
{
    // properties & methods
    PhanSo(int t, int m = 1) : tu(t), mau(m) {}
    operator double();
}

PhanSo::operator double()
{
    return (double)this->tu / this->mau;
}

PhanSo a(2, 3), b(3, 4), c;
c = a + b;
c = 2 + a;  // lỗi do sự nhập nhằng
c = a + 2.5;  // lỗi do sự nhập nhằng
```

Cách xử lý duy nhất cho việc này là thực hiển chuyển kiểu tường minh, việc này làm mất đi sự tiện lợi của cơ chế chuyển kiểu tự động. Do đó khi thực hiện chuyển kiểu, ta phải hi sinh một trong hai, hoặc là chuyển kiểu bằng constructor, hoặc là overload toán tử chuyển kiểu.

Các phép toán đã có, toán tử chuyển kiểu cũng đã có, vậy bây giờ nhập hay xuất phân số ta vẫn phải tự nhập xuất tử và mẫu à? Chúng ta sẽ overload luôn toán tử `>>` và `<<`, hãy xem thực hiện như thế nào.

# Overload toán tử nhập xuất

Một toán tử nhập xuất sẽ có hai toán hạng, bến trái là istream hoặc ostream, bên phải là toán hạng cần nhập, xuất. Để overload, chúng ta sử dụng hàm toàn cục, có hai tham số, tham số đầu tiên là một tham chiếu đến đối tượng kiểu istream hoặc ostream, tham số thứ hai là một tham chiếu đối tượng cần nhập, xuất, kiểu trả về của hàm chính là tham chiếu đến tham số đầu tiên của hàm (istream hoặc ostream).

## Toán tử nhập

Mình sẽ thực hiện overload toán tử nhập cho lớp phân số của mình như sau:

```cpp
class PhanSo
{
    // properties & methods
    friend istream &operator>>(istream &in, PhanSo &ps);
}

istream &operator>>(istream &in, PhanSo &ps)
{
    cout << "Tu: ";
    in >> ps.tu;
    cout << "Mau: ";
    in >> ps.mau;
    return in;
}
```

Như vậy toán tử nhập đã được overload cho lớp phân số, bây giờ khi gọi toán tử nhập chúng ta sẽ được kết quả sau:

```cpp
PhanSo ps;
cin >> ps;
// Tu: 1
// Mau: 2
```

## Toán tử xuất

Đối với toán tử nhập cũng tương tự, chúng ta cũng thực hiện tương tự như sau:

```cpp
class PhanSo
{
    // properties & methods
    friend ostream &operator<<(ostream &out, const PhanSo &ps);
}

ostream &operator<<(ostream &out, const PhanSo &ps)
{
    if (ps.tu == 0)
        out << 0;
    else if (ps.mau == 1)
        out << ps.tu;
    else
        out << ps.tu << '/' << ps.mau;
    return out;
}
```

Bây giờ bạn có thể sử dụng toán tử xuất bình thường như các kiểu dữ liệu cơ bản khác:

```cpp
PhanSo ps(1, 2);
cout << ps; // 1/2
```

# Hạn chế của việc overload toán tử

- Không thể tạo toán tử mới
- Không thể kết hợp các toán tử theo cách mà trước đó không được định nghĩa
- Không thay đổi được thứ tự ưu tiên toán tử
- Không thể tạo cú pháp mới cho toán tử
- Không thể định nghĩa lại một định nghĩa đã có của một toán tử

# Một số ràng buộc của toán tử

- Hầu hết các toán tử không ràng buộc ý nghĩa, ngoại trừ một số toán tử `=, [], (), ->` thì phải được định nghĩa là hàm thành phần của lớp để toán hạng đầu tiên luôn nằm bên trái
- Nếu đã overload toán tử rồi thì phải làm cho đầy đủ. Ví dụ overload `+, -, *, /` thì phải overload luôn cả `+=, -=, *=, /=...`
- Luôn tôn trọng ý nghĩa của toán tử gốc (+ thì phải cộng, - phải trừ...)
- Cố gắng tái sử dụng mã nguồn một cách tối đa (ví dụ như đảo thứ tự toán hạng như ví dụ ở trên)

# Tổng kết

Vậy là trong bài viết này, mình đã giới thiệu cho các bạn cách nạp chồng toán tử trong C++. Nếu bạn thấy hay, hãy chia sẻ cho bạn bè cùng biết, và đừng ngần ngại góp ý dưới bài viết để giúp mình phát triển bài viết tốt hơn. Cảm ơn các bạn đã theo dõi bài viết.
