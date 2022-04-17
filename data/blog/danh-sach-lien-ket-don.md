---
title: 'Danh sách liên kết đơn'
date: '2020-03-31'
lastmod: '2022-03-31'
draft: false
tags: ['cau-truc-du-lieu-giai-thuat', 'lap-trinh', 'lap-trinh-c++']
authors: ['khiemle']
layout: PostLayout
images:
  [
    '/static/images/2020/03/danh-sach-lien-ket-don/Danh-sach-lien-ket-don.jpg',
    '/static/images/2020/03/danh-sach-lien-ket-don/Add-node-to-head.png',
    '/static/images/2020/03/danh-sach-lien-ket-don/Add-node-to-tail.png',
    '/static/images/2020/03/danh-sach-lien-ket-don/Insert-after-Q.png',
    '/static/images/2020/03/danh-sach-lien-ket-don/Remove-after-Q.png',
    '/static/images/2020/03/danh-sach-lien-ket-don/Remove-head.png',
    '/static/images/2020/03/danh-sach-lien-ket-don/Single-linked-list.png',
  ]
summary: 'Danh sách liên kết đơn là một cấu trúc dữ liệu quan trọng mà một lập trình viên cần nắm được. Trong bài viết này, chúng ta sẽ cùng tìm hiểu về danh sách liên kết đơn là gì, những thao tác trên danh sách liên kết đơn.'
---

![Danh sach lien ket don](/static/images/2020/03/danh-sach-lien-ket-don/Danh-sach-lien-ket-don.jpg)

