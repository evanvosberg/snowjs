(function($) {
    var regions = $.i18n.regions,
        en = $.i18n.defaults,
        standard = en.calendars.standard,
        region = regions["xh"] = $.extend(true, {}, en, {
        name: "xh",
        englishName: "isiXhosa",
        nativeName: "isiXhosa",
        language: "xh",
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
                    names: ["iCawa","uMvulo","uLwesibini","uLwesithathu","uLwesine","uLwesihlanu","uMgqibelo"],
                    namesShort: ["Ca","Mv","Lb","Lt","Ln","Lh","Mg"]
                },
                months: {
                    names: ["Mqungu","Mdumba","Kwindla","Tshazimpuzi","Canzibe","Silimela","Khala","Thupha","Msintsi","Dwarha","Nkanga","Mnga",""]
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
    }, regions["xh"]);
    region.calendar = region.calendars.standard;
    region.numberFormat.currency = region.numberFormat.currencies[''];
}(jQuery));