---
title: 'Các thuật toán sắp xếp phổ biến'
date: '2020-05-25'
lastmod: '2020-05-25'
draft: false
tags: ['cau-truc-du-lieu-giai-thuat', 'lap-trinh', 'lap-trinh-c++']
images: ['/static/thumbnails/2020/Sorting-Algorithms.jpg']
authors: ['khiemle']
layout: PostLayout
summary: 'Là một lập trình viên thì chắc chắn bạn không thể nào không biết đến các thuật toán sắp xếp phổ biến như sắp xếp nhanh (quick sort) hay sắp xếp trộn (merge sort). Trong bài viết này mình sẽ giới thiệu đến các bạn các thuật toán sắp xếp phổ biến.'
---

![Các thuật toán sắp xếp phổ biến](/static/thumbnails/2020/Sorting-Algorithms.jpg)

# Bài toán sắp xếp

Thuật toán sắp xếp là lời giải của bài toán sắp xếp, vậy thì trước tiên, ta hãy tìm hiểu xem bài toán sắp xếp là gì trước đã.

Bài toán sắp xếp chắc chắn không còn xa lạ gì với mỗi chúng ta, nó là một trong những bài toán được bắt gặp nhiều nhất trong thực tế. Ví dụ như sắp xếp danh sách lớp học, sắp xếp quyển sách, sắp xếp tiền... Vậy thì bài toán sắp xếp là gì?

Bài toán sắp xếp là chúng ta sẽ sắp xếp lại các phần tử của một danh sách theo chiều tăng hoặc giảm dần theo một tiêu chí nào đó của phần tử trong danh sách.

Ví dụ như bạn sắp xếp danh sách lớp học theo điểm trung bình từ cao đến thấp, sắp những quyển sách theo kích cỡ từ nhỏ đến lớn, sắp xếp những tờ tiền theo mệnh giá từ thấp đến cao...

Mục đích của việc sắp xếp chính là giúp ta có cái nhìn tổng quan hơn về những dữ liệu mà ta có, dễ dàng tìm kiếm những phần tử đứng nhất về một tiêu chí nào đó như mình đã nói trong _Các thuật toán tìm kiếm phổ biến_[^search_algo], hầu như mọi bài toán đều quy về bài toán tìm kiếm. Ví dụ:

Bạn có một danh sách lớp học chưa được sắp xếp, bạn muốn biết được là mức độ đề thi có khó đối với học sinh hay không, top 3 học sinh có điểm trung bình cao nhất. Vậy thì sau khi bạn thực hiện việc sắp xếp giảm theo điểm trung bình, bạn sẽ dễ dàng đánh giá được mức độ của đề đối với học sinh là dễ hay khó thông qua việc nhìn vào đầu và cuối danh sách, đầu danh sách điểm không cao lắm và cuối danh sách điểm thấp thì chắc chắn đề này khó đối với học sinh và ngược lại.

Trong lập trình, sắp xếp không chỉ đơn giản là để tìm một hoặc nhiều phần tử đứng đầu về một tiêu chí nào đó hay để có cái nhìn tổng quan về dữ liệu, sắp xếp còn làm cơ sở cho các giải thuật nâng cao với hiệu suất cao hơn.

Ví dụ như khi thực hiện tìm kiếm, thuật toán tìm kiếm nhị phân có độ phức tạp thời gian là O(log(n)) và ổn định, nhưng thuật toán này chỉ áp dụng được với dãy đã được sắp xếp. Vậy khi này, bạn có thể thực hiện sắp xếp trước sau đó áp dụng thuật toán tìm kiếm nhị phân.

Bài toán sắp xếp chỉ đơn giản có vậy, bây giờ mình sẽ giới thiệu đến các bạn một số giải thuật tìm kiếm phổ biến nhất mà lập trình viên nào cũng nên biết. Hãy cùng bắt đầu thôi!

Lưu ý trước khi đọc bài: bạn cần có kỹ năng lập trình C++ cơ bản, hiểu về độ phức tạp của thuật toán. Trong bài viết có sử dụng từ thuật toán sắp xếp ổn định, thuật toán sắp xếp ổn định nghĩa là thứ tự của các phần tử có cùng giá trị sẽ không thay đổi so với ban đầu. Ví dụ như 1 5 3 3 4, sau khi sắp xếp cũng là 1 3 3 4 5.

# Sắp xếp nổi bọt (Bubble Sort)

Sắp xếp nổi bọt hay bubble sort là thuật toán sắp xếp đầu tiên mà mình giới thiệu đến các bạn và cũng là thuật toán đơn giản nhất trong các thuật toán mà mình sẽ giới thiệu, ý tưởng của thuật toán này như sau:

Duyệt qua danh sách, làm cho các phần tử lớn nhất hoặc nhỏ nhất dịch chuyển về phía cuối danh sách, tiếp tục lại làm phần tử lớn nhất hoặc nhỏ nhất kế đó dịch chuyển về cuối hay chính là làm cho phần tử nhỏ nhất (hoặc lớn nhất) nổi lên, cứ như vậy cho đến hết danh sách Cụ thể các bước thực hiện của giải thuật này như sau:

1. Gán i = 0
2. Gán j = 0
3. Nếu A\[j\] > A\[j + 1\] thì đối chỗ A\[j\] và A\[j + 1\]
4. Nếu j < n - i - 1:
   - Đúng thì j = j + 1 và quay lại bước 3
   - Sai thì sang bước 5
5. Nếu i < n - 1:
   - Đúng thì i = i + 1 và quay lại bước 2
   - Sai thì dừng lại

Thật đơn giản đúng không nào, chúng ta hãy cùng cài đặt thuật toán này trong C++ nha.

```cpp
void BubbleSort(int A[], int n)
{
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - i - 1; j++)
            if (A[j] > A[j + 1])
                swap(A[j], A[j + 1]); // đổi chỗ A[j] và A[j + 1]
}
```

Sắp xếp nổi bọt là một thuật toán sắp xếp ổn định. Về độ phức tạp, do dùng hai vòng lặp lồng vào nhau nên độ phức tạp thời gian trung bình của thuật toán này là O(n2).

Các bạn có thể xem mình trình bày ý tưởng của giải thuật này trong bên dưới:

