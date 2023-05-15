---
title: 'Cây nhị phân và cây nhị phân tìm kiếm'
date: '2020-06-10'
lastmod: '2020-06-10'
draft: false
tags: ['cau-truc-du-lieu-giai-thuat', 'lap-trinh', 'lap-trinh-c++']
images:
  [
    '/static/thumbnails/2020/Cay-nhi-phan-va-cay-nhi-phan-tim-kiem.jpg',
    '/static/images/2020/06/cay-nhi-phan-va-cay-nhi-phan-tim-kiem/BinarySearchTree.jpg',
    '/static/images/2020/06/cay-nhi-phan-va-cay-nhi-phan-tim-kiem/BinaryTree.jpg',
    '/static/images/2020/06/cay-nhi-phan-va-cay-nhi-phan-tim-kiem/Tree.jpg',
  ]
authors: ['khiemle']
layout: PostLayout
summary: 'Cấu trúc cây là một cấu trúc dữ liệu được sử dụng rất phổ biến. Trong bài viết này mình sẽ giới thiệu đến mọi người một phiên bản đặc biệt của cấu trúc cây là cây nhị phân.'
---

![Cây nhị phân](/static/thumbnails/2020/Cay-nhi-phan-va-cay-nhi-phan-tim-kiem.jpg)

