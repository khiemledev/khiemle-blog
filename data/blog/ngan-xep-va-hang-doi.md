---
title: 'Ngăn xếp và hàng đợi'
date: '2020-04-15'
lastmod: '2020-04-15'
draft: false
tags: ['cau-truc-du-lieu-giai-thuat', 'lap-trinh', 'lap-trinh-c++']
images:
  [
    '/static/thumbnails/2020/Ngan-xep-va-hang-doi-trong-cpp.jpg',
    '/static/images/2020/04/ngan-xep-va-hang-doi/Stack.png',
    '/static/images/2020/04/ngan-xep-va-hang-doi/Queue.png',
  ]
authors: ['khiemle']
layout: PostLayout
summary: 'Ngăn xếp và hàng đợi là một cấu trúc dữ liệu mà chắc chắn lập trình viên nào cũng cần phải nắm được. Không chỉ được áp dụng nhiều trong lập trình, ngăn xếp và hàng đợi còn được nhiều nhà phỏng vấn hỏi khi đi ứng tuyển. Do đó trong bài viết hôm nay chúng ta sẽ cùng tìm hiểu về ngăn xếp và hàng đợi.'
---

![Ngăn xếp và hàng đợi](/static/thumbnails/2020/Ngan-xep-va-hang-doi-trong-cpp.jpg)

# Giới thiệu

Ngăn xếp và hàng đợi là hai kiểu cấu trúc dữ liệu động được sử dụng khá phổ biến trong lập trình. Hai kiểu cấu trúc này đều được xây dựng dựa trên danh sách liên kết đơn cho nên khá dễ để cài đặt. Hãy cùng tìm hiểu xem ngăn xếp và hàng đợi là gì và cách cài đặt như thế nào nhé!

Để đọc hiểu bài này tốt nhất, các bạn nên có kiến thức về danh sách liên kết đơn, các thao tác trên danh sách đó. Nếu bạn nào chưa biết, bạn có thể xem lại bài viết _Danh sách liên kết đơn_[^linked_list] của mình.

# Ngăn xếp

