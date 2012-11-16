(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["zh-TW"] = $.extend(true, {}, en, {
        name: "zh-TW",
        englishName: "Chinese (Traditional, Taiwan)",
        nativeName: "中文(台灣)",
        language: "zh-CHT",
        numberFormat: {
            percent: {
                pattern: ["-n%","n%"]
            },
            currencies: {'':{
                pattern: ["-$n","$n"],
                symbol: "NT$"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
                    namesAbbr: ["週日","週一","週二","週三","週四","週五","週六"],
                    namesShort: ["日","一","二","三","四","五","六"]
                },
                months: {
                    names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
                    namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
                },
                AM: ["上午","上午","上午"],
                PM: ["下午","下午","下午"],
                eras: [{"name":"西元","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/M/d",
                    D: "yyyy'年'M'月'd'日'",
                    t: "tt hh:mm",
                    T: "tt hh:mm:ss",
                    f: "yyyy'年'M'月'd'日' tt hh:mm",
                    F: "yyyy'年'M'月'd'日' tt hh:mm:ss",
                    M: "M'月'd'日'",
                    Y: "yyyy'年'M'月'",
                    l: "yyyy/M/d tt hh:mm",
                    L: "yyyy/M/d tt hh:mm:ss"
                }
            }),
            Taiwan: $.extend(true, {}, standard, {
                name: "Taiwan",
                days: {
                    names: ["星期日","星期一","星期二","星期三","星期四","星期五","星期六"],
                    namesAbbr: ["週日","週一","週二","週三","週四","週五","週六"],
                    namesShort: ["日","一","二","三","四","五","六"]
                },
                months: {
                    names: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""],
                    namesAbbr: ["一月","二月","三月","四月","五月","六月","七月","八月","九月","十月","十一月","十二月",""]
                },
                AM: ["上午","上午","上午"],
                PM: ["下午","下午","下午"],
                eras: [{"name":"","start":null,"offset":1911}],
                twoDigitYearMax: 99,
                patterns: {
                    d: "yyyy/M/d",
                    D: "yyyy'年'M'月'd'日'",
                    t: "tt hh:mm",
                    T: "tt hh:mm:ss",
                    f: "yyyy'年'M'月'd'日' tt hh:mm",
                    F: "yyyy'年'M'月'd'日' tt hh:mm:ss",
                    M: "M'月'd'日'",
                    Y: "yyyy'年'M'月'",
                    l: "yyyy/M/d tt hh:mm",
                    L: "yyyy/M/d tt hh:mm:ss"
                }
            })
        }
    }, regions["zh-TW"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));