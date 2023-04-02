---
layout: post
title: '珍惜当下(python学习笔记)'
date: 2023-4-2
author: 王耀祖
cover: 'http://on2171g4d.bkt.clouddn.com/jekyll-banner.png'
tags: python
---
# 珍惜当下

## 为什么沉迷与过去

> 沉迷，应该是享受，才会沉迷吧？即便不是享受，肯定是沉迷过去让你感觉收获大于付出。
>
> 分析下自己享受的是什么？
>
> 是不是因为没有新的享受来源才一直抓住过去的那点收获补偿自己？

## PYTHON学习笔记(廖雪峰官网学 习笔记)

注：学习笔记的记录（不是原创教程，仅当记录），其实也是一堆废话，见谅别较真。

### python

python是一种解释型的语言，不能加密，这就意味着在一旦发布python就是发布了源代码。对应的编译型语言就没有这个担忧，比如c或者java，只需要把编译后的机器码（也就是.exe文件）发布出去。

当然python是一门很简洁的高级编程语言，往往不需要很复制的语法规则，就比如在C语言中使用变量就必须要申请一个变量名字并且要声明变量名字的类型，然而在python中就不需要申请和声明类型，直接按照规则就自动(一个变量的名字只能用数字字母和下划线“_”自由搭配来表示，要求不能用数字开头就行)	这样的后果就是不能充分调用硬件的性能，速度会慢很多（但是现在计算机的发展倒不必过分担心）

python有很多很多的库，官方的或者自由开发者做的（爱了呜呜），我们可以直接调用，这样就给我们节省很大的精力。这些库就像一个函数一样，我们只要明白了函数是干什么怎么用的我们就能轻易的使用了

python解释器，我们直接在官网下载的python3.0就获得了一个官方的解释器：CPpython，这是一个用C语言开发的，在命令行中运行 `python` 就启动了。CPython用`>>>`作为提示符