[Youtube: Ngăn xếp | Khiêm Lê](https://youtu.be/w0Jbe1uCWUc)

Ngăn xếp hay Stack là một dạng danh sách liên kết hoạt động theo cơ chế **LIFO** (**L**ast **I**n, **F**irst **O**ut), nghĩa là các phần tử được thêm vào sau cùng thì sẽ là phần tử được lấy ra đầu tiên.

## Các thao tác cơ bản trên ngăn xếp

Các thao tác cơ bản trên ngăn xếp như sau:

- IsEmpty: kiểm tra xem ngăn xếp có rỗng hay không
- Push: thêm phần tử vào trên cùng ngăn xếp
- Pop: lấy phần tử nằm trên cùng ra khỏi ngăn xếp và trả về giá trị của phần tử đó (nếu ngăn xếp không rỗng)
- Top: trả về giá trị của phần tử nằm trên cùng của ngăn xếp (nếu ngăn xếp không rỗng)

<div align="center">
    ![Ngăn xếp](/static/images/2020/04/ngan-xep-va-hang-doi/Stack.png)
</div>

Ngăn xếp

## Cài đặt ngăn xếp

Bây giờ chúng ta hãy xem cách cài đặt ngăn xếp trong C++ như thế nào.

### Cấu trúc một phần tử

Tương tự với danh sách liên kết, phần tử trong ngăn xếp cũng có thành phần dữ liệu và thành phần liên kết. Để đơn giản, mình sẽ sử dụng kiểu int cho phần dữ liệu. Phần tử thêm vào đầu sẽ liên kết với phần tử phía dưới của stack qua thành phần liên kết là một con trỏ.

```cpp
struct Node
{
    int data;
    Node *next;
};
```

Vậy để tạo một phần tử, chúng ta cấp phát động một phần tử, gán thành phần dữ liệu của phần tử đó bằng đối số truyền vào, phần tử mới chưa trỏ vào node nào nên phần liên kết gán bằng NULL và trả về địa chỉ của phần tử đó.

```cpp
Node *CreateNode(int init)
{
    Node *node = new Node;
    node->data = init;
    node->next = NULL;
    return node;
}
```

### Cấu trúc một ngăn xếp

Các phần tử trong ngăn xếp được xếp vào trên cùng, lúc lấy ra phần tử trên cùng cũng sẽ được lấy ra trước. Do đó, chúng ta chỉ cần nắm được phần tử trên cùng của stack là được. Mình sẽ tạo một struct có thành phần head là một con trỏ lưu địa chỉ của phần tử trên cùng của stack (head).

```cpp
struct Stack
{
    Node *head;
};
```

Một stack mới khởi tạo đương nhiên sẽ không có phần tử nào, chúng ta sẽ khởi gán giá trị NULL cho head của stack đó.

```cpp
void CreateStack(Stack &s)
{
    s.head = NULL;
}
```

### Kiểm tra ngăn xếp rỗng

Để kiểm tra ngăn xếp rỗng (IsEmpty), đơn giản ta chỉ cần kiểm tra xem có phần tử trên cùng của stack hay không, nếu không có thì stack đó chắc chắn rỗng.

```cpp
int IsEmpty(Stack s)
{
    if (s.head == NULL)
        return 1;
    return 0;
}
```

### Thêm một phần tử vào ngăn xếp

Để thêm một phần tử vào ngăn xếp (Push), chúng ta sẽ thêm nó vào trên cùng của stack tương tự như thêm vào đầu danh sách liên kết đơn.

```cpp
void Push(Stack &s, Node *node)
{
    if (s.head == NULL)
        s.head = node;
    else
    {
        node->next = s.head;
        s.head = node;
    }
}
```

### Lấy phần tử trên cùng ra khỏi ngăn xếp

Để lấy phần tử trên cùng ra khỏi ngăn xếp (Pop), chúng ta chỉ cần lưu trữ giá trị của phần tử trên cùng, và xóa nó đi tương tự như xóa phần tử đầu danh sách liên kết đơn. Đương nhiên chúng ta phải kiểm tra xem ngăn xếp đó không rỗng thì mới thực hiện, không thì trả về kết quả không pop được.

```cpp
int Pop(Stack &s)
{
    if (IsEmpty(s))
        return 0;
    Node *node = s.head;
    int data = node->data; // lưu trữ lại giá trị của node
    s.head = node->next;
    delete node;   // hủy node
    return data;
}
```

### Lấy giá trị phần tử trên cùng ngăn xếp

Để lấy giá trị phần tử nằm trên cùng ngăn xếp (Top), chúng ta chỉ cần làm tương tự như lấy phần tử trên cùng ra khỏi ngăn xếp, nhưng chúng ta không hủy node đó đi.

```cpp
int Top(Stack s)
{
    if (IsEmpty(s))
        return 0;
    return s.head->data;
}
```

Lưu ý: cần phân biệt giữa Pop và Top. Pop là lấy phần tử trên cùng ra khỏi ngăn xếp tức là trả về giá trị phần tử đó và hủy đi. Top chỉ trả về giá trị phần tử trên cùng mà không hủy phần tử đó.

# Hàng đợi

[Youtube: Hàng đợi | Khiêm Lê](https://youtu.be/EQsJxWX6p8k)

Hàng đợi hay queue là một cấu trúc dữ liệu động hoạt động theo cơ chế **FIFO** (**F**irst **I**n, **F**irst **O**ut), nghĩa là phần tử được thêm vào đầu tiên sẽ là phần tử được lấy ra đầu tiên.

## Các thao tác cơ bản trên hàng đợi

Các thao tác cơ bản trên hàng đợi:

- IsEmpty: kiểm tra hàng đợi có rỗng hay không
- EnQueue: thêm một phần tử vào cuối hàng đợi
- DeQueue: lấy phần tử đầu tiên ra khỏi hàng đợi (nếu hàng đợi không rỗng)
- Front: trả về giá trị của phần tử ở đầu hàng đợi (nếu hàng đợi không rỗng)

<div align="center">
    ![Hàng đợi](/static/images/2020/04/ngan-xep-va-hang-doi/Queue.png)
</div>

Hàng đợi

## Cài đặt hàng đợi

Bây giờ chúng ta hãy cùng xem cách cài đặt hàng đợi trong C++.

### Cấu trúc một phần tử

Hàng đợi cũng dựa trên danh sách liên kết đơn, do đó một phần tử trong hàng đợi có cấu trúc không khác gì một phần tử trong danh sách liên kết đơn.

```cpp
struct Node
{
    int data;
    Node *next;
};
```

Cấp phát động, khởi gán giá trị một node và trả về địa chỉ của node đó tương tự như stack hay linked list:

```cpp
Node* CreateNode(int init)
{
    Node *node = new Node;
    node->data = init;
    node->next = NULL;
    return node;
}
```

### Cấu trúc một hàng đợi

Không giống như ngăn xếp, hàng đợi yêu cầu ta phải quản lý được cả phần tử đầu và cuối, do chúng ta thêm vào hàng đợi là thêm vào cuối và lấy một phần tử là lấy từ đầu hàng đợi. Vậy chúng ta sẽ có cấu trúc Queue như sau:

```cpp
struct Queue
{
    Node *head;
    Node *tail;
};
```

Tương tự, hàng đợi rỗng khi được khởi tạo, ta sẽ gán head và tail bằng NULL:

```cpp
void CreateQueue(Queue &q)
{
    q.head = NULL;
    q.tail = NULL;
}
```

### Kiểm tra hàng đợi rỗng

Tương tự như stack, hàng đợi rỗng khi phần tử đầu hàng đợi bằng NULL, chúng ta sẽ kiểm tra như sau

```cpp
int IsEmpty(Queue q)
{
    if (q.head == NULL)
        return 1;
    return 0;
}
```

### Thêm phần tử vào cuối hàng đợi

Thêm phần tử vào cuối hàng đợi (EnQueue) thực hiện cũng tương tự như khi ta thêm phần tử vào cuối danh sách liên kết đơn, tức là thêm vào tail. Chúng ta thực hiện như sau:

```cpp
void EnQueue(Queue &q, Node *node)
{
    if (IsEmpty(q))
    {
        q.head = node;
        q.tail = node;
    }
    else
    {
        q.tail->next = node;
        q.tail = node;
    }
}
```

### Lấy phần tử đầu ra khỏi hàng đợi

Để lấy phần tử đầu ra khỏi hàng đợi (DeQueue), chúng ta sẽ lưu trữ giá trị phần tử đầu hàng đợi, sau đó xóa nó đi như xóa phần tử đầu của danh sách liên kết đơn, tất nhiên là với điều kiện hàng đợi không rỗng. Sau khi lấy phần tử đầu tiên ra, nếu như đó là phần tử duy nhất của hàng đợi thì chúng ta sẽ gán lại tail bằng NULL luôn. Chúng ta sẽ có đoạn code như sau:

```cpp
int DeQueue(Queue &q)
{
    if (IsEmpty(q))
        return 0;
    Node *node = q.head;
    int data = node->data;
    q.head = node->next;
    delete node;
    if (q.head == NULL)
        q.tail = NULL;
    return data;
}
```

### Lấy giá trị phần tử đầu hàng đợi

Lấy giá trị phần tử đầu hàng đợi cũng tương tự như lấy phần tử đầu ra khỏi hàng đợi, nhưng không xóa phần tử đầu đi. Chúng ta thực hiện như sau:

```cpp
int Front(Queue q)
{
    if (IsEmpty(q))
        return 0;
    return q.head->data;
}
```

# Tổng kết

Vậy là trong bài này, mình đã giới thiệu cho các bạn thêm hai cấu trúc dữ liệu phổ biến đó chính là ngăn xếp (stack) và hàng đợi (queue). Nếu các bạn thấy bài viết này hay, đừng quên chia sẻ cho bạn bè cùng biết, các bạn có thể để lại comment bên dưới nếu có bất kỳ thắc mắc nào. Cảm ơn các bạn đã theo dõi bài viết!

# Source code

```cpp
#include <iostream>
using namespace std;

struct Node
{
    int data;
    Node *next;
};

struct Stack
{
    Node *head;
};

void CreateStack(Stack &s)
{
    s.head = NULL;
}

Node *CreateNode(int init)
{
    Node *node = new Node;
    node->data = init;
    node->next = NULL;
    return node;
}

int IsEmpty(Stack s)
{
    if (s.head == NULL)
        return 1;
    return 0;
}

void Push(Stack &s, Node *node)
{
    if (IsEmpty(s))
        s.head = node;
    else
    {
        node->next = s.head;
        s.head = node;
    }
}

int Pop(Stack &s)
{
    if (IsEmpty(s))
        return 0;
    Node *node = s.head;
    int data = node->data;
    s.head = node->next;
    delete node;
    return data;
}

int Top(Stack s)
{
    if (IsEmpty(s))
        return 0;
    return s.head->data;
}

void DestroyStack(Stack &s)
{
    Node *node = s.head;
    while (s.head != NULL)
    {
        s.head = node->next;
        delete node;
        node = s.head;
    }
}

void PrintStack(Stack s)
{
    Node *node = s.head;
    while (node != NULL)
    {
        cout << node->data << ' ';
        node = node->next;
    }
}

int main()
{
    Stack stack;
    CreateStack(stack);

    Node *node;
    for (int i = 0; i < 10; i++)
    {
        node = CreateNode(i + 1);
        Push(stack, node);
    }
    PrintStack(stack); // 10 9 8 7 6 5 4 3 2 1
    cout << endl;

    cout << Pop(stack) << endl; // 10
    PrintStack(stack); // 9 8 7 6 5 4 3 2 1
    cout << endl;

    cout << Top(stack) << endl; // 9
    PrintStack(stack); // 9 8 7 6 5 4 3 2 1

    DestroyStack(stack);

    return 0;
}
```

```cpp
#include <iostream>
using namespace std;

struct Node
{
    int data;
    Node *next;
};

struct Queue
{
    Node *head;
    Node *tail;
};

void CreateQueue(Queue &q)
{
    q.head = NULL;
    q.tail = NULL;
}

Node* CreateNode(int init)
{
    Node *node = new Node;
    node->data = init;
    node->next = NULL;
    return node;
}

void DestroyQueue(Queue &q)
{
    Node *node = q.head;
    while (q.head != NULL)
    {
        q.head = node->next;
        delete node;
        node = q.head;
    }
    q.tail = NULL;
}

int IsEmpty(Queue q)
{
    if (q.head == NULL)
        return 1;
    return 0;
}

void EnQueue(Queue &q, Node *node)
{
    if (IsEmpty(q))
    {
        q.head = node;
        q.tail = node;
    }
    else
    {
        q.tail->next = node;
        q.tail = node;
    }
}

int DeQueue(Queue &q)
{
    if (IsEmpty(q))
        return 0;
    Node *node = q.head;
    int data = node->data;
    q.head = node->next;
    delete node;
    if (q.head == NULL)
        q.tail = NULL;
    return data;
}

int Front(Queue q)
{
    if (IsEmpty(q))
        return 0;
    return q.head->data;
}

void PrintQueue(Queue q)
{
    Node *node = q.head;
    while (node != NULL)
    {
        cout << node->data << ' ';
        node = node->next;
    }
}

int main()
{

    Queue queue;
    CreateQueue(queue);

    Node *node;
    for (int i = 0; i < 10; i++)
    {
        node = CreateNode(i + 1);
        EnQueue(queue, node);
    }

    PrintQueue(queue); // 1 2 3 4 5 6 7 8 9 10
    cout << endl;

    cout << DeQueue(queue) << endl; // 1
    PrintQueue(queue); // 2 3 4 5 6 7 8 9 10
    cout << endl;

    cout << Front(queue) << endl; // 2
    PrintQueue(queue); // 2 3 4 5 6 7 8 9 10

    return 0;
}
```

[^linked_list]: [Danh sách liên kết đơn](/blog/danh-sach-lien-ket-don)