[Youtube: Cây nhị phân và cây nhị phân tìm kiếm | Khiêm Lê](https://youtu.be/hbqrBvflihI)

Cây nhị phân là một cấu trúc dữ liệu quan trọng mà trong môn Cấu trúc dữ liệu và giải thuật các bạn sẽ được học, nó được sử dụng rất rộng rãi trong lập trình vì các ứng dụng của nó. Trong bài viết này, mình sẽ giới thiệu đến các bạn về cây nhị phân và một phiên bản đặc biệt của nó là cây nhị phân tìm kiếm. Trước tiên, ta cần biết được cây là gì?

# Cấu trúc cây

Cấu trúc cây (Tree) là một tập hợp các phần tử gọi là nút (node), mỗi cây có một nút gốc (root) chứa nhiều nút con, mỗi nút con lại là một tập hợp các nút khác gọi là cây con (subtree).

<div align="center">
  ![Cấu trúc cây](/static/images/2020/06/cay-nhi-phan-va-cay-nhi-phan-tim-kiem/Tree.jpg)
</div>

Cấu trúc cây

Các khái niệm cơ bản về cây:

- Bậc của nút: là số nút con của nút đó. Ví dụ bậc của nút A là 3, bậc của nút C là 1, bậc của nút G là 0...
- Bậc của cây: là bậc lớn nhất của nút trong cây đó, cây bậc n sẽ được gọi là cây n - phân. Ví dụ cây trong hình trên có bậc 3, gọi là cây tam phân, cây có bậc 2 gọi là cây nhị phân...
- Nút lá: nút lá là nút có bậc bằng 0. Ví dụ các nút lá: B, G, H, K, L, F
- Nút nhánh: là nút có bậc khác 0 mà không phải nút gốc (hay còn gọi là nút trung gian). Ví dụ các nút C, D, E
- Mức của nút: là số nguyên đếm từ 0, các nút ngang hàng nhau thì có cùng mức. Nút gốc A có mức là 0, mức 1 gồm các nút B, C, D, nút 3 gồm H, K, L.
- Chiều cao (chiều sâu): là mức lớn nhất của các nút lá. Ví dụ cây trên có nút lá bậc lớn nhất là H, K, L mức 3, vậy chiều cao của cây là 3.
- Độ dài đường đi đến nút x: là số nhánh (cạnh nối hai nút) cần đi qua tính từ nút gốc đến nút x. Hay độ dài đường đi đến nút mức i chính là i. Ví dụ nút E có độ dài đường đi là 2.

Khi bạn đã nắm được các khái niệm cơ bản này, chúng ta hãy đến luôn với cây nhị phân.

# Cây nhị phân

Cây nhị phân là một trường hợp đặc biệt của cấu trúc cây và nó cũng phổ biến nhất. Đúng như tên gọi của nó, cây nhị phân có bậc là 2 và mỗi nút trong cây nhị phân đều có bậc không quá 2.

<div align="center">
  ![Cây nhị phân](/static/images/2020/06/cay-nhi-phan-va-cay-nhi-phan-tim-kiem/Tree.jpg)
</div>

Cây nhị phân

## Các khái niệm

Có một số khái niệm khác về cây nhị phân các bạn cần nắm như sau:

- Cây nhị phân đúng: là cây nhị phân mà mỗi nút của nó đều có bậc 2. Ví dụ như hình trên, hoặc hình trên bỏ đi nút H và I cũng là cây nhị phân đúng.
- Cây nhị phân đầy đủ là cây nhị phân có mức của các nút lá đều bằng nhau. Ví dụ hình trên, tất cả các nút lá đều có mức 3.
- Cây nhị phân tìm kiếm (sẽ tìm hiểu bên dưới)
- Cây nhị phân cân bằng: số phần tử của cây con bên trái chênh lệch không quá 1 so với cây con bên phải.

## Định nghĩa cấu trúc nút

Nhìn vào hình, ta có thể dễ dàng phân tích được rằng, mỗi nút trong cây nhị phân sẽ gồm 3 thành phần như sau:

- Thành phần dữ liệu: có thể là bất kỳ kiểu dữ liệu nào.
- Thành phần liên kết trái: lưu trữ địa chỉ của nút gốc của cây con bên trái. Kiểu dữ liệu là con trỏ trỏ vào node.
- Thành phân liên kết phải: lưu trữ địa chỉ của nút gốc của cây con bên phải. Kiểu dữ liệu là con trỏ trỏ vào node.

Chúng ta sẽ có struct lưu trữ một node như sau - ở đây để đơn giản mình sử dụng kiểu dữ liệu int cho thành phần dữ liệu của node:

```cpp
struct Node
{
    int data;
    Node *left;
    Node *right;
};
```

Khi tạo một nút node mới, chúng ta cần phải gán lại các thành phần của node để nó không nhận giá trị rác, tránh lỗi không mong muốn. Chúng ta sẽ tạo một biến động cho node và trả về địa chỉ của node đó, mình sẽ có đoạn code tạo node như sau:

```cpp
Node *CreateNode(int init)
{
    Node *p = new Node;
    p->data = init;
    p->left = NULL;
    p->right = NULL;
    return p;
}
```

## Định nghĩa cấu trúc cây

Để quản lý một cái cây, bạn chỉ cần quản lý được nút gốc, bạn có thể đi được đến các nhánh và lá của nó từ đó. Trên thực tế bạn không cần phải định nghĩa một kiểu dữ liệu nào để quản lý cả, tuy nhiên, để cho code rõ ràng hơn, bạn nên định nghĩa một kiểu dữ liệu cây nữa.

```cpp
typedef Node* Tree;
```

Lúc này, khi tạo một cây, bản chất là nó sẽ tạo cho bạn một con trỏ có thể trỏ vào một node.

```cpp
Tree myTree;
```

Vì nó là con trỏ nên các bạn gán nó bằng NULL để tránh lỗi, nhưng để mọi thứ rõ ràng hơn, mình sẽ dùng hàm tạo cây đơn giản gán nó bằng NULL.

```cpp
void CreateTree(Tree &root)
{
    root = NULL;
}

// Khi tạo cây
CreateTree(myTree);
```

## Duyệt cây nhị phân

Có 3 cách duyệt cây nhị phân:

- Duyệt tiền tự (NLR): duyệt nút gốc, duyệt tiền tự cây con trái, duyệt tiền tự cây con phải.
- Duyệt trung tự (LNR): duyệt trung tự cây con trái, duyệt nút gốc, duyệt trung tự cây con phải.
- Duyệt hậu tự (LRN): duyệt hậu tự cây con trái, duyệt hậu tự cây con phải, duyệt nút gốc.

Để bạn hiểu rõ hơn ba cách duyệt này, chúng ta sẽ sử dụng lại hình ảnh cây nhị phân trên:

<div align="center">
  ![Cây nhị phân](/static/images/2020/06/cay-nhi-phan-va-cay-nhi-phan-tim-kiem/BinaryTree.jpg)
</div>

Cây nhị phân

- Duyệt tiền tự: A B D H I E K L C F M N G O P
- Duyệt trung tự: H D I B K E L A M F N C O G P
- Duyệt hậu tự: H I D K L E B M N F O P G C A

Ứng với từng cách duyệt đó, chúng ta sẽ có các hàm duyệt cây như sau:

```cpp
void NLR(Tree root)
{
    if (root)
    {
        // Xử lý nút gốc (root)
        NLR(root->left);
        NLR(root->right);
    }
}
```

```cpp
void LNR(Tree root)
{
    if (root)
    {
        LNR(root->left);
        // Xử lý nút gốc (root)
        LNR(root->right);
    }
}
```

```cpp
void LRN(Tree root)
{
    if (root)
    {
        LRN(root->left);
        LRN(root->right);
        // Xử lý nút gốc (root)
    }
}
```

## Hủy cây nhị phân

Để hủy đi cây nhị phân, các bạn cũng thực hiện duyệt và xóa đi các nút của cây, tuy nhiên, các bạn dễ thấy rằng, nếu ta duyệt tiền tự và trung tự, khi xóa nút nhánh thì sẽ bị mất luôn địa chỉ của các nút con. Do đó, việc hủy cây nhị phân bắt buộc phải duyệt hậu tự. Hay nói cách khác, bạn phải xóa các phần tử là nút lá xóa dần lên đến nút gốc.

Chúng ta sẽ có hàm hủy như sau:

```cpp
void DestroyTree(Tree &root)
{
    if (root)
    {
        DestroyTree(root->left);
        DestroyTree(root->right);
        delete root;
    }
}
```

Như vậy là chúng ta đã tìm hiểu về cách tạo một nút, kết nối chúng lại thành một cây nhị phân, duyệt cây và hủy cây. Tiếp theo chúng ta sẽ tìm hiểu về cây nhị phân đặc biệt khác là cây nhị phân tìm kiếm.

# Cây nhị phân tìm kiếm

Cây nhị phân tìm kiếm là cây nhị phân mà trong đó, các phần tử của cây con bên trái đều nhỏ hơn phần tử hiện hành và các phần tử của cây con bên phải đều lớn hơn phần tử hiện hành. Do tính chất này, cây nhị phân tìm kiếm không được có phần tử cùng giá trị.

<div align="center">
  ![Cây nhị phân tìm kiếm](/static/images/2020/06/cay-nhi-phan-va-cay-nhi-phan-tim-kiem/BinarySearchTree.jpg)
</div>

Binary Search Tree

Nhờ vào tính chất đặc biệt này, cây nhị phân tìm kiếm được sử dụng để tìm kiếm phần tử nhanh hơn (tương tự với tìm kiếm nhị phân). Khi duyệt cây nhị phân theo cách duyệt trung tự, bạn sẽ thu được một mảng có thứ tự. Chúng ta sẽ lần lượt tìm hiểu qua chúng.

## Thêm phần tử vào cây nhị phân tìm kiếm

Để thêm phần tử vào cây nhị phân tìm kiếm, ta phải thêm vào cây nhưng vẫn đảm bảo được cây đó vẫn là cây nhị phân tìm kiếm. Ví dụ thêm phần tử 12 vào cây trong hình trên, mình sẽ cần chèn vào vị trí bên trái 13. Hàm duyệt tìm vị trí thích hợp và chèn của mình như sau:

```cpp
void AddNode(Tree &root, Node *node)
{
    if (root)
    {
        if (root->data == node->data) // Nếu bị trùng giá trị thì không thêm
            return;
        if (node->data < root->data) // Thêm vào cây con bên trái (nhỏ hơn nút hiện tại)
            AddNode(root->left, node);
        else
            AddNode(root->right, node); // Thêm vào cây con bên phải (lớn hơn nút hiện tại)
    }
    else
    {
        root = node; // Đã tìm thấy vị trí thích hợp, thêm node vào
    }
}
```

## Tìm một phần tử trong cây nhị phân tìm kiếm

Như đã giới thiệu ở trên, để tìm một phần tử trong cây nhị phân tìm kiếm, chúng ta sẽ thực hiện tương tự việc tìm kiếm nhị phân. Nếu như nút cần tìm nhỏ hơn nút đang xét, chúng ta sẽ tìm cây con bên trái, ngược lại chúng ta sẽ tìm trong cây con bên phải, nếu đúng nút cần tìm thì mình sẽ trả về địa chỉ của nút đó. Mình sẽ có thuật toán sau:

```cpp
Node *FindNode(Tree root, int x)
{
    if (root)
    {
        if (root->data == x) // Tìm thấy
            return root;
        if (x < root->data)
            return FindNode(root->left, x); // Tìm cây con bên trái
        return FindNode(root->right, x); // Tìm cây con bên phải
    }
    return NULL; // Không tìm thấy
}
```

## Hủy nút trên cây nhị phân tìm kiếm

Để hủy một nút có khóa X trong cây nhị phân tìm kiếm, chúng ta cần giải quyết ba trường hợp sau:

1. Nút X là nút lá, ta xóa đi mà không làm ảnh hưởng đến các nút khác. Ví dụ xóa nút 15 đi không ảnh hưởng gì đến các nút khác.
2. Nút X có 1 cây con, chúng ta chỉ cần nối nút cha của X với nút con của X. Ví dụ xóa nút 13 đi, ta chỉ cần nối nút 18 và 15 lại, sau đó xóa nút 13 đi.
3. Nút X có đầy đủ 2 cây con: vì X có đầy đủ 2 nút nên nếu ta xóa đi, ta sẽ bị mất toàn bộ cây con. Do đó chúng ta cần tìm phần tử thế mạng cho X mà vẫn đảm bảo được cây nhị phân tìm kiếm, sau đó mới xóa X đi.

Đối với hai trường hợp đầu thì dễ, tuy nhiên, với trường hợp thứ 3, chúng ta cần phải giải quyết vấn đề tìm phần tử thế mạng cho x, chúng ta sẽ có hai cách thực hiện như sau:

1. Nút thế mạng là nút có khóa nhỏ nhất (trái nhất) của cây con bên phải x.
2. Nút thế mạng là nút có khóa lớn nhất (phải nhất) của cây con bên trái x.

Lấy ví dụ cho các bạn dễ hiểu hơn, hình phía trên, xóa đi phần tử 18 theo cách 1, phần tử lớn nhất của cây con bên trái là 15, vậy thì thay 18 bằng 15 rồi xóa đi nút 15 cuối. Cách 2, phần tử nhỏ nhất của cây con bên phải là 23, vậy 18 sẽ thay bằng 23 và xóa nút 23 đó đi.

Đối với hai trường hợp đầu tiên khá đơn giản, nên mình sẽ lồng nó vào code luôn ở phần dưới, mình sẽ giải quyết cách tìm phần tử thế mạng ở trường hợp 3 trước và theo cả hai cách. Theo cách 1, mình sẽ làm như sau:

```cpp
// nút p là nút cần thay thế, tree là cây đang xét (cây bên phải)
void FindAndReplace1(Tree &p, Tree &tree)
{
    if (tree->left) // chưa phải nhỏ nhất (trái nhất)
        FindAndReplace1(p, tree->left); // tiếp tục tìm
    else // tree là nút trái nhất
    {
        p->data = tree->data; // copy data
        p = tree; // trỏ nút p vào nút tree sẽ làm thế mạng bị xóa
        tree = tree->right; // nút trái không còn tuy nhiên nút phải có thể còn nên ta phải nối chúng lại
    }
}
```

Đối với trường hợp này, các bạn phải gọi hàm FindAndReplace1(p, root->right) trong hàm DeleteNode ở phía trên. Trường hợp thứ 2 thì ngược lại.

```cpp
// nút p là nút cần thay thế, tree là cây đang xét (cây bên trái)
void FindAndReplace2(Tree &p, Tree &tree)
{
    if (tree->right) // chưa phải lớn nhất (phải nhất)
        FindAndReplace2(p, tree->right); // tiếp tục tìm
    else // tree là nút trái nhất
    {
        p->data = tree->data; // copy data
        p = tree; // trỏ nút p vào nút tree sẽ làm thế mạng bị xóa
        tree = tree->left; // nút phải không còn tuy nhiên nút trái có thể còn nên ta phải nối chúng lại
    }
}
```

Và trong hàm DeleteNode, các bạn sẽ gọi hàm FindAndReplace(p, root->left). Bây giờ, tổng hợp lại, chúng ta đã có thể dể dàng xóa một nút khỏi cây nhị phân tìm kiếm, mình sẽ code như sau:

```cpp
void DeleteNode(Tree &root, int x)
{
    if (root)
    {
        if (x > root->data)
            DeleteNode(root->right, x);
        else if (x < root->data)
            DeleteNode(root->left, x);
        else // nút hiện tại (root) là nút cần xóa
        {
            Node *p = root; // lưu lại nút cần xóa tránh bị ghi đè
            if (!root->left)
                root = root->right; // trường hợp 1
            else if (!root->right)
                root = root->left; // trường hợp 2
            else
                FindAndReplace1(p, root->right); // cách 1
                // FindAndReplace2(p, root->left); // cách 2
            delete p; // xóa nút
        }
    }
    else
    {
        cout << "Not found!\n"; // Không tìm thấy phần tử cần xóa
    }
}
```

# Tổng kết

Vậy là qua bài viết này, mình đã giới thiệu đến các bạn về cấu trúc cây, cây nhị phân và cây nhị phân tìm kiếm. Đương nhiên, mình không phải "master" và mình cũng không thể nào mà nắm được hết tất cả các lý thuyết đồ thị hay thuật toán, do đó sai sót là không thể tránh khỏi, hy vọng các bạn góp ý thêm.

Cảm ơn các bạn đã theo dõi bài viết, nếu thấy bài viết này hay, đừng quên chia sẻ cho mọi người cùng biết nhé! Cảm ơn các bạn!

# Source code

```cpp
struct Node
{
    int data;
    Node *left;
    Node *right;
};

typedef Node *Tree;

Node *CreateNode(int init)
{
    Node *p = new Node;
    p->data = init;
    p->left = NULL;
    p->right = NULL;
    return p;
}

void CreateTree(Tree &root)
{
    root = NULL;
}

void DestroyTree(Tree &root)
{
    if (root)
    {
        DestroyTree(root->left);
        DestroyTree(root->right);
        delete root;
    }
}

void AddNode(Tree &root, Node *node)
{
    if (root)
    {
        if (root->data == node->data)
            return;
        if (node->data < root->data)
            AddNode(root->left, node);
        else
            AddNode(root->right, node);
    }
    else
    {
        root = node;
    }
}

Node *FindNode(Tree root, int x)
{
    if (root)
    {
        if (root->data == x)
            return root;
        if (x < root->data)
            return FindNode(root->left, x);
        return FindNode(root->right, x);
    }
    return NULL;
}

void PrintTree(Tree root)// print tree using LNR
{
    if (root)
    {
        PrintTree(root->left);
        cout << root->data << ' ';
        PrintTree(root->right);
    }
}

void NLR(Tree root)
{
    if (root)
    {
        // Xử lý nút gốc (root)
        NLR(root->left);
        NLR(root->right);
    }
}

void LNR(Tree root)
{
    if (root)
    {
        LNR(root->left);
        // Xử lý nút gốc (root)
        LNR(root->right);
    }
}

void LRN(Tree root)
{
    if (root)
    {
        LRN(root->left);
        LRN(root->right);
        // Xử lý nút gốc (root)
    }
}

void FindAndReplace1(Tree &p, Tree &tree)
{
    if (tree->left)
        FindAndReplace1(p, tree->left);
    else
    {
        p->data = tree->data;
        p = tree;
        tree = tree->right;
    }
}

void FindAndReplace2(Tree &p, Tree &tree)
{
    if (tree->right)
        FindAndReplace2(p, tree->right);
    else
    {
        p->data = tree->data;
        p = tree;
        tree = tree->left;
    }
}

void DeleteNode(Tree &root, int x)
{
    if (root)
    {
        if (x > root->data)
            DeleteNode(root->right, x);
        else if (x < root->data)
            DeleteNode(root->left, x);
        else
        {
            Node *p = root;
            if (!root->left)
                root = root->right;
            else if (!root->right)
                root = root->left;
            else
                FindAndReplace1(p, root->right);
            // FindAndReplace2(p, root->left);
            delete p;
        }
    }
    else
    {
        cout << "Not found!\n";
    }
}
```
