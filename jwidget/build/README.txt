config - ������������ ����������

config/modes - ������ �������, ������� ����� ���������� � ���������� ������� "php build.php <mode>"

�������� ������:
{
    "compress"  : true/false,   // ���� true, �� ���������� ��������� ����� signin/js/build *.min.js-�������
    "link"      : true/false,   // ���� true, �� ���������� ��������� ����� pages *.html-�������
    "linkMin"   : true/false,   // ���� true, �� � *.html-������ ������������� ������ *.min.js-�����, ����� �������� *.js-�����
    
    "services": [               // ����� ����� ����������� �������� ��������, ������� ������� �������� ������ <body> ��� ��������
        "googleAnalytics"       // ������
    ],
    
    "custom": {                 // �������������� ���������, ������� ����� ������������ � html-�������
        "googleSiteVerificationKey" : "abcdefghijklmnopqrstuvwxyz"   // ������
    }
}
