(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["tt-RU"] = $.extend(true, {}, en, {
        name: "tt-RU",
        englishName: "Tatar (Russia)",
        nativeName: "Татар (Россия)",
        language: "tt",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                ',': " ",
                '.': ",",
                symbol: "р."
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["Якшәмбе","Дүшәмбе","Сишәмбе","Чәршәмбе","Пәнҗешәмбе","Җомга","Шимбә"],
                    namesAbbr: ["Якш","Дүш","Сиш","Чәрш","Пәнҗ","Җом","Шим"],
                    namesShort: ["Я","Д","С","Ч","П","Җ","Ш"]
                },
                months: {
                    names: ["Гыйнвар","Февраль","Март","Апрель","Май","Июнь","Июль","Август","Сентябрь","Октябрь","Ноябрь","Декабрь",""],
                    namesAbbr: ["Гыйн.","Фев.","Мар.","Апр.","Май","Июнь","Июль","Авг.","Сен.","Окт.","Нояб.","Дек.",""]
                },
                monthsGenitive: {
                    names: ["Гыйнварның","Февральнең","Мартның","Апрельнең","Майның","Июньнең","Июльнең","Августның","Сентябрьның","Октябрьның","Ноябрьның","Декабрьның",""],
                    namesAbbr: ["Гыйн.-ның","Фев.-нең","Мар.-ның","Апр.-нең","Майның","Июньнең","Июльнең","Авг.-ның","Сен.-ның","Окт.-ның","Нояб.-ның","Дек.-ның",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yyyy",
                    D: "d MMMM yyyy",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "d MMMM yyyy H:mm",
                    F: "d MMMM yyyy H:mm:ss",
                    M: "d MMMM",
                    Y: "MMMM yyyy",
                    l: "dd.MM.yyyy H:mm",
                    L: "dd.MM.yyyy H:mm:ss"
                }
            })
        }
    }, regions["tt-RU"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));