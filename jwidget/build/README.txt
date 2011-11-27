config - конфигураци€ приложени€

config/modes - список режимов, которые можно передавать в компил€тор вызовом "php build.php <mode>"

ќписание режима:
{
    "compress"  : true/false,   // если true, то компил€тор заполн€ет папку signin/js/build *.min.js-файлами
    "link"      : true/false,   // если true, то компил€тор заполн€ет папку pages *.html-файлами
    "linkMin"   : true/false,   // если true, то в *.html-файлах перечисл€ютс€ сжатые *.min.js-файлы, иначе исходные *.js-файлы
    
    "services": [               // здесь можно перечислить названи€ сервисов, которые следует добавить внутрь <body> при линковке
        "googleAnalytics"       // пример
    ],
    
    "custom": {                 // дополнительные константы, которые можно использовать в html-шаблоне
        "googleSiteVerificationKey" : "abcdefghijklmnopqrstuvwxyz"   // пример
    }
}
