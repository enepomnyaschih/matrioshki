    Copyright (C) 2011 Egor Nepomnyaschih
    
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Lesser General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Lesser General Public License for more details.
    
    You should have received a copy of the GNU Lesser General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

---------------------------------------------------------------------



���������

0.  ��� ������ jWidget ����������:
    -   PHP 5.2.9+
    -   Apache 2.2+
    -   Java (��� ������� YUICompressor'� ��� �������� ����������)
1.  ���������� ����� jwidget � ���� .gitignore � ���������� ������
    ���-����������
2.  ��������� Apache �� ���������� jwidget/public, � ���������� ��������
    AllowOverride All
3.  ���������� yuicompressor.jar
    (http://yuilibrary.com/download/yuicompressor/)
    � ���������� jwidget/build
4.  (�������������) ����� ��������� ����� �� �����, ����� ���������� PHP ������
    ��� Apache, ��������� ����� ���������� PHP-������

----

������ �������

��������� � ���������� jwidget/build � ��������� �������
php build.php <�����>
������:
php build.php debug

----

������ �������

�������� Apache � �������� �������� http://localhost/tests

----

������ �������

debug
    ���������� �����. � �������� ������������ �������� �������� JS-�����.
    � ���������� � ���������� jwidget/public/pages ������ ��������� html-�����.
release
    �������� �����. ��� JS-����� ������������ �� JS-�������, ��������� �
    ������������ � ��������. ������������ ����������������� ������� compress
    � link. � ���������� � ���������� jwidget/public/build ������ ���������
    min.js-�����, � � ���������� jwidget/public/pages - html-�����.
compress
    ��� JS-����� ������������ �� JS-������� � ���������. � ���������� �
    ���������� jwidget/public/build ������ ��������� min.js-�����.
link
    ��������������, ��� ����� jwidget/public/build ��� �������� ��� �����������
    min.js-�����. ��� ������������ � ��������. � ���������� � ����������
    jwidget/public/pages ������ ��������� html-�����.

���������: release � compress ����������� ����� ��-�� �������� ������ ��������.

----

������������ ��������� ��������� ���������� (��. ���������� public/thirdparty)
-   jQuery (http://jquery.com/)
-   jQuery.template
-   date.js
-   date.format.js
-   json2.js
-   md5.js
-   reset.css

����� ����, ��� ������ JS-������ ���������
-   YUI Compressor

----

����������� ����������

1.  ���� ����������, ������������ ����������� jWidget, �������������� ��
    3 ���������:
    1)  ������������ ���� JW, ���������� � ���� ����������� ������� � ������
        ��� �������� ���-����������
    2)  ���������� � ���������� ����������� ������� Array, Function, String �
        Date, ���������� ��������� ����������� �������
    3)  SDK ��� ������ �������
2.  ���������� �������������:
    1)  ������� ����� ����������� �������
    2)  ���� ��� �������� � ������������ ������� - JW.Class
    3)  ����������� ���������� ������� Observer - JW.Observable
    4)  ������ ��������� (����������� Array, JW.Map, JW.Dimap, JW.Collection)
    5)  �������� �������� JW.Browsers
    6)  ������� ��� Ajax-�������� �� ������ $.ajax � JW.Observable -
        JW.Request, JW.Action � JW.RequestRepeater
    7)  ������ ������������ �������� ������ - JW.Model
    8)  ����� ������� - JW.Timer
    9)  ������ ��� ���������� UI-����������� - JW.UI.Component � JW.UI.Plugin
    10) ������ ������

----

��������� �����������

1.  ���������� ���������� ���
2.  ��� ������ ���������� ������ ����������� � ������������ ������������ ����
3.  ������ ����� - � ��������� �����
4.  ������������ ���� � ������ ��������� ���: JustAnotherClass
5.  ��������� ���� � ������ ��������� ���: justAnotherMethod (camel)
6.  ��� ��������� ���� � ������ ���������� � _: _justAnotherField
7.  ��� ���������� � ������ ������ ��������� � ����������� ������ ������������,
    ��� ���� �������� ����������� � ��������� ������������ �������
8.  ��� ���� ����������� ���:
    justAnotherField: defaultValue, // ������������ ���[, ��������]
    ������:
    userBoxEls: null, // [readonly] Array(4) of jQuery element
9.  ������������:
    [required] - ������������ ����� ������������
    [optional] - �������������� ����� ������������
    [property] - ��������
    [readonly] - �������� ������ ��� ������
10. ��� ���� �������� � ������� ��������� � ���� ����������� ������ JW.Action
    � ������������� �� ������
11. jQuery-�������� ��������� �� justAnotherEl ��� justOtherEls
12. ����� UI-���������� ���������� ����� ������������ �� ������ �����������
    (���� �� �� JW.UI.Component)
13. ��� HTML-������� �������� �� ������� ������ ���������� � ��������� � �����
    JW.UI.template(JustAnotherComponentClass, { ... });

----

�����

1.  ������������� ����� �������������� ���������� ��������� � �������� �����:
    http://localhost/tests. ��������� �������� ���� ������ � Firefox (� ������
    ��������� �� ���������� ����� ����� �������)
2.  ����� - ������ ������ ������, ��� �������� ��������������� �������. �
    ������ ����� �������� ������ �� ������ ������������ ��� �������
3.  �� ������ � ��������� ������� ���� ����������� ����-����: �����������
    public/tests � build/config/pages/tests.json � �������� �������
4.  ����� ������� �� ������ ���������� JW.Unit. ������������ �� ��������� �
    ������� ������������ ������������ ������������:
    1)  �� API ����� ������ ���������� FlexUnit
    2)  ����� ��������� ������������ �������� TestSuit'��
    3)  TestSuit'� ��������� ������������� �� ������������� ����, ����������
        TestCase'�
    4)  �������������� ����������� ����������� �������: async, forbid � sleep
    5)  �������������� ������������ �� ������ "���������� ������" (expected
        output)
    6)  �������� ������ ���������� �� ���� ������� ������������� �������
        ��������� ���������� JW.equal
    7)  ��� ������� ��������� TestSuit � TestCase ����� ���������� ������
        setupAll, setup, teardown � teardownAll. ������ setup � teardown
        ���������� ��� ������� ���������� �������� ������ ������, � ������
        setupAll � teardownAll ���������� ����� ���� ��� �� � ����� ���� ������
        ������ ������
    8)  �������, �� ������� ���������������� ���������
