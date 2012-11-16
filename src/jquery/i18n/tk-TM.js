(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["tk-TM"] = $.extend(true, {}, en, {
        name: "tk-TM",
        englishName: "Turkmen (Turkmenistan)",
        nativeName: "türkmençe (Türkmenistan)",
        language: "tk",
        numberFormat: {
            ',': " ",
            '.': ",",
            percent: {
                pattern: ["-n%","n%"],
                ',': " ",
                '.': ","
            },
            currencies: {'':{
                pattern: ["-n$","n$"],
                ',': " ",
                '.': ",",
                symbol: "m."
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                '/': ".",
                firstDay: 1,
                days: {
                    names: ["Duşenbe","Sişenbe","Çarşenbe","Penşenbe","Anna","Şenbe","Ýekşenbe"],
                    namesAbbr: ["Db","Sb","Çb","Pb","An","Şb","Ýb"],
                    namesShort: ["D","S","Ç","P","A","Ş","Ý"]
                },
                months: {
                    names: ["Ýanwar","Fewral","Mart","Aprel","Maý","lýun","lýul","Awgust","Sentýabr","Oktýabr","Noýabr","Dekabr",""],
                    namesAbbr: ["Ýan","Few","Mart","Apr","Maý","lýun","lýul","Awg","Sen","Okt","Not","Dek",""]
                },
                AM: null,
                PM: null,
                patterns: {
                    d: "dd.MM.yy",
                    D: "yyyy 'ý.' MMMM d",
                    t: "H:mm",
                    T: "H:mm:ss",
                    f: "yyyy 'ý.' MMMM d H:mm",
                    F: "yyyy 'ý.' MMMM d H:mm:ss",
                    Y: "yyyy 'ý.' MMMM",
                    l: "dd.MM.yy H:mm",
                    L: "dd.MM.yy H:mm:ss"
                }
            })
        }
    }, regions["tk-TM"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));