还有一个小坑值得注意的就是python的另一个解释器叫PyPy，他是采用的[JIT技术](https://en.wikipedia.org/wiki/Just-in-time_compilation)（对python代码进行一个动态编译而不是解释，[动态编译是什么](https://www.bing.com/search?q=%E5%8A%A8%E6%80%81%E7%BC%96%E8%AF%91%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D&qs=n&form=QBRE&sp=-1&lq=0&pq=%E5%8A%A8%E6%80%81%E7%BC%96%E8%AF%91%E6%98%AF%E4%BB%80%E4%B9%88%E6%84%8F%E6%80%9D&sc=0-9&sk=&cvid=706FB1A69BA849248B261734D5933165&ghsh=0&ghacc=0&ghpl=)）主打的就是一个高速的执行速度，绝大部分的python代码是可以在PyPy下运行的，但是PyPy和CPython还是有一些不同的，所以就会导致一段代码在两个编译环境中运行的结果出现不同，如果你的代码要放在PyPy下执行，就需要了解[PyPy和CPython的不同点](http://pypy.readthedocs.org/en/latest/cpython_differences.html)。

还有其他的解释器，但也不怎么用就不展开说了。RTFM。

### 输入和输出

```python
input() #输入
print() #输出

name = input() #输入一个东西赋值给name变量
print(name) #输出变量name指向的东西
print('name') #输出字符串name，英文的双引号和单引号表示的是字符串字符 
print('100 + 200 = ',100+200) #在这英文的逗号在运行后表示的是一个空格，我理解是想输出字符串‘100 + 200 =’然后在输出100+200表示的东西。
```

###　数据类型和变量

不需要声明

直接拿着一个想要的变量名字就用，他会给你解释



### 除法有两种,求余符号

/和//

会有不同的结果



###　字符串和编码

ASCII编码

Unicode编码

UTF-8编码

ord()函数

chr()函数

len()函数：计算str（python中字符串类型）的字符数，或者计算bytes的字节数，还可以计算list元素的个数。



python的字符串类型是`str`,在内存中以Unicode编码表示，要将Unicode编码转为指定bytes的用   encode()函数。

```python
>>> 'ABC'.encode('ascii')
b'ABC'
>>> '中文'.encode('utf-8')
b'\xe4\xb8\xad\xe6\x96\x87'
>>> '中文'.encode('ascii')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
UnicodeEncodeError: 'ascii' codec can't encode characters in position 0-1: ordinal not in range(128)
```



在操作字符串时，我们会经常遇到`str`和`bytes`的互相转换，为了避免乱码问题，应当坚持使用UTF-8编码对`str` 和`bytes`进行转换。

由于Python源代码也是一个文本文件，所以，当你的源代码中包含中文的时候，在保存源代码时，就需要务必指定保存为UTF-8编码。当Python解释器读取源代码时，为了让它按UTF-8编码读取，我们通常在文件开头写上这两行

```python
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
```

第一行是告诉Linux/OS X系统，这是一个python可执行程序，Windows会自动忽略这个注释；

第二行是告诉python解释器，按照UTF-8编码读取远代码，否者，我们在源代码中写的中文输出会有乱码。

当然我们还会不止声明UTF-8编码就意味着我们的`.py`文件就是UTF-8编码，，必须确保文本编辑器使用的是**UTF-8 without BOM编码**。

如果`.py`文件本身使用UTF-8编码，并且也申明了`# -*- coding: utf-8 -*-`，打开命令提示符测试就可以正常显示中文



### 格式化

和C语言也挺像的，用%来替换进行格式化。（从C语言角度来看，就是简化了许多，有点自由度了，没有调调规规就是爽）

```python
print('%d' % 6)
print('%d'%6)
print('%d' % (6))#后面的%的出现是告诉计算机替换内容的声明吧吧吧。
#从结果来看，对于单个占位符，有木有空格和括号无伤大雅
print('%d %d' %(3,4))
#这里注意，多个占位符，要加括号和英文逗号。

```

| 占位符 |   替换内容   |
| :---: | :----------: |
|   %d   |     整数     |
|   %f   |    浮点数    |
|   %s   |    字符串    |
|   %x   | 十六进制整数 |

如果我们不太确定要用什么，`%s`永远起作用，他会把任何数据类型转换为字符串:

### 使用list和tuple

#### list

list是python内置的一种数据类型，是一种有序的列表，有点像C语言的数组，但是在list中不要数据类型一样，所以就更像是C语言的结构了。其实我简称list为列表（应该没有问题吧）

比如在list中的元素还可以是一个list。

```python
classmate = [1,2,[3,4],5];#在这里的classmate列表有四个元素，其中的3和4是一个list作为一个元素来看待。
```



list的访问跟C语言的数组有点相似：`classmate[0]`;`classmate[-1]`这里使用的-1表示是倒数第一个，毕竟-0没有意义。

对list的添加和删除：

```python
classmate.append('6') #表示在list中追加元素到最后的末尾。
classmate.insert(7,3) #表示是在list的第7位添加一个3的元素
classmate.pop() #表示删除list末尾元素。
classmate.pop(7) #表示删除list中指定的第i位的元素。
classmate[0] = 4 #表示直接访问和赋值。
```

上面我们定义的这个classmate列表如果要访问其中第2个元素其中的第0个元素我们可以这样

`classmate[2][0]`：这就有点像在C语言中的二维数组一样了。

####　tuple

tuple是一种特殊的有序列表，一般叫元组，先说他的特殊性：一旦定义了（初始化）tuple，就不能修改tuple的元素，不能增删改，但其中也有特殊性，当我们定义的tuple中有list的时候我们可以修改list中的值，可以改，刚刚通过代码验证了，md还可以增删改的。那他不能修改是说的什么呢，我觉得是这么看，对于定义的tuple第一级别是不能被更改的，就这么说吧，第一层是指向的那几个元素不能被更改，

他的一般性和list差不多，就是不限制类型，和像C语言数组一样的访问方式。

```python
q = () #定义了一个空的tuple
q = (1) #这里的括号被解释成数学的括号运算，所以q是一个表示1的变量
q = (1,) #这里的英文逗号是消除歧义的，表明他是一个只有一个元素的tuple。

>>> t = (1,2,[3,4]) #定义一个tuple
>>> t
(1, 2, [3, 4])
>>> t[2].pop(1) #使用了list的删除。
4
>>> t
(1, 2, [3])
>>> t[2].insert(1,4) #使用了list的增加。
>>> t
(1, 2, [3, 4])
>>> t[2][0] = 0 #使用了list的改，可以看出来访问的方式和list一样。
>>> t
(1, 2, [0, 4])
```



不可变的tuple有什么意义？因为tuple不可变，所以代码更安全。如果可能，能用tuple代替list就尽量用tuple。



