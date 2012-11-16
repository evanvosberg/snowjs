(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["zu"] = $.extend(true, {}, en, {
        name: "zu",
        englishName: "isiZulu",
        nativeName: "isiZulu",
        language: "zu",
        numberFormat: {
            percent: {
                pattern: ["-%n","%n"]
            },
            currencies: {'':{
                pattern: ["$-n","$ n"],
                symbol: "R"
            }}
        },
        calendars: {
            standard: $.extend(true, {}, standard, {
                days: {
                    names: ["iSonto","uMsombuluko","uLwesibili","uLwesithathu","uLwesine","uLwesihlanu","uMgqibelo"],
                    namesAbbr: ["Son.","Mso.","Bi.","Tha.","Ne.","Hla.","Mgq."]
                },
                months: {
                    names: ["uMasingana","uNhlolanja","uNdasa","uMbaso","uNhlaba","uNhlangulana","uNtulikazi","uNcwaba","uMandulo","uMfumfu","uLwezi","uZibandlela",""],
                    namesAbbr: ["Mas.","Nhlo.","Nda.","Mba.","Nhla.","Nhlang.","Ntu.","Ncwa.","Man.","Mfu.","Lwe.","Zib.",""]
                },
                patterns: {
                    d: "yyyy/MM/dd",
                    D: "dd MMMM yyyy",
                    t: "hh:mm tt",
                    T: "hh:mm:ss tt",
                    f: "dd MMMM yyyy hh:mm tt",
                    F: "dd MMMM yyyy hh:mm:ss tt",
                    M: "dd MMMM",
                    Y: "MMMM yyyy",
                    l: "yyyy/MM/dd hh:mm tt",
                    L: "yyyy/MM/dd hh:mm:ss tt"
                }
            })
        }
    }, regions["zu"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));