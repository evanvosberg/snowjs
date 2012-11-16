(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["ii-CN"] = $.extend(true, {}, en, {
        name: "ii-CN",
        englishName: "Yi (PRC)",
        nativeName: "ꆈꌠꁱꂷ (ꍏꉸꏓꂱꇭꉼꇩ)",
        language: "ii",
        numberFormat: {
            groupSizes: [3,0],
            percent: {
                pattern: ["-n%","n%"],
                groupSizes: [3,0]
            },
            currencies: {'':{
                pattern: ["$-n","$n"],
                symbol: "¥"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                firstDay: 1,
                days: {
                    names: ["ꑭꆏꑍ","ꆏꊂ꒔","ꆏꊂꑍ","ꆏꊂꌕ","ꆏꊂꇖ","ꆏꊂꉬ","ꆏꊂꃘ"],
                    namesAbbr: ["ꑭꆏ","ꆏ꒔","ꆏꑍ","ꆏꌕ","ꆏꇖ","ꆏꉬ","ꆏꃘ"],
                    namesShort: ["ꆏ","꒔","ꑍ","ꌕ","ꇖ","ꉬ","ꃘ"]
                },
                months: {
                    names: ["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊯꊪꆪ","ꊰꑋꆪ",""],
                    namesAbbr: ["ꋍꆪ","ꑍꆪ","ꌕꆪ","ꇖꆪ","ꉬꆪ","ꃘꆪ","ꏃꆪ","ꉆꆪ","ꈬꆪ","ꊰꆪ","ꊯꊪꆪ","ꊰꑋꆪ",""]
                },
                AM: ["ꂵꆪꈌꈐ","ꂵꆪꈌꈐ","ꂵꆪꈌꈐ"],
                PM: ["ꂵꆪꈌꉈ","ꂵꆪꈌꉈ","ꂵꆪꈌꉈ"],
                eras: [{"name":"ꇬꑼ","start":null,"offset":0}],
                patterns: {
                    d: "yyyy/M/d",
                    D: "yyyy'ꈎ' M'ꆪ' d'ꑍ'",
                    t: "tt h:mm",
                    T: "H:mm:ss",
                    f: "yyyy'ꈎ' M'ꆪ' d'ꑍ' tt h:mm",
                    F: "yyyy'ꈎ' M'ꆪ' d'ꑍ' H:mm:ss",
                    M: "M'ꆪ' d'ꑍ'",
                    Y: "yyyy'ꈎ' M'ꆪ'",
                    l: "yyyy/M/d tt h:mm",
                    L: "yyyy/M/d H:mm:ss"
                }
            })
        }
    }, regions["ii-CN"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));