[Youtube: Thuật toán sắp xếp nổi bọt | Khiêm Lê](https://youtu.be/S2le_2BTEAc)

Đừng quên đăng ký kênh Youtube [Khiêm Lê](https://khiemle.dev/youtube) để ủng hộ mình nha!

# Sắp xếp chọn (Selection Sort)

Sắp xếp chọn hay selection sort sẽ là thuật toán thứ hai mà mình giới thiệu đến các bạn, ý tưởng của thuật toán này như sau: duyệt từ đầu đến phần tử kề cuối danh sách, duyệt tìm phần tử nhỏ nhất từ vị trí kế phần tử đang duyệt đến hết, sau đó đổi vị trí của phần tử nhỏ nhất đó với phần tử đang duyệt và cứ tiếp tục như vậy.

Cho mảng A có n phần tử chưa được sắp xếp. Cụ thể các bước của giải thuật này áp dụng trên mảng A như sau:

1. Gán i = 0
2. Gán j = i + 1 và min = A\[i\]
3. Nếu j < n:
   - Nếu A\[j\] < A\[min\] thì min = j
   - j = j + 1
   - Quay lại bước 3
4. Đổi chỗ A\[min\] và A\[i\]
5. Nếu i < n - 1:
   - Đúng thì i = i + 1 và quay lại bước 2
   - Sai thì dừng lại

Ý tưởng và từng bước giải cụ thể đã có, bây giờ mình sẽ sử dụng thuật toán này trong C++:

```cpp
void SelectionSort(int A[], int n)
{
    int min;
    for (int i = 0; i < n - 1; i++)
    {
        min = i; // tạm thời xem A[i] là nhỏ nhất
        // Tìm phẩn tử nhỏ nhất trong đoạn từ A[i] đến A[n - 1]
        for (int j = i + 1; j < n; j++)
            if (A[j] < A[min]) // A[j] mà nhỏ hơn A[min] thì A[j] là nhỏ nhất
                min = j; // lưu lại vị trí A[min] mới vừa tìm được
        if (min != i) // nếu như A[min] không phải là A[i] ban đầu thì đổi chỗ
            swap(A[i], A[min]);
    }
}
```

Đối với thuật toán sắp xếp chọn, do sử dụng 2 vòng lặp lồng vào nhau, độ phức tạp thời gian trung bình của thuật toán này là O(n2). Thuật toán sắp xếp chọn mình cài đặt là thuật toán sắp xếp không ổn định, nó còn có một phiên bản khác cải tiến là thuật toán sắp xếp chọn ổn định.

Giải thích ý tưởng thuật toán:

[Youtube: Thuật toán sắp xếp chọn | Khiêm Lê](https://youtu.be/oPkY5vKdol0)

# Sắp xếp chèn (Insertion Sort)

Sắp xếp chèn hay insertion sort là thuật toán tiếp theo mà mình giới thiệu, ý tưởng của thuật toán này như sau: ta có mảng ban đầu gồm phần tử A\[0\] xem như đã sắp xếp, ta sẽ duyệt từ phần tử 1 đến n - 1, tìm cách chèn những phần tử đó vào vị trí thích hợp trong mảng ban đầu đã được sắp xếp.

Giả sử cho mảng A có n phần tử chưa được sắp xếp. Các bước thực hiện của thuật toán áp dụng trên mảng A như sau:

1. Gán i = 1
2. Gán x = A\[i\] và pos = i - 1
3. Nếu pos >= 0 và A\[pos\] > x:
   - A\[pos + 1\] = A\[pos\]
   - pos = pos - 1
   - Quay lại bước 3
4. A\[pos + 1\] = x
5. Nếu i < n:
   - Đúng thì i = i + 1 và quay lại bước 2
   - Sai thì dừng lại

Bây giờ thì áp dụng nó vào trong C++ thôi!

```cpp
void InsertionSort(int A[], int n)
{
    int pos, x;
    for (int i = 1; i < n; i++)
    {
        x = A[i]; // lưu lại giá trị của x tránh bị ghi đè khi dịch chuyển các phần tử
        pos = i - 1;
        // tìm vị trí thích hợp để chèn x
        while (pos >= 0 && A[pos] > x)
        {
            // kết hợp với dịch chuyển phần tử sang phải để chừa chỗ cho x
            A[pos + 1] = A[pos];
            pos--;
        }
        // chèn x vào vị trí đã tìm được
        A[pos + 1] = x;
    }
}
```

Cũng tương tự như sắp xếp chọn, thuật toán sắp xếp chèn cũng có độ phức tạp thời gian trung bình là O(n2) do có hai vòng lặp lồng vào nhau.

Video giải thích ý tưởng thuật toán:

[Youtube: Thuật toán sắp xếp chèn | Khiêm Lê](https://youtu.be/5tpQ6x1JEXE)

# Sắp xếp trộn (Merge Sort)

Sắp xếp trộn (merge sort) là một thuật toán dựa trên kỹ thuật chia để trị, ý tưởng của thuật toán này như sau: chia đôi mảng thành hai mảng con, sắp xếp hai mảng con đó và trộn lại theo đúng thứ tự, mảng con được sắp xếp bằng cách tương tự.

Giả sử left là vị trí đầu và right là cuối mảng đang xét, cụ thể các bước của thuật toán như sau:

- Nếu mảng còn có thể chia đôi được (tức left < right)
  1. Tìm vị trí chính giữa mảng
  2. Sắp xếp mảng thứ nhất (từ vị trí left đến mid)
  3. Sắp xếp mảng thứ 2 (từ vị trí mid + 1 đến right)
  4. Trộn hai mảng đã sắp xếp với nhau

Bây giờ mình sẽ cài đặt thuật toán cụ thể trong C++ như sau:

```cpp
// Hàm trộn hai mảng con vào nhau theo đúng thứ tự
void Merge(int A[], int left, int mid, int right)
{
    int n1 = mid - left + 1; // Số phần tử của mảng thứ nhất
    int n2 = right - mid; // Số phần tử của mảng thứ hai

    // Tạo hai mảng tạm để lưu hai mảng con
    int *LeftArr = new int[n1];
    int *RightArr = new int[n2];

    // Sao chép phần tử 2 mảng con vào mảng tạm
    for (int i = 0; i < n1; i++)
        LeftArr[i] = A[left + i];
    for (int i = 0; i < n2; i++)
        RightArr[i] = A[mid + 1 + i];

    // current là vị trí hiện tại trong mảng A
    int i = 0, j = 0, current = left;

    // Trộn hai mảng vào nhau theo đúng thứ tự
    while (i < n1 && j < n2)
        if (LeftArr[i] <= RightArr[j])
            A[current++] = LeftArr[i++];
        else
            A[current++] = RightArr[j++];

    // Nếu mảng thứ nhất còn phần tử thì copy nó vào mảng A
    while (i < n1)
        A[current++] = LeftArr[i++];

    // Nếu mảng thứ hai còn phần tử thì copy nó vào mảng A
    while (j < n2)
        A[current++] = RightArr[j++];

    // Xóa hai mảng tạm đi
    delete[] LeftArr, RightArr;
}

// Hàm chia đôi mảng và gọi hàm trộn
void _MergeSort(int A[], int left, int right)
{
    // Kiểm tra xem còn chia đôi mảng được không
    if (left < right)
    {
        // Tìm phần tử chính giữa
        // left + (right - left) / 2 tương đương với (left + right) / 2
        // việc này giúp tránh bị tràn số với left, right quá lớn
        int mid = left + (right - left) / 2;

        // Sắp xếp mảng thứ nhất
        _MergeSort(A, left, mid);
        // Sắp xếp mảng thứ hai
        _MergeSort(A, mid + 1, right);

        // Trộn hai mảng đã sắp xếp
        Merge(A, left, mid, right);
    }
}

// Hàm sắp xếp chính, được gọi khi dùng merge sort
void MergeSort(int A[], int n)
{
    _MergeSort(A, 0, n - 1);
}
```

Về độ phức tạp, thuật toán Merge Sort có độ phức tạp thời gian trung bình là O(nlog(n)), về không gian, do sử dụng mảng phụ để lưu trữ, và 2 mảng phụ dài nhất là hai mảng phụ ở lần chia đầu tiên có tổng số phần tử bằng đúng số phần tử của mảng nên độ phức tạp sẽ là O(n). Sắp xếp trộn là thuật toán sắp xếp ổn định.

Video minh họa của GeeksforGeeks:

[Youtube: Thuật toán sắp xếp trộn | Khiêm Lê](https://youtu.be/pJE0a_XVFok)

# Sắp xếp nhanh (Quick Sort)

Sắp xếp nhanh (quick sort) hay sắp xếp phân đoạn (Partition) là là thuật toán sắp xếp dựa trên kỹ thuật chia để trị, cụ thể ý tưởng là: chọn một điểm làm chốt (gọi là pivot), sắp xếp mọi phần tử bên trái chốt đều nhỏ hơn chốt và mọi phần tử bên phải đều lớn hơn chốt, sau khi xong ta được 2 dãy con bên trái và bên phải, áp dụng tương tự cách sắp xếp này cho 2 dãy con vừa tìm được cho đến khi dãy con chỉ còn 1 phần tử.

Cụ thể áp dụng thuật toán cho mảng như sau:

1. Chọn một phần tử làm chốt
2. Sắp xếp phần tử bên trái nhỏ hơn chốt
3. Sắp xếp phần tử bên phải nhỏ hơn chốt
4. Sắp xếp hai mảng con bên trái và bên phải pivot

Phần tử được chọn làm chốt rất quan trọng, nó quyết định thời gian thực thi của thuật toán. Phần tử được chọn làm chốt tối ưu nhất là phần tử trung vị, phần tử này làm cho số phần tử nhỏ hơn trong dãy bằng hoặc sấp xỉ số phần tử lớn hơn trong dãy. Tuy nhiên, việc tìm phần tử này rất tốn kém, phải có thuật toán tìm riêng, từ đó làm giảm hiệu suất của thuật toán tìm kiếm nhanh, do đó, để đơn giản, người ta thường sử dụng phần tử chính giữa làm chốt.

Trong bài viết này, mình cũng sẽ sử dụng phần tử chính giữa làm chốt, thuật toán cài đặt trong C++ như sau:

```cpp
void Partition(int A[], int left, int right)
{
    // Kiểm tra xem nếu mảng có 1 phần tử thì không cần sắp xếp
    if (left >= right)
        return;

    int pivot = A[(left + right) / 2]; // Chọn phần tử chính giữa dãy làm chốt

    // i là vị trí đầu và j là cuối đoạn
    int i = left, j = right;
    while (i < j)
    {
        while (A[i] < pivot) // Nếu phần tử bên trái nhỏ hơn pivot thì ok, bỏ qua
            i++;
        while (A[j] > pivot) // Nếu phần tử bên phải nhỏ hơn pivot thì ok, bỏ qua
            j--;

        // Sau khi kết thúc hai vòng while ở trên thì chắc chắn
        // vị trí A[i] phải lớn hơn pivot và A[j] phải nhỏ hơn pivot
        // nếu i < j
        if (i <= j)
        {
            if (i < j) // nếu i != j (tức không trùng thì mới cần hoán đổi)
                swap(A[i], A[j]); // Thực hiện đổi chổ ta được A[i] < pivot và A[j] > pivot
            i++;
            j--;
        }
    }

    // Gọi đệ quy sắp xếp dãy bên trái pivot
    Partition(A, left, j);
    // Gọi đệ quy sắp xếp dãy bên phải pivot
    Partition(A, i, right);
}

// Hàm sắp xếp chính
void QuickSort(int A[], int n)
{
    Partition(A, 0, n - 1);
}
```

Thuật toán sắp xếp nhanh không phải là thuật toán sắp xếp ổn định, tuy nhiên vẫn có thể cải tiến nó thành thuật toán sắp xếp ổn định. Độ phức tạp thời gian trung bình của thuật toán này là O(nlog(n)).

[Youtube: Thuật toán sắp xếp nhanh | Khiêm Lê](https://youtu.be/kPQfMUtMVjU)

## Một số thuật toán sắp xếp khác

Ngoài các thuật toán trên (được in đậm bên dưới), bạn có thể tìm hiểu thêm một số thuật toán sắp xếp khác bên dưới:

1. **[Selection Sort - Sắp xếp chọn](#sắp-xếp-chọn-selection-sort)**
2. **[Insertion Sort - Sắp xếp chèn](#sắp-xếp-chèn-insertion-sort)**
3. Binary Insersion Sort - Chèn nhị phân
4. Interchange Sort - Đổi chỗ trực tiếp
5. **[Bubble Sort - Sắp xếp nổi bọt](#sắp-xếp-nổi-bọt-bubble-sort)**
6. Shaker Sort
7. Shell Sort
8. Heap Sort - Sắp xếp vun đống
9. **[Quick Sort - Sắp xếp nhanh](#sắp-xếp-nhanh-quick-sort)**
10. **[Merge Sort - Sắp xếp trộn](#sắp-xếp-trộn-merge-sort)**
11. Counting Sort - Sắp xếp đếm
12. Radix Sort - Sắp xếp cơ số

Các bạn có thể tham khảo thêm các thuật toán trên ở trang _GeeksforGeeks_[^geeks_for_geeks] nhé!

# Lời kết

Vậy là qua bài viết này, mình đã giới thiệu đến các bạn các thuật toán tìm kiếm phổ biến nhất. Nếu bạn có thắc mắc hoặc góp ý nào, đừng quên để lại bình luận bên dưới bài viết. Đừng quên chia sẻ bài viết này cho bạn bè cùng biết nha. Cảm ơn các bạn đã theo dõi bài viết!

[^search_algo]: [Các thuật toán tìm kiếm phổ biến](/blog/cac-thuat-toan-tim-kiem-pho-bien)
[^geeks_for_geeks]: [GeeksforGeeks](https://www.geeksforgeeks.org/)