[Youtube: Danh sách liên kết đơn | Khiêm Lê](https://youtu.be/UokzPpBcnr0)

# Danh sách liên kết đơn là gì?

Danh sách liên kết đơn (Single Linked List) là một cấu trúc dữ liệu động, nó là một danh sách mà mỗi phần tử đều liên kết với phần tử đúng sau nó trong danh sách. Mỗi phần tử (được gọi là một node hay nút) trong danh sách liên kết đơn là một cấu trúc có hai thành phần:

- Thành phần dữ liệu: lưu thông tin về bản thân phần tử đó.
- Thành phần liên kết: lưu địa chỉ phần tử đứng sau trong danh sách, nếu phần tử đó là phần tử cuối cùng thì thành phần này bằng NULL.

<p align="center">
  <img src="/static/images/2020/03/danh-sach-lien-ket-don/Single-linked-list.png" alt="Minh hoạ danh sách liên kết đơn"/>
</p>

Minh họa danh sách liên kết đơn

# Đặc điểm của danh sách liên kết đơn

Do danh sách liên kết đơn là một cấu trúc dữ liệu động, được tạo nên nhờ việc cấp phát động nên nó có một số đặc điểm sau đây:

- Được cấp phát bộ nhớ khi chạy chương trình
- Có thể thay đổi kích thước qua việc thêm, xóa phần tử
- Kích thước tối đa phụ thuộc vào bộ nhớ khả dụng của RAM
- Các phần tử được lưu trữ ngẫu nhiên (không liên tiếp) trong RAM

Và do tính liên kết của phần tử đầu và phần tử đứng sau nó trong danh sách liên kết đơn, nó có các đặc điểm sau:

- Chỉ cần nắm được phần tử đầu và cuối là có thể quản lý được danh sách
- Truy cập tới phần tử ngẫu nhiên phải duyệt từ đầu đến vị trí đó
- Chỉ có thể tìm kiếm tuyến tính một phần tử

# Cài đặt danh sách liên kết đơn

Trước khi đi vào cài đặt danh sách liên kết đơn, hãy chắc chắn rằng bạn đã nắm vững phần con trỏ và cấp phát động trong C++. Do danh sách liên kết đơn là một cấu trúc dữ liệu động, nếu bạn không nắm vững con trỏ và cấp phát động sẽ rất khó để bạn hiểu được bài viết này. Nếu bạn cảm thấy chưa tự tin, hãy dành ít thời gian để xem bài viết _Con trỏ và cấp phát động trong C++_[^pointer_in_c++] của mình. Còn bây giờ thì bắt đầu thôi!

## Tạo node

Danh sách liên kết đơn được tạo thành từ nhiều node, do đó, chúng ta sẽ cùng đi từ node trước. Một node gồm hai thành phần là thành phần dữ liệu và thành phần liên kết. Thành phần dữ liệu có thể là kiểu dữ liệu có sẵn hoặc bạn tự định nghĩa (struct hay class...), trong bài viết này để đơn giản mình sẽ sử dụng kiểu int cho phần dữ liệu. Thành phần liên kết là địa chỉ đương nhiên sẽ là con trỏ, con trỏ này trỏ đến node tiếp theo, do đó, con trỏ này là con trỏ trỏ vào một node.

```cpp
struct Node
{
	int data;
	Node* next;
};
```

Để tạo một node mới, ta thực hiện cấp phát động cho node mới, khởi tạo giá trị ban đầu và trả về địa chỉ của node mới được cấp phát.

```cpp
Node* CreateNode(int init_data)
{
	Node* node = new Node;
	node->data = init_data;
	node->next = NULL;      // node vừa tạo chưa thêm vào danh sách nên chưa liên kết với phần tử nào cả nên phần liên kết gán bằng NULL
	return node;
}
```

## Tạo danh sách liên kết đơn

Ta đã có được thành phần tạo nên danh sách liên kết đơn là node, tiếp theo chúng ta cần quản lý chúng bằng cách biết được phần tử đầu và cuối. Vì mỗi phần tử đều liên kết với phần tử kế vậy nên tả chỉ cần biết phần tử đầu và cuối là có thể quản lý được danh sách này. Vậy đơn giản ta cần tạo một cấu trúc lưu trữ địa chỉ phần tử đầu (head) và phần tử cuối (hay phần tử đuôi tail).

```cpp
struct LinkedList
{
	Node* head;
	Node* tail;
};
```

Khi mới tạo danh sách, danh sách sẽ không có phần tử nào, do đó head và tail không trỏ vào đâu cả, ta sẽ gán chúng bằng NULL. Ta xây dựng hàm tạo danh sách như sau:

```cpp
void CreateList(LinkedList& l)
{
	l.head = NULL;
	l.tail = NULL;
}
```

Bây giờ để tạo một danh sách, ta làm như sau:

```cpp
LinkedList list;
CreateList(list); // Gán head và tail bằng NULL
```

## Thêm phần tử vào danh sách

### Thêm vào đầu

Để thêm node vào đầu danh sách, đầu tiên ta cần kiếm tra xem danh sách đó có rỗng hay không, nếu danh sách rỗng, ta chỉ cần gán head và tail của danh sách bằng node đó. Ngược lại nếu danh sách không rỗng, ta thực hiện trỏ thành phần liên kết vào head, sau đó gán lại head bằng node mới.

```cpp
void AddHead(LinkedList& l, Node* node)
{
	if (l.head == NULL)
	{
		l.head = node;
		l.tail = node;
	}
	else
	{
		node->next = l.head;
		l.head = node;
	}
}
```

<p align="center">
  <img src="/static/images/2020/03/danh-sach-lien-ket-don/Add-node-to-head.png" alt="Thêm phần tử vào đầu danh sách liên kết đơn"/>
</p>

Thêm phần tử vào đầu danh sách liên kết đơn

Như trong hình trên, chúng ta thêm node có data bằng 0 vào danh sách. Ta thực hiện trỏ next của node đó vào head của danh sách (chính là node đầu tiên của danh sách có data bằng 1), sau đó ta trỏ head vào node có data 0 vừa được thêm. Vậy là phần tử đó đã nằm ở đầu danh sách rồi.

### Thêm vào cuối

Tương tự, để thêm node vào cuối danh sách, đầu tiên ta kiểm tra xem danh sách rỗng hay không, rỗng thì gán head và tail đều bằng node mới. Nếu không rỗng, ta thực hiện trỏ tail->next vào node mới, sau đó gán lại tail bằng node mới (vì bây giờ node mới thêm chính là tail).

```cpp
void AddTail(LinkedList& l, Node* node)
{
	if (l.head == NULL)
	{
		l.head = node;
		l.tail = node;
	}
	else
	{
		l.tail->next = node;
		l.tail = node;
	}
}
```

<p align="center">
  <img src="/static/images/2020/03/danh-sach-lien-ket-don/Add-node-to-tail.png" alt="Thêm phần tử vào cuối danh sách liên kết đơn"/>
</p>

Thêm phần tử vào cuối danh sách liên kết đơn

Trong hình trên, chúng ta thực hiện thêm node có data bằng 6 vào danh sách. Tail hiện tại là node có data 5, thực hiện gán tail->next bằng node mới để nối thêm nó vào đuôi danh sách, lúc này node mới trở thành phần tử cuối danh sách nên ta gán tail lại bằng node mới.

### Thêm vào sau node bất kỳ

Để thêm một node p vào sau node q bất kỳ, đầu tiên ta cần kiếm tra xem node q có NULL hay không, nếu node q là NULL tức là danh sách rỗng, vậy thì ta sẽ thêm vào đầu danh sách. Nếu node q không NULL, tức là tồn tại trong danh sách, ta thực hiện trỏ p->next = q->next, sau đó q->next = p. Tiếp theo chúng ta kiểm tra xem node q trước đó có phải là node cuối hay không, nếu node q là node cuối thì thêm p vào, p sẽ thành node cuối nên ta gán lại tail = p.

```cpp
void InsertAfterQ(LinkedList& l, Node* p, Node* q)
{
	if (q != NULL)
	{
		p->next = q->next;
		q->next = p;
		if (l.tail == q)
			l.tail = p;
	}
	else
		AddHead(l, p);
}
```

<p align="center">
  <img src="/static/images/2020/03/danh-sach-lien-ket-don/Insert-after-Q.png" alt="Thêm phần tử vào sau nút Q trong danh sách liên kết đơn"/>
</p>

Thêm phần tử vào sau nút Q trong danh sách liên kết đơn

Trong hình trên, ta thêm node có data bằng 4 (node p) vào sau node có data bằng 3 (node q). Ta trỏ next của node p vào next của node q tức là node có data bằng 5, sau đó trỏ next của node q vào node p vậy là node p đã được thêm vào danh sách.

## Xóa phần tử khỏi danh sách

### Xóa ở đầu

Để xóa phần tử ở đầu danh sách, ta kiểm tra xem danh sách đó có rỗng hay không, nếu rỗng, ta không cần xóa, trả về kết quả là 0. Nếu danh sách không rỗng, ta thực hiện lưu node head lại, sau đó gán head bằng next của node head, sau đó xóa node head đi. Tiếp theo ta cần kiểm tra xem danh sách vừa bị xóa đi node head có rỗng hay không, nếu rỗng ta gán lại tail bằng NULL luôn sau đó trả về kết quả 1.

```cpp
int RemoveHead(LinkedList& l, int& x)
{
	if (l.head != NULL)
	{
		Node* node = l.head;
		x = node->data;      // Lưu giá trị của node head lại
		l.head = node->next;
		delete node;         // Hủy node head đi
		if (l.head == NULL)
			l.tail = NULL;
		return 1;
	}
	return 0;
}
```

Lưu ý trước khi xóa node head đi, ta dùng biến tham chiếu x để lưu trữ lại giá trị của node bị hủy để sử dụng.

<p align="center">
  <img src="/static/images/2020/03/danh-sach-lien-ket-don/Remove-head.png" alt="Xóa phần tử đầu danh sách liên kết đơn"/>
</p>

Xóa phần tử đầu danh sách liên kết đơn

Trong hình trên, mình thực hiện xóa node đầu tiên có data bằng 0. Mình trỏ head đến next của node 0 (hiện đang là head), thì head lúc này sẽ là node 1, sau đó mình hủy đi node 0 là được.

### Xóa ở sau node bất kỳ

Để xóa một node p sau node q bất kỳ, ta kiểm tra xem node q có NULL hay không, nếu node q NULL thì không tồn tại trong danh sách, do đó trả về 0, không xóa. Nếu node q khác NULL nhưng next của q là NULL, tức là p bằng NULL thì không xóa, trả về 0 (do sau q không có node nào cả, q là tail). Nếu node p tồn tại, ta thực hiện kiểm tra xem node p có phải là tail hay không, nếu node p là tail thì gán lại tail là q, tức là node trước đó để xóa node p đi.

```cpp
int RemoveAfterQ(LinkedList& l, Node* q, int& x)
{
	if (q != NULL)
	{
		Node* p = q->next;
		if (p != NULL)
		{
			if (l.tail == p)
				l.tail = q;
			q->next = p->next;
			x = p->data;
			delete p;
			return 1;
		}
		return 0;
	}
	return 0;
}
```

<p align="center">
  <img src="/static/images/2020/03/danh-sach-lien-ket-don/Remove-after-Q.png" alt="Xóa phần tử sau nút Q trong danh sách liên kết đơn"/>
</p>

Xóa phần tử sau nút Q trong danh sách liên kết đơn

Trong hình trên, ta thực hiện xóa node có data 3 (node p) sau node có data 2 (node q). Ta trỏ next của node q vào next của node p tức là node có data 4, sau đó xóa node p đi là xong.

## Duyệt danh sách và in

Sau khi có các thao tác thêm, xóa, chúng ta có thể in ra danh sách để kiểm tra xem có hoạt động đúng hay không. Để in danh sách, ta duyệt từ đầu đến cuối danh sách và in ra trong lúc duyệt. Ta gán một node bằng head, sau đó kiểm tra xem node đó có NULL hay không, không thì in ra data của node đó, sau đó gán tiếp node đó bằng next của chính nó tức node đó bây giờ là node tiếp theo, cứ như vậy cho đến hết.

```cpp
void PrintList(LinkedList l)
{
	if (l.head != NULL)
	{
		Node* node = l.head;
		while (node != NULL)
		{
			cout << node->data << ' ';
			node = node->next; // Chuyển sang node tiếp theo
		}
	}
}
```

## Lấy giá trị node bất kỳ

Để lấy giá trị phần tử trong danh sách, ta thực hiện duyệt tương tự như khi in phần tử. Ta sẽ tạo một biến đếm để biết vị trí hiện tại, duyệt qua các node cho đến khi node bằng NULL hoặc biến đếm bằng với vị trí node cần lấy. Kiểm tra xem nếu node khác NULL và biến đếm bằng vị trí cần lấy, ta sẽ trả về địa chỉ của node đó, ngược lại trả về NULL (danh sách rỗng hoặc là vị trí cần lấy nằm ngoài phạm vi của danh sách).

```cpp
Node* GetNode(LinkedList& l, int index)
{
	Node* node = l.head;
	int i = 0;
	while (node != NULL && i != index)
	{
		node = node->next;
		i++;
	}
	if (i == index && node != NULL)
		return node;
	return NULL;
}
```

## Tìm kiếm phần tử trong danh sách

Ý tưởng tìm kiếm phần tử cũng là duyệt danh sách, nếu như chưa tìm thấy thì tiếp tục duyệt. Sau khi kết thúc duyệt, ta chỉ cần kiểm tra xem node duyệt có bằng NULL hay không, nếu không tức là đã tìm thấy, ta sẽ trả về địa chỉ của node đó.

```cpp
Node* Search(LinkedList l, int x)
{
	Node* node = l.head;
	while (node != NULL && node->data != x)
		node = node->next;
	if (node != NULL)
		return node;
	return NULL;
}
```

## Đếm số phần tử của danh sách

Đếm số phần tử thì cũng tương tự, ta áp dụng duyệt từ đầu đếm cuối và đếm số node.

```cpp
int Length(LinkedList l)
{
	int count = 0;
	Node* node = l.head;
	while (node != NULL)
	{
		count++;
		node = node->next;
	}
	return count;
}
```

## Xóa danh sách

Để xóa danh sách, ta cần hủy tất cả các node tức là duyệt và hủy từng node. Ở đây mình sẽ dùng lại hàm RemoveHead. Đầu tiên, ta gán một node bằng head, kiểm tra nếu node đó khác NULL thì gọi RemoveHead và gán lại node bằng head tiếp, cứ lặp như vậy cho đến khi node đó NULL thì thôi. Sau khi xóa hết tất cả phần tử thì gán lại tail bằng NULL.

```cpp
void DestroyList(LinkedList& l)
{
	int x;
	Node* node = l.head;
	while (node != NULL)
	{
		RemoveHead(l, x);
		node = l.head;
	}
	l.tail = NULL;
}
```

# Tổng kết

Vậy là trong bài này, mình đã giới thiệu với các bạn về danh sách liên kết đơn và một số thao tác cơ bản trên danh sách. Các bạn không nhất thiết phải làm theo cách của mình, có rất nhiều cách để thực hiện khác nhau, chỉ cần bạn nắm vững về con trỏ và cấp phát động trong C++. Nếu thấy hay, đừng quên chia sẻ cho bạn bè. Cảm ơn các bạn đã theo dõi bài viết!

# Source code

```cpp
#ifndef LinkedList_hpp
#define LinkedList_hpp

struct Node
{
	int data;
	Node* next;
};

struct LinkedList
{
	Node* head;
	Node* tail;
};

Node* CreateNode(int init_data);
void CreateList(LinkedList& l);
void AddHead(LinkedList& l, Node* node);
void AddTail(LinkedList& l, Node* node);
void InsertAfterQ(LinkedList& l, Node* p, Node* q);
int RemoveHead(LinkedList& l, int& x);
int RemoveTail(LinkedList& l, int& x);
int RemoveAfterQ(LinkedList& l, Node* q, int& x);
Node* GetNode(LinkedList l, int index);
void PrintList(LinkedList l);
Node* Search(LinkedList l, int x);
int Length(LinkedList l);
void DestroyList(LinkedList& l);

#endif
```

```cpp
#include <iostream>
#include "LinkedList.hpp"
using namespace std;

Node* CreateNode(int init_data)
{
	Node* node = new Node;
	node->data = init_data;
	node->next = NULL;
	return node;
}

void CreateList(LinkedList& l)
{
	l.head = NULL;
	l.tail = NULL;
}

void AddHead(LinkedList& l, Node* node)
{
	if (l.head == NULL)
	{
		l.head = node;
		l.tail = node;
	}
	else
	{
		node->next = l.head;
		l.head = node;
	}
}

void AddTail(LinkedList& l, Node* node)
{
	if (l.head == NULL)
	{
		l.head = node;
		l.tail = node;
	}
	else
	{
		l.tail->next = node;
		l.tail = node;
	}
}

void InsertAfterQ(LinkedList& l, Node* p, Node* q)
{
	if (q != NULL)
	{
		p->next = q->next;
		q->next = p->next;
		if (l.tail == q)
			l.tail = p;
	}
	else
		AddHead(l, p);
}

int RemoveHead(LinkedList& l, int& x)
{
	if (l.head != NULL)
	{
		Node* node = l.head;
		x = node->data;
		l.head = node->next;
		delete node;
		if (l.head == NULL)
			l.tail = NULL;
		return 1;
	}
	return 0;
}

int RemoveAfterQ(LinkedList& l, Node* q, int& x)
{
	if (q != NULL)
	{
		Node* p = q->next;
		if (p != NULL)
		{
			if (l.tail == p)
				l.tail = q;
			q->next = p->next;
			x = p->data;
			delete p;
			return 1;
		}
		return 0;
	}
	return 0;
}

Node* GetNode(LinkedList l, int index)
{
	Node* node = l.head;
	int i = 0;
	while (node != NULL && i != index)
	{
		node = node->next;
		i++;
	}
	if (i == index && node != NULL)
		return node;
	return NULL;
}

void PrintList(LinkedList l)
{
	if (l.head != NULL)
	{
		Node* node = l.head;
		while (node != NULL)
		{
			cout << node->data << ' ';
			node = node->next;
		}
	}
}

Node* Search(LinkedList l, int x)
{
	Node* node = l.head;
	while (node != NULL && node->data != x)
		node = node->next;
	if (node != NULL)
		return node;
	return NULL;
}

int Length(LinkedList l)
{
	int count = 0;
	Node* node = l.head;
	while (node != NULL)
	{
		count++;
		node = node->next;
	}
	return count;
}

void DestroyList(LinkedList& l)
{
	int x;
	Node* node = l.head;
	while (node != NULL)
	{
		RemoveHead(l, x);
		node = l.head;
	}
	l.tail = NULL;
}
```

```cpp
#include <iostream>
#include "LinkedList.hpp"
using namespace std;

int main()
{
	// Create a linked list
	LinkedList list;
	CreateList(list);

	// Add sample data to list
	Node* node;
	for (auto i = 1; i <= 10; i++)
	{
		// Create new node with init data is i
		node = CreateNode(i);

		// Add node to head
		// List that is added node by AddHead will be reversed
		//AddHead(list, node);

		// Add node to Tail
		AddTail(list, node);
	}

	// Print list
	PrintList(list);
	cout << endl;

	// Get list's length
	int len = Length(list);
	cout << "Length of list: " << len << endl;

	// Get node at index 7
	Node* nodeAtIdx7 = GetNode(list, 7);
	if (nodeAtIdx7 != NULL)
		cout << "Data at node have idx 7: " << nodeAtIdx7->data << endl;

	// Search for 4 in list
	Node* search4InList = Search(list, 4);
	if (search4InList != NULL)
		cout << "4 was founded" << endl;
	else
		cout << "4 not Found" << endl;

	// Remove node after 4 in list
	int x;
	int res = RemoveAfterQ(list, search4InList, x);
	if (res)
	{
		cout << "Data of node has been removed: " << x << endl;
		cout << "List after removed: ";
		PrintList(list);
		cout << endl;
	}
	else
		cout << "Nothing is removed" << endl;

	// Insert 2409 after node 4
	Node* node2409 = CreateNode(2409);
	InsertAfterQ(list, node2409, search4InList);
	cout << "List after insert 2409 after 4: ";
	PrintList(list);
	cout << endl;


	// Remove Head
	res = RemoveHead(list, x);
	if (res)
	{
		cout << "Data of node has been removed: " << x << endl;
		cout << "List after removed head: ";
		PrintList(list);
		cout << endl;
	}
	else
		cout << "Nothing is removed" << endl;


	// Destroy all node
	DestroyList(list);

	return 0;
}
```

[^pointer_in_c++]: [Con trỏ và cấp phát động trong C++](/blog/con-tro-va-cap-phat-dong-trong-c++)
