(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["lt-LT"] = $.extend(true, {}, en, {
        name: "lt-LT",
        englishName: "Lithuanian (Lithuania)",
        nativeName: "lietuvių (Lietuva)",
        language: "lt",
        numberFormat: {
            ',': ".",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': ".",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n $","n $"],
                ',': ".",
                '.': ",",
                symbol: "Lt"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["sekmadienis","pirmadienis","antradienis","trečiadienis","ketvirtadienis","penktadienis","šeštadienis"],
                    namesAbbr: ["Sk","Pr","An","Tr","Kt","Pn","Št"],
                    namesShort: ["S","P","A","T","K","Pn","Š"]
                },
                months: {
                    names: ["sausis","vasaris","kovas","balandis","gegužė","birželis","liepa","rugpjūtis","rugsėjis","spalis","lapkritis","gruodis",""],
                    namesAbbr: ["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rgp","Rgs","Spl","Lap","Grd",""]
                },
                monthsGenitive: {
                    names: ["sausio","vasario","kovo","balandžio","gegužės","birželio","liepos","rugpjūčio","rugsėjo","spalio","lapkričio","gruodžio",""],
                    namesAbbr: ["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rgp","Rgs","Spl","Lap","Grd",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "yyyy.MM.dd",
                    D: "yyyy 'm.' MMMM d 'd.'",
                    t: "HH:mm",
                    T: "HH:mm:ss",
                    f: "yyyy 'm.' MMMM d 'd.' HH:mm",
                    F: "yyyy 'm.' MMMM d 'd.' HH:mm:ss",
                    M: "MMMM d 'd.'",
                    Y: "yyyy 'm.' MMMM",
                    l: "yyyy.MM.dd HH:mm",
                    L: "yyyy.MM.dd HH:mm:ss"
                }
            })
        }
    }, regions["lt-LT"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));